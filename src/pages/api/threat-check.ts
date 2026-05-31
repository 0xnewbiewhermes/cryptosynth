export const prerender = false;

/**
 * Consolidated threat intelligence API route.
 * Checks multiple free sources in parallel:
 * - VirusTotal (needs VIRUSTOTAL_API_KEY)
 * - Google Safe Browsing (needs GOOGLE_SAFE_BROWSING_KEY)
 * - URLScan.io (optional URLSCAN_API_KEY, works without)
 * - URLhaus (needs URLHAUS_AUTH_KEY)
 */

const VT_KEY = import.meta.env.VIRUSTOTAL_API_KEY || '';
const GSB_KEY = import.meta.env.GOOGLE_SAFE_BROWSING_KEY || '';
const URLSCAN_KEY = import.meta.env.URLSCAN_API_KEY || '';
const URLHAUS_KEY = import.meta.env.URLHAUS_AUTH_KEY || '';

async function checkVirusTotal(domain: string): Promise<any> {
  if (!VT_KEY) return { skipped: true, source: 'VirusTotal', note: 'No API key' };
  try {
    const res = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
      headers: { 'x-apikey': VT_KEY },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { error: `HTTP ${res.status}`, source: 'VirusTotal' };
    const data = await res.json();
    const attrs = data.data?.attributes || {};
    const stats = attrs.last_analysis_stats || {};
    const malicious = stats.malicious || 0;
    const suspicious = stats.suspicious || 0;
    const harmless = stats.harmless || 0;
    const undetected = stats.undetected || 0;
    const total = malicious + suspicious + harmless + undetected;
    const reputation = attrs.reputation || 0;

    return {
      source: 'VirusTotal',
      malicious,
      suspicious,
      harmless,
      undetected,
      total,
      reputation,
      risk: malicious > 0 ? 'critical' : suspicious > 0 ? 'high' : 'low',
    };
  } catch (err: any) {
    return { error: err.message, source: 'VirusTotal' };
  }
}

async function checkSafeBrowsing(domain: string): Promise<any> {
  if (!GSB_KEY) return { skipped: true, source: 'Google Safe Browsing', note: 'No API key' };
  try {
    const payload = {
      client: { clientId: 'cryptosynth-scam-checker', clientVersion: '2.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [
          { url: `http://${domain}/` },
          { url: `https://${domain}/` },
        ],
      },
    };
    const res = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GSB_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return { error: `HTTP ${res.status}`, source: 'Google Safe Browsing' };
    const data = await res.json();
    const matches = data.matches || [];
    return {
      source: 'Google Safe Browsing',
      found: matches.length > 0,
      threats: [...new Set(matches.map((m: any) => m.threatType))],
      risk: matches.length > 0 ? 'critical' : 'low',
    };
  } catch (err: any) {
    return { error: err.message, source: 'Google Safe Browsing' };
  }
}

async function checkURLScan(domain: string): Promise<any> {
  try {
    const headers: Record<string, string> = {};
    if (URLSCAN_KEY) headers['API-Key'] = URLSCAN_KEY;

    const searchRes = await fetch(
      `https://urlscan.io/api/v1/search/?q=domain:${domain}&size=1`,
      { headers, signal: AbortSignal.timeout(8000) }
    );
    if (!searchRes.ok) return { error: `HTTP ${searchRes.status}`, source: 'URLScan.io' };
    const data = await searchRes.json();
    const results = data.results || [];

    if (results.length === 0) {
      return { source: 'URLScan.io', found: false, totalScans: 0, risk: 'low', note: 'Belum pernah di-scan' };
    }

    const latest = results[0];
    const verdict = latest.verdicts?.overall || {};
    const score = latest.task?.score || 0;

    return {
      source: 'URLScan.io',
      found: true,
      totalScans: data.total || 0,
      malicious: verdict.malicious || false,
      score,
      screenshot: latest.screenshot || null,
      pageUrl: latest.page?.url || null,
      risk: verdict.malicious ? 'critical' : score > 50 ? 'high' : 'low',
    };
  } catch (err: any) {
    return { error: err.message, source: 'URLScan.io' };
  }
}

async function checkURLhaus(domain: string): Promise<any> {
  if (!URLHAUS_KEY) return { skipped: true, source: 'URLhaus', note: 'No API key' };
  try {
    const body = new URLSearchParams({ host: domain });
    const res = await fetch('https://urlhaus-api.abuse.ch/v1/host/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Auth-Key': URLHAUS_KEY,
      },
      body: body.toString(),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { error: `HTTP ${res.status}`, source: 'URLhaus' };
    const data = await res.json();
    if (data.query_status === 'no_results') {
      return { source: 'URLhaus', found: false, risk: 'low', note: 'Tidak ditemukan' };
    }
    const urlsTotal = data.urls_total || 0;
    const urlsOnline = data.urls_online || 0;
    return {
      source: 'URLhaus',
      found: urlsTotal > 0,
      urlsTotal,
      urlsOnline,
      risk: urlsOnline > 0 ? 'critical' : urlsTotal > 0 ? 'high' : 'low',
    };
  } catch (err: any) {
    return { error: err.message, source: 'URLhaus' };
  }
}

export async function GET({ url }: { url: URL }) {
  const domain = url.searchParams.get('domain');
  if (!domain) {
    return new Response(JSON.stringify({ error: 'Missing domain parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Run all checks in parallel
  const results = await Promise.allSettled([
    checkVirusTotal(domain),
    checkSafeBrowsing(domain),
    checkURLScan(domain),
    checkURLhaus(domain),
  ]);

  const checks = results
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<any>).value);

  // Determine overall risk
  const risks = checks.map(c => c.risk).filter(Boolean);
  let overallRisk = 'low';
  if (risks.includes('critical')) overallRisk = 'critical';
  else if (risks.includes('high')) overallRisk = 'high';
  else if (risks.includes('medium')) overallRisk = 'medium';

  const activeSources = checks.filter(c => !c.skipped).length;
  const skippedSources = checks.filter(c => c.skipped).length;

  return new Response(JSON.stringify({
    domain,
    overallRisk,
    activeSources,
    skippedSources,
    checks,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

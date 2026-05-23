export const prerender = false;

type CovalentItem = {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  logo_urls: { token_logo_url: string | null; chain_logo_url: string | null };
  type: string;
  is_spam: boolean;
  balance: string;
  quote_rate: number | null;
  quote: number | null;
  pretty_quote: string | null;
  is_native_token: boolean;
  last_transferred_at: string;
};

const CHAINS: Record<string, { name: string; label: string; native: string; explorer: string }> = {
  'eth-mainnet':     { name: 'eth-mainnet',     label: 'Ethereum', native: 'ETH', explorer: 'https://etherscan.io' },
  'base-mainnet':    { name: 'base-mainnet',    label: 'Base',     native: 'ETH', explorer: 'https://basescan.org' },
  'bsc-mainnet':     { name: 'bsc-mainnet',     label: 'BSC',      native: 'BNB', explorer: 'https://bscscan.com' },
  'matic-mainnet':   { name: 'matic-mainnet',   label: 'Polygon',  native: 'MATIC', explorer: 'https://polygonscan.com' },
  'arbitrum-mainnet':{ name: 'arbitrum-mainnet',label: 'Arbitrum', native: 'ETH', explorer: 'https://arbiscan.io' },
  'optimism-mainnet':{ name: 'optimism-mainnet',label: 'Optimism', native: 'ETH', explorer: 'https://optimistic.etherscan.io' },
};

export async function GET({ url }: { url: URL }) {
  try {
    const address = url.searchParams.get('address');
    const chain = url.searchParams.get('chain') || 'eth-mainnet';
    const multi = url.searchParams.get('multi') === '1';

    if (!address) {
      return new Response(JSON.stringify({ error: 'Missing address parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const chainInfo = CHAINS[chain];
    if (!chainInfo && !multi) {
      return new Response(JSON.stringify({ error: 'Invalid chain' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.COVALENT_API_KEY || 'cqt_rQXfQhHT6KMXPRhP4HRp8DwXQ9fH';

    if (multi) {
      // Fetch across multiple chains
      const chainsToFetch = Object.keys(CHAINS);
      const results = await Promise.allSettled(
        chainsToFetch.map(c => fetchBalances(address, c, apiKey))
      );

      const portfolios: any[] = [];
      results.forEach((r, i) => {
        if (r.status === 'fulfilled' && r.value) {
          portfolios.push(r.value);
        }
      });

      return new Response(JSON.stringify({ portfolios }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=15',
        },
      });
    }

    const result = await fetchBalances(address, chain, apiKey);
    if (!result) {
      return new Response(JSON.stringify({ error: 'Failed to fetch wallet data' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=15',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function fetchBalances(address: string, chain: string, apiKey: string) {
  const chainInfo = CHAINS[chain];
  if (!chainInfo) return null;

  const url = `https://api.covalenthq.com/v1/${chain}/address/${encodeURIComponent(address)}/balances_v2/?key=${apiKey}`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) return null;

  const json = await res.json();
  if (json.error || !json.data) return null;

  const items: CovalentItem[] = json.data.items || [];

  // Filter: exclude spam & empty dust, keep only native + erc20
  const filtered = items.filter(i =>
    !i.is_spam &&
    i.type !== 'dust' &&
    (i.is_native_token || (i.supports_erc && i.supports_erc.includes('erc20'))) &&
    BigInt(i.balance || '0') > 0n
  );

  // Sort: native first, then by USD value descending
  filtered.sort((a, b) => {
    if (a.is_native_token) return -1;
    if (b.is_native_token) return 1;
    return (b.quote || 0) - (a.quote || 0);
  });

  const totalValue = filtered.reduce((sum, i) => sum + (i.quote || 0), 0);

  return {
    address,
    chain: chainInfo.name,
    chain_label: chainInfo.label,
    native_symbol: chainInfo.native,
    explorer_base: chainInfo.explorer,
    total_value: totalValue,
    pretty_total: formatUSD(totalValue),
    updated_at: json.data.updated_at,
    items: filtered,
  };
}

function formatUSD(val: number): string {
  if (val >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(2)}B`;
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
  if (val >= 1) return `$${val.toFixed(2)}`;
  if (val >= 0.01) return `$${val.toFixed(4)}`;
  if (val > 0) return `$${val.toFixed(6)}`;
  return '$0.00';
}

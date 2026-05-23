export const prerender = false;

export async function GET({ url }: { url: URL }) {
  try {
    const chainId = url.searchParams.get('chain') || '1';
    const address = url.searchParams.get('address');
    const isSolana = url.searchParams.get('solana') === '1';

    if (!address) {
      return new Response(JSON.stringify({ error: 'Missing address parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Solana uses a different endpoint than EVM
    const goPlusUrl = isSolana
      ? `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${encodeURIComponent(address)}`
      : `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${encodeURIComponent(address)}`;
    
    const res = await fetch(goPlusUrl, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Go+ API error', status: res.status }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Go+ data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

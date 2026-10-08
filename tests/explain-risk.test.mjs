import assert from 'node:assert/strict';
import test from 'node:test';
import { GET, POST } from '../src/pages/api/explain-risk.ts';

const evidence = {
  subject: 'example.com', kind: 'domain', status: 'incomplete',
  findings: [], checkedSources: ['VirusTotal'], unavailableSources: ['Google Safe Browsing'],
};

test('penjelasan tetap nonaktif tanpa konfigurasi', async () => {
  const oldFlag = process.env.SCAM_AI_ENABLED;
  const oldKey = process.env.ANTHROPIC_API_KEY;
  delete process.env.SCAM_AI_ENABLED;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    assert.equal((await GET().json()).enabled, false);
    const request = new Request('https://cryptosynth.id/api/explain-risk', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(evidence),
    });
    assert.equal((await POST({ request })).status, 503);
  } finally {
    if (oldFlag === undefined) delete process.env.SCAM_AI_ENABLED; else process.env.SCAM_AI_ENABLED = oldFlag;
    if (oldKey === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = oldKey;
  }
});

test('hanya data yang dibatasi dikirim ke Claude saat beta diaktifkan', async () => {
  const oldFetch = globalThis.fetch;
  const oldFlag = process.env.SCAM_AI_ENABLED;
  const oldKey = process.env.ANTHROPIC_API_KEY;
  process.env.SCAM_AI_ENABLED = 'true';
  process.env.ANTHROPIC_API_KEY = 'test-key';
  let payload;
  globalThis.fetch = async (_url, options) => {
    payload = JSON.parse(options.body);
    return Response.json({ content: [{ type: 'text', text: 'Dua sumber belum tersedia; jangan anggap hasil ini aman.' }] });
  };
  try {
    const request = new Request('https://cryptosynth.id/api/explain-risk', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://cryptosynth.id' },
      body: JSON.stringify(evidence),
    });
    const response = await POST({ request });
    assert.equal(response.status, 200);
    assert.match((await response.json()).explanation, /belum tersedia/);
    assert.equal(payload.max_tokens, 220);
    assert.equal(payload.model, 'claude-haiku-5-5');
  } finally {
    globalThis.fetch = oldFetch;
    if (oldFlag === undefined) delete process.env.SCAM_AI_ENABLED; else process.env.SCAM_AI_ENABLED = oldFlag;
    if (oldKey === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = oldKey;
  }
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyScamCheck } from '../src/utils/scamVerdict.ts';

const base = {
  blacklisted: false,
  blacklistLoaded: true,
  blacklistFresh: true,
  homographRisk: false,
  goPlusRisky: false,
  goPlusChecked: false,
  isAddress: false,
  threatChecks: [{ source: 'VirusTotal', risk: 'low' }],
};

test('hasil kosong dengan sebagian sumber tidak tersedia tetap tidak lengkap', () => {
  const result = classifyScamCheck({ ...base, threatChecks: [
    { source: 'VirusTotal', risk: 'low' },
    { source: 'Google Safe Browsing', skipped: true },
  ] });
  assert.equal(result.status, 'incomplete');
  assert.deepEqual(result.unavailableSources, ['Google Safe Browsing']);
});

test('temuan daftar blokir mengalahkan sumber yang tidak tersedia', () => {
  assert.equal(classifyScamCheck({ ...base, blacklisted: true, blacklistFresh: false }).status, 'risky');
});

test('tanpa temuan hanya jika semua sumber yang relevan berhasil', () => {
  assert.equal(classifyScamCheck(base).status, 'not_found');
});

test('alamat tanpa respons GoPlus tidak dinyatakan bersih', () => {
  assert.equal(classifyScamCheck({ ...base, isAddress: true }).status, 'incomplete');
});

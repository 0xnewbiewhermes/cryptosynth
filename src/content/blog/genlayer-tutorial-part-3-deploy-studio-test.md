---
title: "From Zero to GenLayer (Part 3): Deploy & Test Contract di GenLayer Studio"
description: "Panduan deploy Intelligent Contract ke GenLayer Studio. Pelajari cara upload, compile, deploy, dan test contract menggunakan Run & Debug console."
excerpt: "Langkah demi langkah deploy Intelligent Contract ke GenLayer Studio — dari buka studio, fund account, upload contract, hingga test via Run & Debug."
pubDate: 2026-05-25T14:00:00+07:00
category: "Tutorial"
tags: ["genlayer", "tutorial", "deploy", "studio", "testing", "genvm"]
author: "CryptoSynth Research"
faq: "Apa itu GenLayer Studio?;;Studio adalah IDE online gratis untuk menulis, deploy, dan test Intelligent Contract GenLayer. Tidak perlu setup lokal — langsung browser. Ada built-in faucet dan explorer.;;Bagaimana cara deploy contract di GenLayer Studio?;;Buka studio.genlayer.com, buat account baru (otomatis), fund dengan built-in faucet (💧), upload file .py contract, buka Run & Debug sidebar, isi constructor params, klik Deploy.;;Apa perbedaan execution mode Normal vs Leader Only?;;Normal (Full Consensus) menjalankan seluruh proses validasi — Leader mengeksekusi, validator lain memverifikasi. Leader Only lebih cepat tapi tanpa validasi — cocok untuk testing cepat sebelum full deployment."
---

> **TL;DR:** GenLayer Studio adalah IDE online gratis untuk menulis, deploy, dan test Intelligent Contract. Butuh 3 langkah: buat account → fund dengan faucet → deploy via Run & Debug. Studio punya temporary state — cocok untuk prototyping.

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Studio menggunakan Studionet (Chain ID 61999) dengan state temporary. Contract dan data bisa hilang. Untuk produksi, deploy ke Bradbury Testnet (Part 5).
</div>

## Persiapan

1. Buka [studio.genlayer.com/contracts](https://studio.genlayer.com/contracts)
2. Wallet otomatis tergenerate (address random)
3. Backup private key jika ingin menyimpan account

## Langkah 1: Fund Account

Sebelum deploy, butuh GEN token. Studio punya **built-in faucet**:

1. Click button wallet di pojok kanan atas (tunjukkin address + balance)
2. Di panel yang muncul, click **Fund** (default 10 GEN)
3. Balance akan berubah jadi 10 GEN ✅

![Fund Account di Studio](/genlayer-fund-account.png)

## Langkah 2: Upload Contract

Ada 2 cara:

### Cara A: Upload File
1. Klik tombol **upload** (icon panah ke atas) di sidebar kiri
2. Pilih file `DisputeResolution.py` dari Part 2
3. Contract muncul di daftar "Your Contracts"

### Cara B: Copy Paste
1. Klik tombol **+** atau "New Contract"
2. Paste kode dari Part 2
3. Beri nama file (misal `DisputeResolution.py`)

## Langkah 3: Buka Run & Debug

Di sidebar navigasi kiri, ada icon:
- 📄 **Contracts** — editor kode
- ❔ **Run and Debug** — console untuk deploy & interaksi

Click icon Run & Debug (yang ke-2 dari atas).

## Langkah 4: Deploy Contract

Di panel Run & Debug:

1. **Execution Mode**: pilih "Normal (Full Consensus)" — biar dapet体验 validasi beneran
2. **Contract**: pilih `DisputeResolution.py`
3. Status: "Not deployed yet."
4. **Constructor Inputs**: contract kita `__init__()` tanpa parameter, jadi kosong
5. Click **Deploy DisputeResolution.py**

### Proses Validasi

Setelah klik Deploy, kamu bisa lihat log proses di panel kanan:

```
Pending → Proposing → Committing → Revealing → Accepted
```

Ini adalah siklus hidup transaksi yang dijelaskan di Part 1. Semua validator AI menjalankan contract, membandingkan hasil, dan mencapai konsensus. Jika statusnya **ACCEPTED**, contract berhasil di-deploy! 🎉

### Cek di Explorer

Setelah deploy, kamu bisa lihat transaksi di explorer:
- Studio: [explorer-studio.genlayer.com](https://explorer-studio.genlayer.com)
- Cari address contract yang muncul di log

## Langkah 5: Interaksi dengan Contract

Setelah deployed, kita bisa test method-methodnya.

### Test via Run & Debug

Di panel yang sama, setelah deploy akan muncul section **Transactions**:

1. Pilih method `create_dispute`
2. Isi parameter:
   - `description`: "Saya beli laptop bekas, tidak sesuai deskripsi"
   - `counterparty`: address lawan (bisa pakai address test lain)
   - `evidence_url`: "https://tokopedia.com/product/..."
   - **Value/Deposit**: masukkan jumlah deposit (misal 1 GEN)
3. Click **Execute**

### Cek Method View

Untuk membaca data tanpa biaya:
1. Pilih method `get_dispute`
2. Isi `dispute_id`: "1" (hasil dari create_dispute)
3. Click **Execute**
4. Lihat hasil return — detail sengketa muncul

### Simulasi Resolve

1. Pilih method `resolve`
2. Isi `dispute_id`: "1"
3. Click **Execute**
4. LLM akan mengakses URL bukti, menganalisis, dan memutuskan pemenang

## Tips Testing

### 1. Gunakan Leader Only Mode untuk Testing Cepat

Execution Mode → "Leader Only (Fast, No Validation)"
- Lebih cepat karena tanpa full consensus
- Cocok untuk testing awal sebelum deploy ke produksi

### 2. Baca Log

Panel log di bagian bawah menampilkan:
- **GenVM** — eksekusi virtual machine
- **RPC** — request/response RPC
- **Contract** — log dari contract (print statements)
- **Error** — error detail jika ada yang gagal

### 3. Multiple Accounts di Studio

Studio bisa generate multiple account:
1. Click wallet button
2. **New account** → generate address baru
3. Fund masing-masing dengan faucet
4. Gunakan address berbeda untuk simulasi creator vs counterparty

## Troubleshooting

| Error | Penyebab | Solusi |
|---|---|---|
| `invalid_contract` | Kode error / header salah | Cek header `# { "Depends": ... }` |
| `out of gas` | Komputasi terlalu berat | Sederhanakan logic contract |
| `Not deployed yet` | Belum deploy | Klik Deploy dulu |
| `execution failed` | Runtime error | Cek panel log untuk detail |
| `0 GEN` | Belum fund | Klik Fund di wallet panel |

---

**Lanjut ke Part 4 →** Membangun frontend dengan genlayer-js.

<div class="tldr-box">
<strong>Ringkasan:</strong> Deploy Intelligent Contract di GenLayer Studio sangat mudah — upload file .py, fund via faucet, deploy via Run & Debug. Status transaksi melewati siklus Optimistic Democracy. Gunakan Leader Only mode untuk testing cepat, Normal mode untuk full consensus validation.
</div>

---
title: "From Zero to GenLayer (Part 5): Deploy ke Bradbury Testnet & Go Live"
description: "Langkah final — deploy Intelligent Contract ke GenLayer Bradbury Testnet. Setup wallet, claim faucet, deploy via CLI/Studio, dan verifikasi di explorer."
excerpt: "Panduan deploy Intelligent Contract ke Bradbury Testnet — testnet production-like GenLayer dengan real AI models. Termasuk setup MetaMask, claim faucet, deploy, verifikasi, dan go live."
pubDate: 2026-05-25T16:00:00+07:00
category: "Tutorial"
tags: ["genlayer", "tutorial", "bradbury", "testnet", "deploy", "metamask", "faucet"]
author: "CryptoSynth Research"
faq: "Apa itu Bradbury Testnet?;;Bradbury adalah testnet production-like GenLayer dengan real AI/LLM workloads. Chain ID 4221, RPC https://rpc-bradbury.genlayer.com, GEN sebagai currency. Cocok untuk staging sebelum mainnet.;;Bagaimana cara dapat testnet GEN?;;Gunakan faucet di https://testnet-faucet.genlayer.foundation — login dengan GitHub, masukkan address wallet, request GEN. Untuk Studionet, faucet built-in ada di wallet panel (💧 button).;;Apa perbedaan Studio vs Bradbury?;;Studio (Chain ID 61999) — hosted dev environment, state temporary, gratis tanpa setup. Bradbury (Chain ID 4221) — production-like testnet, state persistent, real AI models, perlu MetaMask dan faucet."
---

> **TL;DR:** Bradbury Testnet adalah environment production-like dengan real AI models, state persistent, dan Chain ID 4221. Butuh MetaMask, faucet GEN, dan deploy via Studio atau CLI. Setelah deploy, verifikasi di explorer dan frontend siap production.

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Bradbury adalah testnet. GEN tidak memiliki nilai moneter. Gunakan untuk testing sebelum mainnet launch.
</div>

## Ringkasan Perjalanan

| Part | Apa yang Dilakukan | Status |
|---|---|---|
| **1** | Konsep GenLayer & Optimistic Democracy | ✅ Paham |
| **2** | Tulis Intelligent Contract Dispute Resolution | ✅ Siap |
| **3** | Deploy & Test di Studio | ✅ Berhasil |
| **4** | Frontend dengan genlayer-js | ✅ Siap |
| **5** | **Deploy ke Bradbury Testnet** | ⬅️ **Sekarang** |

## Arsitektur Final

```
[User] → MetaMask → Bradbury Testnet (Chain ID 4221)
                        ↓
              Intelligent Contract
              (DisputeResolution.py)
                        ↓
              Validator AI Network
              (Optimistic Democracy)
                        ↓
              LLM + Web Data Access
              (Equivalence Principle)
                        ↓
                   Hasil Final
```

## 1. Setup MetaMask untuk Bradbury

### Tambah Network Baru

Buka MetaMask → Settings → Networks → Add Network:

| Field | Value |
|---|---|
| **Network Name** | GenLayer Bradbury |
| **RPC URL** | `https://rpc-bradbury.genlayer.com` |
| **Chain ID** | `4221` |
| **Currency Symbol** | `GEN` |
| **Block Explorer** | `https://explorer-bradbury.genlayer.com` |

Atau untuk GenLayer Chain (L2 — zkSync Elastic Chain):

| Field | Value |
|---|---|
| **Network Name** | GenLayer Chain |
| **RPC URL** | `https://rpc.testnet-chain.genlayer.com` |
| **Chain ID** | `4221` |
| **Currency Symbol** | `GEN` |
| **Explorer** | `https://explorer.testnet-chain.genlayer.com` |

### Cara Cepat: Add to Wallet

Buka halaman [Networks & RPCs](https://docs.genlayer.com/developers/networks) di docs GenLayer, klik tombol **+ Add to Wallet**. MetaMask akan otomatis menambahkan network.

## 2. Claim Testnet GEN

### Via Faucet Website

1. Buka [testnet-faucet.genlayer.foundation](https://testnet-faucet.genlayer.foundation)
2. **Sign in with GitHub** (perlu akun GitHub)
3. Masukkan address wallet Bradbury kamu
4. Klik **Request Tokens**
5. Cek balance di MetaMask — GEN akan masuk dalam beberapa detik

### Via Portal Builder

1. Buka [portal.genlayer.foundation](https://portal.genlayer.foundation)
2. Connect wallet (pastikan network Bradbury)
3. Buka dashboard Builder
4. Klik **Top-up with Testnet GEN**

## 3. Deploy Contract ke Bradbury

### Opsi A: Via GenLayer Studio (Pilih Network)

1. Buka [studio.genlayer.com](https://studio.genlayer.com)
2. Click **Connect Wallet** → pilih MetaMask → switch ke Bradbury
3. Fund via faucet (jika balance 0)
4. Buka Run & Debug
5. Ubah **Network** ke Bradbury (atau atur di env)
6. Upload/select `DisputeResolution.py`
7. Klik **Deploy**

### Opsi B: Via CLI (Advanced)

Install genlayer CLI:

```bash
pip install genlayer-py
```

Deploy:

```bash
genlayer deploy DisputeResolution.py \
  --network bradbury \
  --rpc https://rpc-bradbury.genlayer.com \
  --chain-id 4221 \
  --sender 0x[WALLET_ADDRESS]
```

### Opsi C: Via Portal Builder

1. Buka portal.genlayer.foundation
2. Klik **Submit a contribution**
3. Upload file contract + deskripsi
4. Ini juga mendaftarkan kontribusi ke builder program

## 4. Verifikasi di Explorer

Setelah deploy, verifikasi:

1. Buka [explorer-bradbury.genlayer.com](https://explorer-bradbury.genlayer.com)
2. Cari address contract yang muncul di log deploy
3. Cek:
   - **Transaction status** → Accepted ✅
   - **Contract code** → muncul di tab Contract
   - **Events** → jika contract emit events

Atau cek chain explorer:
[explorer.testnet-chain.genlayer.com](https://explorer.testnet-chain.genlayer.com)

## 5. Hubungkan Frontend ke Bradbury

Update `.env.local` di frontend:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x[CONTRACT_ADDRESS_BARU]
NEXT_PUBLIC_GENLAYER_RPC_URL=https://rpc-bradbury.genlayer.com
NEXT_PUBLIC_GENLAYER_CHAIN_ID=4221
NEXT_PUBLIC_GENLAYER_CHAIN_NAME=GenLayer Bradbury
NEXT_PUBLIC_GENLAYER_SYMBOL=GEN
```

Update chain config di `client.ts`:

```typescript
import { bradbury } from "genlayer-js/chains";

export function createGenLayerClient(address?: string) {
  return createClient({
    chain: bradbury,  // ganti dari studionet ke bradbury
    account: address,
  });
}
```

Deploy frontend ke Vercel:

```bash
npm run build
vercel --prod
```

## 6. Builder Journey — Checklist Final

Untuk menyelesaikan builder journey di portal GenLayer:

| Step | Status | Cara |
|---|---|---|
| Connect Wallet | ✅ | MetaMask → Bradbury |
| Earn Points | ✅ | Via kontribusi |
| Connect GitHub | ✅ | Di portal |
| ⭐ Star Repo | ⬜ | Star [genlayerlabs/genlayer-project-boilerplate](https://github.com/genlayerlabs/genlayer-project-boilerplate) |
| Add Testnet Chain | ✅ | Bradbury (Chain ID 4221) |
| Top-up GEN | ✅ | Dari faucet |
| Add Studio Network | ✅ | Studionet (Chain ID 61999) |
| Deploy Contract | ✅ | DisputeResolution.py ke Bradbury |

## 7. Submit Tutorial ke Portal

Sebagai langkah terakhir, submit tutorial ini sebagai contribution:

1. Buka [portal.genlayer.foundation](https://portal.genlayer.foundation)
2. Connect wallet
3. Klik **Submit a contribution**
4. Pilih kategori **Educational Content**
5. Upload link ke artikel (blog cryptosynth.id)
6. Tambah deskripsi:
   > "Multi-part tutorial: From Zero to GenLayer — membangun Dispute Resolution dApp. Mencakup Optimistic Democracy, Equivalence Principle, Python Intelligent Contract, Studio deployment, frontend genlayer-js, dan Bradbury testnet."
7. Submit 🚀

## Yang Sudah Kita Capai

Selama 5 part tutorial ini, kamu sudah:

✅ Memahami **Optimistic Democracy** dan **Equivalence Principle**
✅ Menulis **Intelligent Contract** Python dengan akses web & AI
✅ Deploy dan test di **GenLayer Studio**
✅ Membangun **frontend React** dengan genlayer-js
✅ Deploy ke **Bradbury Testnet** production-like
✅ Membangun **Dispute Resolution dApp** — kasus penggunaan nyata

GenLayer membuka era baru blockchain — **Trustless Adjudication**. Dengan Intelligent Contract yang bisa mengerti bahasa, mengakses web, dan menggunakan AI, kita bisa membangun aplikasi yang sebelumnya mustahil di blockchain tradisional.

Selamat, kamu sekarang sudah siap menjadi **GenLayer Builder**! 🚀

---

<div class="tldr-box">
<strong>Ringkasan Final:</strong> Bradbury Testnet (Chain ID 4221) adalah environment production-like untuk Intelligent Contract GenLayer. Setup MetaMask, claim GEN dari faucet, deploy contract, hubungkan frontend. Submit tutorial ke portal untuk builder points. GenLayer adalah masa depan trustless adjudication — dan kamu sudah menjadi bagian dari ecosystem ini.
</div>

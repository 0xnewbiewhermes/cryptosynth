---
title: "Monetrix Genesis: Farming Yield-Bearing Stablecoin di HyperEVM"
slug: monetrix-genesis-farming-yield-stablecoin-hyperevm
category: "Airdrop"
description: "Monetrix protokol stablecoin yield-bearing di HyperEVM. USDM mint 1:1 dari USDC, sUSDM auto-compounding. Genesis Signal campaign sedang jalan. Tim Hybra, audited Code4rena."
excerpt: "Monetrix hadir di HyperEVM dengan USDM dan sUSDM: stablecoin yang yield-nya datang dari delta-neutral strategy di Hyperliquid orderbook. Genesis campaign sedang jalan, tapi ada beberapa hal yang perlu kamu catat sebelum ikut."
pubDate: 2026-05-31T16:26:47Z
author: "Gideon"
tags:
  - monetrix
  - airdrop
  - hyperevm
  - hyperliquid
  - stablecoin
  - yield-farming
  - genesis
heroImage: "/images/hero/monetrix-genesis-farming-yield-stablecoin-hyperevm.png"
ogImage: "/images/og/monetrix-genesis-farming-yield-stablecoin-hyperevm.png"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Monetrix protokol stablecoin yield-bearing di HyperEVM. Kamu mint USDM 1:1 dari USDC, stake jadi sUSDM yang auto-compounding. Yield datang dari 4 sumber on-chain di Hyperliquid: funding rate, spot lending, maker rebates, sama HLP vault. Tim Hybra (DEX yang udah jalan di HyperEVM). Code4rena audit selesai: 0 high, 1 medium. Genesis Signal campaign lagi jalan dengan sistem GEMs. Tapi: funding belum di-disclose, Twitter following kecil, dan bug audit yang ditemuin 36 orang soal accounting settlement. DYOR.
</div>

<div class="disclaimer-box">
<strong>⚠️ Disclaimer:</strong> Semua yang ditulis di sini adalah <strong>catatan pribadi</strong>, bukan saran keuangan atau ajakan investasi. Saya bukan financial advisor. Risiko rugi ada di setiap keputusan crypto. Selalu DYOR (*do your own research*) sebelum ambil keputusan.
</div>

Barusan saya iseng scroll airdrops.io, nemu project yang namanya Monetrix. Awalnya saya kira ini stablecoin biasa, tapi pas dibaca lebih dalam: pendekatannya beda. Yield-nya bukan dari lending konvensional atau emission token, tapi dari delta-neutral trading strategy di Hyperliquid. Menarik? Iya. Aman? Nah, itu yang mau saya bahas.

## Monetrix di HyperEVM: Konsepnya

Monetrix ([monetrix.xyz](https://monetrix.xyz)) bangun di HyperEVM, yaitu layer EVM yang jadi bagian dari Hyperliquid. Beda dengan L2 pada umumnya: HyperEVM langsung terhubung ke HyperCore (tempat spot dan perps orderbook Hyperliquid) lewat shared consensus. Jadi smart contract di HyperEVM bisa baca harga dan posisi dari orderbook tanpa bridge.

Monetrix manfaatin arsitektur ini buat jalanin strategi delta-neutral langsung di atas Hyperliquid. Intinya: long spot + short perps di harga yang sama. Posisi netral, tapi tetep ngumpulin yield dari funding rate yang dibayar long trader ke short trader.

## Dua Token: USDM dan sUSDM

Protokolnya punya 2 token:

- **USDM**: Dollar-pegged stable token. Mint 1:1 dari USDC. 6 decimals. Pegging sendiri gak ngasilin yield.
- **sUSDM**: Receipt dari staking USDM. 12 decimals. Exchange rate ke USDM naik terus seiring waktu. Kamu gak perlu claim atau compound: yield-nya otomatis masuk.

Alurnya: USDC → mint USDM → stake jadi sUSDM → yield tumbuh. Kalau mau cabut: unstake (3 hari cooldown) → redeem USDM ke USDC (3 hari cooldown lagi). Total 6 hari dari sUSDM sampai USDC balik ke wallet.

## 4 Sumber Yield

Yang bikin Monetrix beda dari stablecoin yield lain: yield-nya bukan dari satu sumber. Ada 4 aliran yang saling ngisi tergantung kondisi market:

**1. Funding Yield**: Ini sumber utama. Kamu short perps, long trader bayar funding fee ke kamu. Di Hyperliquid, BTC dan ETH funding rates rata-rata 1-4% lebih tinggi dari CEX. Bull market: ini yang terbesar.

**2. BLP Yield (Spot Lending)**: Spot collateral yang dipake buat hedge juga ngasilin lending interest lewat native lending-nya Hyperliquid. Jadi duit yang sama bisa dua kerjaan sekaligus.

**3. Maker Rebates**: Hedging engine-nya jadi market maker di orderbook Hyperliquid, bukan taker. Artinya dia malah dapet fee rebate waktu rebalancing, bukan bayar taker fee.

**4. Dynamic HLP**: Kalau funding rate compress (bear market), capital dialokasiin ke HLP vault (Hyperliquidity Provider). Ini jadi semacam cushion: waktu funding kurang bagus, yield tetep jalan dari HLP.

Jadi modelnya "all-weather": bull market dapet dari funding, bear market dapet dari HLP + maker rebates. Setidaknya itu klaimnya.

## Ethena Versi Hyperliquid?

Kalau kamu familiar sama Ethena (USDe), konsep Monetrix mirip. Bedanya:

- Ethena jalanin delta-neutral di CEX (Binance, Bybit). Ada counterparty risk ke exchange.
- Monetrix klaim 100% on-chain di Hyperliquid. Gak ada CEX custody.

Mereka bahkan secara spesifik nyebut insiden Oktober 2025 di mana oracle error di Binance bikin USDe depeg sampai $0.65. Monetrix positioning diri sebagai alternatif yang gak punya masalah itu karena semua posisi verifiable on-chain.

## Tim dan Audit

Monetrix dibangun sama tim **Hybra**. Hybra sendiri adalah DEX/AMM di HyperEVM yang udah jalan: mereka udah distribute 50M veHYBR (sekitar 5% supply) dan $617.8K real yield ke komunitas. Jadi ini bukan tim anonim yang tiba-tiba muncul.

Tim inti:
- **leo** (@leo_build_hl): Founder. Ex co-founder unicorn startup.
- **syc** (@Sychype): Head of Growth. Ex campaign lead di VC.
- **kane**: CTO. Ex senior engineer di perusahaan besar (kemungkinan FAANG).

Audit dari **Code4rena** udah selesai (24 April - 4 Mei 2026). Hasilnya:
- 20 Solidity contracts, 1,726 lines of code
- **0 high severity findings**
- **1 medium severity**: "PM borrow liabilities are omitted from backing, allowing phantom surplus settlement." Bug ini ditemuin oleh 36 wardens (banyak yang nemuin hal yang sama). Artinya: fungsi `_readL1Backing()` ngitung PM-supplied balance tanpa subtract PM borrow liabilities. Kalau PM debt bikin akun net negatif, yield distribution bisa salah hitung.
- Budget audit: $22K USDC

Report lengkapnya ada di [code4rena.com/reports/2026-04-monetrix](https://code4rena.com/reports/2026-04-monetrix). Source code juga terbuka di [GitHub](https://github.com/MonetrixLab/monetrix-contracts).

## Genesis Signal Campaign

Genesis campaign Monetrix lagi jalan. Dari yang saya tangkap (sebagian besar dari [airdrops.io](https://airdrops.io/monetrix/)):

- **Pioneer SBT**: Kamu bisa claim setelah ngerjain 6 social tasks (gasless). Dapet juga 5 invite codes.
- **Genesis Deposit**: USDC → mint USDM → stake ke sUSDM. Tiap deposit ngumpulin GEMs.
- **Distribusi GEMs**: 330.000 GEMs per hari, total cap 10 juta GEMs.

Perlu dicatat: detail campaign ini saya gak bisa verifikasi langsung dari docs resmi Monetrix (halaman genesis-nya JavaScript-rendered, gak bisa di-scrape). Sumber utama: airdrops.io dan komunitas.

## Hal yang Perlu Kamu Catat

Jujur aja, ada beberapa red flag yang saya perhatikan:

**Funding tidak di-disclose.** Tim gak ngumumin investor atau fundraising. Buat protokol yang minta user deposit USDC, ini kurang ideal. Hybra tim-nya legitimate, tapi Monetrix sendiri belum punya backing publik.

**Twitter kecil.** [@monetrix_xyz](https://x.com/monetrix_xyz) cuma 1.728 followers per hari ini. Akun lahir Februari 2026. Untuk protokol DeFi yang lagi Genesis, following-nya kecil.

**Bug audit M-01.** Medium severity, tapi 36 orang nemuin hal yang sama. Bug ini soal core settlement logic: kalau PM borrow liabilities bikin akun net negatif, yield distribution bisa phantom. Tim bilang udah di-fix atau di-mitigate sebelum mainnet, tapi report final belum dipublish.

**Audit budget kecil.** $22K buat audit 20 contracts: bukan angka yang besar. Tier-1 firm review dijanjiin sebelum mainnet, tapi belum ada update.

**Cooldown 6 hari.** Dari sUSDM sampai USDC balik ke wallet: 3 hari unstake + 3 hari redeem. Di dunia DeFi yang bisa hack kapan aja, 6 hari itu waktu yang lama.

## Sisi Positifnya

Gak semuanya negatif kok:

- Tim Hybra punya track record nyata. Mereka udah distribute yield ke komunitas, bukan cuma janji.
- Code4rena audit selesai tanpa high severity. Open-source contracts.
- Semua posisi on-chain, gak ada CEX custody. Verifiable.
- Model 4 sumber yield bikin lebih resilient dibanding single-source yield.
- HyperEVM native: gak ada bridge risk.

## Cara Ikut Genesis

Kalau kamu tertarik coba:

1. Buka [monetrix.xyz](https://monetrix.xyz)
2. Hubungkan wallet ke HyperEVM
3. Selesaikan 6 social tasks buat dapet Pioneer SBT
4. Deposit USDC → mint USDM → stake ke sUSDM
5. Kumpulin GEMs dari deposit kamu

Saya sendiri belum deposit dalam jumlah besar. Masih tahap coba-coba kecil buat liat apakah flow-nya lancar: mint, stake, dan nanti coba redeem. Kalau semuanya smooth, baru pertimbangin lebih serius.

## Penutup

Monetrix menarik karena pendekatan delta-neutral on-chain-nya: bukan copy-paste Ethena, tapi versi yang klaim lebih transparan karena gak lewat CEX. Tim Hybra punya track record, audit C4-nya beres, dan model 4 sumber yield-nya masuk akal secara teori.

Tapi: funding belum di-disclose, audit medium severity soal accounting, dan 6 hari cooldown itu tetep faktor yang perlu dipertimbangin. Genesis campaign baru jalan, jadi ini masih tahap awal. Kalau mau coba, deposit kecil dulu. Pastikan kamu paham risikonya sebelum masuk lebih dalam.

Saya rencana update kalau ada perkembangan: terutama soal apakah redeem flow-nya lancar dan apakah ada update soal funding atau audit tier-1 yang dijanjiin.

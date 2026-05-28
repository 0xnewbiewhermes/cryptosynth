---
title: "Variational Deep-Dive: Tim Quant Ex-Jane Street, $50M Dragonfly, dan Strategi Farming yang Sebenarnya"
slug: variational-deepdive-rwa-perp-dex-airdrop-2026
category: "Airdrop"
description: "Beda dari artikel pertama yang bahas tiga project sekaligus. Ini breakdown lengkap Variational: siapa timnya, gimana model bisnisnya, dan strategi farming yang optimal berdasarkan data on-chain."
pubDate: 2026-05-28T09:30:00+07:00
author: "Gideon"
tags:
  - variational
  - airdrop
  - rwa
  - perp-dex
  - farming
  - arbitrum
  - dragonfly
heroImage: "/images/hero/variational-deepdive-rwa-perp-dex-airdrop-2026.jpg"
ogImage: "/images/og/variational-deepdive-rwa-perp-dex-airdrop-2026.jpg"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Variational bukan perp DEX biasa. Timnya ex-quant hedge fund yang diakuisisi, baru raise $50M dari Dragonfly + Bain Capital Crypto + Coinbase Ventures. OI udah tembus $1B, daily volume $800M-$1B+. Phase 2 (100+ pasar saham & komoditas TradFi) target Juni 2026. Points farming-nya reward hold time dan RWA activity, bukan spam volume. TGE speculation: Q4 2026.
</div>

<div class="disclaimer-box">
<strong>⚠️ Disclaimer:</strong> Semua yang ditulis di sini adalah <strong>catatan pribadi</strong>, bukan saran keuangan atau ajakan investasi. Saya bukan financial advisor. Risiko rugi ada di setiap keputusan crypto. Selalu DYOR (*do your own research*) sebelum ambil keputusan.
</div>

Minggu lalu saya nulis [soal tiga kandidat airdrop terkuat Mei 2026](/blog/variational-polymarket-base-tiga-kandidat-airdrop-terkuat-mei-2026), dan Variational masuk di posisi pertama. Tapi waktu itu saya cuma bisa ngebahas surface-level karena formatnya "tiga project sekaligus."

Kali ini saya mau ngulik Variational lebih dalam. Kenapa? Karena setelah saya gali lagi, project ini ternyata lebih menarik dari yang saya kira.

## Siapa di Balik Variational?

Ini yang jarang dibahas kebanyakan orang. Kebanyakan cuma fokus ke points dan TGE, tapi gak ngeh siapa yang bikin protokolnya.

Co-foundernya dua orang: Lucas Schuermann (CEO, @variational_lvs) dan Edward Yu (@mr_plumpkin). Mereka ketemu waktu kuliah engineering di Columbia University. Tahun 2017 mereka bikin quant hedge fund bareng. Dua tahun kemudian, fund-nya diakuisisi.

Setelah itu, mereka berdua kerja di crypto OTC desk besar: Lucas jadi VP of Engineering, Edward jadi VP of Quant Trading. Bukan posisi sembarangan. OTC desk yang handle transaksi ratusan juta dollar buat institusi.

Timnya sekarang ~23 orang. [Background-nya dari Google, Meta, Virtu, IMC, Jane Street](https://x.com/0x8483/status/2058965720440975548). Ini bukan tim yang baru lulus bootcamp dan bikin DEX. Ini orang-orang yang udah ngebangun sistem trading institusional sebelumnya.

Kenapa ini penting? Karena RWA perps itu masalah teknisnya beda dari crypto perps. Kamu perlu integrasi langsung ke TradFi liquidity providers, deal dengan settlement T+1, dan handle aset yang gak ada ordernya 24/7. Tim yang gak punya background TradFi bakal struggle.

## Model Bisnis: RFQ, Bukan CLOB

Kebanyakan perp DEX pake CLOB (Central Limit Order Book) model: market maker naruh order di buku, trader ngambil dari buku itu. Variational beda. Mereka pake RFQ (Request for Quote).

Gimana cara kerjanya? Waktu kamu mau trade, protokol ngirim request ke multiple liquidity sources: CEX, DEX, dan (mulai Phase 2) TradFi dealers. Mereka ngasih quote, protokol pilih yang terbaik, execute.

Efeknya: spread lebih ketat, slippage lebih rendah, dan yang paling penting: kamu bisa dapet liquidity untuk aset yang gak ada ordernya di DEX manapun. Itulah kenapa mereka bisa nge-list SpaceX perps atau Copper perps sementara DEX lain gak bisa.

Zero fees juga bukan gimmick. Revenue mereka dari spread: selisih antara harga beli dan jual yang dikasih liquidity provider. Makin banyak volume, makin banyak spread yang mereka kumpulin. Model ini sustainable karena gak tergantung token emissions.

## Metrik Terkini: Angkanya Naik Cepat

Waktu saya nulis artikel pertama (26 Mei), OI Variational di ~$740 juta. [Sekarang udah tembus $1 miliar](https://x.com/variational_io/status/2058915671506051180). Itu naik $260 juta dalam dua hari.

Beberapa angka lain yang perlu kamu tahu:

- **Cumulative volume:** ~$219 miliar
- **Daily volume:** $800 juta - $1 miliar+
- **TVL:** ~$103 juta (naik ~25% week-over-week)
- **Daily active users:** ~8.400, weekly: ~15.000
- **Markets listed:** 456+
- **RWA share:** 6%+ OI, 10%+ volume (baru beberapa hari setelah Phase 1 launch)

Yang bikin angka-angka ini impressive: Variational belum punya token. Semua growth ini organic, driven by points farming dan genuine trading interest. Bukan liquidity mining yang inflated pake token emissions.

[Protokolnya juga udah profit positive setelah dipotong rewards](https://x.com/variational_io/status/2055324287922507828). Treasury mereka dalam USDC, dan OLP (Omni Liquidity Provider) PnL lifetime-nya positif. Jarang banget DEX yang bisa klaim ini sebelum TGE.

## Phase 2: 100+ Pasar TradFi

Ini catalyst terdekat dan yang paling ditunggu. [Phase 2 target launch Juni 2026](https://x.com/variational_io/status/2058578875207282958).

Apa yang bakal masuk?

**Saham individual:** NVIDIA, Coinbase, Alibaba, MicroStrategy, Intel, Rivian. Basically saham-saham yang volume trading-nya gede dan populer di kalangan crypto crowd.

**Indeks internasional:** Singapore 30, China A50, dan beberapa indeks Asia lainnya. Ini menarik karena kebanyakan trader crypto Indonesia gak punya akses mudah ke pasar ini.

**Komoditas tambahan:** Wheat, Soybeans, Natural Gas. Nambahin dari Phase 1 yang udah ada Gold, Silver, Copper, Oil, Platinum, Palladium.

**Kondisi trading:** Traditional market hours di awal, tapi dengan rencana expand ke 24/7 di Phase 3. Funding rate ~4-6% flat lewat dealer partnerships yang udah secured. Execution bisa sampe jutaan dollar dengan slippage minimal.

Yang bikin Phase 2 beda dari Phase 1: Phase 1 cuma aggregat crypto-native RWA liquidity (masih dari sesama DEX). Phase 2 langsung plug ke TradFi dealers dan market makers institusional. Ini yang bikin liquidity-nya "CME-level depth on-chain" (istilah mereka, tapi gak berlebihan mengingat dealer partnerships-nya).

## Points Mechanics: Apa yang Sebenarnya Dihargai?

Ini bagian yang paling banyak disalahpahami. Saya liat banyak orang farming Variational dengan cara yang salah: buka-tutup posisi secepat mungkin, ngejar volume mentah. Ternyata itu bukan cara yang optimal.

Berdasarkan analisis komunitas dan leaderboard, ini yang sebenarnya dihargai:

**1. Open Interest hold time.** Ini yang paling penting. Hold posisi minimal 1 jam, idealnya 24-48 jam. Time-weighted OI jauh lebih berharga daripada raw volume. Kamu bisa trade $100K volume dalam sehari dengan buka-tutup terus, tapi hasilnya kalah sama orang yang hold $10K posisi selama 48 jam.

**2. RWA markets.** Pasar RWA (Gold, Silver, Oil, dll) dapat weight lebih tinggi di points distribution. Kompetisi juga lebih rendah karena kebanyakan farmer masih fokus di crypto pairs.

**3. Positive PnL.** Ini yang bikin pure delta-neutral strategy dengan modal kecil underperform. Sistem-nya nge-weight trader yang profitable. Kamu gak perlu profit gede, tapi konsisten positif lebih baik daripada breakeven atau loss.

**4. Funding fees earned.** Target: $30+ per minggu. Ini indikator bahwa kamu beneran provide liquidity, bukan cuma wash trading.

**5. Newly listed pairs.** Tiap minggu ada pair baru. Trading di pair baru di minggu pertama listing-nya dapat bonus weight.

**6. Referral boost.** 12-15% points boost. Gak gede, tapi compounding dalam jangka panjang lumayan.

## Strategi Farming yang Optimal

Berdasarkan data leaderboard dan community analysis, ini setup yang paling efisien:

**Cross-platform delta-neutral (Recommended)**

Konsepnya: buka posisi di Variational, hedge di platform lain (Extended, 01Exchange, atau Hyperliquid). Net exposure mendekati nol, tapi kamu tetap generate OI dan volume di Variational.

Contoh konkret:
- Variational: Long XAU (Gold) $5K, 10x leverage = $50K notional
- Extended: Short XAU $5K, 10x leverage = $50K notional
- Hold 48 jam
- Net exposure: ~0 (ada sedikit basis risk dari spread antar-platform)

Yang perlu kamu catat: [pure delta-neutral dengan modal kecil ($1-3K) sering underperform](https://x.com/tomes__s/status/2059244854706655714). Sistem-nya reward positive PnL, jadi kamu perlu ada sedikit variance. Setup TP/SL di 15-20% biar ada pergerakan PnL yang keliatan natural, tapi tetep proteksi capital.

**Capital recommendation:** $3K-$10K+ untuk hasil yang meaningful. Leverage 5-10x. Jangan over-leverage karena liquidation risk di delta-neutral setup itu musuh utama.

**RWA-focused farming**

Kalo kamu gak mau ribet cross-platform, fokus ke RWA markets di Variational aja. Gold, Silver, Oil: kompetisi lebih rendah dari BTC/ETH, dan weight-nya lebih tinggi di points distribution.

Strategi sederhana:
- Buka posisi di RWA pair yang baru di-list
- Hold 24-48 jam
- Rotasi tiap minggu ke pair baru
- Pake referral code buat 15% boost

**OLP Vault**

Buat yang gak mau aktif trading, ada opsi OLP vault. [APY-nya sekitar 80% saat ini](https://x.com/boredkideth/status/2057755633747673327), dengan historical figures yang pernah sampe 300%+. Ini liquidity provision yang yield-nya dari spread yang dikumpulin protokol.

Tapi OLP vault gak se-heavy weight-nya di points distribution dibanding active trading. Jadi kalo tujuan utama kamu farming points, trading tetap lebih efisien.

## Tokenomics: Belum Resmi, Tapi...

Belum ada pengumuman resmi soal token. Tapi dari berbagai sinyal:

- Community speculation: alokasi ~25-50% ke komunitas
- TGE: Q4 2026 atau lebih lambat
- Token ticker: $VAR atau gVAR (belum dikonfirmasi)
- Points OTC: $20-40 per point di pasar informal
- Comparable launches: Hyperliquid ($HYPE), Lighter, Avantis

Yang bikin saya agak yakin alokasi komunitas-nya bakal gede: Variational gak ngasih alokasi besar ke VC di early stage. Dari $50M raise, mayoritas buat infrastruktur dan pengembangan tim, bukan token allocation buat investor.

Tapi ini semua masih speculation. Yang pasti: mereka belum punya token, protokolnya udah profitable, dan growth-nya organic. Kombinasi yang langka di DeFi.

## Risiko yang Perlu Kamu Tahu

Jangan cuma liat upside-nya. Ini risiko yang harus dipertimbangkan:

**Basis risk di delta-neutral.** Spread antar-platform bisa melebar waktu volatility tinggi. Kalo hedge-nya gak perfect, kamu bisa loss di satu sisi sementara sisi lainnya gak ke-offset.

**Funding cost.** Hold posisi 48 jam dengan leverage 10x = funding cost yang gak kecil. Kalo points value ternyata lebih rendah dari expected, cost-nya gak ke-cover.

**Liquidation risk.** Leverage 10x di crypto = liquidation price yang deket. Satu candle gede bisa wipe out posisi kamu. Selalu pake stop loss.

**Token gak guaranteed.** Sampe sekarang belum ada konfirmasi resmi soal token. Semua "alokasi 50% ke komunitas" itu rumor komunitas, bukan whitepaper. Kalo mereka memutuskan gak bikin token, points-nya jadi worthless.

**Regulatory risk.** RWA trading di perp DEX itu grey area. Kalo regulator mulai ngeh, bisa ada masalah.

---

Variational menarik buat saya bukan cuma karena points-nya. Tapi karena approach-nya beda: pake RFQ model buat bridge TradFi liquidity on-chain, timnya beneran quant background, dan protokolnya udah generate revenue beneran sebelum ada token.

Phase 2 Juni bakal jadi test sesungguhnya. Kalo mereka berhasil nge-list 100+ pasar TradFi dengan liquidity yang cukup, ini bakal jadi salah satu DeFi milestone 2026. Kalo gagal, ya... setidaknya points-nya udah terkumpul.

Yang jelas, farming testnet udah mati. Yang reward sekarang: mainnet activity yang bernilai ekonomi.

**Sumber:**
- [Variational $50M Series A (Dragonfly lead)](https://x.com/variational_io/status/2057097346086047982)
- [Phase 1 RWA launch: Gold, Silver, Copper, Oil](https://x.com/variational_io/status/2057097358115291354)
- [Phase 2 RWA roadmap: 100+ TradFi markets](https://x.com/variational_io/status/2058578875207282958)
- [OI tembus $1B](https://x.com/variational_io/status/2058915671506051180)
- [Biweekly metrics update](https://x.com/variational_io/status/2055324287922507828)
- [Tim background & interview](https://x.com/i/status/2052029747295625359)
- [Tim ex-Google/Meta/Jane Street](https://x.com/0x8483/status/2058965720440975548)
- [Points farming strategy guide](https://x.com/Ryuzaki_SEI/status/2057382897569706336)
- [Delta-neutral analysis](https://x.com/tomes__s/status/2059244854706655714)
- [OLP vault APY data](https://x.com/boredkideth/status/2057755633747673327)
- [Points OTC pricing](https://x.com/loffyhl/status/2058904457300111408)

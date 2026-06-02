---
title: "Sui di 2026: Turun 85%, Tapi Teknologinya Justru Makin Gila"
slug: sui-2026-turun-85-teknologi-makin-gila
category: "Journal"
description: "Sui pernah $5, sekarang $0.82. Tapi kalau kamu cuma liat harga, kamu bakal ketinggalan cerita yang lebih besar."
pubDate: 2026-06-02T20:25:00Z
author: "Gideon"
tags:
  - personal
  - sui
  - layer-1
  - move
  - walrus
heroImage: "/images/hero/sui-2026-turun-85-teknologi-makin-gila.png"
ogImage: "/images/og/sui-2026-turun-85-teknologi-makin-gila.png"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Sui harganya anjlok 85% dari ATH ($5.35 ke $0.82), tapi teknologi di baliknya justru makin matang. Finality 400ms, object-centric model yang beda total dari blockchain lain, dan ekosistem yang pelan-pelan tumbuh (DeepBook, Walrus, SuiPlay0X1). Ini catatan kenapa Sui pantas dicermati, bukan diabaikan.
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Semua yang ditulis di sini adalah <strong>catatan pribadi</strong>, bukan saran keuangan atau ajakan investasi. Saya bukan financial advisor. Risiko rugi ada di setiap keputusan crypto. Selalu DYOR (<em>do your own research</em>) sebelum ambil keputusan.
</div>

## Bayangkan Kirim Crypto Secepat Kirim GoPay

Coba ingat terakhir kali kamu kirim GoPay ke teman. Klik, masukin nominal, konfirmasi, selesai. Detik itu juga uangnya udah sampai.

Sekarang coba kirim USDT di Ethereum. Tunggu konfirmasi 15 detik sampai beberapa menit. Gas fee bisa $2 sampai $20 tergantung jaringan ramai atau enggak. Kalau kamu kirim ke exchange, kadang mesti tunggu 12 konfirmasi lagi.

[Sui](https://sui.io) bikin pengalaman kirim crypto itu mendekati GoPay. Finality-nya sekitar 400 milidetik berkat upgrade [Mysticeti](https://blog.sui.io/mysticeti-consensus-upgrade/) yang mereka rilis. Bukan 400 milidetik "klaim di whitepaper", tapi benar-benar diukur di mainnet.

Kalau kamu pernah kesel nunggu transaksi masuk, Sui ini jawaban yang jarang dibahas orang.

## Sui Itu Apa, Sebenarnya?

[Mysten Labs](https://mystenlabs.com) bikin Sui. Tim ini sebelumnya kerja di proyek [Libra/Diem](https://en.wikipedia.org/wiki/Diem_(digital_currency)) milik Facebook. Mereka keluar, bikin perusahaan sendiri, dan bikin blockchain Layer 1 dari nol.

Yang bikin Sui beda dari kebanyakan blockchain: cara dia nyimpen data.

Kalau Ethereum itu kayak rekening bank. Semua saldo tercatat di satu akun. Mau kirim 1 USDT? Blockchain mesti cek seluruh state akun kamu dulu, baru proses transaksinya.

Sui pakai pendekatan [object-centric](https://docs.sui.io/concepts/object-model). Setiap aset, NFT, atau data itu "objek" dengan ID unik. Punya owner, bisa di-share, atau bisa immutable. Mau kirim USDT? Langsung pindahin objeknya. Gak perlu cek state global.

Hasilnya? Transaksi yang gak saling terkait bisa jalan [paralel](https://docs.sui.io/concepts/transactions/parallel-execution). Gak antri kayak di blockchain lain. Makin banyak validator, makin kenceng. Bukan makin banyak validator, makin lambat karena semua mesti sinkron.

Dan bahasa pemrogramannya bukan Solidity. Pakai [Move](https://move-book.com), yang awalnya dibikin tim Diem. Move itu resource-oriented: aset digital dianggap "resource" yang gak bisa di-copy atau dihapus sembarangan. Ini ngurangin bug klasik smart contract yang udah ngerugian miliaran dollar di EVM chain.

## Kenapa Harganya Jeblok?

Jujur aja. Sui pernah nyentuh $5.35 di akhir 2024. Sekarang? [$0.82](https://www.coingecko.com/en/coins/sui). Turun sekitar 85%.

Kenapa?

Pertama, [token unlock](https://token.unlocks.app/sui). Alokasi insider Sui itu besar. Sekitar 50% supply dialokasikan ke tim, investor awal, dan foundation. Tiap kali token unlock besar-besaran, tekanan jual naik. Komunitas udah berkali-kali kritik ini dan nyebut Sui sebagai "VC chain".

Kedua, hype cycle. Sui masuk pasar pas bull run 2024. Narasi "next Solana" atau "ex-Meta team" bikin harga pump. Begitu pasar koreksi, yang fomo di harga atas langsung cut loss.

Ketiga, [FTX Ventures](https://www.coindesk.com/policy/2022/09/08/mysten-labs-raises-300m-at-2b-valuation-led-by-ftx-ventures/) adalah lead investor Series B Mysten Labs ($300M, September 2022). Pas FTX collapse, reputasi Sui kena imbas, meski foundation-nya sendiri gak ada hubungan langsung dengan FTX.

Tapi ini yang menarik: harga turun 85%, tapi TVL Sui masih di sekitar [$483 juta](https://defillama.com/chain/Sui). Developer masih aktif. Ekosistem DeFi-nya masih tumbuh. Kalau teknologinya jelek, TVL bakal ikut anjlok. Tapi ini enggak.

## Yang Bikin Beda dari Lainnya

### DeepBook: Order Book On-Chain, Bukan AMM

Kebanyakan DEX di blockchain lain pakai model AMM (Automated Market Maker) kayak Uniswap. Kamu swap token lewat liquidity pool.

Sui punya [DeepBook](https://deepbook.tech), on-chain central limit order book. Artinya: ada order book beneran di blockchain. Buy order, sell order, spread, market depth: semuanya on-chain. Ini lebih mirip cara kerja exchange tradisional (Binance, NYSE) tapi terdesentralisasi.

Kenapa ini penting? Karena order book lebih efisien buat trading volume besar. Slippage lebih kecil. Dan Sui bisa jalanin ini karena throughput-nya emang tinggi.

### Walrus: Google Drive Versi Terdesentralisasi

Ini yang paling jarang dibahas. Mysten Labs juga bikin [Walrus](https://walrus.xyz), platform penyimpanan data terdesentralisasi yang dibangun di atas Sui.

Konsepnya: data yang kamu simpan di Walrus itu [verifiable](https://docs.walrus.site/). Bisa diverifikasi keasliannya, punya programmable access control, dan gak bisa diubah sembarangan. Di era AI yang makin banyak data palsu dan deepfake, kemampuan buat membuktikan data itu asli dan gak diubah itu krusial.

Token-nya [WAL](https://www.coingecko.com/en/coins/walrus-2), sekarang di $0.05 dengan market cap sekitar $120 juta. Masih sangat awal. Tapi konsep verifiable data storage di blockchain yang udah punya finality sub-detik? Itu kombinasi yang belum banyak ditawarkan kompetitor.

### SuiPlay0X1: Blockchain Meets Gaming Hardware

Sui juga main di gaming hardware lewat [SuiPlay0X1](https://suiplay0x1.com), handheld gaming device yang natively terintegrasi dengan blockchain. Bukan cuma "game di blockchain" kayak kebanyakan project gaming crypto, tapi beneran hardware yang dibikin buat gaming + on-chain assets.

Plus, Sui punya [on-chain randomness](https://docs.sui.io/concepts/cryptography/onchain-randomness) bawaan. Buat game yang butuh loot box, gacha, atau mekanisme acak lainnya, ini fitur yang gampang diimplementasi tanpa oracle pihak ketiga.

## Data Pasar (Juni 2026)

Biar gak cuma narasi, ini angkanya:

- **Harga SUI:** $0.82
- **Market Cap:** $3.28 miliar
- **ATH:** $5.35 (turun ~85%)
- **TVL:** ~$483 juta
- **Finality:** ~400ms (Mysticeti)
- **Token WAL (Walrus):** $0.05, market cap $120 juta

Untuk konteks: Solana di market cap ~$80 miliar, Aptos di ~$3 miliar. Sui duduk di antara keduanya. Tapi dari sisi teknologi (finality, parallel execution, object model), Sui punya argumen teknis yang kuat.

## Jadi, Worth It?

Saya gak bakal bilang "beli" atau "jangan beli". Itu keputusan kamu.

Tapi kalau kamu tipe yang liat teknologi lebih dari harga, Sui ini salah satu project yang paling underrated di 2026. Tim dari ex-Meta, pendekatan object-centric yang beneran beda, finality sub-detik, dan ekosistem yang pelan-pelan tumbuh (DeepBook, Walrus, gaming).

Risikonya? Token unlock besar, label "VC chain" yang melekat, dan kompetisi ketat dari Solana dan Aptos. Plus, developer pool Move masih kecil dibanding Solidity.

Kalau kamu cuma mau pump-dump, skip aja. Tapi kalau kamu mau ngerti satu blockchain yang pendekatan teknisnya beneran beda dari yang lain, Sui layak dicermati.

---

*Catatan: Ini catatan pribadi, bukan saran investasi. Kamu punya duit, kamu yang mutusin.*

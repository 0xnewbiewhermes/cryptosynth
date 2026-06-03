---
title: "Modulr Lanjutan: Proof of Utility Bukan Consensus, dan GitHub-nya Udah Stalling"
slug: modulr-robotics-l1-blockchain-lanjutan
category: "Journal"
description: "Update Modulr 2 hari setelah catatan pertama: GitHub langsung stalling, Proof of Utility ternyata bukan consensus mechanism, dan peaq jauh lebih matang."
pubDate: 2026-06-03T10:15:00Z
author: "Gideon"
tags:
  - robotics
  - depin
  - l1-blockchain
  - proof-of-utility
  - early-stage
heroImage: "/images/hero/modulr-robotics-l1-blockchain-lanjutan.png"
ogImage: "/images/og/modulr-robotics-l1-blockchain-lanjutan.png"
excerpt: "Lanjutan analisis Modulr 2 hari kemudian. GitHub langsung stalling setelah 616 commits, Proof of Utility ternyata bukan consensus beneran, dan kompetitor sudah jauh di depan."
---

<div class="tldr-box">
<strong>TL;DR:</strong> Lanjutan dari catatan pertama soal Modulr. Baru 2 hari setelah catatan pertama, dan GitHub-nya udah berhenti: cuma 2 commit baru (total 618, zero sejak 2 Juni). Proof of Utility yang mereka klaim ternyata bukan consensus mechanism: lebih ke reward/verification system. Dan yang paling bikin saya mikir ulang: gak ada whitepaper, gak ada technical paper, domain modulr.network malah parked. Sementara itu peaq udah onboard 6M+ mesin dengan partnership Deutsche Telekom, Bosch, dan Mastercard.
</div>

<div class="disclaimer-box">
<strong>â ï¸ Disclaimer:</strong> Semua yang ditulis di sini adalah <strong>catatan pribadi</strong>, bukan saran keuangan atau ajakan investasi. Saya bukan financial advisor. Risiko rugi ada di setiap keputusan crypto. Selalu DYOR (*do your own research*) sebelum ambil keputusan.
</div>

2 hari lalu saya nulis soal [Modulr](https://cryptosynth.id/blog/modulr-robotics-l1-blockchain), L1 blockchain yang klaim fokus ke robotik. Waktu itu kesan saya: konsep menarik, GitHub aktif (616 commits), tapi banyak red flag. Baru 2 hari, saya balik lagi buat cek. Hasilnya? Agak mengecewakan.

## GitHub: Dari Aktif ke Stalling

Ini yang paling kelihatan. 2 hari lalu saya catat 616 commits di repo utama `modulr-core`, dengan update harian yang konsisten. Sekarang?

- **Total commits: 618** (tambah 2 doang)
- **Last push: 1 Juni 2026, 20:24 UTC**
- **Zero commit sejak 2 Juni**

Dua commit terakhir itu cuma bugfix: "anchors blocks thread logic" dan "fix last-mile finalizer deadlocks." Selebihnya? Hening. Gak ada commit baru, gak ada PR yang di-merge, gak ada activity sama sekali.

Yang bikin saya heran: pas artikel pertama ditulis (1 Juni), development-nya lagi aktif banget. Rata-rata 5-10 commit per hari di minggu-minggu sebelumnya. Begitu saya publish catatan soal mereka, langsung berhenti. Bisa jadi timing-nya kebetulan, bisa jadi tim lagi fokus di branch lain. Tapi penurunan dari "aktif banget" ke "total hening" dalam hitungan hari itu sinyal yang gak bagus. Buat project yang bilang "pilot program accepting teams," ini gak matching.

## Proof of Utility: Bukan yang Saya Kira

Ini bagian yang paling bikin saya koreksi pemahaman dari catatan pertama.

Di artikel pertama, saya nulis PoU sebagai "consensus mechanism" yang reward kerja nyata. Setelah riset lebih dalam, ternyata saya salah. PoU itu **bukan consensus mechanism** dalam artian PoW atau PoS.

Penjelasannya begini:

**Consensus mechanism** (PoW, PoS) itu fungsinya: siapa yang berhak bikin blok berikutnya dan gimana jaringan sepakat soal state blockchain. Ini soal keamanan dan finalitas.

**Proof of Utility** yang Modulr deskripsikan lebih ke **reward/verification system**: gimana ngukur dan ngasih reward berdasarkan kerja yang berguna ke jaringan. Ini soal distribusi insentif, bukan keamanan chain.

Artinya: Modulr tetap butuh consensus mechanism beneran di belakangnya (kemungkinan PoS atau variant Cosmos SDK), dan PoU cuma lapisan reward di atasnya. Ini beda banget dari framing "bukan PoW, bukan PoS" yang kesannya PoU menggantikan keduanya.

### Apa yang PoU Miripkan?

Konsep yang paling dekat: **Proof of Useful Work (PoUW)**. Ini istilmah akademik yang udah ada sejak 2017, dengan beberapa paper peer-reviewed:

- **Ofelimos** (IACR Crypto 2022): PoUW pertama yang provably secure, pakai WalkSAT untuk optimasi kombinatorial
- **Proofware** (arXiv 2019): framework buat bikin dApp dengan PoUW
- **PoUW for AI** (arXiv 2020): training ML sebagai "useful work"

Tapi ada satu perbedaan kritis: PoUW biasanya fokus ke SATU jenis komputasi yang berguna. Modulr klaim bisa aggregasi MULTIPLE resource types (storage + compute + access) jadi satu "utility score." Ini pendekatan yang lebih ambisius, tapi juga lebih susah diimplementasi.

### Masalahnya: Gak Ada Dokumentasi Teknis

Ini yang bikin saya agak skeptis sekarang. Saya cari:

- **modulr.network**: domain-nya **parked** (halaman registrar domain doang)
- **Whitepaper**: gak ada di arXiv, IEEE, atau database akademik manapun
- **Technical paper**: gak ada
- **Docs site**: gak ada

Jadi PoU ini cuma ada di website marketing mereka. Gak ada paper yang jelasin gimana "utility score" dihitung, gimana verifikasi-nya, gimana ngakali sybil attack, atau gimana weighting antara storage vs compute vs access.

Buat saya ini masalah besar. Kalo kamu klaim punya consensus/verification mechanism yang baru, minimal harus ada technical spec yang bisa di-review. "Rewards follow completed utility" di homepage itu slogan marketing, bukan spesifikasi teknis.

## Website: Masih Broken

Update dari catatan pertama: subpages (`/modules`, `/network-roles`) masih 404. Yang baru: ada banner "Pilot program: accepting teams" di bagian atas, tapi gak ada link registrasi yang jalan.

12 "product modules" yang mereka list, beberapa masih status "Roadmap." Dan yang mereka klaim "Active" gak bisa diverifikasi karena halaman detail-nya 404.

## Kompetitor: peaq Jauh di Depan

Ini bagian yang bikin perspektif saya berubah. Saya cek [peaq](https://www.peaq.network/), salah satu kompetitor terdekat Modulr. Hasilnya:

- **6M+ mesin** yang udah di-onboard ke jaringan
- **60+ apps** yang pakai peaq stack
- **22 industri** yang di-cover
- **48M+ transaksi** oleh mesin
- **Partnership**: Deutsche Telekom, Lufthansa, Bosch, Continental, Airbus, Mastercard, NTT

Dan yang paling menarik: ada [XMAQUINA](https://www.xmaquina.io/), project di peaq yang fokus ke humanoid robotics dengan DAO Treasury $35M+. Mereka bikin infrastruktur buat robot humanoid yang bisa jadi investable assets.

SkyX, project lain di peaq, udah ngumpulin 125TB+ data cuaca dari mesin-mesin mereka.

Sementara Modulr masih di tahap "618 commits dan website broken," peaq udah punya ekosistem yang jalan dengan data real dan revenue streams.

### Perbandingan yang Lebih Jujur

| | Modulr | peaq |
|--|--------|------|
| Mainnet | Belum | Udah jalan |
| Mesin onboard | 0 (klaim pilot program) | 6M+ |
| Partnership | Gak ada yang terverifikasi | Deutsche Telekom, Bosch, Airbus, Mastercard |
| GitHub activity | Stalling (sejak 2 Juni) | Active development |
| Token | eMDR (ERC-20, 1M supply) | PEAQ (native token, listed) |
| Community | 2 stars, 1 fork, Twitter suspended | Active community, multiple channels |

Saya gak nulis ini buat nge-dump Modulr. Tapi kalo kamu bandingin kedua project ini, bedanya terlalu jauh buat di-ignore.

## Yang Masih Menarik dari Modulr

Meskipun banyak hal yang bikin skeptis, ada beberapa konsep dari Modulr yang tetap menarik:

**Asset Protection Program**: mekanisme on-chain buat waris digital (Will), tunda transaksi (Delay), batas token keluar per hari (Limiter), dan freeze wallet. Ini jarang dipikirin project lain dari awal. Kalo beneran diimplementasi, ini fitur yang valuable buat user retail.

**Dual token model** (MDR + MTR): misahin decentralized value token dari centralized service credits. Ini approach yang lebih clean daripada satu token buat semuanya.

**Multi-resource verification**: konsep aggregasi storage, compute, dan access ke satu utility score itu menarik secara teori. Kalo ada yang beneran implementasi, ini bisa jadi template baru buat DePIN.

Tapi "menarik secara konsep" dan "beneran jalan" itu beda jauh.

## Apa yang Saya Pantau Selanjutnya

Dari catatan pertama sampai sekarang, Modulr belum nunjukin progress yang meyakinkan. Yang saya butuhin buat berubah pikiran:

1. **Technical paper atau whitepaper** yang jelasin PoU secara detail
2. **Mainnet testnet publik** yang bisa di-explore
3. **Setidaknya satu integrasi robot** yang berfungsi
4. **Tim yang go public** atau minimal doxxed ke beberapa trusted entity
5. **Community yang tumbuh** dari 2 GitHub stars ke sesuatu yang meaningful

Sampai semua (atau minimal beberapa) itu terpenuhi, Modulr tetap di kategori "interesting concept, zero proof."

Kompetitor kayak peaq udah nunjukin bahwa blockchain + robotik itu bukan cuma teori. Ada yang beneran jalan dengan data dan revenue. Modulr masih di tahap "trust me bro."

Kalau ada update signifikan (mainnet launch, partnership pertama, whitepaper rilis), pasti saya catat lagi di sini.
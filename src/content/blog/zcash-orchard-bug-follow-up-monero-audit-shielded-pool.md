---
title: "Zcash Orchard: Researcher Sekarang Incar Monero, Shielded Pool Mau Di-Redesain"
slug: "zcash-orchard-bug-follow-up-monero-audit-shielded-pool"
pubDate: "2026-06-07T15:00:00+07:00"
updatedDate: "2026-06-07T15:00:00+07:00"
author: "Gideon"
category: "Journal"
tags:
  - zcash
  - zec
  - monero
  - xmr
  - privacy-coin
  - orchard
  - formal-verification
  - security-audit
description: "Taylor Hornby yang nemuin bug Orchard pake AI kini audit Monero. Zcash tim usul shielded pool baru + turnstile accounting. ZEC -50%, bearish bets rekor."
excerpt: "Researcher yang bobol Zcash pake AI sekarang masang target Monero. Shielded Labs usul redesign shielded pool besar-besaran. Tapi pertanyaan fundamental: apa privacy coin bisa pulih dari trust crisis?"
heroImage: "/images/hero/zcash-orchard-bug-follow-up-monero-audit-shielded-pool.png"
ogImage: "/images/og/zcash-orchard-bug-follow-up-monero-audit-shielded-pool.png"
faq: "Apa yang baru dari artikel Zcash sebelumnya?;;Dua perkembangan besar: (1) Taylor Hornby (yang nemuin bug) kini bakal audit Monero dan privacy coin lain. (2) Shielded Labs usul shielded pool baru dengan turnstile accounting. Plus data market aftermath: ZEC -50%, rekor bearish bets, $118M liquidation tapi spot-led bukan cascade.;;Apa itu turnstile accounting?;;Turnstile accounting = mekanisme verifikasi supply yang mastiin setiap koin yang keluar dari shielded pool konsisten sama yang masuk. Intinya: siapapun bisa verify kalau total supply ZEC gak inflated tanpa harus sacrifice privacy. Ini jawaban langsung buat masalah yang bikin Arthur Hayes jual semua ZEC.;;Kenapa Taylor Hornby mau audit Monero juga?;;Dia bilang di X: 'Absolutely! I'll add Monero to my queue of things to audit.' Ini penting karena Monero pake cryptography yang beda dari Zcash  -  ring signatures + stealth addresses, bukan ZK proofs. Kalau Monero juga punya celah, gak ada lagi privacy coin yang aman. Tapi kalau bersih, Monero jadi stronger narrative.;;Apa beda formal verification sama audit biasa?;;Audit biasa: manusia lihat code dan cari bug. Formal verification: computer pake mathematical proofs buat buktiin code sesuai specification. Sean Bowe (Zcash dev) bilang ini solusi jangka panjang. Wei Dai (1kx): 'probably the only long-term solution.' Zcash kena 2 critical bug dalam 7 tahun  -  timing-nya pas buat formal verification jadi standar industri.;;Apakah Monero juga berisiko kena bug serupa?;;Attack surface-nya beda. Monero gak pake ZK circuits, jadi gak kena soundness bug kaya Zcash. Tapi Monero tetep punya kompleksitas kriptografi sendiri  -  ring signatures, bulletproofs, dan sistem privat lainnya. Makanya audit Hornby jadi krusial: kalau Monero lolos, ini signal kuat buat privacy narrative.;;Gimana nasib ZEC sekarang?;;Harga udah recovery dari $264 ke $354, tapi bearish bets di level rekor. Open interest ZEC futures di all-time high  -  banyak trader yakin harga bakal turun lagi. Turnstile accounting proposal harus lolos governance NU7 (target end July). Sampai itu terjadi, ketidakpastian supply integrity masih jadi overhang."
canonical: "https://cryptosynth.id/blog/zcash-orchard-bug-follow-up-monero-audit-shielded-pool"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Dua perkembangan besar: (1) Taylor Hornby  -  researcher yang nemuin Orchard bug pake Anthropic Opus 4.8  -  resmi nambahin Monero ke audit queue-nya. (2) Shielded Labs usul shielded pool baru + turnstile accounting, target NU7 akhir Juli. Di market: ZEC -50% dari puncak, bearish bets rekor, Arthur Hayes udah exit total. Tapi yang paling menarik bukan teknisnya  -  melainkan pertanyaan: apakah privacy coin butuh formal verification sebagai standar, bukan opsional?
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Lanjutan dari artikel [Zcash Orchard Bobol](/blog/zcash-orchard-bug-counterfeit-privacy-coin-juni-2026) yang terbit kemarin. Saya gak punya posisi ZEC atau XMR saat ini.
</div>


Dari semua yang terjadi minggu ini, satu hal yang bikin saya paling mikir: **bukan soal bug-nya, tapi soal apa yang terjadi setelahnya.**

Tim Zcash patch dalam 4 jam. Disclosure transparan. Komunitas debat soal masa depan. Tapi ternyata gak ada yang siap sama konsekuensi kedua: pas publik tau celah ini ada, kepercayaan ilang lebih cepet dari patch-nya turun.

Dan sekarang, domain specialist yang sama yang nemuin bug mulai ngincer privacy coin lain.


## Researcher Now Incar Monero

**Taylor Hornby**, security engineer yang dikontrak Shielded Labs, udah konfirmasi via X:

> "Absolutely! I'll add Monero to my queue of things to audit."

Ini bukan ancaman kosong. Hornby yang sama yang  -  dalam 24 jam  -  berhasil produce working exploit buat unlimited counterfeit ZEC pake Opus 4.8. Sekarang algorithmic auditor yang sama bakal ngehadapin **Monero**, privacy coin nomor satu dengan market cap $5.5B.

Kenapa ini penting? Karena **Monero pake fundamental cryptography yang beda dari Zcash:**

| Dimensi | Zcash | Monero |
|---------|-------|--------|
| Privacy mechanism | ZK-SNARKs (zero-knowledge proofs) | Ring signatures + Stealth addresses |
| Privacy model | Opt-in (shielded OR transparent) | Mandatory (semua transaksi privat) |
| Supply verification | Via transparent pool | Cryptographic (CryptoNote protocol) |
| Attack surface | ZK circuit soundness | Ring signature / Bulletproofs |
| Bug history | 2 critical counterfeiting bugs (Sprout 2018, Orchard 2026) | Belum ada counterfeiting bug publik |

Monero gak pake ZK circuits, jadi secara fundamental kebal sama jenis bug yang kena Zcash. Tapi Monero punya kompleksitas lain  -  ring signatures, Bulletproofs rangeproofs, dan sistem privat alamat yang unik.

Hornby bilang dia bakal cari **flaws di protocol engineering**, bukan cuma scanning for known vulnerability patterns. Pendekatan yang sama yang nemuin under-constrained elliptic curve check di Orchard.

XMR turun 8% pas artikel ini ditulis ke $295  -  ikut koreksi market, bukan karena signal spesifik.


## Shielded Pool Redesign  -  Bukan Patch Biasa

Yang lebih substantif: **Shielded Labs secara resmi usul arsitektur shielded pool baru.**

Bukan fix. Bukan upgrade minor. **Redesain fundamental.**

Usulannya:

1. **Shielded pool baru**  -  dibangun dari nol dengan circuit yang di-formally verified
2. **Turnstile accounting**  -  mekanisme yang mastiin setiap koin yang keluar dari shielded pool punya bukti konsistensi supply. Siapapun bisa verify tanpa buka privacy transaksi
3. **Unshield wajib** sebelum masuk pool baru  -  koin lama lewat audit supply

**Timeline:** Josh Swihart (ZODL founder) bilang NU7 upgrade akhir Juli 2026 adalah target realistis buat pool baru. Tapi dia gak fixed position  -  ini masih diskusi komunitas.

Ini adalah **jawaban langsung ke masalah yang bikin Arthur Hayes jual semua ZEC.** Hayes bilang:

> "While I think it's extremely unlikely of any minting, it cannot be formally cryptographically proved impossible."

Turnstile accounting adalah solusi teknis buat kalimat itu. Kalau berhasil, gak ada lagi "mungkin aja supply udah inflated."

Tapi proposal ini masih perlu governance approval. Dan governance Zcash  -  seperti semua blockchain governance  -  gak cepet. Target NU7: akhir Juli. Itu masih 7 minggu dari sekarang.


## Market Aftermath: Data yang Jujur

Minggu ini adalah salah satu yang terburuk buat privacy coin market.

| Metrik | Data |
|--------|------|
| ZEC drop (puncak ke low) | ~$675 -> $264 (-60%) |
| Recovery (7 Juni) | ~$354 (masih -47% dari ATH) |
| 24h liquidations | $118M (tapi cuma 14% leveraged positions) |
| Spot vs leverage | Spot-led  -  not leverage cascade |
| Open interest | ATH in ZEC terms (traders piling into shorts) |
| Long/Short Binance retail | 0.77 (bearish) |
| Long/Short Binance whale | 0.80 (bearish) |
| Long/Short OKX retail | 0.67 (extremely bearish) |
| Market cap | ~$5.9B (turun dari ~$10B+ pre-crash) |

Yang paling menarik: **$118M liquidations untuk -50% drop itu kecil.** Bandingin: BTC liquidation $335M untuk drop beberapa persen aja. ETH liquidation $278M.

Ini ngasih tau bahwa **yang jual bukan trader leverage.** Ini whale dan holder spot yang panik  -  mereka yang baca disclosure, sadar gak ada cara buktiin supply integrity, dan langsung cut loss.

Short interest ZEC juga di rekor. OI ZEC futures di ATH. Ini double-edged sword: kalau harga stabil, short squeeze bisa dorong ZEC balik cepet. Tapi selama bearish sentiment dominan, tekanan jual tetep ada.


## Formal Verification: Solusi Jangka Panjang

Satu diskusi yang muncul dari kejadian ini  -  dan menurut saya paling penting  -  adalah **formal verification untuk ZK circuits.**

Sean Bowe (Zcash dev dan cryptography researcher):

> "The long-term answer is to make shielded protocols and their implementations formally verifiable."

Josh Swihart nambahin:

> "The Orchard vulnerability was a flaw in the circuit's handwritten rules, not in the underlying cryptography."

Artinya: cryptography-nya bener. Tapi implementasinya yang salah. Formal verification bisa mastiin implementasi match specification  -  secara matematis, bukan dengan code review manual.

Wei Dai (1kx):

> "The Orchard circuit bug appeared 'obvious in retrospect' but had been missed by diligent protocol designers, cryptographers and auditors."

Ini yang menurut saya paling bikin resah. Seorang cryptographer senior, auditor yang digaji, dan protokol yang udah diaudit  -  semua bisa miss bug yang "obvious in retrospect." Formal verification adalah satu-satunya cara mastiin gak ada blind spot.

Justin Bons (CyberCapital) ngasih argumen balancing:

> "Market overreacting  -  the bug had been fixed, the good guys caught it first."

Valid. Response tim Zcash impressive. Tapi argumen ini gak nge-address pertanyaan fundamental: **kalau yang nemuin bukan whitehat, gimana?**

Gemini co-founder Cameron Winklevoss juga defend Zcash:

> "Bugs are inevitable in L1 networks. The key is whether teams can find and fix them before attackers do."

Fair point, tapi ini standard yang lebih cocok buat Bitcoin atau Ethereum  -  bukan privacy coin. Privacy coin beda level risikonya karena supply integrity gak bisa diaudit secara publik.


## Risks & Refleksi

### Buat Zcash:
- **NU7 bisa gagal atau molor.** Governance blockchain gak pernah cepet. Kalau turnstile accounting proposal buntu di komunitas, trust recovery gak akan terjadi
- **Short interest accumulation.** OI di ATH dengan sentimen bearish. Kalau gak ada katalis positif, tekanan jual bisa lanjut
- **Competition.** Monero dan ZK privacy layers (Aztec, Railgun) bisa ambil market share selama Zcash masih uncertainty
- **Regulatory.** Setelah bug ini, regulator punya amunisi baru buat argumen "privacy coin gak bisa diaudit"

### Buat Monero:
- **Audit Hornby bisa nemuin flaw juga.** Belum tentu. Tapi risikonya ada. Kalau Monero juga kena, privacy coin narrative bisa kena pukulan telak
- **Delisting adalah masalah yang gak ilang.** 73 exchange udah delist XMR. Gak ada produk regulated. Gak ada ETF
- **Good news: attack surface berbeda.** Bukan ZK circuit, jadi probabilitas kena bug yang sama kecil. Ini advantage kompetitif yang signifikan

### Buat privacy coin secara umum:
- **ZK circuits butuh formal verification sebagai standar.** Bukan opsional. Dua critical bug dalam 7 tahun di Zcash adalah wake-up call
- **Privacy vs auditability trade-off belum punya solusi elegan.** Turnstile accounting mungkin jawabannya, tapi masih proposal
- **AI-assisted auditing adalah game changer.** Hornby nemuin bug dalam 24 jam pake Opus 4.8. Bayangin apa yang bisa dilakukan attacker dengan model yang sama


## Opini Saya

Dari semua perkembangan minggu ini, yang paling nempel di kepala saya adalah quote Hornby:

> "I produced a working exploit in a local regtest environment... If I had run the same tool on Zcash mainnet, it would have generated unlimited, undetectable counterfeit ZEC in my mainnet wallet."

Gak ada dramatisasi. Gak ada hyperbole. Cuma fakta teknis yang disampaikan dengan tenang. Dan itu yang bikin lebih merinding.

Saya pikir kejadian ini adalah turning point buat privacy coin industry, bukan cuma Zcash. Dua hal yang bakal jadi standar baru:

1. **Formal verification untuk ZK circuits**  -  kalau ada shielded pool yang audited tanpa formal verification, di 2027 itu akan dianggap red flag
2. **AI-assisted auditing jadi mainstream**  -  manual code audit aja gak cukup untuk sistem yang kompleksitasnya kaya Zcash atau Monero. Automated reasoning tools bakal jadi standar

Soal Zcash: saya masih wait-and-see. Turnstile accounting proposal menarik, tapi harus lihat implementasi dan governance approval dulu. Timnya proven responsif, dan komunitasnya debat dengan sehat  -  itu sinyal positif.

Tapi privacy coin secara fundamental lebih rentan daripada transparent blockchain. Bukan karena teknologinya jelek, tapi karena **semakin privat sebuah sistem, semakin sedikit mata yang bisa memverifikasi kebenarannya.** Dan dalam security engineering, "banyak mata" adalah salah satu defense terkuat.

Monero mungkin next domino. Atau mungkin Hornby gak nemu apa-apa dan itu jadi endorsement terkuat buat Monero.

Either way, saya bakal ngikutin.


## Sumber

- [CoinDesk - Researcher adds Monero to audit queue (Shaurya Malwa, Jun 6)](https://www.coindesk.com/tech/2026/06/06/researcher-who-found-zcash-s-bug-with-ai-adds-monero-to-his-audit-queue)
- [CoinDesk - Bearish ZEC bets hit record high (Shaurya Malwa, Jun 5)](https://www.coindesk.com/markets/2026/06/05/bearish-zcash-bets-hit-record-high-as-privacy-token-s-price-crashes)
- [CoinDesk - Arthur Hayes dumps ZEC (Olivier Acuna, Jun 5)](https://www.coindesk.com/markets/2026/06/05/arthur-hayes-dumps-zcash-holdings-after-orchard-pool-vulnerability-revealed)
- [Cointelegraph - Zcash weighs new shielded pool (Ezra Reguerra, Jun 5)](https://cointelegraph.com/news/zcash-new-shielded-pool-orchard-counterfeiting-bug)
- [CoinGecko - ZEC/XMR price data](https://www.coingecko.com)
- [Shielded Labs - Orchard Vulnerability Disclosure](https://shieldedlabs.com)
- [Artikel sebelumnya: Zcash Orchard Bobol](/blog/zcash-orchard-bug-counterfeit-privacy-coin-juni-2026)
- [Taylor Hornby statement via X](https://x.com/taylorhornby)
- [Arthur Hayes statement via X](https://x.com/CryptoHayes)


*Artikel ini pertama kali diterbitkan 7 Juni 2026. Update akan ditambahkan kalau ada perkembangan soal NU7, hasil audit Monero, atau keputusan governance Zcash.*

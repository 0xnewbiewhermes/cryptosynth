---
title: "Laporan Keyrock: AI Agent Udah Transaksi $73 Juta Pake Stablecoin, Crypto Rails Jadi Tulang Punggung Mesin"
slug: keyrock-ai-agent-73-juta-stablecoin-crypto-rails
category: "Berita"
description: "Keyrock report 'Who Pays the Agent?' ungkap AI agent udah settle $73 juta di 176 juta transaksi on-chain. Coinbase x402, Stripe MPP, dan Visa saling sikut bangun infrastruktur pembayaran mesin."
pubDate: 2026-05-24T22:32:36+07:00
author: "CryptoSynth Research"
tags:
  - ai-agent
  - stablecoin
  - keyrock
  - usdc
  - x402
  - crypto-payments
  - base
heroImage: "/images/hero/keyrock-ai-agent-73-juta-stablecoin-crypto-rails.png"
ogImage: "/images/og/keyrock-ai-agent-73-juta-stablecoin-crypto-rails.png"
faq: >
  Apa itu x402?;;x402 adalah protokol open-source dari Coinbase yang revive HTTP 402 "Payment Required", AI agent bisa bayar langsung pake USDC ke layanan kayak API atau cloud compute tanpa perlu akun atau subscription. Settlement di Base cuma $0.0001 dan 200ms.;;Apa beda x402 sama Stripe MPP?;;Stripe Machine Payments Protocol (MPP) jalan di Tempo blockchain mereka sendiri, sementara x402 di Base. Dua-duanya buat micropayment AI agent, tapi Stripe lebih fokus ke integrasi merchant existing, x402 lebih crypto-native.;;Gimana dampak buat Indonesia?;;Walau pembayaran crypto langsung masih dibatesin regulator, infrastruktur agent payment ini relevan buat ekosistem Web3 Indo yang mulai eksperimen pake Solana dan Base. Indonesia pasar remittance gede, micropayment lintas batas pake stablecoin bisa jadi use case natural.
---

<div class="tldr-box">
<strong>TL;DR:</strong> Laporan Keyrock edisi "Who Pays the Agent?" nunjukkin AI agent udah settle $73 juta dalam 176 juta transaksi on-chain setahun terakhir. Coinbase, Stripe, Google, dan Visa saling bikin sistem pembayaran mesin sendiri. 76% transaksi agent di bawah $0.30, terlalu kecil buat kartu kredit, tapi murah banget di blockchain ($0.0001).
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Artikel ini berdasarkan laporan publik Keyrock dan sumber X/berita. Bukan saran investasi.
</div>

Bayangin lo punya AI trading agent yang beli data pasar, sewa cloud compute, dan bayar API analisis, semuanya otomatis, tanpa lo approval satu-satu. Kedengeran futuristik? Ternyata udah happening sekarang.

[Keyrock](https://keyrock.com/who-pays-the-agent/), firma crypto trading dan investasi, baru aja rilis laporan "Who Pays the Agent?" (21 Mei 2026) yang nge-track aktivitas pembayaran AI agent di blockchain. Angkanya gila: **$73 juta** settle lewat **176 juta transaksi** antara Mei 2025 sampe April 2026.

## $73 Juta dari Mesin ke Mesin

Kecil dibanding Visa yang proses $14,5 triliun per tahun. Tapi yang bikin menarik bukan nominalnya, melainkan seberapa cepet infrastruktur ini kebangun.

"Significance lies less in the headline U.S. dollar value and more in how quickly the infrastructure stack is forming," tulis laporan Keyrock.

Gw liat polanya mirip early days DeFi, volum kecil, protokol saling tumpuk, dan yang paling penting: **98.6% dari semua pembayaran mesin settle di USDC** menurut [data dari Keyrock](https://x.com/keyrock/status/2057461733912969544). Ini bagus buat Circle selaku penerbit, tapi sekaligus konsentrasi risk yang gak bisa diabaikan.

## Kenapa Card Rails Gak Cocok buat Robot

Masalah utama pembayaran tradisional: **fixed fee**. Kartu kredit punya floor fee ~$0.30 per transaksi. Sekarang 76% transaksi AI agent ada di bawah angka itu, kebanyakan antara $0.01 sampai $0.10, menurut [Keyrock](https://x.com/keyrock/status/2057461737754870042).

Bayangin lo bayar $0.05 buat akses API tapi kena fee $0.30, lo rugi sebelum mulai. Di blockchain kayak Base atau Tempo, settlement cost cuma **$0.0001** dengan finalitas 200ms, menurut [Keyrock](https://x.com/keyrock/status/2057461737754870042). Bukan cuma lebih murah, tapi secara matematis jadi satu-satunya opsi yang feasible.

## Perang Tiga Kutub: Coinbase, Stripe, Google

Yang seru: ini bukan cuma crypto project iseng. Raksasa teknologi beneran saling sikut:

**[Coinbase x402](https://x.com/base/status/2052090936327328121):** Revive HTTP status code 402 "Payment Required", biarin AI agent bayar langsung pake USDC ke endpoint API. Udah handle $50 juta+ volume, 85% di Base. AWS Bedrock AgentCore Payments integrasi langsung.

**[Stripe MPP](https://x.com/superMLdev/status/2049859557233721478)** (Machine Payments Protocol): Jalan di Tempo blockchain mereka. Framework compete langsung sama x402, bedanya Stripe lebih ke merchant integration.

**Google AP2:** Fokus delegated spending authorization, agent dikasih budget dengan batasan, bisa spend dalam limit tanpa approval manual. Source dari [CoinDesk](https://www.coindesk.com/business/2026/05/21/crypto-rails-are-becoming-the-default-payment-layer-for-ai-agents-report-says) yang cover semua kompetitor ini.

**Visa:** Perpanjang jaringan kartu mereka pake tokenized credentials khusus AI commerce, juga diliput [CoinDesk](https://www.coindesk.com/business/2026/05/21/crypto-rails-are-becoming-the-default-payment-layer-for-ai-agents-report-says).

Ironisnya, pasar pembayaran AI agent diproyeksi bakal gede banget. [Gartner](https://www.gartner.com/) bilang $15 triliun by 2028, [McKinsey](https://www.mckinsey.com/) $3-5 triliun by 2030. Pertumbuhan lebih cepet dari stablecoin breakout years, kata Keyrock.

## Celah Regulasi yang Belum Terjawab

Ini yang jarang dibahas. [MiCA](https://www.esma.europa.eu/) Eropa, [GENIUS Act](https://www.congress.gov/) AS, dan [EU AI Act](https://artificialintelligenceact.eu/), semuanya mulai berlaku pertengahan 2026. Tapi gak ada satu pun yang secara spesifik ngatur transaksi otonom machine-to-machine.

Siapa yang bertanggung jawab kalo AI agent bikin transaksi ilegal? Gimana KYC buat robot? Siapa yang bayar pajak? Pertanyaan-pertanyaan ini belum dijawab.

## Southeast Asia: Testing Ground atau Pasar Tidur?

Di [Southeast Asia Blockchain Week 2026 Bangkok](https://x.com/SEABWofficial/status/2057026535228580246), panel "Agent Commerce: Stablecoins, Wallets, and the New Payment Stack" jadi salah satu sesi paling rame. Mastercard launching "Agent Pay" dengan "Verifiable Intent", signed cryptographic authorization yang bikin AI agent legal secara payment infrastructure. Mulai dari Singapore, ekspansi ke Malaysia, Thailand.

Buat Indonesia, ada gap menarik. Regulasi Bappebti masih ketat soal pembayaran crypto langsung ke merchant, preferensi fiat via exchange berizin kayak Indodax atau Reku. Tapi soal remittance, beda cerita. Indonesia duduk di peringkat 6 besar dunia buat penerima remittance. [Bank Indonesia](https://www.bi.go.id/) catat aliran dana TKI lebih dari $11 miliar setahun. Lewat stablecoin, biaya kirim bisa turun dari 3-5% (Western Union) ke <0.1%. Itu selisih ratusan juta per tahun yang balik ke kantong pekerja, bukan provider.

Gw liat ekosistem Web3 Indo udah mulai gerak. [OpenClaw](https://x.com/BitgetWalletID/status/2018337005810356517) pindah dari chatbot ke autonomous execution di Solana, [Bankr](https://x.com/BitgetWalletID/status/2018337005810356517) bangun DeFi execution layer, Purch bikin AI shopping agent. Walau payment langsung masih dibatesin, infrastruktur agent payment ini tetep relevan, tinggal nunggu regulator catch up.

## Sumber

1. [Keyrock - "Who Pays the Agent?" Report](https://keyrock.com/who-pays-the-agent/) (21 Mei 2026)
2. [CoinDesk - Crypto rails are becoming the default payment layer for AI agents, report says](https://www.coindesk.com/business/2026/05/21/crypto-rails-are-becoming-the-default-payment-layer-for-ai-agents-report-says) (24 Mei 2026)
3. [Keyrock/X - Report thread with data breakdown](https://x.com/keyrock/status/2057461733912969544) (21 Mei 2026)
4. [Keyrock/X - Micropayment economics breakdown](https://x.com/keyrock/status/2057461737754870042) (21 Mei 2026)
5. [Base/X - x402 protocol announcement and adoption stats](https://x.com/base/status/2052090936327328121) (Mei 2026)
6. [SEABW 2026/X - Southeast Asia Blockchain Week Bangkok](https://x.com/SEABWofficial/status/2057026535228580246) (Mei 2026)
7. [AWS/X - Bedrock AgentCore Payments integration](https://x.com/albe_sf/status/2054619984081654216) (Mei 2026)
8. [AWS/X - x402 dengan AWS integration](https://x.com/coinbase/status/2052396141329690809) (Mei 2026)

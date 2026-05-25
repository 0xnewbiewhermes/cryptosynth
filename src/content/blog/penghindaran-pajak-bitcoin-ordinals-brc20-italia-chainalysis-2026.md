---
title: "Penghindaran Pajak Pakai Bitcoin Ordinals dan BRC-20 Terbongkar di Italia"
description: "Otoritas Italia berhasil membongkar skema penghindaran pajak senilai lebih dari €1 juta yang memanfaatkan Bitcoin Ordinals dan BRC-20 tokens menggunakan analisis blockchain Chainalysis."
excerpt: "Guardia di Finanza Italia menggunakan Chainalysis Reactor untuk mengungkap skema penghindaran pajak €1 juta melalui Bitcoin Ordinals dan BRC-20 tokens."
pubDate: 2026-05-21T19:31:39+07:00
category: "Berita"
tags: ["bitcoin ordinals", "brc-20", "penghindaran pajak", "chainalysis", "italia", "keamanan crypto"]
author: "CryptoSynth Research"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Otoritas keuangan Italia (Guardia di Finanza) berhasil membongkar skema penghindaran pajak senilai lebih dari €1 juta ($1,1 juta) yang memanfaatkan Bitcoin Ordinals dan BRC-20 tokens. Investigasi menggunakan Chainalysis Reactor mengungkap bagaimana seorang tersangka menciptakan token, menjualnya di marketplace, dan menyembunyikan keuntungan selama bertahun-tahun.
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Artikel ini hanya untuk informasi dan bukan merupakan saran keuangan. Selalu lakukan riset sendiri sebelum berinvestasi di cryptocurrency.
</div>


## Skema Pajak Rp17 Miliar Menggunakan Bitcoin Ordinals Terbongkar

Otoritas Italia dari Guardia di Finanza (Unit Kepolisian Ekonomi dan Keuangan Foggia serta Unit Khusus Perlindungan Privasi dan Penipuan Teknologi Roma) berhasil mengungkap skema penghindaran pajak yang memanfaatkan Bitcoin Ordinals dan BRC-20 tokens. Seperti dilaporkan [Cointelegraph](https://cointelegraph.com/news/criminals-attempt-to-use-bitcoin-ordinals-to-evade-authorities-chainalysis), skema ini melibatkan lebih dari €1 juta ($1,1 juta atau sekitar Rp17 miliar) dalam bentuk keuntungan modal yang tidak dilaporkan selama beberapa tahun.

Tersangka diketahui juga secara tidak sah menerima subsidi publik di periode yang sama. Investigasi ini menjadi studi kasus penting tentang bagaimana teknologi blockchain baru tetap bisa dilacak oleh aparat penegak hukum.

## Cara Kerja Skema: Dari Inskripsi Jadi Uang Tunai

Menurut blog resmi [Chainalysis](https://www.chainalysis.com/blog/italy-guardia-di-finanza-bitcoin-ordinals-tax-fraud-scheme/), skema ini beroperasi dalam siklus yang sistematis. Tersangka mengirim satoshi dari dompet utama ke layanan inskripsi eksternal untuk membuat aset digital baru melalui protokol Ordinals dan standar BRC-20. Aset yang baru dibuat ini kemudian didaftarkan di marketplace khusus dan dijual dengan kelipatan dari biaya pembuatan awalnya. Keuntungan dialirkan kembali ke dompet utama dalam bentuk Bitcoin dan terus diinvestasikan ulang ke inskripsi baru, menciptakan siklus yang menghasilkan lebih dari €1 juta.

Yang membuat skema ini sulit dideteksi tanpa alat canggih adalah penggunaan Bitcoin Ordinals, sebuah protokol yang diperkenalkan pada tahun 2023 yang memungkinkan pemberian nomor seri unik pada setiap satoshi dan menyematkan data seperti gambar, teks, atau kode di bidang witness transaksi Bitcoin. Standar BRC-20 memungkinkan pembuatan token fungibel di jaringan Bitcoin tanpa smart contract.

## Peran Chainalysis Reactor dalam Membongkar Jejak Digital

Investigasi dimulai dari penyitaan perangkat keras dompet Ledger saat penggeledahan rumah. Tim forensik kemudian menggunakan Chainalysis Reactor untuk melacak transaksi yang kompleks. Alat ini menggunakan teknik common-input-ownership heuristics untuk menghubungkan beberapa alamat Bitcoin yang dihasilkan oleh dompet yang sama ke satu entitas pengendali.

Tantangan terbesar adalah bahwa perangkat Ledger secara otomatis menghasilkan alamat penerima baru untuk setiap transaksi menggunakan arsitektur UTXO Bitcoin. Teknik ini dirancang untuk memaksimalkan privasi. Namun, Chainalysis Reactor berhasil mengelompokkan alamat-alamat yang tampaknya tidak terkait ini menjadi satu kluster.

Penghubung terakhir ke identitas asli terjadi melalui pertukaran kripto teregulasi. Data KYC dari exchange yang bekerja sama dengan perintah pengadilan menghubungkan alamat pseudonim di blockchain dengan identitas dunia nyata tersangka.

Data dari [Pluang/Blockonomi](https://pluang.com/en/news-feed/penyelidikan-italia-bongkar-penipuan-pajak-bitcoin-ordinals-1-juta-euro) mengonfirmasi bahwa tersangka menggunakan skema multi-tahun yang menghasilkan keuntungan modal lebih dari €1 juta.

## Kesenjangan Pelaporan Pajak Crypto Global

Kasus ini muncul di tengah kesenjangan besar dalam kepatuhan pajak kripto secara global. Sebuah studi Maret 2026 memperkirakan hanya 32% hingga 56% pemilik kripto di AS yang melaporkan keuntungan mereka. Di Norwegia, hanya 12% yang melaporkan keuntungan kripto berdasarkan studi Agustus 2024.

IRS Amerika Serikat memperkirakan kesenjangan pajak tahunan mencapai sekitar $606 miliar. Dengan nilai pasar kripto global yang melampaui $2 triliun, potensi pendapatan pajak yang hilang sangat signifikan.

Buat investor kripto di Indo, kasus ini relevan karena aturan perpajakan kripto di sini udah cukup jelas. Berdasarkan PMK 68/PMK.03/2022, transaksi aset kripto kena PPh Pasal 22 sebesar 0,1% dari nilai transaksi buat pembeli dan PPN Dalam Negeri 0,11% buat penjual. DJP juga makin aktif ngumpulin data transaksi dari exchange yang teregulasi Bappebti dan OJK.

Yang beda dari kasus Italia sama Indo adalah tingkat kompleksitas aset yang dipake. Di Italia, tersangka make Bitcoin Ordinals dan BRC-20 tokens , aset yang relatif baru dan gak keliatan di blockchain explorer biasa. Di Indo, mayoritas transaksi masih pake aset mainstream kayak BTC, ETH, dan token ERC-20 yang gampang dilacak. Tapi tren adopsi Ordinals dan BRC-20 juga mulai ngerambah Asia, termasuk potensi pemakaiannya di Indo.

Kasus ini juga nunjukin bahwa make teknologi kripto baru buat nyembunyiin kekayaan bukan strategi yang aman. Chainalysis ngecek: technical novelty of crypto does not equal anonymity. Setiap transaksi ninggalin jejak permanen di blockchain. Alat kayak Chainalysis Reactor terus berkembang buat ngikutin inovasi teknis baru, dan platform blockchain intelligence sekarang jadi infrastruktur penting buat investigasi keuangan modern di seluruh dunia.

Perbedaan harga antara sumber adalah hal yang normal karena exchange dan agregator menggunakan acuan dan interval pembaruan yang berbeda.

| Aset | Harga (USD) | Perubahan 24j |
|:-----|:------------|:--------------|
| Bitcoin (BTC) | $77.040 | -0,48% |
| Ethereum (ETH) | $2.111 | -0,76% |

## Sumber

1. [Cointelegraph - Digital Assets Like Ordinals Used in Tax Evasion Schemes: Chainalysis](https://cointelegraph.com/news/criminals-attempt-to-use-bitcoin-ordinals-to-evade-authorities-chainalysis) (21 Mei 2026)
2. [Chainalysis Blog - How Blockchain Intelligence Uncovered a Million-Euro Bitcoin Ordinals Tax Fraud Scheme](https://www.chainalysis.com/blog/italy-guardia-di-finanza-bitcoin-ordinals-tax-fraud-scheme/) (20 Mei 2026)
3. [Pluang - Italian investigators uncover €1M tax fraud using Bitcoin Ordinals and BRC-20 tokens](https://pluang.com/en/news-feed/penyelidikan-italia-bongkar-penipuan-pajak-bitcoin-ordinals-1-juta-euro) (20 Mei 2026)

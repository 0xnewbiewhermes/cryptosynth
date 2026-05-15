---
title: "Claude AI Bantu Pulihkan 5 Bitcoin Senilai Rp6 Miliar dari Wallet Terkunci"
description: "Seorang Bitcoiner berhasil pulihkan 5 BTC senilai $395.000 setelah terkunci selama 11 tahun. Claude AI menemukan file backup wallet di komputer kuliah lama."
excerpt: "Pengguna anonim Cprkrn menggunakan Claude AI untuk menemukan file backup wallet dari 2019 di komputer lamanya, berhasil memulihkan 5 Bitcoin yang tidak bisa diakses sejak 2015."
pubDate: 2026-05-14T14:33:30+07:00
category: "Berita"
tags: ["bitcoin", "claude ai", "anthropic", "seed phrase", "wallet recovery", "AI crypto"]
---

> **TL;DR:** Seorang Bitcoiner anonim menggunakan Anthropic Claude untuk memulihkan 5 BTC senilai sekitar $395.000 (Rp6,2 miliar) yang terkunci selama lebih dari satu dekade. Claude menemukan file backup wallet lama di komputer kuliah pengguna, bukan meretas kriptografi Bitcoin.

## Claude AI Temukan File Backup Wallet yang Terlupakan

Sebuah postingan viral di X (Twitter) menghebohkan komunitas crypto pekan ini. Pengguna anonim bernama **Cprkrn** mengklaim berhasil memulihkan 5 Bitcoin yang tidak bisa diakses selama lebih dari 10 tahun, berkat bantuan chatbot AI Claude dari Anthropic.

Dalam wawancara dengan MTS pada Rabu (13/5), Cprkrn mengatakan bahwa ia membuat "password yang sangat rumit" di blockchain.info dan lupa satu dari tiga password setelah menggantinya beberapa tahun lalu. Selama delapan minggu terakhir, ia sudah mencoba melakukan brute force dengan bantuan AI untuk menguji "triliunan password" tanpa hasil.

Kemudian, sebagai "upaya terakhir" awal pekan ini, Cprkrn memasukkan semua catatan kuliah lamanya dan laptop yang pernah ia gunakan ke dalam Claude. Hasilnya, Claude berhasil menemukan file backup wallet kritis dari Desember 2019 di komputer kuliah Cprkrn.

## Proses Pemulihan: Bukan Meretas, Tapi Mencari File

Perlu diluruskan: **Claude tidak meretas kriptografi Bitcoin**. Yang terjadi jauh lebih sederhana, Claude hanya membantu mencari file di perangkat lama pengguna.

CoinDesk menjelaskan bahwa Claude menelusuri dua Mac, dua hard drive eksternal, export Apple Notes, inbox iCloud Mail, inbox Gmail, dan pesan X, dengan total data lebih dari 1 gigabyte. Dari pencarian tersebut, Claude menemukan file backup wallet lama yang terenkripsi dengan password yang sudah tertulis di buku catatan kuliah Cprkrn.

Password tersebut, yang kemudian diungkap Cprkrn sendiri di X, berhasil mendekripsi file backup lama. File ini berisi private keys yang sama dengan wallet saat ini, karena **private keys Bitcoin tidak pernah berubah**.

Transaksi pemulihan tercatat di Blockchain.com explorer, menunjukkan sekitar 5 Bitcoin ditransfer dari wallet address "14VJy…ofuE6" dalam lima transaksi pada 13 Mei 2026. Sebelum transaksi tersebut, koin-koin itu sudah dorman sejak awal 2015.

## 3,5 Triliun Password Dicoba Sebelum Berhasil

Sebelum berhasil, Claude sudah melakukan berbagai upaya brute force yang gagal:

| Tool | Password yang Diuji | Hasil |
|------|---------------------|-------|
| BTCRecover + Python | ~34 miliar | Gagal |
| Hashcat | ~3,4 triliun | Gagal |
| Pencarian file langsung | - | **Berhasil** |

Total biaya compute GPU dari upaya brute force yang gagal hanya sekitar **$15** menggunakan layanan Vast.ai.

## Reaksi Komunitas: "Claude Tidak Melakukan Apa yang Diklaim"

Meskipun cerita ini viral, beberapa anggota komunitas crypto mengkritik bahwa Cprkrn melebih-lebihkan peran Claude. Di subreddit r/technology, pengguna MeteorSwarmGallifrey menulis: "Claude tidak melakukan apa pun selain mencari file" dan menambahkan bahwa Claude tidak melakukan sesuatu yang "groundbreaking".

CoinDesk juga menekankan bahwa **membobol kriptografi Bitcoin yang sebenarnya** akan membutuhkan komputer kuantum yang menjalankan algoritma Shor atau kecacatan pada kriptografi kurva eliptik, yang belum ditemukan dalam 16 tahun pengawasan publik. Mayoritas peneliti menempatkan ancaman komputer kuantum yang relevan setidaknya 5-10 tahun lagi.

## Pintu Baru AI untuk Pemulihan Aset Crypto

Terlepas dari kontroversi, kasus ini membuka peluang baru bagi penggunaan AI dalam dunia crypto. Laporan industri memperkirakan antara **2,3 juta hingga 4 juta Bitcoin** tidak dapat diakses, mewakili sekitar 11-19% dari pasokan maksimum cryptocurrency, karena seed phrase yang hilang, koin yang terbakar, atau alasan lainnya.

Masalah utama selama ini adalah pekerjaan pemulihan membutuhkan keahlian teknis yang tidak dimiliki oleh pemilik Bitcoin yang kehilangan akses. Di sinilah asisten AI bisa berperan, bukan untuk memecahkan kriptografi, tetapi untuk membantu mencari dan mengidentifikasi file backup yang tersembunyi di antara bertahun-tumpukan data di perangkat lama.

Dengan harga Bitcoin sekitar **$80.542** saat berita ini ditulis, laptop lama yang tergeletak di lemari bisa saja menyimpan aset senilai ratusan juta rupiah.

## Tips untuk Pembaca CryptoSynth

- **Simpan seed phrase dan password di tempat yang aman**, bukan hanya di memori atau file digital
- **Backup wallet secara berkala** dan simpan di beberapa lokasi
- **Jangan buru-buru jual perangkat lama**, periksa dulu apakah ada wallet crypto yang terlupakan
- **Gunakan password manager** untuk mengelola password wallet yang rumit
- AI seperti Claude bisa membantu mencari file, tetapi **tidak bisa memecahkan kriptografi Bitcoin**, jangan percaya klaim sebaliknya

---

**Sumber:**

 Cointelegraph, "AI chatbot Claude helps man recover 5 Bitcoin after finding old seed phrase" (14 Mei 2026)
https://cointelegraph.com/news/ai-chatbot-claude-helps-man-recover-5-bitcoin-after-finding-old-seed-phrase

 CoinDesk, "Claude helps recover $395,000 in bitcoin trapped on a computer for years" (14 Mei 2026)
https://www.coindesk.com/tech/2026/05/14/claude-helps-recover-usd395-000-in-bitcoin-trapped-on-a-computer-for-years

---

*⚠️ Disclaimer: Artikel ini bersifat informatif dan bukan nasihat keuangan. Selalu lakukan riset sendiri (DYOR) sebelum mengambil keputusan investasi crypto. Harga cryptocurrency sangat fluktuatif dan bisa berubah sewaktu-waktu.*
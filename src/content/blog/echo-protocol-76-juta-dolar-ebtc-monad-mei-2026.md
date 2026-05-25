---
title: "Echo Protocol Hack $76 Juta: eBTC di Monad Dieksploitasi via Admin Key"
description: "Echo Protocol alami exploit $76 juta di Monad lewat kompromi admin key. 1.000 eBTC dicetak ilegal, kerugian riil dibatasi $816 ribu. Analisis lengkap."
excerpt: "Protokol BTCFi Echo Protocol alami exploit senilai $76 juta di Monad lewat kompromi admin key. Tim berhasil bakar 955 eBTC dan batasi kerugian riil ke $816 ribu."
pubDate: 2026-05-19T19:32:21+07:00
category: "Berita"
tags: ["echo protocol hack", "ebtc monad exploit", "btc defi aman", "berita crypto hari ini", "monad blockchain"]
author: "CryptoSynth Research"
faq: >
  Apa yang terjadi dengan Echo Protocol?;;Echo Protocol, protokol BTCFi di blockchain Monad, mengalami exploit pada 19 Mei 2026. Peretas mengompromikan admin key dan mencetak sekitar 1.000 eBTC senilai $76-77 juta secara ilegal. Tim Echo berhasil mengambil alih kembali kontrol dan membakar 955 eBTC, membatasi kerugian riil ke sekitar $816 ribu.;;Apakah dana di Monad ikut terdampak?;;Tidak. Jaringan Monad sendiri tidak dikompromikan dan beroperasi normal. Exploit hanya terjadi di kontrak Echo Protocol di Monad. Deployment Echo di Aptos juga tidak terdampak karena arsitektur terisolasi.;;Apa pelajaran dari insiden ini untuk pengguna DeFi?;;Insiden ini menunjukkan pentingnya keamanan admin key, tidak ada multisig, timelock, atau mint cap pada kontrak Echo. Pengguna disarankan memilih protokol dengan mekanisme keamanan berlapis dan menghindari protokol dengan satu titik kegagalan pada admin key.
---

<div class="tldr-box">
<strong>TL;DR:</strong> Echo Protocol, protokol BTCFi di Monad, dieksploitasi lewat kompromi admin key pada 19 Mei 2026. Peretas mencetak 1.000 eBTC ($76-77 juta) secara ilegal. Tim Echo berhasil mengambil alih kontrol dan membakar 955 eBTC, sehingga kerugian riil dibatasi ke sekitar $816 ribu.
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Artikel ini hanya untuk informasi dan bukan merupakan saran keuangan. Selalu lakukan riset sendiri sebelum berinvestasi di cryptocurrency.
</div>


## Echo Protocol Alami Exploit $76 Juta di Monad

Echo Protocol, platform DeFi berbasis Bitcoin (BTCFi) yang beroperasi di blockchain [Monad](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise), mengalami insiden keamanan serius pada 19 Mei 2026. Seorang peretas berhasil mengompromikan private key admin dan mencetak sekitar 1.000 eBTC, setara dengan $76-77 juta berdasarkan harga Bitcoin saat ini yang berada di kisaran $76.800.

Tim Echo Protocol mengonfirmasi insiden ini melalui kanal resmi mereka di X, menyatakan bahwa mereka sedang melakukan investigasi dan telah menangguhkan semua transaksi cross-chain di Monad.

### Kronologi Kejadian

Berdasarkan laporan dari [Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise) dan analisis on-chain dari PeckShield, berikut kronologi exploit:

1. Peretas mendapatkan akses ke admin private key Echo Protocol di Monad
2. Menggunakan akses tersebut untuk memberikan role minting ke wallet mereka
3. Mencetak sekitar 1.000 eBTC secara ilegal
4. Mendepositokan 45 eBTC ($3,45 juta) ke Curvance sebagai agunan
5. Meminjam 11,3 wBTC ($868 ribu) dari Curvance
6. Menjembatani dana ke Ethereum, menukar ke ETH, dan mengirim 384 ETH ($822 ribu) ke Tornado Cash

**Yang penting dipahami:** Meskipun judul berita menyebut "$76 juta", kerugian riil jauh lebih kecil. Tim Echo berhasil mengambil alih kembali admin key, mengupgrade kontrak Monad, dan **membakar 955 eBTC** yang masih tersisa di wallet peretas. Kerugian aktual diperkirakan sekitar $816-868 ribu.

### Akar Masalah: Centralized Admin Key

Analis keamanan menunjukkan bahwa exploit ini terjadi karena beberapa kelemahan desain pada kontrak Echo di Monad:

| Kelemahan | Dampak |
|-----------|--------|
| Single signature untuk admin role | Satu private key bisa mencetak token tanpa batas |
| Tidak ada timelock | Perubahan sensitif bisa dieksekusi instan |
| Tidak ada mint supply cap | Peretas bisa mencetak token tanpa batas |
| Tidak ada rate limit | 1.000 eBTC bisa dicetak dalam satu transaksi |
| Tidak ada supply sanity check di Curvance | Agunan ilegal diterima tanpa verifikasi |

Sebuah assessment risiko pra-insiden dari CORE.3 dilaporkan sudah memprediksi probabilitas kerugian yang sangat tinggi (90/99) pada protokol ini.

### Respons Tim Echo Protocol

Tim Echo merilis pernyataan resmi melalui akun X mereka dengan beberapa poin penting:

- Insiden **terisolasi di Monad**, deployment di Aptos tidak terdampak
- aBTC (Aptos) dan eBTC (Monad) adalah aset terpisah yang tidak bisa dijembatani
- Eksposur di Aptos sangat minimal (~$71 ribu di lending market dan pool Hyperion)
- Tindakan yang diambil: pause bridge Monad, upgrade kontrak, revoke akses peretas, dan pause bridge Aptos sebagai langkah pencegahan
- Tim sedang melakukan review menyeluruh terhadap manajemen key, permission, mint control, dan operational security

Curvance juga merespons cepat dengan mem-pause market eBTC Echo setelah mendeteksi anomali. Desain isolated market Curvance membantu membatasi dampak agar tidak menyebar ke aset lain.

### Dampak ke Ekosistem Monad

Jaringan Monad sendiri **tidak dikompromikan** dan tetap beroperasi normal. Exploit terjadi di tingkat kontrak aplikasi, bukan di blockchain layer-1. Namun, insiden ini menjadi pengingat bagi ekosistem Monad yang masih relatif baru tentang pentingnya keamanan kontrak dan standar minimum seperti multisig dan timelock.

### Gelombang Eksploitasi di Mei 2026

Mei 2026 menjadi bulan yang berat bagi keamanan DeFi. Setidaknya 12 protokol telah dikompromikan bulan ini, termasuk:

- THORChain - exploit senilai $10 juta
- [Verus Protocol](https://www.cryptosynth.id/blog/verus-ethereum-bridge-hack-11-juta-dolar-2026/) - Ethereum bridge hack $11 juta
- Transit Finance - kerugian $1,88 juta
- KelpDAO - [eksploitasi $293 juta](https://www.cryptosynth.id/blog/kelpdao-hack-293-juta-defi-matu-2026/)
- TrustedVolumes dan Ekubo

Ini pola yang mengkhawatirkan: serangan terfokus pada kontrak DeFi dengan kelemahan administratif. Buat kamu yang main di Indonesia, makin selektif milih protokol buat nyimpen atau minjemin aset, apalagi yang related sama BTC. Dari 12 protokol yang kena hack bulan ini, 8 di antaranya punya kelemahan di admin key atau infrastruktur bridge, bukan smart contract. Artinya, protokol dengan TVL gede pun bisa tumbang kalo keamanan operasionalnya lemah.

### Yang bisa dipelajari

Ukuran TVL atau popularitas protokol bukan jaminan aman. Echo Protocol adalah protokol BTCFi yang lagi naik daun, tapi kelemahan fundamental di admin key-nya bikin rentan. Prinsip "not your keys, not your crypto" berlaku juga di level smart contract , protokol dengan single point of failure di admin key risikonya sama kayak exchange terpusat.

Yang menarik, pemulihan 955 eBTC ($73 juta) oleh tim Echo termasuk langka di insiden peretasan DeFi. Biasanya dana yang dicuri gak balik lagi. Keberhasilan ini nunjukin respons cepet dan koordinasi sama mitra kayak Curvance bisa bikin perbedaan signifikan dalam batasin kerugian.

## Sumber

1. [Cointelegraph - Echo Protocol's eBTC exploited for $77M in admin key compromise](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise) (19 Mei 2026)
2. [CoinDesk - Echo Protocol suffers $76 million exploit in eBTC minting attack on Monad](https://www.coindesk.com/business/2026/05/19/echo-protocol-suffers-usd76-million-exploit-in-ebtc-minting-attack-on-monad) (19 Mei 2026)
3. [X/EchoProtocol - Official incident response thread](https://x.com/EchoProtocol_/status/2056623150620873200) (19 Mei 2026)

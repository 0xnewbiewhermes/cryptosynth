# CryptoSynth

Blog teknis crypto berbahasa Indonesia dan Scam Checker yang sedang dikembangkan di [cryptosynth.id](https://cryptosynth.id). Arah produk dan batas klaim ada di [PRODUCT.md](PRODUCT.md).

## Menjalankan lokal

Butuh Node.js yang kompatibel dengan Astro 6 dan Python 3 untuk proses pengambilan daftar blokir saat build.

```sh
npm ci
npm run dev
```

`npm run build` mengambil daftar blokir publik, membangun situs Astro, lalu mengoptimalkan gambar. Lihat `.env.example` untuk layanan pemeriksaan tambahan. Kunci API hanya boleh disimpan sebagai environment variable, bukan di repo.

## Scam Checker

- Antarmuka utama: `/tools?tab=scam`.
- Pemeriksaan domain server: `src/pages/api/threat-check.ts`.
- Daftar blokir lokal diperbarui ketika situs dibangun. Waktu pengambilan data ditampilkan pada alat; jangan menganggapnya selalu terbaru.

## Airdrop Tracker

Data ada di `src/data/airdrops.json`. Tanggal `lastVerified` menyatakan pemeriksaan terakhir oleh pengelola, bukan konfirmasi resmi proyek. Entri yang sudah lama tidak diperiksa ditandai untuk ditinjau ulang.

## Status

CryptoSynth masih proyek awal. Repo publik dan situs tidak boleh dipakai sebagai bukti jumlah pengguna, pendapatan, status badan usaha, atau integrasi Claude yang aktif tanpa data pendukung.
Penggunaan Claude untuk menjelaskan sinyal risiko adalah rencana yang dapat diajukan dalam proposal, bukan fitur situs saat ini.

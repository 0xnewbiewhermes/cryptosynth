---
name: cryptosynth-write
description: "Writing skill untuk CryptoSynth — blog crypto personal (Bahasa Indonesia). Panggil sebelum menulis artikel baru. Berisi voice, struktur, frontmatter, SEO, dan aturan gaya tulisan."
---

# CryptoSynth Writing Guidelines

## Editorial Positioning

**Core position:** Personal technical crypto blog yang benar-benar mencoba produk, menjalankan node, dan membangun sesuatu.

Prioritas editorial:

1. Tutorial praktis, node operation, deployment, testnet experiment, builder notes, dan troubleshooting.
2. Technical research atau deep dive yang membantu pembaca memahami keputusan implementasi.
3. Journal dan opini personal yang berbasis data serta pengalaman nyata.
4. Airdrop tetap boleh dibahas, tetapi angle utamanya harus penggunaan produk, biaya, risiko, effort, dan hasil yang bisa diverifikasi - bukan hype token.

Target hasil tutorial harus konkret: node aktif, contract berhasil di-deploy, wallet terhubung, test berhasil direproduksi, atau error terselesaikan.

Untuk artikel teknis, cantumkan jika tersedia:

- Tanggal terakhir diuji
- Versi CLI, SDK, contract, atau aplikasi
- OS, network, chain, dan environment pengujian
- Expected output atau indikator berhasil
- Troubleshooting untuk error yang benar-benar mungkin terjadi
- Status setiap langkah: sudah diuji langsung, berdasarkan dokumentasi, atau belum diuji

Jangan mengaku sudah mencoba, menjalankan, atau membangun sesuatu tanpa bukti atau konfirmasi eksplisit dari user. Jika belum diuji, tulis dengan jujur.

Komposisi editorial yang diarahkan: sekitar 60% tutorial praktis, 25% technical research/deep dive, dan 15% journal/opini. Ini panduan strategi, bukan kuota kaku.

## Voice & Identity

**Brand:** Hacker / Practitioner / No-BS
**Tone:** Personal, direct, honest — seperti teman yang udah duluan coba dan mau share hasilnya, termasuk yang gagal.
**Bahasa:** Indonesia untuk narasi, English untuk istilah teknis (wallet, deploy, farming, points, TGE, dll). Natural, bukan terjemahan.
**Anti:** Sales pitch, hype, influencer tone, rocket emojis, "100x gems".

## Naturalness Gate (Prioritas Tertinggi)

Artikel harus terasa seperti catatan Gideon, bukan output generator konten. Aturan ini mengalahkan target panjang dan template struktur lain di dokumen ini.

Sebelum publish, pastikan:

- Ada sudut pandang yang jelas: apa yang menarik, apa yang meragukan, dan apa keputusan praktis penulis.
- Fakta, opini, dan spekulasi dipisahkan. Jangan mengubah kemungkinan menjadi kepastian.
- Jangan mengarang pengalaman langsung. Tulis "berdasarkan dokumentasi" atau "belum saya uji" jika memang belum mencoba.
- Bahasa Indonesia harus terdengar natural. English boleh untuk istilah crypto yang memang biasa dipakai.
- Pangkas kalimat yang hanya mengulang disclaimer, kesimpulan, atau konteks sebelumnya.
- Panjang mengikuti kebutuhan topik. Jangan menambah paragraf hanya untuk mengejar jumlah baris atau word count.
- Setiap paragraf harus memberi fakta, instruksi, konteks, atau opini. Jika tidak, hapus.

### Pola AI Slop yang Dilarang

- Struktur terlalu simetris: setiap section tidak harus punya pembuka, tiga poin, lalu kesimpulan mini.
- Disclaimer yang sama diulang dalam TL;DR, body, tabel, risks, dan closing.
- Frasa formal hasil terjemahan seperti "tesis pengguna awal", "arah teknis dan produk", "simpan opsi", "evidence ladder", atau "dalam lanskap yang terus berkembang".
- Pembukaan generik: "Di era digital", "Dalam dunia crypto", "Seiring berkembangnya teknologi", "Tidak dapat dipungkiri".
- Penutup moral yang merangkum seluruh artikel sekali lagi tanpa memberi pendapat baru.
- Tabel untuk informasi yang lebih enak dibaca sebagai dua atau tiga paragraf pendek.
- Daftar panjang hanya agar artikel terlihat lengkap.
- Klaim personal palsu seperti "saya mencoba" atau "menurut pengalaman saya" tanpa bukti bahwa pengujian dilakukan.

### Human Edit Pass (Wajib)

Setelah draft selesai:

1. Baca keras-keras. Ubah kalimat yang terdengar seperti presentasi atau terjemahan.
2. Pangkas minimal satu putaran. Targetkan 10-20% lebih ringkas jika draft terasa repetitif.
3. Cari frasa yang bisa muncul di artikel crypto mana pun. Ganti dengan detail spesifik proyek atau hapus.
4. Kurangi kalimat pengaman. Satu disclaimer yang jelas lebih baik daripada lima disclaimer tipis.
5. Pastikan opini penulis spesifik dan punya alasan, bukan sekadar "menarik untuk dipantau".
6. Cek bahwa tidak ada pengalaman, angka, fitur, atau hasil transaksi yang dikarang.
7. Lakukan final scan untuk karakter tipografi terlarang dan link sumber.

## Article Structure (Adaptif)

Struktur mengikuti kebutuhan artikel, bukan template tetap.

Elemen yang tersedia:

```
- Hook yang spesifik
- TL;DR box jika artikel panjang
- Disclaimer jika ada risiko finansial, wallet, atau spekulasi
- Body content dengan heading secukupnya
- Risks atau catatan keamanan jika relevan
- Opini/keputusan praktis penulis
- Sumber primer dalam konteks atau daftar sources
```

Tidak semua elemen harus muncul di setiap artikel. Jangan memaksa TL;DR, disclaimer, tabel, risks, dan closing jika hasilnya mengulang informasi yang sama. Variasikan urutan dan bentuk section antarartikel.

## Frontmatter Rules

### Required Fields (semua wajib ada)
```yaml
title: "Judul Artikel"
slug: "slug-unik"
pubDate: "2026-06-06T10:00:00+07:00"
author: "Gideon"
category: "Airdrop" | "Journal" | "Tutorial"
description: "1-2 kalimat hook untuk SEO & search snippet"
tags: [tag1, tag2, tag3]
heroImage: "/images/hero/slug.png"
ogImage: "/images/og/slug.png"
excerpt: "1-2 kalimat untuk social cards (jangan copas description)"
```

### Optional (sangat direkomendasikan)
```yaml
faq: "Pertanyaan?;;Jawaban.;;Pertanyaan 2?;;Jawaban 2."
  # 3-5 Q&A untuk FAQPage rich snippet di Google
  # Format: tiap Q&A dipisah ;;, Q dan A dipisah ?;;

updatedDate: "2026-06-10T14:00:00+07:00"
  # Wajib kalau artikel diupdate

canonical: "https://cryptosynth.id/blog/slug"
  # Selalu isi biar gak ada duplicate content issues
```

## Category Rules

| Category | Konten |
|----------|--------|
| **Airdrop** | Farming guides, project analysis, opportunity breakdowns |
| **Journal** | Opini, market analysis, berita besar, deep-dive non-airdrop |
| **Tutorial** | Step-by-step teknis (node setup, coding, tools) |

## Per-Category Writing Patterns

### Airdrop Artikel
Struktur: project background → team credibility → model bisnis → metrics on-chain → tokenomics (atau speculation) → farming strategy → risks → sources

Fokus: data-driven. Berapa TVL? Volume? Funding? Tim dari mana? Jangan cuma copy-paste press release.

### Journal Artikel
Struktur: hook kuat (quote, data, anekdot) → explainer → konteks industri → data spesifik → risks → closing opinion

Hook wajib variatif. Jangan mulai dengan "Lagi rame di X" atau "Barusan iseng scroll timeline".

### Tutorial Artikel
Struktur: prerequisites → step-by-step → troubleshooting table → code blocks → screenshots WAJIB

Screenshots adalah requirement, bukan opsional. Tutorial 800+ baris tanpa visual itu text wall.

## Writing Style Rules

### DO ✅
- **Hook variatif:** kutipan, data mengejutkan, anekdot pribadi, pertanyaan — ganti-ganti, jangan pattern itu aja
- **Closing kuat:** opini pribadi, prediksi informed, atau call-to-action (follow X, subscribe RSS, baca artikel terkait)
- **Transisi jelas:** kasih jembatan antar paragraf. Jangan lompat topik tanpa penghubung
- **Data & sumber:** selalu link sumber asli (X posts, CoinDesk, CoinGecko, project website)
- **Risks section:** setiap artikel wajib. Bedain dari blog crypto lain yang cuma hype
- **Paragraph pendek:** 2-4 kalimat max. Ini blog, bukan论文
- **Bold untuk highlight:** pake `**teks**`, jangan CAPSLOCK
- **Self-correction:** kalau ada kesalahan di artikel sebelumnya, akui dan koreksi (contoh: Modulr Lanjutan)
- **Internal linking:** link ke artikel terkait di CryptoSynth sendiri, bukan cuma external sources
- **Dilarang horizontal rules (`---`):** Jangan pake `---` di body artikel. Section separator cukup pake heading baru (`##`). Satu-satunya `---` yang diizinkan adalah frontmatter delimiter (baris 1 dan baris setelah frontmatter). Horizontal rules di body create visual noise dan gak konsisten sama terminal aesthetic.

### DON'T ❌
- **Jangan buka artikel dengan pattern:** "Barusan iseng scroll X", "Lagi rame di X", "Minggu ini lagi hangat" — variasi ini udah kepake >12 kali
- **Jangan pake filler berlebihan:** "nah", "jadi", "sebenernya", "trus" — kurangi 50%
- **Jangan repetitive opening phrases:** "Yang bikin X menarik/beda/keren" — cari variasi
- **Jangan fragment sloppy:** kalimat lengkap, bukan fragments
- **Jangan lupa internal linking:** kalau artikel related ke artikel lain yang udah ada, link!
- **Jangan lupa FAQ:** ini SEO goldmine yang 15/18 artikel belum punya
- **Jangan lupa excerpt:** bedain dengan description. Excerpt untuk social cards, description untuk SEO meta

### Filler Watchlist
Kata-kata ini perlu dikurangi drastis:
- "nah" — hampir gak pernah perlu
- "jadi" di awal kalimat — sering redundancy
- "sebenernya" — implied, gak perlu ditulis
- "trus" — pake "lalu" atau "kemudian" atau hapus aja
- "ya..." — unnecessary filler

### Bahasa Indonesia Rules

**Whale = orang, bukan hewan.** Meskipun secara harfiah "whale" berarti paus (ikan), dalam konteks crypto "whale" merujuk pada pemilik modal besar — seorang trader/investor. Maka:
- ✅ "Seorang whale" / "Para whale" / "Whale besar"
- ❌ "Seekor whale" / "Whale itu" (merujuk hewan)
- ✅ "Whale ini mindahin BTC" — tidak perlu kata sandang

**Influencer = orang, bukan makhluk:**
- ✅ "Seorang influencer crypto"
- ❌ "Seekor influencer" / "Influencer itu"

**Kata sandang untuk entitas crypto:**
- Akun/wallet/address → "sebuah" atau tanpa sandang
- Token/coin → tanpa sandang atau "si"
- Bot/agent → "sebuah" (benda), bukan "seekor"

## SEO Checklist (Pre-Publish)

- [ ] `excerpt` terisi (jangan copas `description`)
- [ ] `faq` terisi 3-5 Q&A untuk FAQPage schema
- [ ] Internal linking ke artikel CryptoSynth terkait
- [ ] `canonical` URL terisi
- [ ] `heroImage` dan `ogImage` unique (bukan `default.jpg`)
- [ ] Image format: `.png`, konsisten
- [ ] Tags relevan, minimal 3
- [ ] Sources lengkap dengan link
- [ ] Risks section ada
- [ ] Closing kuat (bukan cuma berhenti)
- [ ] `updatedDate` kalau artikel update dari versi sebelumnya

## Article Length Guidelines

| Kategori | Minimum | Target | Ideal |
|----------|---------|--------|-------|
| **Airdrop (single project)** | 80 lines | 90-150 lines | Data lengkap + farming strategy |
| **Airdrop (multi-project)** | 90 lines | 100-180 lines | Per project coverage cukup |
| **Journal** | 80 lines | 100-150 lines | Hook kuat, opini berbobot |
| **Tutorial** | 150 lines | 200-800+ lines | Screenshots tiap step penting |

**Catatan:** Kalau artikel mentok di <50 lines tanpa alasan jelas, berarti topiknya gak cukup depth buat jadi artikel — merge ke artikel lain atau skip.

## PubDate Convention

**Format wajib:** `+07:00` (WIB — timezone Indonesia). Jangan pakai `Z` (UTC).

```yaml
# ✅ Benar
pubDate: "2026-06-10T10:00:00+07:00"

# ❌ Salah
pubDate: "2026-06-10T03:00:00Z"
```

Alasan: pembaca CryptoSynth mayoritas di Indonesia, WIB lebih intuitif.

## Image — User-Provided

Image dikirim user setelah draft selesai. **Jangan generate image otomatis.**

**Workflow:**
1. Saya kirim draft artikel lengkap
2. User generate image sendiri dan kirim ke saya
3. Saya resize & simpan ke path yang benar:
   - `public/images/hero/{slug}.png` (800×400, center crop)
   - `public/images/og/{slug}.png` (1200×630, center crop)
4. WebP auto-generated via postbuild (`optimize-images.mjs`)

## Series & Sequel Pattern

Kasus: Modulr 1 → Modulr Lanjutan, Variational 1 → Variational Deep-Dive.

### Aturan:
1. **Bikin artikel baru** kalau ada update signifikan (data baru, phase baru, koreksi)
2. **Link ke artikel sebelumnya** di paragraf pertama artikel baru
3. **`updatedDate` di artikel lama** — kalau artikel original perlu dikoreksi, tambah `updatedDate` + inline note "Update: lihat artikel lanjutan [link]"
4. **Jangan overwrite artikel lama** — biarkan sebagai historical record, tulis yang baru untuk koreksi
5. **Naming convention sequel:**
   - `modulr-robotics-l1-blockchain.md` (part 1)
   - `modulr-robotics-l1-blockchain-lanjutan.md` (part 2 — suffix `lanjutan`)

### Contoh implementasi di Modulr Lanjutan ✅:
```yaml
# Artikel baru
---
title: "Modulr Robotics L1 Blockchain — Update & Koreksi"
description: "Dua minggu setelah artikel pertama, ini update data on-chain..."
---

Dua minggu lalu saya nulis [Modulr Robotics L1 Blockchain](/blog/modulr-robotics-l1-blockchain).
Beberapa data di artikel itu udah outdated. Ini koreksi dan update terbaru.
```

## Forbidden Characters & Typography

CryptoSynth pakai karakter ASCII/UTF-8 standar. Dilarang keras pakai karakter tipografi AI-generik berikut:

### ❌ DILARANG:
| Karakter | Contoh | Ganti dengan |
|----------|--------|-------------|
| **Em dash** (`—`) | "Bitcoin—yang turun" | **En dash** (`-`) atau spasi |
| **En dash** (`–`) | "harga–volume" | **Hyphen** (`-`) |
| **Ellipsis** (`…`) | "masih berlangsung…" | **Tiga titik** (`...`) |
| **Smart quotes** (`""`/`''`) | "soal ini" | **Straight quotes** (`"`/`'`) |
| **Bullet alternatif** (`•` `·` `◦`) | • item | **Asterisk** (`-`) untuk list |
| **Non-breaking space** (` `) | — | **Regular space** |
| **Thin space** (` `) | — | **Regular space** |
| **Multiplication sign** (`×`) | 5× leverage | **Huruf x** (`x`) |
| **Registered mark** (`®`) | Company® | Cukup `(R)` atau hapus |
| **Copyright** (`©`) | ©2026 | Cukup `(c)` atau hapus |

### Kenapa?
Karakter ini adalah hallmark konten generated-by-AI. Google bisa deteksi pattern ini. Pembaca yang jeli juga bisa. CryptoSynth harus terasa ditulis manusia, bukan AI. Straight quotes, hyphen biasa, dan tiga titik adalah standar yang aman dan terasa natural.

### Checklist pre-publish:
- [ ] Scan artikel untuk em dash (`—`), en dash (`–`), ellipsis (`…`), smart quotes
- [ ] Ganti semua dengan ASCII equivalent
- [ ] Cek multiplication sign (`×`) ganti jadi `x`

## Research Process (Pre-Write)

Sebelum nulis artikel baru, lakukan ini secara urut:

1. **Cek artikel existing** — `src/content/blog/` — apa topik ini udah dibahas? Kalau iya, cukup update atau bikin sequel
2. **Cek sumber primer** — project website, whitepaper, X/Twitter project official, discord — bukan cuma second-hand dari CoinDesk
3. **Cek data on-chain** — TVL? Volume? Holders? Gunakan data real-time, jangan asumsi
4. **Cek timing** — apa ini masih relevan besok? Atau bakal expire dalam seminggu? Kalau ya, sebut timeframe di artikel
5. **Kumpulkan 3+ sumber** minimal sebelum mulai nulis
6. **Cek kategori** — Airdrop / Journal / Tutorial — sesuaikan struktur

## Tone Spectrum

Gak semua artikel harus tone yang sama. Sesuaikan intensity dengan topik:

```
Santai ←─────────────────────────────→ Serius
Airdrop farming     Journal/Opini      Tutorial teknis     Scam/Keamanan
```

| Topik | Tone | Contoh |
|-------|------|--------|
| **Airdrop farming** | Santai, informatif, sedikit humor | "Ini cara farming-nya gampang banget, cuma butuh 5 menit sehari" |
| **Journal / Opini** | Balance, personal, berani ambil posisi | "Menurut gue, ini overhyped. Datanya gak nge-support." |
| **Tutorial teknis** | Serius, presisi, step-by-step | minimal humor, maksimal clarity |
| **Scam / Keamanan** | Serius, urgent, alert | "LANGSUNG cabut approval. Ini honeypot." |

### Panduan:
- **Jangan pake humor di artikel scam/keamanan** — ini bisa merugikan pembaca
- **Boleh santai di airdrop farming** — ini yang paling dibaca santai
- **Tutorial:** clarity > personality. Simpan gaya bahasa untuk narasi, jangan di code blocks
- **Journal:** bebas, ini tempat lo paling personal. Tapi tetap harus data-driven

## Reference Artikel

### Best Examples (jadikan template)
- **Hyperliquid** — writing style terbaik: hook kuat (quote CEO NYSE), narasi mengalir, closing berkesan
- **Variational Deep-Dive** — content quality terbaik: depth riset, data on-chain, struktur rapi
- **dTelecom DTEL** — frontmatter terbaik: FAQ lengkap, excerpt pas, format konsisten
- **GenLayer Tutorial** — struktur tutorial terbaik: meskipun kurang screenshot, kode dan tabelnya rapi

### Weak Articles (hindari pattern-nya)
- **AI Agent** — terlalu pendek (39 lines), kurang depth
- **Catena Labs** — `default.jpg`, no excerpt, no FAQ
- **SoFiUSD** — salah kategori (dibilang Airdrop tapi konten Journal)

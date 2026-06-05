---
name: cryptosynth-write
description: "Writing skill untuk CryptoSynth — blog crypto personal (Bahasa Indonesia). Panggil sebelum menulis artikel baru. Berisi voice, struktur, frontmatter, SEO, dan aturan gaya tulisan."
---

# CryptoSynth Writing Guidelines

## Voice & Identity

**Brand:** Hacker / Practitioner / No-BS
**Tone:** Personal, direct, honest — seperti teman yang udah duluan coba dan mau share hasilnya, termasuk yang gagal.
**Bahasa:** Indonesia untuk narasi, English untuk istilah teknis (wallet, deploy, farming, points, TGE, dll). Natural, bukan terjemahan.
**Anti:** Sales pitch, hype, influencer tone, rocket emojis, "100x gems".

## Article Structure (Wajib)

Setiap artikel minimal harus punya:

```
1. Hook (variatif, jangan pattern itu-itu aja)
2. TL;DR box
3. Disclaimer box
4. Body content
5. Risks section (WAJIB — bedain dari blog crypto lain)
6. Closing opinion/prediksi/CTA (JANGAN cuma berhenti)
7. Sources (link)
```

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

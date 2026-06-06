---
title: "Tutorial Install OptimAI Core Node di VPS: CLI Setup + Systemd Service"
slug: optimai-cli-core-node-install-tutorial
category: "Tutorial"
description: "Panduan lengkap install OptimAI CLI Core Node di VPS Linux. Dari download binary, setup systemd service, sampai monitoring reward OPI token."
excerpt: "Tutorial install OptimAI Core Node di VPS pake CLI. Cuma butuh Docker, download binary, login, dan jalankan. Spesifikasi ringan: 4GB RAM, 2 core, 15GB disk."
pubDate: 2026-05-27T21:15:00+07:00
author: "Gideon"
tags:
  - optimai
  - tutorial
  - node
  - vps
  - depin
  - cli
  - core-node
  - opi
heroImage: "/images/hero/optimai-cli-core-node-install-tutorial.png"
ogImage: "/images/og/optimai-cli-core-node-install-tutorial.png"
---

<div class="tldr-box">
<strong>TL;DR:</strong> Tutorial install OptimAI Core Node di VPS pake CLI. Cuma butuh Docker, download binary, login, dan jalankan. Saya sertakan setup systemd service biar node jalan 24/7 tanpa screen/nohup. Spesifikasi ringan: 4GB RAM, 2 core, 15GB disk. Reward OPI token belum TGE tapi sudah terakumulasi.
</div>

<div class="disclaimer-box">
<strong>⚠️ Disclaimer:</strong> Semua yang ditulis di sini adalah <strong>catatan pribadi</strong>, bukan saran keuangan atau ajakan investasi. Saya bukan financial advisor. Risiko rugi ada di setiap keputusan crypto. Selalu DYOR (*do your own research*) sebelum ambil keputusan.
</div>

Beberapa waktu lalu saya udah nulis [soal OptimAI Network dan cara farming lewat node](/blog/optimai-network-airdrop-node-farming-mei-2026). Di catatan itu saya bahas overview project, tier node, dan strategi farming secara umum. Sekarang saya mau breakdown secara teknis: gimana cara install Core Node di VPS dari nol.

Ini berdasarkan pengalaman saya jalanin Core Node di VPS Ubuntu. Step-by-step-nya ternyata cukup simpel.

## Yang Kamu Butuhkan

Sebelum mulai, pastikan VPS kamu memenuhi syarat:

- **OS**: Ubuntu 22.04 atau lebih baru
- **RAM**: 4GB minimum (8GB recommended)
- **CPU**: 2 core atau lebih
- **Disk**: 15GB kosong
- **Docker**: harus terinstall
- **Akun OptimAI**: daftar dulu di dashboard

Kalo belum punya Docker, install dulu:

```bash
curl -fsSL https://get.docker.com | sh
```

Satu command, beres. Script auto-detect distro dan install Docker Engine + Docker Compose.

## Step 1: Download CLI Binary

```bash
curl -L https://cli-node.optimai.network/optimai_cli_ubuntu -o optimai-cli
```

Buat macOS pakai URL `https://cli-node.optimai.network/optimai_cli_darwin_universal2`, dan Windows `https://cli-node.optimai.network/optimai_cli_windows.exe`.

Setelah download, bikin executable dan pindah ke PATH:

```bash
chmod +x optimai-cli
sudo mv optimai-cli /usr/local/bin/optimai-cli
```

Verifikasi:

```bash
optimai-cli --version
```

Harusnya muncul versi CLI-nya. Kalo command not found, cek apakah `/usr/local/bin` ada di PATH kamu.

## Step 2: Login

Ada dua cara login:

**Browser-based (recommended):**

```bash
optimai-cli auth login
```

Ini kasih URL yang kamu buka di browser. Login pake akun OptimAI yang udah didaftar, authorize, dan CLI otomatis dapet token.

**Legacy (email + password):**

```bash
optimai-cli auth login --legacy
```

Langsung input email dan password di terminal. Cocok buat VPS yang gak punya akses browser.

Setelah login, verifikasi:

```bash
optimai-cli auth status
```

Harusnya muncul email akun kamu.

## Step 3: Jalankan Node

```bash
optimai-cli node start
```

Node langsung mulai dan connect ke jaringan OptimAI. Kamu liat log real-time: koneksi ke peer, task assignments, dan data yang diproses.

Cek status kapan aja:

```bash
optimai-cli node status
```

Nunjukin apakah node jalan, Docker available, dan PID-nya.

## Step 4: Systemd Service (24/7)

Kalo kamu cuma pakai `optimai-cli node start` di terminal, node mati pas kamu close session. Buat jalanin 24/7 di VPS, setup systemd service:

```bash
sudo tee /etc/systemd/system/optimai.service > /dev/null << 'EOF'
[Unit]
Description=OptimAI Node
After=network.target docker.service
Wants=docker.service

[Service]
Type=simple
ExecStart=/usr/local/bin/optimai-cli node start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable dan start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable optimai
sudo systemctl start optimai
```

Cek status:

```bash
sudo systemctl status optimai
```

Harusnya `active (running)`. Kalo node crash, systemd auto-restart dalam 10 detik. Ini yang saya pakai di VPS: jalan terus tanpa perlu screen atau nohup.

## Step 5: Pantau Reward

```bash
optimai-cli rewards balance
```

Nunjukin total reward yang terakumulasi. Di VPS saya, reward naik sekitar 2-3% per hari dari pantauan terakhir.

Kamu juga bisa pantau lewat dashboard web di [node.optimai.network/register?ref=5AE81A85](https://node.optimai.network/register?ref=5AE81A85): ada balance real-time, contribution statistics, reward history, dan active tasks.

## Command Reference

Beberapa command yang sering kamu pakai:

| Command | Fungsi |
|---------|--------|
| `optimai-cli auth login` | Login via browser |
| `optimai-cli auth login --legacy` | Login via email/password |
| `optimai-cli auth status` | Cek status login |
| `optimai-cli auth me` | Info akun |
| `optimai-cli node start` | Start node |
| `optimai-cli node status` | Cek status node |
| `optimai-cli rewards balance` | Cek reward |
| `optimai-cli update` | Update CLI ke versi terbaru |

## Tips dari Pengalaman

**Resource usage ringan.** Di VPS saya, Core Node makan sekitar 300MB RAM. Kalo kamu jalanin bareng project lain (yang saya juga lakuin), masih muat asal total RAM cukup.

**Update berkala.** OptimAI sering update CLI-nya. Cek secara periodik:

```bash
optimai-cli update
```

Kalo ada update, restart service:

```bash
sudo systemctl restart optimai
```

**Log troubleshooting.** Kalo node bermasalah, cek log systemd:

```bash
sudo journalctl -u optimai -f
```

Ini nunjukin log real-time. Biasanya kalo ada issue, paling sering soal koneksi Docker atau network timeout.

**Jangan lupa Docker.** Core Node butuh Docker buat jalan. Kalo Docker gak running, node gagal start. Pastikan Docker service aktif:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

## Soal Reward dan TGE

Token OPI belum ada TGE. Reward yang terakumulasi dikonversi pas token launch, tapi detail mekanismenya belum diumumkan secara resmi.

Yang saya lihat: reward dihitung berdasarkan volume kontribusi (data yang diproses), kualitas data, partisipasi di tasks, dan referral. Bukan sekedar "nyala doang dapet token." Ada tugas nyata yang dikerjain: data mining, validasi, dan computing.

Dari milestone terakhir, OptimAI udah tembus [2 juta node terinstall](https://x.com/OptimaiNetwork/status/2054922238634148121). Jaringan terus tumbuh, dan makin banyak data yang diproses berarti makin kuat posisi project ini.

## Penutup

Install OptimAI Core Node di VPS itu straightforward: download binary, login, start, setup systemd. Gak perlu konfigurasi rumit atau spesifikasi tinggi. Dalam 10 menit udah jalan.

Bandingin sama [artikel pertama saya soal OptimAI](/blog/optimai-network-airdrop-node-farming-mei-2026) yang lebih ke overview, di sini saya fokus ke aspek teknis installasi. Buat yang mau mulai farming serius lewat Core Node, panduan ini harusnya cukup buat jalan.

Kalo ada pertanyaan soal setup atau troubleshooting, cek [dokumentasi resmi OptimAI](https://docs.optimai.network/docs/optimai-node/core-node) atau tanya di komunitas mereka.


**Sumber:**
- [OptimAI CLI Node GitHub](https://github.com/OptimaiNetwork/OptimAI-CLI-Node)
- [OptimAI Core Node Docs](https://docs.optimai.network/docs/optimai-node/core-node)
- [OptimAI Node Dashboard](https://node.optimai.network/register?ref=5AE81A85)
- [OptimAI Network X: 2M Nodes](https://x.com/OptimaiNetwork/status/2054922238634148121)

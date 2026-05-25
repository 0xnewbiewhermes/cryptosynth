---
title: "From Zero to GenLayer (Part 2): Membangun Intelligent Contract Dispute Resolution"
description: "Tulis Intelligent Contract Python untuk dispute resolution di GenLayer. Dua pihak setor deposit, GenLayer jadi hakim AI yang bisa akses web dan panggil LLM."
excerpt: "Panduan langkah demi langkah menulis Intelligent Contract Python untuk dispute resolution — dua pihak setor deposit, GenLayer memutuskan pemenang via AI consensus."
pubDate: 2026-05-25T13:00:00+07:00
category: "Tutorial"
tags: ["genlayer", "tutorial", "intelligent contract", "python", "dispute resolution", "smart contract"]
author: "CryptoSynth Research"
faq: "Apa itu Intelligent Contract?;;Intelligent Contract adalah evolusi dari smart contract tradisional yang bisa memahami bahasa alami, mengakses internet, dan menggunakan AI. Ditulis dalam Python dan berjalan di GenLayer blockchain dengan konsensus validator AI.;;Bagaimana struktur Intelligent Contract GenLayer?;;Formatnya mirip Python class biasa yang extend gl.Contract, dengan method view (read-only) dan write (modify state), constructor (__init__), dan dekorator @gl.public.view/@gl.public.write.;;Apa itu Equivalence Principle di kode?;;Mekanisme dimana validator membandingkan hasil eksekusi Leader menggunakan aturan yang developer tentukan. Untuk non-deterministic operations, developer bisa tulis custom validator function menggunakan gl.eq_principle.strict_eq()."
---

> **TL;DR:** Kita akan membangun Intelligent Contract dispute resolution dalam Python. Contract ini memungkinkan dua pihak menyetor deposit, lalu GenLayer bertindak sebagai hakim AI yang menganalisis bukti dari web dan memutuskan pemenang.

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Kode ini adalah contoh edukatif. Jangan gunakan untuk transaksi asli tanpa audit keamanan profesional.
</div>

## Sebelum Mulai

Pastikan kamu paham konsep dari [Part 1](/blog/genlayer-tutorial-part-1-konsep-optimistic-democracy/). Kita akan praktek langsung dengan **GenLayer Studio** — IDE online yang bisa kamu akses gratis di [studio.genlayer.com](https://studio.genlayer.com).

## Yang Akan Kita Bangun

Sebuah **Escrow Dispute Resolution Contract** dengan alur:

1. **Pembuat Sengketa (Creator)** — setor deposit + deskripsi barang/jasa
2. **Pihak Lawan (Counterparty)** — setor deposit yang sama
3. **Eksekusi** — jika kedua pihak setuju, dana dikembalikan
4. **Sengketa** — jika tidak setuju, GenLayer sebagai hakim:
   - Akses URL bukti yang diberikan
   - Analisis dengan LLM
   - Putuskan siapa yang menang
5. **Penyelesaian** — dana dikirim ke pemenang

## Struktur Contract

```python
# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json
from dataclasses import dataclass
```

### Data Types

```python
@allow_storage
@dataclass
class Dispute:
    id: str
    creator: str
    counterparty: str
    description: str
    amount: u256
    evidence_url: str
    status: str          # "pending", "active", "resolved"
    winner: str
    created_at: u256
```

### Contract Class

```python
class DisputeResolution(gl.Contract):
    disputes: TreeMap[str, Dispute]
    escrow_balances: TreeMap[str, u256]
    dispute_count: u256

    def __init__(self):
        self.dispute_count = u256(0)
```

### Membuat Sengketa

```python
    @gl.public.write
    def create_dispute(
        self,
        description: str,
        counterparty: str,
        evidence_url: str
    ) -> str:
        """Buat sengketa baru. Creator harus setor deposit."""
        sender = gl.message.sender_address
        deposit = gl.message.value

        if deposit == 0:
            raise Exception("Deposit harus lebih dari 0")

        dispute_id = str(int(self.dispute_count) + 1)
        self.dispute_count = u256(int(self.dispute_count) + 1)

        dispute = Dispute(
            id=dispute_id,
            creator=sender.as_hex,
            counterparty=counterparty,
            description=description,
            amount=deposit,
            evidence_url=evidence_url,
            status="pending",
            winner="",
            created_at=u256(gl.block.number),
        )

        self.disputes[dispute_id] = dispute
        self.escrow_balances[sender.as_hex] = deposit

        return dispute_id
```

### Bergabung ke Sengketa

```python
    @gl.public.write
    def join_dispute(self, dispute_id: str) -> None:
        """Counterparty bergabung dan setor deposit yang sama."""
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            raise Exception("Sengketa tidak ditemukan")

        if dispute.status != "pending":
            raise Exception("Sengketa sudah aktif atau selesai")

        sender = gl.message.sender_address

        if sender.as_hex != dispute.counterparty:
            raise Exception("Hanya counterparty yang bisa join")

        if gl.message.value != dispute.amount:
            raise Exception(f"Deposit harus sama: {dispute.amount}")

        dispute.status = "active"
        self.disputes[dispute_id] = dispute
        self.escrow_balances[dispute.counterparty] = dispute.amount
```

### AI Adjudication — Intinya!

Ini bagian paling keren. GenLayer mengakses URL bukti, memanggil LLM untuk analisis, dan mencapai konsensus melalui Equivalence Principle:

```python
    @gl.public.write
    def resolve(self, dispute_id: str) -> None:
        """GenLayer sebagai hakim: akses bukti + analisis AI."""
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            raise Exception("Sengketa tidak ditemukan")

        if dispute.status != "active":
            raise Exception("Sengketa tidak aktif")

        if gl.message.sender_address.as_hex != dispute.creator:
            raise Exception("Hanya creator yang bisa resolve")

        # Langkah 1: Ekstrak bukti dari web
        def get_evidence() -> dict:
            web_content = gl.nondet.web.render(
                dispute.evidence_url,
                mode="text"
            )

            # Langkah 2: AI menganalisis
            prompt = f"""
Analisis sengketa ini dan tentukan pemenangnya.

Deskripsi: {dispute.description}

Bukti dari web:
{web_content}

Kriteria:
1. Apakah bukti mendukung klaim pembuat sengketa ({dispute.creator})?
2. Atau mendukung pihak lawan ({dispute.counterparty})?
3. Atau hasilnya seri?

Respond dalam JSON:
{{
    "winner": "creator" | "counterparty" | "draw",
    "reasoning": "Penjelasan singkat",
    "confidence": 0.0-1.0
}}
Hanya output JSON, tidak ada teks lain.
            """

            result = gl.nondet.exec_prompt(prompt, response_format="json")
            return json.dumps(result, sort_keys=True)

        # Equivalence Principle — semua validator harus setuju
        result_json = json.loads(
            gl.eq_principle.strict_eq(get_evidence)
        )

        # Update status
        if result_json["winner"] == "creator":
            dispute.winner = dispute.creator
        elif result_json["winner"] == "counterparty":
            dispute.winner = dispute.counterparty
        else:
            dispute.winner = "draw"

        dispute.status = "resolved"
        self.disputes[dispute_id] = dispute

    @gl.public.view
    def get_dispute(self, dispute_id: str) -> dict:
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            return {"error": "Not found"}
        return {
            "id": dispute.id,
            "creator": dispute.creator,
            "counterparty": dispute.counterparty,
            "description": dispute.description,
            "amount": str(dispute.amount),
            "evidence_url": dispute.evidence_url,
            "status": dispute.status,
            "winner": dispute.winner,
        }
```

## Penjelasan Kode

### 1. Non-Deterministic Operations

Fungsi `get_evidence()` adalah **non-deterministic** karena:
- `gl.nondet.web.render()` — akses web, hasilnya bisa beda tiap request
- `gl.nondet.exec_prompt()` — panggil LLM, output bisa berbeda antar model

### 2. Equivalence Principle

`gl.eq_principle.strict_eq(get_evidence)` memastikan semua validator mencapai konsensus. Cara kerja:

1. **Leader** menjalankan `get_evidence()` — render web + panggil LLM
2. **Validator lain** menjalankan fungsi yang SAMA secara independen
3. **Hasil dibandingkan** — karena kita pake `strict_eq`, semua output harus identik
4. Jika hasil cocok → **Accepted**

### 3. Keamanan Sederhana

- Hanya creator yang bisa resolve
- Counterparty harus setor deposit yang sama persis
- Status mencegah double-claim

## Full Contract

Gabungan semua kode di atas jadi satu file `DisputeResolution.py`:

```python
# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

import json
from dataclasses import dataclass
from genlayer import *

@allow_storage
@dataclass
class Dispute:
    id: str
    creator: str
    counterparty: str
    description: str
    amount: u256
    evidence_url: str
    status: str
    winner: str
    created_at: u256

class DisputeResolution(gl.Contract):
    disputes: TreeMap[str, Dispute]
    escrow_balances: TreeMap[str, u256]
    dispute_count: u256

    def __init__(self):
        self.dispute_count = u256(0)

    @gl.public.write
    def create_dispute(self, description: str, counterparty: str, evidence_url: str) -> str:
        sender = gl.message.sender_address
        deposit = gl.message.value
        if deposit == 0:
            raise Exception("Deposit harus lebih dari 0")
        dispute_id = str(int(self.dispute_count) + 1)
        self.dispute_count = u256(int(self.dispute_count) + 1)
        dispute = Dispute(
            id=dispute_id, creator=sender.as_hex,
            counterparty=counterparty, description=description,
            amount=deposit, evidence_url=evidence_url,
            status="pending", winner="",
            created_at=u256(gl.block.number),
        )
        self.disputes[dispute_id] = dispute
        self.escrow_balances[sender.as_hex] = deposit
        return dispute_id

    @gl.public.write
    def join_dispute(self, dispute_id: str) -> None:
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            raise Exception("Sengketa tidak ditemukan")
        if dispute.status != "pending":
            raise Exception("Sengketa sudah aktif atau selesai")
        sender = gl.message.sender_address
        if sender.as_hex != dispute.counterparty:
            raise Exception("Hanya counterparty yang bisa join")
        if gl.message.value != dispute.amount:
            raise Exception(f"Deposit harus sama: {dispute.amount}")
        dispute.status = "active"
        self.disputes[dispute_id] = dispute
        self.escrow_balances[dispute.counterparty] = dispute.amount

    @gl.public.write
    def resolve(self, dispute_id: str) -> None:
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            raise Exception("Sengketa tidak ditemukan")
        if dispute.status != "active":
            raise Exception("Sengketa tidak aktif")
        if gl.message.sender_address.as_hex != dispute.creator:
            raise Exception("Hanya creator yang bisa resolve")
        def get_evidence() -> dict:
            web_content = gl.nondet.web.render(dispute.evidence_url, mode="text")
            prompt = f"""
Analisis sengketa dan tentukan pemenang.
Deskripsi: {dispute.description}
Bukti: {web_content}
Kriteria: Apakah bukti mendukung creator ({dispute.creator}) atau counterparty ({dispute.counterparty})?
Respond JSON: {{"winner": "creator/counterparty/draw", "reasoning": "...", "confidence": 0.0-1.0}}
Hanya JSON, tidak ada teks lain."""
            result = gl.nondet.exec_prompt(prompt, response_format="json")
            return json.dumps(result, sort_keys=True)
        result_json = json.loads(gl.eq_principle.strict_eq(get_evidence))
        if result_json["winner"] == "creator":
            dispute.winner = dispute.creator
        elif result_json["winner"] == "counterparty":
            dispute.winner = dispute.counterparty
        else:
            dispute.winner = "draw"
        dispute.status = "resolved"
        self.disputes[dispute_id] = dispute

    @gl.public.view
    def get_dispute(self, dispute_id: str) -> dict:
        dispute = self.disputes.get(dispute_id)
        if dispute is None:
            return {"error": "Not found"}
        return {
            "id": dispute.id, "creator": dispute.creator,
            "counterparty": dispute.counterparty,
            "description": dispute.description,
            "amount": str(dispute.amount),
            "evidence_url": dispute.evidence_url,
            "status": dispute.status,
            "winner": dispute.winner,
        }
```

**Simpan sebagai `DisputeResolution.py`** — ini yang akan kita deploy di Part 3.

---

**Lanjut ke Part 3 →** Deploy dan test contract di GenLayer Studio.

<div class="tldr-box">
<strong>Ringkasan:</strong> Intelligent Contract di GenLayer ditulis dalam Python. Contract dispute resolution kita menggunakan <code>gl.nondet.web.render()</code> untuk akses bukti dari web, <code>gl.nondet.exec_prompt()</code> untuk analisis AI, dan <code>gl.eq_principle.strict_eq()</code> untuk konsensus validator melalui Equivalence Principle.
</div>

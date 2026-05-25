---
title: "From Zero to GenLayer: Tutorial Lengkap Bangun Dispute Resolution dApp"
description: "Tutorial lengkap GenLayer dari nol — pelajari Optimistic Democracy, tulis Intelligent Contract Python, deploy di Studio, bangun frontend React, dan deploy ke Bradbury Testnet."
excerpt: "Panduan 5-bagian dalam satu artikel: pahami konsep GenLayer, tulis Intelligent Contract dispute resolution, deploy di Studio, bangun frontend dengan genlayer-js, dan deploy ke Bradbury Testnet."
pubDate: 2026-05-25T13:40:00+07:00
category: "Tutorial"
tags: ["genlayer", "tutorial", "optimistic democracy", "equivalence principle", "intelligent contract", "python", "genlayer-js", "react", "nextjs", "metamask", "bradbury", "deploy", "studio", "dispute resolution", "blockchain", "ai"]
author: "CryptoSynth Research"
faq: "Apa itu GenLayer?;;GenLayer adalah blockchain layer untuk AI-powered intelligent contracts yang bisa memahami bahasa alami, mengakses internet, dan menyelesaikan sengketa secara desentralisasi tanpa oracle. Ini adalah Adjudication Layer untuk agentic economy.;;Apa itu Optimistic Democracy?;;Mekanisme konsensus GenLayer dimana sekelompok validator dengan model AI berbeda secara independen mengevaluasi transaksi dan voting. Transaksi diterima jika mayoritas setuju. Ada mekanisme banding jika hasilnya dianggap salah.;;Apa itu Intelligent Contract?;;Intelligent Contract adalah evolusi dari smart contract tradisional yang bisa memahami bahasa alami, mengakses internet, dan menggunakan AI. Ditulis dalam Python dan berjalan di GenLayer blockchain dengan konsensus validator AI.;;Bagaimana deploy contract di GenLayer Studio?;;Buka studio.genlayer.com, buat account (otomatis), fund dengan built-in faucet (💧), upload file .py contract, buka Run & Debug sidebar, klik Deploy.;;Apa itu genlayer-js?;;SDK JavaScript untuk berinteraksi dengan GenLayer blockchain dari frontend React/Next.js. Mendukung koneksi wallet MetaMask, call contract methods, dan query data.;;Apa perbedaan Studio vs Bradbury?;;Studio (Chain ID 61999) — hosted dev environment, state temporary, gratis. Bradbury (Chain ID 4221) — production-like testnet, state persistent, real AI models, perlu MetaMask dan faucet."
---

> **TL;DR:** GenLayer adalah blockchain layer untuk AI-powered intelligent contracts. Beda dengan Ethereum yang deterministic, GenLayer bisa mengeksekusi kontrak yang butuh penilaian — seperti menyelesaikan sengketa, memverifikasi klaim, atau menganalisis data web. Kuncinya ada di **Optimistic Democracy** dan **Equivalence Principle**. Tutorial ini mencakup 5 bagian: konsep → coding → deploy → frontend → go live.

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Artikel ini adalah konten edukatif dan bukan merupakan saran keuangan atau investasi. Kode bersifat contoh — jangan gunakan untuk transaksi asli tanpa audit keamanan profesional.
</div>

---

# Bagian 1: Memahami GenLayer & Optimistic Democracy

## Bitcoin, Ethereum, dan Sekarang GenLayer

Untuk memahami GenLayer, mari lihat evolusi blockchain:

| Layer | Contoh | Fungsi |
|---|---|---|
| **Trustless Money** | Bitcoin | Kirim nilai tanpa perantara |
| **Trustless Computation** | Ethereum | Eksekusi kode tanpa server terpusat |
| **Trustless Adjudication** | GenLayer | Selesaikan sengketa tanpa hakim |

Ethereum memungkinkan smart contract yang deterministic: jika X terjadi, lakukan Y. Tapi bagaimana jika kebutuhannya **subjektif**? Misalnya:

- "Apakah barang yang dikirim sesuai deskripsi?"
- "Siapa yang menang dalam pertandingan ini?"
- "Apakah konten ini melanggar aturan?"

Ini yang GenLayer selesaikan. Intelligent Contract di GenLayer bisa **mengerti bahasa alami**, **mengakses web**, dan **menggunakan AI** untuk membuat keputusan.

## Bagaimana GenLayer Bekerja?

GenLayer menggunakan mekanisme konsensus bernama **Optimistic Democracy**. Konsepnya sederhana:

1. **Validator** — partisipan yang staking token GEN untuk memvalidasi transaksi
2. **Leader** — validator terpilih secara acak yang mengeksekusi kontrak dan mengusulkan hasil
3. **Voting** — validator lain mengecek hasil leader secara independen
4. **Konsensus** — jika mayoritas setuju, transaksi diterima

### Siklus Hidup Transaksi

```
Pending → Proposing → Committing → Leader Revealing → Revealing → Accepted → Finalized
```

1. **Pending** — transaksi masuk antrian
2. **Proposing** — leader mengeksekusi kontrak dan mengusulkan hasil
3. **Committing** — validator lain eksekusi independen, kirim vote terenkripsi
4. **Leader Revealing** — leader buka data eksekusi dan kunci dekripsi
5. **Revealing** — validator buka vote mereka
6. **Accepted** — mayoritas setuju, masuk appeal window
7. **Finalized** — appeal window tutup, hasil permanen

### Non-Determinism dan Konsensus

Ini yang bikin GenLayer unik. Karena kontrak bisa panggil LLM dan akses web, hasilnya bisa berbeda antar validator. GenLayer punya 3 mekanisme:

- **Strict Equality** — semua validator harus hasil output identik
- **LLM Comparison** — LLM pembanding membandingkan output validator
- **Custom Validation** — developer tulis leader/validator function sendiri

## Equivalence Principle

Equivalence Principle adalah mekanisme inti yang memastikan Intelligent Contract konsisten meskipun output non-deterministic.

### 1. Comparative Equivalence

Leader dan validator melakukan tugas yang sama, lalu hasilnya dibandingkan dengan margin error yang ditentukan.

**Contoh:** Menghitung rating rata-rata produk. Leader dapet 4.5, validator dapet 4.6. Margin error 0.1, jadi accepted.

### 2. Non-Comparative Equivalence

Validator tidak mereplikasi output Leader. Mereka **menilai akurasi** hasil Leader terhadap kriteria yang ditentukan.

**Contoh:** Meringkas artikel berita. Validator cek apakah ringkasan Leader akurat, relevan, dan sesuai panjang yang diminta.

## Keunggulan GenLayer vs Smart Contract Tradisional

| Fitur | Smart Contract Biasa | GenLayer Intelligent Contract |
|---|---|---|
| **Bahasa** | Solidity/Vyper | **Python** |
| **Akses Web** | Oracle (pihak ketiga) | **Built-in** via `gl.nondet.web.render()` |
| **AI/LLM** | Tidak bisa | **Built-in** via `gl.nondet.exec_prompt()` |
| **Penanganan Non-Determinism** | Tidak ada | **Equivalence Principle** |
| **Penyelesaian Sengketa** | Tidak bisa | **Optimistic Democracy dengan appeal** |

## Use Cases GenLayer

- **Dispute Resolution** — selesaikan sengketa antara dua pihak tanpa pengacara
- **Prediction Market** — pasar prediksi yang bisa diverifikasi AI
- **Insurance** — klaim asuransi yang diverifikasi otomatis
- **Content Moderation** — moderasi konten secara terdesentralisasi
- **Oracle** — oracle AI tanpa middleware
- **DAOs** — voting cerdas dengan analisis proposal

---

# Bagian 2: Membangun Intelligent Contract Dispute Resolution

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

### Penjelasan Kode

**Non-Deterministic Operations:** Fungsi `get_evidence()` adalah non-deterministic karena `gl.nondet.web.render()` (akses web) dan `gl.nondet.exec_prompt()` (panggil LLM).

**Equivalence Principle:** `gl.eq_principle.strict_eq(get_evidence)` memastikan semua validator menjalankan fungsi yang sama secara independen, lalu hasilnya dibandingkan. Jika semua setuju → Accepted.

**Keamanan:** Hanya creator yang bisa resolve, counterparty harus setor deposit yang sama persis, status mencegah double-claim.

### Full Contract

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

**Simpan sebagai `DisputeResolution.py`** — ini yang akan kita deploy.

---

# Bagian 3: Deploy & Test Contract di GenLayer Studio

## Persiapan

1. Buka [studio.genlayer.com/contracts](https://studio.genlayer.com/contracts)
2. Wallet otomatis tergenerate (address random)
3. Backup private key jika ingin menyimpan account

## Langkah 1: Fund Account

Sebelum deploy, butuh GEN token. Studio punya **built-in faucet**:

1. Click button wallet di pojok kanan atas
2. Di panel yang muncul, click **Fund** (default 10 GEN)
3. Balance berubah jadi 10 GEN ✅

## Langkah 2: Upload Contract

Ada 2 cara:

**Upload File:** Klik tombol upload di sidebar kiri → pilih `DisputeResolution.py`

**Copy Paste:** Klik tombol "+" atau "New Contract" → paste kode → beri nama file

## Langkah 3: Buka Run & Debug

Di sidebar navigasi kiri, click icon Run & Debug (yang ke-2 dari atas, icon ❔).

## Langkah 4: Deploy Contract

Di panel Run & Debug:

1. **Execution Mode**: pilih "Normal (Full Consensus)"
2. **Contract**: pilih `DisputeResolution.py`
3. Status: "Not deployed yet."
4. **Constructor Inputs**: kosong (`__init__()` tanpa parameter)
5. Click **Deploy DisputeResolution.py**

### Proses Validasi

Setelah klik Deploy, kamu bisa lihat log proses:

```
Pending → Proposing → Committing → Revealing → Accepted
```

Ini adalah siklus hidup transaksi yang dijelaskan di Bagian 1. Jika statusnya **ACCEPTED**, contract berhasil di-deploy! 🎉

## Langkah 5: Interaksi dengan Contract

**Test `create_dispute`:** Pilih method → isi `description`, `counterparty`, `evidence_url` → set `Value/Deposit` (misal 1 GEN) → Execute.

**Test `get_dispute`:** Pilih method → isi `dispute_id`: "1" → Execute → detail sengketa muncul.

**Test `resolve`:** Pilih method → isi `dispute_id`: "1" → Execute → LLM akses URL bukti, analisis, putuskan pemenang.

## Tips Testing

**Leader Only Mode:** Execution Mode → "Leader Only (Fast, No Validation)" — lebih cepat tanpa full consensus, cocok untuk testing awal.

**Multiple Accounts:** Click wallet → **New account** → Fund masing-masing → simulasi creator vs counterparty.

## Troubleshooting

| Error | Penyebab | Solusi |
|---|---|---|
| `invalid_contract` | Header salah | Cek `# { "Depends": ... }` |
| `execution failed` | Runtime error | Cek panel log |
| `0 GEN` | Belum fund | Klik Fund di wallet |

---

# Bagian 4: Frontend dengan genlayer-js & React

## Arsitektur Frontend

```
Frontend (Next.js 15)
├── genlayer-js SDK          ← Interaksi blockchain
├── Wagmi + Viem             ← Wallet connection
├── TanStack React Query     ← Data fetching & caching
├── WalletProvider (Context) ← State wallet global
└── Tailwind CSS v4 + Radix  ← UI components
```

## 1. Setup Project

Fork dari boilerplate atau buat dari scratch:

```bash
git clone https://github.com/genlayerlabs/genlayer-project-boilerplate
cd genlayer-project-boilerplate/frontend
npm install
```

Buat file `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Address contract hasil deploy
NEXT_PUBLIC_GENLAYER_RPC_URL=https://studio.genlayer.com/api
NEXT_PUBLIC_GENLAYER_CHAIN_ID=61999
NEXT_PUBLIC_GENLAYER_CHAIN_NAME=GenLayer Studio
NEXT_PUBLIC_GENLAYER_SYMBOL=GEN
```

## 2. Wallet Connection

### Client Setup

```typescript
// lib/genlayer/client.ts
import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export function createGenLayerClient(address?: string) {
  const config: any = { chain: studionet };
  if (address) config.account = address;
  return createClient(config);
}
```

### Wallet Provider

```typescript
// lib/genlayer/WalletProvider.tsx
export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    address: null, isConnected: false, isLoading: true
  });

  const connectWallet = async () => {
    const provider = window.ethereum;
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    await switchToGenLayerNetwork();
    setState({ address: accounts[0], isConnected: true, isLoading: false });
  };

  return (
    <WalletContext.Provider value={{ ...state, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
```

## 3. Contract Interaction Layer

```typescript
// lib/contracts/DisputeResolution.ts
import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export class DisputeResolution {
  private client: any;
  private address: string;

  constructor(contractAddress: string, accountAddress?: string) {
    this.client = createClient({ chain: studionet, account: accountAddress });
    this.address = contractAddress;
  }

  async getDispute(disputeId: string) {
    return this.client.read({
      address: this.address as `0x${string}`,
      functionName: "get_dispute",
      args: [disputeId],
    });
  }

  async createDispute(description: string, counterparty: string, evidenceUrl: string, deposit: bigint) {
    return this.client.write({
      address: this.address as `0x${string}`,
      functionName: "create_dispute",
      args: [description, counterparty, evidenceUrl],
      value: deposit,
    });
  }

  async joinDispute(disputeId: string, deposit: bigint) {
    return this.client.write({
      address: this.address as `0x${string}`,
      functionName: "join_dispute",
      args: [disputeId],
      value: deposit,
    });
  }

  async resolveDispute(disputeId: string) {
    return this.client.write({
      address: this.address as `0x${string}`,
      functionName: "resolve",
      args: [disputeId],
    });
  }
}
```

## 4. React Hooks dengan TanStack Query

```typescript
// lib/hooks/useDisputeResolution.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DisputeResolution } from "../contracts/DisputeResolution";
import { useWallet } from "../genlayer/wallet";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export function useDisputeContract() {
  const { address } = useWallet();
  return new DisputeResolution(CONTRACT_ADDRESS, address || undefined);
}

export function useDispute(disputeId: string) {
  const contract = useDisputeContract();
  return useQuery({
    queryKey: ["dispute", disputeId],
    queryFn: () => contract.getDispute(disputeId),
    enabled: !!disputeId,
    refetchInterval: 3000,
  });
}

export function useCreateDispute() {
  const contract = useDisputeContract();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ description, counterparty, evidenceUrl, deposit }) =>
      contract.createDispute(description, counterparty, evidenceUrl, deposit),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["disputes"] }),
  });
}
```

## 5. UI Components

### Connect Wallet Button

```tsx
export function ConnectWallet() {
  const { address, isConnected, connectWallet, isLoading } = useWallet();
  if (isLoading) return <Button disabled>Loading...</Button>;
  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    );
  }
  return <Button onClick={connectWallet}>Connect Wallet</Button>;
}
```

### Create Dispute Form

```tsx
export function CreateDisputeForm() {
  const { isConnected } = useWallet();
  const createDispute = useCreateDispute();
  const [form, setForm] = useState({
    description: "", counterparty: "", evidenceUrl: "", deposit: "0.1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) { alert("Connect wallet dulu!"); return; }
    await createDispute.mutateAsync({ ...form, deposit: parseEther(form.deposit) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Deskripsi sengketa" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Address counterparty" value={form.counterparty}
        onChange={(e) => setForm({ ...form, counterparty: e.target.value })} />
      <input placeholder="URL bukti (https://...)" value={form.evidenceUrl}
        onChange={(e) => setForm({ ...form, evidenceUrl: e.target.value })} />
      <input type="number" step="0.1" placeholder="Deposit (GEN)" value={form.deposit}
        onChange={(e) => setForm({ ...form, deposit: e.target.value })} />
      <Button type="submit" disabled={createDispute.isPending}>
        {createDispute.isPending ? "Processing..." : "Buat Sengketa"}
      </Button>
    </form>
  );
}
```

## 6. Halaman Utama

```tsx
export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">⚖️ Dispute Resolution dApp</h1>
          <ConnectWallet />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle>Buat Sengketa Baru</CardTitle></CardHeader>
            <CardContent><CreateDisputeForm /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Daftar Sengketa</CardTitle></CardHeader>
            <CardContent><DisputeList /></CardContent>
          </Card>
        </div>
      </main>
    </WalletProvider>
  );
}
```

## 7. Menjalankan Frontend

```bash
npm run dev
# Buka http://localhost:3000
```

Alur: Connect MetaMask → Switch ke GenLayer → Buat sengketa → Counterparty join → Resolve → AI jadi hakim.

---

# Bagian 5: Deploy ke Bradbury Testnet & Go Live

## Arsitektur Final

```
[User] → MetaMask → Bradbury Testnet (Chain ID 4221)
                        ↓
              Intelligent Contract (DisputeResolution.py)
                        ↓
              Validator AI Network (Optimistic Democracy)
                        ↓
              LLM + Web Data Access (Equivalence Principle)
                        ↓
                   Hasil Final
```

## 1. Setup MetaMask untuk Bradbury

| Field | Value |
|---|---|
| **Network Name** | GenLayer Bradbury |
| **RPC URL** | `https://rpc-bradbury.genlayer.com` |
| **Chain ID** | `4221` |
| **Currency Symbol** | `GEN` |
| **Block Explorer** | `https://explorer-bradbury.genlayer.com` |

Bisa juga via "Add to Wallet" di [docs.genlayer.com/developers/networks](https://docs.genlayer.com/developers/networks)

## 2. Claim Testnet GEN

**Via Faucet:** Buka [testnet-faucet.genlayer.foundation](https://testnet-faucet.genlayer.foundation) → Sign in with GitHub → Masukkan address → Request.

**Via Portal:** Buka [portal.genlayer.foundation](https://portal.genlayer.foundation) → Connect wallet → Top-up.

## 3. Deploy Contract ke Bradbury

**Via Studio:** Connect MetaMask → Switch ke Bradbury → Fund → Upload `DisputeResolution.py` → Deploy.

**Via CLI:**
```bash
pip install genlayer-py
genlayer deploy DisputeResolution.py \
  --network bradbury \
  --rpc https://rpc-bradbury.genlayer.com \
  --chain-id 4221 \
  --sender 0x[WALLET_ADDRESS]
```

**Via Portal:** portal.genlayer.foundation → Submit a contribution → Upload contract.

## 4. Hubungkan Frontend ke Bradbury

Update `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x[ADDRESS_BARU]
NEXT_PUBLIC_GENLAYER_RPC_URL=https://rpc-bradbury.genlayer.com
NEXT_PUBLIC_GENLAYER_CHAIN_ID=4221
NEXT_PUBLIC_GENLAYER_CHAIN_NAME=GenLayer Bradbury
NEXT_PUBLIC_GENLAYER_SYMBOL=GEN
```

Update chain config:

```typescript
import { bradbury } from "genlayer-js/chains";
export function createGenLayerClient(address?: string) {
  return createClient({ chain: bradbury, account: address });
}
```

Deploy ke Vercel: `npm run build && vercel --prod`

## 5. Submit Tutorial ke Portal

1. Buka [portal.genlayer.foundation](https://portal.genlayer.foundation)
2. Connect wallet
3. Klik **Submit a contribution** → kategori **Educational Content**
4. Upload link artikel → tambah deskripsi → Submit 🚀

## Yang Sudah Kita Capai

✅ Memahami **Optimistic Democracy** dan **Equivalence Principle**
✅ Menulis **Intelligent Contract** Python dengan akses web & AI
✅ Deploy dan test di **GenLayer Studio**
✅ Membangun **frontend React** dengan genlayer-js
✅ Deploy ke **Bradbury Testnet** production-like
✅ Membangun **Dispute Resolution dApp** — kasus penggunaan nyata

GenLayer membuka era baru blockchain — **Trustless Adjudication**. Selamat, kamu sekarang sudah siap menjadi **GenLayer Builder**! 🚀

---

<div class="tldr-box">
<strong>Ringkasan Final:</strong> Tutorial ini mencakup seluruh perjalanan dari nol hingga menjadi GenLayer Builder. Mulai dari memahami Optimistic Democracy & Equivalence Principle, menulis Intelligent Contract Python untuk dispute resolution, deploy di Studio, membangun frontend React dengan genlayer-js, hingga deploy ke Bradbury Testnet. GenLayer adalah masa depan trustless adjudication — dan kamu sudah menjadi bagian dari ecosystem ini.
</div>

---
title: "From Zero to GenLayer (Part 4): Frontend dengan genlayer-js & React"
description: "Bangun frontend Next.js untuk Intelligent Contract GenLayer menggunakan genlayer-js SDK, MetaMask, React Query, dan Tailwind."
excerpt: "Panduan membangun frontend React/Next.js untuk Intelligent Contract GenLayer. Integrasi MetaMask, genlayer-js SDK, React Query, wallet management, dan UI interaktif."
pubDate: 2026-05-25T15:00:00+07:00
category: "Tutorial"
tags: ["genlayer", "tutorial", "genlayer-js", "react", "nextjs", "frontend", "metamask", "typescript"]
author: "CryptoSynth Research"
faq: "Apa itu genlayer-js?;;SDK JavaScript untuk berinteraksi dengan GenLayer blockchain dari frontend React/Next.js. Mendukung koneksi wallet MetaMask, deploy contract, call methods, dan query data.;;Bagaimana cara connect MetaMask ke GenLayer?;;genlayer-js menyediakan utility untuk connect MetaMask, switch network ke GenLayer (Studionet/Bradbury), dan manage account state via React Context (WalletProvider).;;Framework apa yang digunakan?;;Boilerplate GenLayer menggunakan Next.js 15 (App Router), TypeScript, Tailwind CSS v4, TanStack Query (React Query), Radix UI, dan genlayer-js v0.18.3."
---

> **TL;DR:** Frontend GenLayer dibangun dengan Next.js + genlayer-js SDK. Wallet connect via MetaMask, contract interaction via genlayer-js client, data fetching via TanStack Query. Semua kode bisa di-fork dari [boilerplate repo](https://github.com/genlayerlabs/genlayer-project-boilerplate).

<div class="disclaimer-box">
<strong>Disclaimer:</strong> Kode ini untuk edukasi. Pastikan environment variable dan contract address terkonfigurasi dengan benar sebelum production.
</div>

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
# Clone boilerplate
git clone https://github.com/genlayerlabs/genlayer-project-boilerplate
cd genlayer-project-boilerplate/frontend

# Install dependencies
npm install
# atau
bun install
```

Buat file `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Address contract hasil deploy Part 3
NEXT_PUBLIC_GENLAYER_RPC_URL=https://studio.genlayer.com/api
NEXT_PUBLIC_GENLAYER_CHAIN_ID=61999
NEXT_PUBLIC_GENLAYER_CHAIN_NAME=GenLayer Studio
NEXT_PUBLIC_GENLAYER_SYMBOL=GEN
```

## 2. Wallet Connection (genlayer-js)

### Client Setup

```typescript
// lib/genlayer/client.ts
import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export const GENLAYER_CHAIN_ID = parseInt(
  process.env.NEXT_PUBLIC_GENLAYER_CHAIN_ID || "61999"
);

export function createGenLayerClient(address?: string) {
  const config: any = { chain: studionet };
  if (address) config.account = address;
  return createClient(config);
}
```

### Wallet Provider (React Context)

```typescript
// lib/genlayer/WalletProvider.tsx
export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isLoading: true,
  });

  useEffect(() => {
    // Auto-connect jika MetaMask sudah authorized
    checkExistingConnection();
  }, []);

  const connectWallet = async () => {
    const provider = window.ethereum;
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    // Switch ke GenLayer network
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

Buat class wrapper untuk contract:

```typescript
// lib/contracts/DisputeResolution.ts
import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export class DisputeResolution {
  private client: any;
  private address: string;

  constructor(contractAddress: string, accountAddress?: string, rpcUrl?: string) {
    const config: any = {
      chain: studionet,
      account: accountAddress,
    };
    this.client = createClient(config);
    this.address = contractAddress;
  }

  // View method — read data tanpa biaya
  async getDispute(disputeId: string) {
    return this.client.read({
      address: this.address as `0x${string}`,
      functionName: "get_dispute",
      args: [disputeId],
    });
  }

  // Write method — butuh wallet signature
  async createDispute(
    description: string,
    counterparty: string,
    evidenceUrl: string,
    deposit: bigint
  ) {
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
    refetchInterval: 3000, // auto-refresh tiap 3 detik
  });
}

export function useCreateDispute() {
  const contract = useDisputeContract();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      description,
      counterparty,
      evidenceUrl,
      deposit,
    }: {
      description: string;
      counterparty: string;
      evidenceUrl: string;
      deposit: bigint;
    }) => contract.createDispute(description, counterparty, evidenceUrl, deposit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
}
```

## 5. UI Components

### Connect Wallet Button

```tsx
// components/ConnectWallet.tsx
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
// components/CreateDispute.tsx
export function CreateDisputeForm() {
  const { isConnected } = useWallet();
  const createDispute = useCreateDispute();
  const [form, setForm] = useState({
    description: "",
    counterparty: "",
    evidenceUrl: "",
    deposit: "0.1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert("Connect wallet dulu!");
      return;
    }
    await createDispute.mutateAsync({
      ...form,
      deposit: parseEther(form.deposit),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Deskripsi sengketa"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Address counterparty"
        value={form.counterparty}
        onChange={(e) => setForm({ ...form, counterparty: e.target.value })}
      />
      <input
        placeholder="URL bukti (https://...)"
        value={form.evidenceUrl}
        onChange={(e) => setForm({ ...form, evidenceUrl: e.target.value })}
      />
      <input
        type="number"
        step="0.1"
        placeholder="Deposit (GEN)"
        value={form.deposit}
        onChange={(e) => setForm({ ...form, deposit: e.target.value })}
      />
      <Button type="submit" disabled={createDispute.isPending}>
        {createDispute.isPending ? "Processing..." : "Buat Sengketa"}
      </Button>
    </form>
  );
}
```

## 6. Halaman Utama

```tsx
// app/page.tsx
export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            ⚖️ Dispute Resolution dApp
          </h1>
          <ConnectWallet />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Buat Sengketa Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateDisputeForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Sengketa</CardTitle>
            </CardHeader>
            <CardContent>
              <DisputeList />
            </CardContent>
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

Alur lengkap:
1. Connect MetaMask
2. Switch ke GenLayer Studionet (otomatis)
3. Buat sengketa dengan deposit
4. Counterparty join dengan deposit yang sama
5. Creator resolve — GenLayer AI jadi hakim
6. Hasil ditampilkan di UI

---

**Lanjut ke Part 5 →** Deploy ke Bradbury Testnet.

<div class="tldr-box">
<strong>Ringkasan:</strong> Frontend GenLayer menggunakan Next.js + genlayer-js SDK. Wallet connect via MetaMask, state management via WalletProvider (Context), data fetching via TanStack Query dengan auto-refresh. Contract interaction dienkapsulasi dalam class wrapper untuk type safety dan reusability.
</div>

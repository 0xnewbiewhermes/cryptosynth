---
title: "Inkray Airdrop Potential: Cara Earn XP di Publishing Platform Sui"
slug: inkray-airdrop-potential-earn-xp-sui
category: "Tutorial"
description: "A practical look at Inkray, a Sui Testnet publishing platform built with Walrus and Seal, plus how to complete its XP quests without treating an unconfirmed airdrop as a promise."
excerpt: "Inkray is a publishing app on Sui Testnet where your writing is stored through Walrus. Here is how the XP quests work, what makes the project interesting, and what is still unconfirmed about any future airdrop."
pubDate: 2026-07-11T19:30:00+07:00
author: "Gideon"
tags:
  - inkray
  - sui
  - walrus
  - tutorial
  - airdrop
  - testnet
  - quest
faq: >
  Is the Inkray airdrop confirmed?;;No. Inkray's public website describes a Sui Testnet publishing platform, but it does not publish a token, snapshot, allocation, or airdrop schedule. Treat the airdrop angle as speculation, not a guarantee.;;What is XP in Inkray?;;XP is the experience score shown for completing quests in the Inkray app. The exact task list and XP values can change, so follow the live quest panel rather than an old screenshot.;;Do I need a mainnet wallet?;;Inkray currently presents itself as live on Sui Testnet. Use a separate testnet wallet and never put a seed phrase into the website.;;What does Inkray use Walrus for?;;Inkray says published articles are stored on Walrus, a decentralized storage network, while ownership and related records are handled through Sui objects.;;Is this financial advice?;;No. This is a personal research note about a testnet application. There is no confirmed token or guaranteed reward.
---

<div class="tldr-box">
<strong>TL;DR:</strong> Inkray is a Web3 publishing platform currently presented as live on Sui Testnet. It combines Sui for on-chain ownership, Walrus for decentralized article storage, and Seal for encrypted premium content. The app also has XP quests. That makes it worth testing early, but there is no official Inkray token, snapshot, allocation, or airdrop schedule published on the public landing page. Farm the product, not a promise.
</div>

<div class="disclaimer-box">
<strong>Disclaimer:</strong> This is a personal research note, not financial advice. Inkray is a testnet application and its quests, rewards, and UI can change. A quest XP balance is not proof that a token or airdrop will exist. Use a burner wallet, verify every transaction, and never share your seed phrase.
</div>

## Inkray Is More Interesting Than "Just Another Quest"

The easy way to describe Inkray is "a blog platform on Sui." That is accurate, but it misses the point.

Inkray is trying to solve a very old Web2 problem: you publish on someone else's platform, then the platform controls the account, the distribution, and sometimes the content itself. Inkray's pitch is different. Connect a Sui wallet, create a publication, write in Markdown, and publish. The platform says your article is stored permanently and that you keep the ownership record.

The stack is clearly stated on [Inkray's official website](https://inkray.xyz/):

- **Sui** handles the blockchain side - publications and ownership records are represented as Sui objects.
- **Walrus** handles decentralized storage for the article data.
- **Seal** handles access-controlled encryption for premium content.

That is a real product thesis, not just a points dashboard. You can try the app without assuming the airdrop story is true.

## So, Where Does the Airdrop Angle Come From?

The Inkray app currently shows quests that award XP. That naturally raises the question: is XP going to matter later?

Maybe. But there is a line between **a reasonable early-user thesis** and **an invented airdrop announcement**.

At the time of writing, Inkray's public landing page says it is live on Sui Testnet and explains the publishing, storage, monetization, and collectible features. It does **not** publish:

- a token ticker;
- a token contract;
- a snapshot date;
- an XP-to-token conversion rate;
- a reward pool; or
- an official airdrop allocation.

So the honest thesis is narrower: XP may be a way for the team to measure participation while the product is still early. If Inkray later introduces incentives, consistent product usage could be more useful than a wallet that only clicked social links once. That is a possibility, not a guarantee.

## How to Earn XP on Inkray

The exact quest names and XP values can change. Use the live quest panel as the source of truth, but the flow is straightforward:

### 1. Use a separate Sui testnet wallet

Create a fresh wallet for experiments. Do not reuse the wallet that holds your mainnet assets. A testnet app should not need your seed phrase, private key, or permission to move unrelated funds.

### 2. Open Inkray and connect the wallet

Go to [inkray.xyz](https://inkray.xyz/) and connect the Sui wallet you created for testing. Check the network shown by your wallet before signing anything. If a transaction asks for an amount or permission that does not match the action, reject it.

### 3. Find the XP quest panel

Open the area of the app labelled **Quests**, **XP**, or a similar rewards section. Read the requirement before clicking through. Some tasks may be social actions; others may ask you to use an actual product feature.

### 4. Complete the task, then verify it

Finish one quest at a time. If the task involves publishing, commenting, collecting an article, or connecting a social account, return to the quest panel and check that the status changed before moving on. Keep a simple note of the action and the resulting XP so you can spot a failed verification.

### 5. Use the product instead of looping clicks

The strongest activity signal is not necessarily the biggest XP number. Publish a short, useful test article. Read another article. Try the collect or creator flow if it is available. This gives you a record of genuine usage and helps you decide whether Inkray is actually worth your time even if no airdrop appears.

## What Makes the Stack Worth Testing?

### Sui: ownership as an object

Inkray says publications and ownership records are Sui objects. That matters because the content relationship is not meant to live only in a private platform database. The wallet can be part of the ownership model.

This does not magically make every article permanent or every smart contract safe. It does make the design easier to inspect: there is a chain record, a wallet, and a transaction history instead of only an account dashboard.

### Walrus: storage separate from the app

Inkray uses [Walrus](https://www.walrus.xyz/) for decentralized data storage. The underlying Walrus research describes a storage network designed to keep blobs available through erasure coding and recovery when individual nodes fail. In practical terms, Inkray is separating the article bytes from the publishing interface.

That is the useful part of the design. If the front end changes, a Walrus-backed article has a better chance of remaining addressable than a post trapped in one company's database. "Better chance" is not the same as an unconditional permanence guarantee; availability still depends on the application's implementation and the storage terms.

### Seal: premium content without a central key server

Inkray also advertises Seal encryption for gated content. The idea is that an article can be encrypted and access can be controlled by policy rather than by handing every subscriber a key from one central server. It is a good fit for subscriptions, but users should still inspect what they are signing before paying or unlocking anything.

## My Read on the Airdrop Potential

Here is the evidence ladder as it stands:

| Signal | What is actually known | My read |
|---|---|---|
| Live testnet product | Inkray says it is live on Sui Testnet | Positive early-stage signal |
| XP quests | The app shows quests that award XP | Suggests participation tracking |
| Sui + Walrus + Seal | Publicly described by Inkray | Clear technical/product direction |
| Token | No official token details found on the public landing page | Unconfirmed |
| Snapshot or allocation | No public schedule or formula | Unconfirmed |
| Airdrop | No official promise | Speculation only |

That is enough for a low-cost testnet experiment. It is not enough to call Inkray a confirmed airdrop.

The best strategy is therefore simple: complete the quests that are easy to verify, use the publishing product, keep records, and stop if the app asks for suspicious approvals or unnecessary funds. Do not spend real money to chase an XP number whose conversion formula does not exist yet.

## Safety Notes Before You Start

- Use a burner Sui wallet with no valuable assets.
- Never enter a seed phrase or private key into Inkray or a quest form.
- Check the network and transaction details in your wallet.
- Do not sign unlimited token approvals for a testnet quest.
- Ignore DMs claiming to be an Inkray moderator or promising guaranteed allocation.
- Save the official domain: `inkray.xyz`. Treat lookalike domains as phishing until proven otherwise.
- Re-check the official app and its announcement channels before trusting any future token or snapshot claim.

## Bottom Line

Inkray is worth a look because the product itself has a coherent idea: publish on Sui, store the content through Walrus, and keep the creator closer to the ownership and monetization layer. The XP quests add an interesting early-user incentive.

But the correct headline in your own head is not "guaranteed Inkray airdrop." It is:

> **Try an early Sui publishing product, earn the XP that is currently available, and keep optionality if the team later rewards real contributors.**

That is a much better trade than blindly farming every new points page on the internet.

*This article will be updated if Inkray publishes official token, snapshot, or reward details.*


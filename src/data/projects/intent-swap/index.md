---
title: "IntentSwap"
description: "A decentralized intent-based token swap dApp that enables users to create conditional token swaps executed automatically when price conditions are met."
date: "February 10 2026"
category: "blockchain"
repoURL: "https://github.com/yzy98/intentswap"
demoURL: "https://intentswap.zyang.space"
---

IntentSwap is an intent-based swap dApp that lets users create **conditional token swap intents** (e.g. “swap when price crosses X”), which can be executed automatically by an off-chain bot when conditions are met.

## 🚀 What it does

- Create swap intents with configurable **price thresholds** and **expiration**
- Monitor intents off-chain and execute swaps when conditions are satisfied
- Use **Chainlink Price Feeds** for reliable price checks
- Swap through **Uniswap V3** with slippage protection

## 🔄 How it works (high-level)

1. User creates an intent on-chain (token pair, amount, price threshold, expiration) and enables bot auto-execution
2. The bot keeps track of active intents and checks prices via Chainlink oracles
3. When conditions are met, the bot triggers on-chain execution
4. The executor validates the intent and performs the swap via Uniswap V3

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                         IntentSwap                              │
├─────────────────┬─────────────────┬─────────────────────────────┤
│    packages/    │    packages/    │         packages/           │
│    hardhat      │      web        │           bot               │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ Smart Contracts │  Next.js App    │  Cloudflare Worker          │
│ - IntentFactory │  - Create UI    │  - Cron job monitoring      │
│ - IntentExecutor│  - Manage UI    │  - Intent execution         │
│ - Oracle        │                 │  - KV subscriptions         │
│ - Swapper       │                 │                             │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

## 🛠️ Tech Stack

| Category        | Technology                              |
| --------------- | --------------------------------------- |
| Smart Contracts | Solidity, Hardhat, OpenZeppelin         |
| Oracles         | Chainlink Price Feeds                   |
| Swap Routing    | Uniswap V3                              |
| Frontend        | Next.js, React, Wagmi, Viem, RainbowKit |
| UI              | TailwindCSS, shadcn/ui                  |
| Bot             | Cloudflare Workers, Hono, Viem          |
| CI/CD           | GitHub Actions                          |

## ✨ Highlights

- **Intent-based UX**: users define “what” they want, not “how” to execute it
- **Separation of concerns**: on-chain validation + off-chain monitoring/execution
- **Safer execution**: oracle-backed condition checks and slippage protection

## 🏛️ License

MIT

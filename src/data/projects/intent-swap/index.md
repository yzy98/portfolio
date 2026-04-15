---
title: "IntentSwap"
description: "A decentralized intent-based token swap dApp that enables users to create conditional token swaps executed automatically when price conditions are met."
date: "February 10 2026"
category: "blockchain"
repoURL: "https://github.com/yzy98/intentswap"
demoURL: "https://intentswap.zyang.space"
---

IntentSwap is an on-chain conditional swap protocol where users define **swap intents** (for example, "swap when price > X"), and any executor can fill them once conditions are met.

Instead of manually timing the market, users specify _what they want_. Execution is permissionless by design, with a production-ready bot as the default executor.

## 🚀 What it does

- Create intents with **token pair, amount, price threshold, and expiration**
- Execute intents through `IntentExecutor` with **protocol fee + executor reward**
- Use **Chainlink price feeds** for on-chain condition checks
- Route swaps through **Uniswap V3** with slippage protection
- Index intent events into Postgres for fast query and dashboard UX

## 🔄 How it works (high-level)

1. User creates intent on-chain via `IntentFactory.createIntent()`
2. `apps/pipes` indexes on-chain events (create/update/execute/cancel) into Postgres
3. `apps/api` serves GraphQL queries and auth-backed endpoints for the web app
4. `apps/bot` monitors subscribed intents and calls `executeIntent(intentId)` when fillable
5. Contracts validate price/expiry and perform swap via Uniswap V3

## 🏗️ Architecture

![IntentSwap Architecture](/intentswap-architecture.png)

## 🛠️ Tech Stack

| Category             | Technology                                        |
| -------------------- | ------------------------------------------------- |
| Smart Contracts      | Solidity, Hardhat, OpenZeppelin                   |
| Oracle + Swap        | Chainlink Price Feeds, Uniswap V3                 |
| Frontend             | Next.js 16, React 19, TailwindCSS, shadcn/ui      |
| Web3 Client          | Wagmi, Viem, RainbowKit                           |
| API Layer            | Cloudflare Workers, Hono, GraphQL Yoga, Pothos    |
| Data + Auth          | PostgreSQL, Drizzle ORM, Better Auth (SIWE)       |
| Indexing + Execution | SQD Pipes (Subsquid), Cloudflare Worker cron + KV |
| Query Infrastructure | Urql, gql.tada, persisted GraphQL artifacts       |

## ✨ Highlights

- **Permissionless execution model**: protocol allows any executor; bot is just default infra
- **End-to-end data flow**: on-chain events -> indexer -> Postgres -> GraphQL -> web dashboard
- **Production-oriented monorepo**: shared auth/db/artifacts packages across all apps
- **Safer execution path**: oracle-backed checks, slippage control, and pausable executor contract

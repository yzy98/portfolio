---
title: "Prediction Market"
description: "A DeFi Prediction Market application implementing a prediction market protocol with AMM mechanics, dynamic probability pricing, liquidity provision, and oracle-based resolution"
date: "December 9 2025"
category: "blockchain"
repoURL: "https://github.com/yzy98/defi-prediction-market"
---

Prediction Market is a prediction market protocol where users can trade binary outcomes (Yes/No) via an AMM. Prices move dynamically based on supply/demand (probability-style pricing), and an oracle resolves the market at the end so winning token holders can redeem for ETH.

## 🚀 What it does

- Buy and sell **Yes/No outcome tokens** with ETH
- **Dynamic probability pricing** driven by AMM reserves and trading activity
- Provide/remove liquidity and earn fees (LP role)
- Oracle-based market resolution and post-resolution redemption
- Multi-role UI: **User / Liquidity Provider / Oracle**

## 🔄 How it works (high-level)

1. A market is created with an oracle, a question, and initial liquidity parameters
2. Users buy/sell Yes/No tokens; the AMM adjusts price (implied probability) based on reserves
3. Liquidity providers manage liquidity and collect trading revenue
4. When the event ends, the oracle reports the winning outcome (one-time)
5. Winning token holders redeem tokens for ETH at a fixed token value

## 🛠️ Tech Stack

| Category        | Technology                      |
| --------------- | ------------------------------- |
| Smart Contracts | Solidity, Hardhat, OpenZeppelin |
| Frontend        | Next.js, React, TypeScript      |
| Web3            | Wagmi, Viem, RainbowKit         |
| Data Fetching   | TanStack Query                  |
| UI              | TailwindCSS, shadcn/ui          |

## ✨ Highlights

- **Probability-style pricing**: real-time probability visualization that responds to trades
- **Role-based workflow**: separate interfaces for traders, LPs, and oracle operators
- **Clear settlement flow**: oracle resolution enables deterministic redemption for winners

## 🏛️ License

MIT

# Titan Royalties & Blockchain Research (Grok Review – May 2026)

## Core Philosophy
App-first. Blockchain = invisible background infrastructure. Normal users never touch crypto.

## Architecture

### For Normal Users (99%)
- 100% off-chain — Supabase + OpenClaw only
- No wallets, no gas, no crypto
- Royalties never applied

### Creator Pro Mode (opt-in)
- Low-profile toggle in Skill Forge: "Enable On-Chain Royalties (optional)"
- Deploys lightweight smart contract on Solana AND Base (user picks)
- Skill gets on-chain ID + royalty metadata (e.g. 10% to creator wallet)

### How Royalties Settle
1. All skill executions logged off-chain in Supabase (BAU engine)
2. When measurable value is detected (paid task, savings, crypto earnings)
3. Backend triggers batched on-chain royalty settlement
4. Uses Solana's x402 protocol or Base low-cost transfers
5. Paid in stablecoins or native tokens to creator's connected wallet

### UX
- Normal user: never notices
- Creator: sees "Royalties earned this month: $X.XX" widget in profile

## Benefits Beyond Royalties
- Immutable ownership/provenance (prevents theft)
- Verifiable execution history (enterprise trust)
- Future: agent-to-agent payments (god-tier)
- Data moat from on-chain events

## Solana + Base (multi-chain)
- Creator picks at publish time or auto-default to cheapest
- Abstraction layer so frontend never changes

## Risk Mitigation
- Royalties opt-in only, buried in advanced settings
- No native token, no ICO, no hype
- 10-15% Titan take on royalties only
- Marketing: "Optional creator earnings — you keep control"

## Key Signals from Review
1. Per-module differentiation needed (currently same layout for all tabs)
2. 3D agents with expressive eyes/smiles = #1 visual gap
3. Supabase persistence still blocked (no env vars)
4. Mobile orbit performance needs improvement

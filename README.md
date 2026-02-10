# 🦀 BASECRAB - Global Autonomous Trading Intelligence Agent

**Production-Grade • Cross-Chain • Real-Capital Trading System**

---

## ⚡ Instant Activation - Start Trading in 5 Minutes!

### Step 1: Clone & Setup
```bash
git clone https://github.com/Maliot100X/BaseCrab-Trader-Sniper-Skills.git
cd BaseCrab-Trader-Sniper-Skills
npm install -g openclaw
```

### Step 2: Configure (2 minutes)
```bash
# Copy template
cp .env.example .env.local

# Edit with your credentials
# - Telegram Bot Token from @BotFather
# - Your channel/group IDs
# - MiniMax API key
```

### Step 3: Activate Bot (1 minute)
```bash
# Option A: Quick test
npm run dev

# Option B: Full activation
npm run setup
openclaw skills import skills/
openclaw run basecrab
```

### Step 4: Use on Telegram
- Add bot to your channel/group
- Bot activates instantly!
- Use `/help` to see all commands

---

## 📱 Telegram Setup

### Get Your Bot Token
1. Message @BotFather on Telegram
2. Send `/newbot`
3. Follow instructions
4. Copy your bot token

### Add Bot to Your Channel
1. Open your channel
2. Go to Settings → Administrators
3. Add your bot as admin
4. Bot will receive messages

---

## 🔗 Supported Chains (With Free Public RPC)

| Chain | Native Token | Public RPC | Use Case |
|-------|-------------|------------|----------|
| **Base** | ETH | ✅ Free RPCs | Primary trading |
| **Ethereum** | ETH | ✅ Free RPCs | DeFi protocols |
| **BNB Chain** | BNB | ✅ Free RPCs | Memecoins, PUMP.FUN |
| **Solana** | SOL | ✅ Free RPCs | New launches |
| **Zora** | ETH | ✅ Free RPCs | NFT, creators |

---

## 🛠️ Commands

### Wallet Management
```
/wallets              - View all balances
/wallets base         - Check Base balance
/wallets deposit      - Get deposit address
/wallets preview      - Show private key (⚠️ YOUR RISK)
```

### Chain Operations
```
/chains               - Show all chains
/chains create base   - Create Base wallet
/chains create all    - Create wallets for ALL chains
```

### Trading Commands
```
/scan                 - Scan markets
/analyze <TOKEN>      - Deep token analysis
/whales <TOKEN>       - Track whale movements
/settings slipage 5   - Set 5% slippage
/settings autotrade on/off
/basecrabTrade        - Execute trade
```

---

## 📊 Market Data (Free APIs)

### Integrated Data Sources
- **DEX Screener** - Token prices & liquidity
- **Birdeye** - Multi-chain data
- **DEXTV** - Trading volumes
- **Pump.fun** - BNB meme coins

---

## 🚀 Quick Reference

```bash
# Development
npm run dev           # Quick start guide

# Setup
npm run setup         # Full setup
npm run import-skills # Import OpenClaw skills

# Git
npm run push          # Commit & push updates
```

---

## ⚠️ Important Notes

### Required Setup
1. **Telegram Bot Token** - Get from @BotFather
2. **MiniMax API Key** - Get from platform.minimax.io
3. **Your Channel/Group IDs** - Add to .env.local only!

### Security
- ⚠️ Never commit .env.local
- ⚠️ Private keys shown ONCE only
- ⚠️ Use private RPC for trading (public for reading)

---

## 📄 License

MIT License - See LICENSE file

---

**🦀 BASECRAB: Wait. Confirm. Strike.**

---

## 📱 Connect With Us

- **Developer**: [@VoidDrillersX](https://x.com/VoidDrillersX)
- **Telegram Channel**: [BASECRAB](https://t.me/BASECRAB)
- **Telegram Group**: [Trading Group](https://t.me/+_CbpqhcoQIpkMDM0)

---

Made with ❤️ by VoidDrillersX

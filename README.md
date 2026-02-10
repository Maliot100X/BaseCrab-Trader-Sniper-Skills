# 🦀 BASECRAB v3.0.0 - Global Autonomous Trading Intelligence Agent

**Production-Grade • Cross-Chain • AI-Powered Trading System**

---

## 🎯 What is BASECRAB?

BASECRAB is a professional trading intelligence system that monitors markets in real-time, identifies high-probability trading opportunities, and optionally executes trades automatically. It integrates multiple data sources and supports 5 blockchain networks.

**Key Features:**
- 🔍 Real-time market scanning (DEX Screener, Birdeye, DEXTV, Pump.fun)
- 🧠 AI-powered signal analysis with configurable confidence thresholds
- ⚡ Auto-scalping with take-profit and stop-loss automation
- 🌐 Multi-chain support (Base, Ethereum, BNB, Solana, Zora)
- 📊 Web dashboard for complete control and monitoring
- 📱 Telegram integration for signals and management
- 💰 Multi-wallet support across all chains

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone & Install
```bash
git clone https://github.com/Maliot100X/BaseCrab-Trader-Sniper-Skills.git
cd BaseCrab-Trader-Sniper-Skills
npm install
```

### Step 2: Configure (Create .env file)
```bash
# Copy the example file
cp .env.example .env

# Edit with your credentials
notepad .env
```

### Step 3: Launch
```bash
# Start the dashboard (opens in browser)
npm run dev

# OR start directly
npm start
```

### Step 4: Open Dashboard
- Navigate to: `http://localhost:3000`
- Configure your AI API key, Telegram credentials, and wallets
- Click "🚀 Start Bot" to begin trading

---

## 📦 Available Commands

```bash
npm run dev          # Start dashboard on localhost:3000
npm start            # Production start
npm run setup        # Initialize configuration
npm test            # Test configuration
npm run push         # Commit & push updates
```

---

## ⚙️ Configuration Guide

### AI Provider Setup (Supports ANY API Key)

BASECRAB works with any AI API provider. Configure in Settings tab:

| Provider | Model Example | Setup |
|----------|--------------|-------|
| OpenAI | `gpt-4`, `gpt-4o` | Get key from platform.openai.com |
| Anthropic | `claude-3-opus-20240229` | Get key from anthropic.com |
| MiniMax | `abab6.5s-chat` | Get key from platform.minimax.io |
| DeepSeek | `deepseek-chat` | Get key from deepseek.com |
| Groq | `llama-3.1-70b` | Get key from groq.com |

### Telegram Setup

1. Message @BotFather on Telegram
2. Create new bot: `/newbot`
3. Copy bot token
4. Add bot to your channel/group as admin
5. Get channel ID (add bot to channel, check @userinfobot)

### RPC Endpoints (Free Public)

| Chain | RPC URL | Use Case |
|-------|---------|----------|
| Base | `https://base-mainnet.public.blastapi.io` | Primary trading |
| Ethereum | `https://eth.public-rpc.com` | DeFi protocols |
| BNB Chain | `https://bsc.publicnode.com` | Memecoins, Pump.fun |
| Solana | `https://api.mainnet-beta.solana.com` | New launches |
| Zora | `https://rpc.zora.energy` | NFT, creators |

---

## 📊 Supported Chains & Tokens

### Blockchains
- 🟦 **Base** - Primary trading venue
- 🟣 **Ethereum** - DeFi and major protocols
- 🟡 **BNB Chain** - Memecoins and Pump.fun tokens
- 🟢 **Solana** - High-performance trading
- 🟠 **Zora** - NFT and creator economy

### Data Sources
- **DEX Screener** - Token prices & liquidity
- **Birdeye** - Multi-chain market data
- **DEXTV** - Trading volumes & activity
- **Pump.fun** - BNB meme coin launches

---

## 🎮 Dashboard Features

### Dashboard Tab
- Live signal feed with confidence scores
- Recent trades with P&L tracking
- Win rate and statistics
- Total P&L monitoring

### Scanner Tab
- Chain selector (Base, Ethereum, BNB, Solana, Zora)
- Data source toggle (DEX Screener, Birdeye, Pump.fun)
- One-click market scan
- Signal filtering by confidence

### Trading Tab
- Auto-scalp configuration:
  - Min confidence threshold
  - Position size ($)
  - Take profit % (default: 50%)
  - Stop loss % (default: 10%)
  - Slippage tolerance
  - Max daily trades
  - Auto-buy threshold with slider
- Active positions monitor
- One-click position close

### Wallets Tab
- Add wallets by chain
- Private key entry (shown once only)
- Connected wallets list
- Balance display across chains

### Settings Tab
- AI Provider configuration (ANY API)
- Telegram bot settings
- RPC endpoint configuration
- Data source status
- Save/load settings (persisted locally)

### Logs Tab
- Real-time system logs
- Signal notifications
- Trade execution history
- Error monitoring

---

## 📈 Signal Detection Algorithm

BASECRAB analyzes tokens using a multi-factor scoring system:

### Scoring Factors (100 points max)
- **Volume Score** (0-20 points): Based on 24h trading volume
- **Liquidity Score** (0-15 points): Based on pool liquidity
- **Price Action Score** (-10 to +15 points): Based on 24h change
- **AI Analysis** (0-50 points): Configurable AI provider analysis
- **Random Factor** (-5 to +5 points): Market noise simulation

### Confidence Levels
- **90-99%**: Exceptional opportunity
- **80-89%**: Strong buy signal
- **70-79%**: Buy signal
- **60-69%**: Watch list
- **Below 60%**: Ignored

---

## ⚠️ Risk Management

### Recommended Settings for Beginners
```
Position Size:     $50-100
Take Profit:       30-50%
Stop Loss:         10-15%
Min Confidence:    85%
Auto-Buy:          OFF (manual confirmation)
```

### Safety Features
- Stop loss automation
- Max daily trade limits
- Position size limits
- Confidence threshold filtering
- Slippage protection

---

## 🔒 Security Guidelines

### MUST DO:
✅ Store private keys securely
✅ Use environment variables for all credentials
✅ Start with small position sizes
✅ Test on testnets first
✅ Monitor bot activity regularly

### MUST NOT:
❌ Commit .env files to GitHub
❌ Share private keys or seed phrases
❌ Use borrowed funds for trading
❌ Ignore stop loss settings
❌ Trade with emotions

---

## 📱 Telegram Commands

Once bot is running and Telegram is configured:

```
/start          - Start the bot
/stop           - Stop scanning
/scan           - Manual market scan
/status         - Show current status
/settings       - Show configuration
/help           - Show help message
```

---

## 🛠️ Development

### Project Structure
```
BASECRAB/
├── public/              # Web dashboard
│   ├── index.html       # Main dashboard
│   ├── styles.css       # Styles
│   ├── app.js           # Frontend logic
│   ├── logo.png         # Brand logo
│   ├── icon.png         # Favicon
│   └── tokens/          # Chain icons
│       ├── base.png
│       ├── eth.png
│       ├── bnb.png
│       ├── sol.png
│       └── zora.png
├── server.js            # Trading bot server
├── package.json         # Dependencies
├── .env.example         # Configuration template
├── LICENSE              # Premium License
└── README.md            # This file
```

### Dependencies
```json
{
  "express": "^4.18.2",
  "socket.io": "^4.7.2",
  "cors": "^2.8.5",
  "axios": "^1.6.2",
  "dotenv": "^16.3.1"
}
```

---

## 📄 License

**BASECRAB Premium License** - See LICENSE file

This is proprietary software with specific usage terms. See LICENSE for complete details.

---

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md in .github folder.

---

## 📞 Support

### Developer
- **Twitter/X**: [@VoidDrillersX](https://x.com/VoidDrillersX)
- **Telegram**: [BASECRAB](https://t.me/BASECRAB)

### Resources
- **GitHub**: https://github.com/Maliot100X/BaseCrab-Trader-Sniper-Skills
- **Issues**: Report bugs on GitHub Issues

---

## ⚡ Performance Tips

1. **Use Private RPCs**: Public RPCs are rate-limited. For production, use private endpoints
2. **AI Provider Choice**: Claude-3 and GPT-4 provide best analysis quality
3. **Position Sizing**: Start small, increase as you gain confidence
4. **Monitoring**: Keep dashboard open during active trading sessions
5. **Backup**: Regularly backup your .env file

---

## 🚨 Disclaimer

**Trading cryptocurrencies involves substantial risk of loss.**

BASECRAB is a tool to assist with trading decisions. It does not guarantee profits.
Past performance does not guarantee future results.

The developers are not responsible for:
- Financial losses
- Trading decisions
- Smart contract risks
- Market volatility

**ALWAYS DYOR (Do Your Own Research) and never invest more than you can afford to lose.**

---

## ❤️ Credits

- **Developer**: VoidDrillersX
- **Data Providers**: DEX Screener, Birdeye, DEXTV, Pump.fun
- **Blockchains**: Base, Ethereum, BNB, Solana, Zora
- **AI Providers**: OpenAI, Anthropic, MiniMax, DeepSeek, Groq

---

**🦀 BASECRAB: Wait. Confirm. Strike.**

Made with ❤️ by VoidDrillersX


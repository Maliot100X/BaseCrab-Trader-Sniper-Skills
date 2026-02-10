# Market Scanner Skill

## Purpose
Scan all supported chains for high-probability trading opportunities in real-time.

## Scanning Criteria

### Volume Analysis
- Look for 5x+ volume spikes above 24h average
- Verify volume is sustainable, not wash trading
- Check trading volume in USD equivalent

### Liquidity Signals
- Minimum liquidity pool: $50,000 USD
- Liquidity must be concentrated (top 5 wallets < 40% of supply)
- Look for liquidity sweeps and accumulation patterns

### Price Action
- Identify consolidation before breakout
- Detect volume-weighted average price (VWAP) breaches
- Look for higher lows and higher highs (uptrend)
- Monitor support/resistance levels

### Order Flow
- Monitor large buy orders (>1% of liquidity)
- Detect smart money accumulation (steady buying over 4h+)
- Identify distribution patterns (large sells)

### Market Structure
- Check if token is in accumulation or distribution phase
- Monitor buy/sell pressure ratio
- Track market sentiment indicators

## Output Format

```
🦀 SCAN REPORT | [TIMESTAMP]

📊 VOLUME: [24h Volume] | [Change %]
💧 LIQUIDITY: [Pool Size]
📈 PATTERN: [Pattern Type]
⚡ MOMENTUM: [Strength Score]
🎯 CONFIDENCE: [Grade A/B/C]

🔍 KEY SIGNALS:
- [Signal 1]
- [Signal 2]
- [Signal 3]

⚠️ RISK FACTORS:
- [Risk 1]
- [Risk 2]

📋 RECOMMENDATION: [Watch / Skip / Investigate]
```

## Chain Priority
1. Base (Primary) - Always scan first
2. Ethereum - DeFi protocols, established tokens
3. BNB Chain - Memecoins, high activity
4. Solana - New launches, retail interest
5. Zora - NFT and creator tokens

## Filtering Rules
- Reject tokens with < $10,000 daily volume
- Skip tokens with >60% of supply in top 10 wallets
- Ignore tokens with <2 hours of trading history
- Filter out known rug pulls and honeypots

## Scan Frequency
- Full chain scan: Every 15 minutes
- Hot token monitoring: Every 1 minute
- Whale tracking: Real-time alerts

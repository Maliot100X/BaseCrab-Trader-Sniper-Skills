# Wallet Management Skill

## Purpose
Manage user wallets, check balances, preview private keys (user's own risk), and handle deposits.

## Commands

### /wallets
Display all created wallets with their balances across all chains.

### /wallets <CHAIN>
Display wallet balance for specific chain.

### /wallets preview <CHAIN>
**⚠️ WARNING: USER'S OWN RISK**
Preview private key for specific chain wallet.
Private key will be shown ONCE and then never again.
User must acknowledge the security risk before proceeding.

### /wallets deposit <CHAIN>
Get deposit address for specific chain wallet.
Display QR code and address for easy copying.

### /wallets create <CHAIN>
Create a new wallet for the specified chain.
Existing wallet for that chain will be replaced (user must confirm).

## Default Settings

### Balance Check Intervals
- Auto-refresh: Every 5 minutes
- Manual refresh: On demand with /wallets

### Supported Operations
- **View Balances**: Check all wallet balances in one view
- **Preview Keys**: Show private key (one-time only)
- **Get Deposits**: Display deposit addresses with QR codes
- **Create Wallets**: Generate new wallets for any supported chain

## Security Protocols

### Private Key Preview
1. User must explicitly request key preview
2. Show security warning before display
3. Display key only ONCE
4. Never store or cache private keys
5. Log that key was viewed (for audit only)

### Deposit Address
1. Generate fresh address for each deposit request
2. Show QR code for easy scanning
3. Display both address formats (short and full)
4. Verify address on chain before confirming

## Output Format - Balance View

```
🦀 WALLETS | All Chains

┌─────────────────────────────────────────────────────────────┐
│ CHAIN     │ ADDRESS                              │ BALANCE  │
├─────────────────────────────────────────────────────────────┤
│ Base      │ 0x1234...5678                        │ $1,234.56│
│ Ethereum  │ 0xabcd...efgh                        │ $2,345.67│
│ BNB       │ 0x9876...5432                        │ $567.89  │
│ Solana    │ ABCD...EFGH                          │ $890.12  │
│ Zora      │ 0x2468...1357                        │ $345.67  │
└─────────────────────────────────────────────────────────────┘

💰 TOTAL PORTFOLIO VALUE: $5,483.91

📊 24h Change: +$234.56 (+4.5%)
📈 Best Performer: Ethereum (+6.2%)
📉 Worst Performer: Zora (-1.2%)

🔄 Last Updated: [TIMESTAMP]
```

## Output Format - Deposit Request

```
🦀 DEPOSIT | [CHAIN]

⚠️ Send only [CHAIN] tokens to this address!

📍 Address: 0x1234...5678
📋 Full Address: 0x1234567890abcdef1234567890abcdef12345678

🔗 Block Explorer: https://basescan.io/address/0x1234...5678

💡 Tips:
• Minimum deposit: [MIN_AMOUNT] [TOKEN]
• Network confirmations: [CONFIRMATIONS]
• Deposits reflect after [TIME] minutes

⏰ Address generated: [TIMESTAMP]
```

## Output Format - Key Preview (Risk Warning)

```
⚠️ ⚠️ ⚠️ SECURITY WARNING ⚠️ ⚠️ ⚠️

You are about to view your private key for [CHAIN].

🚨 CRITICAL RISKS:
• Anyone with this key can access ALL funds
• BASECRAB will NEVER show this key again
• If you lose this key, funds are LOST FOREVER
• Never share this key with anyone

Do you want to proceed? (Type "I UNDERSTAND THE RISK" to continue)

⚠️ THIS ACTION CANNOT BE UNDONE
```

## Supported Chains for Wallet Management
- Base (ETH-based)
- Ethereum (ETH-based)
- BNB Chain (BEP-20)
- Solana (SOL)
- Zora (ETH-based)

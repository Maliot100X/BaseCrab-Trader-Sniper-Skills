# Multi-Chain Wallet Creation Skill

## Purpose
Create wallets on any supported chain. Users can select their preferred chain and generate secure wallets.

## Commands

### /chains
Display all supported chains with wallet status and quick actions.

### /chains create <CHAIN>
Create a new wallet for the specified chain.

### /chains create all
Create wallets for ALL supported chains at once.

### /chains import <CHAIN> <ADDRESS>
Import an existing wallet address (read-only mode).

### /chains export <CHAIN>
Export wallet details (addresses only, no keys).

### /chains delete <CHAIN>
Delete wallet for specific chain (requires confirmation).

## Supported Chains

### Primary Chain
- **Base** - Native support, lowest fees, fastest transactions

### Secondary Chains
- **Ethereum** - Largest DeFi ecosystem, established protocols
- **BNB Chain** - High activity, memecoins, trading volume
- **Solana** - New launches, retail interest, speed
- **Zora** - NFT and creator tokens, unique opportunities

## Default Wallet Settings

### Security Parameters
- Algorithm: secp256k1 (for ETH-based chains) / Ed25519 (for Solana)
- Derivation Path:
  - Base: m/44'/60'/0'/0/0
  - Ethereum: m/44'/60'/0'/0/0
  - BNB Chain: m/44'/60'/0'/0/0
  - Solana: m/44'/501'/0'/0'
  - Zora: m/44'/60'/0'/0/0'

### Encryption
- Private keys encrypted with AES-256
- Master password required for decryption
- Keys never stored in plain text
- Auto-lock after 15 minutes inactivity

## Wallet Creation Process

### Step 1: User Selection
User specifies chain: `/chains create base`

### Step 2: Confirmation
Display wallet details before creation:
```
🦀 Creating NEW [CHAIN] Wallet

⚠️ If you already have a wallet for [CHAIN], it will be REPLACED.

Current wallet status:
📍 Existing: 0x1234...5678 (will be removed)
💰 Balance: $0.00

Type "CREATE NEW WALLET" to proceed or "/cancel" to abort.
```

### Step 3: Generation
Generate wallet with secure entropy:
- 256-bit random seed
- Mnemonic phrase (12 words)
- Private key derivation
- Public address generation

### Step 4: One-Time Display
**CRITICAL**: Show private key and mnemonic ONCE:
```
🦀 NEW WALLET CREATED | [CHAIN]

⚠️ ⚠️ ⚠️ SAVE THIS INFORMATION NOW ⚠️ ⚠️ ⚠️

🔑 PRIVATE KEY (SAVE SECURELY):
abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx1234y5678z9012abcd

📝 MNEMONIC PHRASE (12 WORDS - WRITE DOWN):
abandon ability able about above absent absorb abstract absurd abuse access

⚠️ IMPORTANT:
• Private key shown ONLY ONCE
• Never share with anyone
• Lose this = lose funds forever
• BASECRAB cannot recover keys

📍 WALLET ADDRESS: 0x1234...5678
🔗 Explorer: https://basescan.io/address/0x1234...5678

[30 second countdown before auto-delete...]
```

### Step 5: Verification
User confirms successful save:
```
✅ Verification Complete

Your [CHAIN] wallet is now active.

📍 Address: 0x1234...5678
💰 Balance: $0.00
🔄 Status: Ready for deposits

Use /wallets to view all wallets
Use /wallets deposit base to get deposit address
```

## Chain-Specific Features

### Base
- Native token: ETH
- RPC: https://base-mainnet.infura.io/v3/YOUR_KEY
- Explorer: https://basescan.io
- Avg. confirmation: 2 seconds
- Tx fee: ~$0.01-$0.10

### Ethereum
- Native token: ETH
- RPC: https://mainnet.infura.io/v3/YOUR_KEY
- Explorer: https://etherscan.io
- Avg. confirmation: 15 seconds
- Tx fee: ~$1-$50

### BNB Chain
- Native token: BNB
- RPC: https://bsc-dataseed.binance.org
- Explorer: https://bscscan.com
- Avg. confirmation: 3 seconds
- Tx fee: ~$0.10-$1.00

### Solana
- Native token: SOL
- RPC: https://api.mainnet-beta.solana.com
- Explorer: https://solscan.io
- Avg. confirmation: 0.4 seconds
- Tx fee: ~$0.001-$0.01

### Zora
- Native token: ETH
- RPC: https://rpc.zora.energy
- Explorer: https://explorer.zora.energy
- Avg. confirmation: 2 seconds
- Tx fee: ~$0.01-$0.10

## Output Format - Chain Status

```
🦀 SUPPORTED CHAINS

┌─────────────────────────────────────────────────────────────────┐
│ CHAIN     │ STATUS    │ ADDRESS              │ BALANCE         │
├─────────────────────────────────────────────────────────────────┤
│ Base      │ ✅ Active │ 0x1234...5678        │ $1,234.56       │
│ Ethereum  │ ✅ Active │ 0xabcd...efgh        │ $2,345.67       │
│ BNB Chain │ ⏳ Pending│ Not created          │ -               │
│ Solana    │ ⏳ Pending│ Not created          │ -               │
│ Zora      │ ✅ Active │ 0x2468...1357        │ $345.67         │
└─────────────────────────────────────────────────────────────────┘

📊 Total Wallets: 3/5 Created
💰 Total Balance: $3,925.90

🔗 Quick Actions:
/chains create bnb    - Create BNB Chain wallet
/chains create sol    - Create Solana wallet  
/chains create all    - Create all missing wallets
/chains import eth    - Import existing ETH address
```

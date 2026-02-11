#!/usr/bin/env node

/**
 * BASECRAB Setup Script v4.0.0
 * Interactively sets up the trading bot environment
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🦀 BASECRAB Setup Wizard v4.0.0                          ║
║   Production-Grade Autonomous Trading Intelligence         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

async function main() {
    // Check if .env exists
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const overwrite = await question('⚠️  .env file already exists. Overwrite? (y/n): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('👍 Setup cancelled.');
            rl.close();
            return;
        }
    }

    console.log('\n--- AI Configuration ---');
    const aiProvider = await question('🤖 AI Provider (openai, deepseek, anthropic, minimax, groq): ');
    const aiApiKey = await question('🔑 AI API Key: ');
    const aiModel = await question('🧠 AI Model (e.g., gpt-4, claude-3-opus-20240229): ');

    console.log('\n--- Telegram Configuration ---');
    const telegramBotToken = await question('📱 Telegram Bot Token (optional): ');
    const telegramChannelId = await question('📢 Telegram Channel ID (optional): ');

    console.log('\n--- RPC Configuration (defaults are provided) ---');
    const rpcBase = await question(`- Base RPC [https://base-mainnet.public.blastapi.io]: `) || 'https://base-mainnet.public.blastapi.io';
    const rpcEthereum = await question(`- Ethereum RPC [https://eth.public-rpc.com]: `) || 'https://eth.public-rpc.com';
    const rpcBnb = await question(`- BNB RPC [https://bsc.publicnode.com]: `) || 'https://bsc.publicnode.com';
    const rpcSolana = await question(`- Solana RPC [https://api.mainnet-beta.solana.com]: `) || 'https://api.mainnet-beta.solana.com';
    const rpcZora = await question(`- Zora RPC [https://rpc.zora.energy]: `) || 'https://rpc.zora.energy';

    const envContent = `
# AI Configuration
AI_PROVIDER=${aiProvider}
AI_API_KEY=${aiApiKey}
AI_MODEL=${aiModel}

# Telegram Configuration
TELEGRAM_BOT_TOKEN=${telegramBotToken}
TELEGRAM_CHANNEL_ID=${telegramChannelId}

# RPC Endpoints
RPC_BASE=${rpcBase}
RPC_ETHEREUM=${rpcEthereum}
RPC_BNB=${rpcBnb}
RPC_SOLANA=${rpcSolana}
RPC_ZORA=${rpcZora}

# Trading Configuration
MIN_CONFIDENCE=80
POSITION_SIZE=100
TAKE_PROFIT=50
STOP_LOSS=10
AUTO_BUY_ENABLED=false
AUTO_BUY_THRESHOLD=85
`;

    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');

    // Check if dependencies are installed
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('\n📥 Installing dependencies...');
        exec('npm install', (error, stdout, stderr) => {
            if (error) {
                console.log(`⚠️  Installation warning: ${error.message}`);
            } else {
                console.log('✅ Dependencies installed successfully!');
            }
            finishSetup();
        });
    } else {
        console.log('\n✅ Dependencies already installed');
        finishSetup();
    }
}

function finishSetup() {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    🎉 SETUP COMPLETE!                       ║
╚════════════════════════════════════════════════════════════╝

🚀 TO START BASECRAB:

   npm run dev

   Then open: http://localhost:3000

📖 For full documentation, see README.md
`);
    rl.close();
    process.exit(0);
}

main();

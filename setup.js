#!/usr/bin/env node

/**
 * BASECRAB Setup Script
 * Automatically sets up the trading bot environment
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🦀 BASECRAB Setup Wizard v3.0.0                          ║
║   Production-Grade Autonomous Trading Intelligence         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

// Check Node.js version
const nodeVersion = process.version;
console.log(`📦 Node.js Version: ${nodeVersion}`);

if (parseInt(nodeVersion.slice(1).split('.')[0]) < 22) {
    console.log('⚠️  Warning: Node.js 22+ recommended for best performance');
}

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creating .env file from template...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created!');
    console.log('\n⚠️  IMPORTANT: Edit .env file with your credentials:');
    console.log('   1. Add your AI API key (OpenAI, Anthropic, MiniMax, etc.)');
    console.log('   2. Add your Telegram Bot Token');
    console.log('   3. Add your Channel/Group IDs');
    console.log('   4. Save the file');
} else {
    console.log('\n✅ .env file already exists');
}

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

function finishSetup() {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    🎉 SETUP COMPLETE!                       ║
╚════════════════════════════════════════════════════════════╝

🚀 TO START BASECRAB:

   cd BASECRAB
   npm run dev

   Then open: http://localhost:3000

📖 For full documentation, see README.md

⚠️  Don't forget to:
   1. Edit .env with your API keys
   2. Configure Telegram bot
   3. Add your wallet(s)

Made with ❤️ by VoidDrillersX
`);
    
    process.exit(0);
}

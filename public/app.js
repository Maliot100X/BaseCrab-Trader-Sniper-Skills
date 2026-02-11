// BASECRAB v4.0 - COMPLETE DASHBOARD
class BaseCrabDashboard {
    constructor() {
        this.socket = null;
        this.connected = false;
        this.running = false;
        this.wallets = [];
        this.whales = [];
        this.positions = [];
        this.signals = [];
        this.init();
    }
    
    init() {
        this.setupSocket();
        this.setupEventListeners();
    }
    
    setupSocket() {
        try {
            this.socket = io();
            
            this.socket.on('connect', () => {
                this.connected = true;
                this.updateStatus('Connected', 'active');
                this.addLog('Connected to BASECRAB v4.0', 'success');
            });
            
            this.socket.on('disconnect', () => {
                this.connected = false;
                this.updateStatus('Disconnected', 'error');
            });
            
            // Initial state
            this.socket.on('init', (data) => {
                this.running = data.running;
                this.wallets = data.wallets || [];
                this.whales = data.whales || [];
                this.positions = data.positions || [];
                this.updateStatus(data.running ? 'Running' : 'Ready', data.running ? 'active' : 'warning');
                this.renderWallets();
                this.renderWhales();
                this.renderPositions();
            });
            
            // Status updates
            this.socket.on('status', (data) => {
                this.running = data.running;
                this.updateStatus(data.running ? 'Running' : 'Stopped', data.running ? 'active' : 'warning');
            });
            
            // Signals
            this.socket.on('signal', (s) => this.addSignal(s));
            
            // Whale signals
            this.socket.on('whaleSignal', (s) => this.addWhaleSignal(s));
            
            // Trades
            this.socket.on('trade', (t) => this.addTrade(t));
            
            // Positions
            this.socket.on('positions', (p) => {
                this.positions = p;
                this.renderPositions();
            });
            
            // Wallets
            this.socket.on('wallets', (w) => {
                this.wallets = w;
                this.renderWallets();
            });
            
            // Whales
            this.socket.on('whales', (w) => {
                this.whales = w;
                this.renderWhales();
            });
            
            // Prices
            this.socket.on('prices', (p) => this.updatePrices(p));
            
            // Stats
            this.socket.on('stats', (s) => this.updateStats(s));
            
            // Logs
            this.socket.on('log', (l) => this.addLog(l.message, l.type));
            
        } catch (e) {
            console.error('Socket error:', e);
            this.updateStatus('Offline', 'error');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.tab).classList.add('active');
            });
        });
        
        // Start/Stop buttons
        document.getElementById('startBtn').addEventListener('click', () => this.startBot());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopBot());
        
        // Scanner
        document.querySelectorAll('.chain-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chain-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        document.getElementById('scanBtn').addEventListener('click', () => this.scanMarket());
        
        // Whale Watch
        document.getElementById('addWhaleBtn').addEventListener('click', () => this.addWhale());
        
        // Sniper
        document.getElementById('sniperBuyBtn').addEventListener('click', () => this.sniperBuy());
        
        // Wallets
        document.getElementById('addWalletBtn').addEventListener('click', () => this.addWallet());
        
        // Settings - Auto-buy slider
        document.getElementById('autoBuyThreshold').addEventListener('input', (e) => {
            document.getElementById('autoBuyValue').textContent = e.target.value + '%';
        });
        
        // Settings - Save
        document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettings());
    }
    
    // ========== BOT CONTROL ==========
    startBot() {
        if (!this.connected) {
            this.addLog('Not connected to server!', 'error');
            return;
        }
        
        const settings = {
            aiApiKey: document.getElementById('aiApiKey').value,
            aiProvider: document.getElementById('aiProvider').value,
            aiModel: document.getElementById('aiModel').value,
            telegramBotToken: document.getElementById('telegramToken').value,
            telegramChannelId: document.getElementById('telegramChannel').value,
            positionSize: parseFloat(document.getElementById('positionSize').value)|| 100,
            minConfidence: parseInt(document.getElementById('minConfidence').value) || 80,
            takeProfit: parseFloat(document.getElementById('takeProfit').value) || 50,
            stopLoss: parseFloat(document.getElementById('stopLoss').value) || 10,
            autoBuyEnabled: document.getElementById('autoBuyEnabled').checked,
            autoBuyThreshold: parseInt(document.getElementById('autoBuyThreshold').value) || 85
        };
        
        this.socket.emit('startBot', settings);
        this.addLog('🚀 Starting BASECRAB...', 'success');
    }
    
    stopBot() {
        this.socket.emit('stopBot');
        this.addLog('🛑 Stopping BASECRAB...', 'info');
    }
    
    // ========== SCANNER ==========
    scanMarket() {
        const chain = document.querySelector('.chain-btn.active').dataset.chain;
        this.socket.emit('scanMarket', { chain });
        this.addLog(`🔍 Scanning ${chain.toUpperCase()} market...`, 'info');
    }
    
    // ========== WHALE WATCH ==========
    addWhale() {
        const data = {
            name: document.getElementById('whaleName').value.trim(),
            address: document.getElementById('whaleAddress').value.trim(),
            chain: document.getElementById('whaleChain').value,
            autoBuy: document.getElementById('whaleAutoBuy').checked
        };
        
        if (!data.name || !data.address) {
            this.addLog('❌ Enter whale name and address!', 'error');
            return;
        }
        
        this.socket.emit('addWhale', data);
        this.addLog(`🐋 Whale added: ${data.name}`, 'success');
        
        // Clear inputs
        document.getElementById('whaleName').value = '';
        document.getElementById('whaleAddress').value = '';
    }
    
    renderWhales() {
        const container = document.getElementById('whalesList');
        if (!this.whales || this.whales.length === 0) {
            container.innerHTML = '<div class="empty-state">No whales tracked yet</div>';
            return;
        }
        
        container.innerHTML = this.whales.map(w => `
            <div class="signal-item">
                <div class="signal-info">
                    <span class="signal-token">${w.name}</span>
                    <span class="signal-chain">${w.chain.toUpperCase()} ${w.autoBuy ? '🤖 Auto-Buy ON' : ''}</span>
                </div>
                <button class="btn btn-danger" onclick="dashboard.removeWhale('${w.address}')">Remove</button>
            </div>
        `).join('');
    }
    
    removeWhale(address) {
        this.socket.emit('removeWhale', address);
        this.addLog('🐋 Whale removed', 'info');
    }
    
    addWhaleSignal(signal) {
        const container = document.getElementById('whaleSignals');
        if (container.querySelector('.empty-state')) {
            container.innerHTML = '';
        }
        
        const el = document.createElement('div');
        el.className = 'signal-item';
        el.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${signal.token}</span>
                <span class="signal-chain">🐋 ${signal.source || 'Whale'}</span>
            </div>
            <span class="signal-confidence high">${signal.confidence}%</span>
            <button class="btn btn-success" onclick="dashboard.buyByToken('${signal.token}')">Buy</button>
        `;
        container.insertBefore(el, container.firstChild);
        this.addLog(`🐋 Whale buy: ${signal.token}`, 'success');
    }
    
    // ========== SNIPER ==========
    sniperBuy() {
        const data = {
            token: document.getElementById('sniperToken').value.trim().toUpperCase(),
            address: document.getElementById('sniperAddress').value.trim(),
            price: parseFloat(document.getElementById('sniperPrice').value) || 0,
            chain: document.getElementById('sniperChain').value
        };
        
        if (!data.token || !data.address) {
            this.addLog('❌ Enter token symbol and address!', 'error');
            return;
        }
        
        this.socket.emit('sniperBuy', data);
        this.addLog(`🎯 Sniper buy: ${data.token}`, 'success');
        
        // Add to sniper history
        const history = document.getElementById('sniperHistory');
        if (history.querySelector('.empty-state')) {
            history.innerHTML = '';
        }
        
        const el = document.createElement('div');
        el.className = 'signal-item';
        el.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${data.token}</span>
                <span class="signal-chain">${data.chain.toUpperCase()} @ $${data.price}</span>
            </div>
            <span class="signal-confidence high">SNIPER</span>
        `;
        history.insertBefore(el, history.firstChild);
        
        // Clear inputs
        document.getElementById('sniperToken').value = '';
        document.getElementById('sniperAddress').value = '';
        document.getElementById('sniperPrice').value = '';
    }
    
    // ========== WALLETS ==========
    addWallet() {
        const data = {
            chain: document.getElementById('walletChain').value,
            address: document.getElementById('walletAddress').value.trim(),
            privateKey: document.getElementById('walletPrivateKey').value.trim(),
            label: document.getElementById('walletLabel').value.trim() || 'Wallet'
        };

        if (!data.address || !data.privateKey) {
            this.addLog('❌ Enter wallet address and private key!', 'error');
            return;
        }

        this.socket.emit('addWallet', data);
        this.addLog(`👛 Wallet added: ${data.label}`, 'success');

        document.getElementById('walletAddress').value = '';
        document.getElementById('walletPrivateKey').value = '';
        document.getElementById('walletLabel').value = '';
    }
    
    renderWallets() {
        const container = document.getElementById('walletsList');
        if (!this.wallets || this.wallets.length === 0) {
            container.innerHTML = '<div class="empty-state">No wallets connected</div>';
            return;
        }
        
        container.innerHTML = this.wallets.map(w => `
            <div class="signal-item">
                <div class="signal-info">
                    <span class="signal-token">${w.label}</span>
                    <span class="signal-chain">${w.chain.toUpperCase()}</span>
                </div>
                <span class="signal-confidence">${w.balance ? '$' + w.balance.toFixed(4) : 'Loading...'}</span>
            </div>
        `).join('');
    }
    
    // ========== TRADING ==========
    addSignal(signal) {
        const container = document.getElementById('liveSignals');
        if (container.querySelector('.empty-state')) {
            container.innerHTML = '';
        }
        
        const el = document.createElement('div');
        el.className = 'signal-item';
        el.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${signal.token}</span>
                <span class="signal-chain">${signal.chain.toUpperCase()} | ${signal.recommendation}</span>
            </div>
            <span class="signal-confidence ${signal.confidence >= 80 ? 'high' : signal.confidence >= 60 ? 'medium' : ''}">${signal.confidence}%</span>
            <button class="btn btn-success" onclick="dashboard.buyById('${signal.id}')">Buy</button>
        `;
        container.insertBefore(el, container.firstChild);
        
        // Add to scan results too
        const scanResults = document.getElementById('scanResults');
        if (scanResults.querySelector('.empty-state')) {
            scanResults.innerHTML = '';
        }
        scanResults.insertBefore(el.cloneNode(true), scanResults.firstChild);
    }
    
    buyById(id) {
        this.socket.emit('buySignal', { id });
        this.addLog(`💰 Buying signal...`, 'info');
    }
    
    buyByToken(token) {
        this.socket.emit('buySignal', { token });
        this.addLog(`💰 Buying ${token}...`, 'info');
    }
    
    addTrade(trade) {
        const container = document.getElementById('recentTrades');
        if (container.querySelector('.empty-state')) {
            container.innerHTML = '';
        }
        
        const el = document.createElement('div');
        el.className = 'signal-item';
        el.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${trade.token}</span>
                <span class="signal-chain">${trade.type.toUpperCase()} @ $${trade.entryPrice ? trade.entryPrice.toFixed(6) : '?'}</span>
            </div>
            <span class="signal-confidence ${trade.pnl >= 0 ? 'high' : trade.pnl < 0 ? '' : ''}">${trade.pnl >= 0 ? '+' : ''}$${(trade.pnl || 0).toFixed(2)}</span>
        `;
        container.insertBefore(el, container.firstChild);
    }
    
    renderPositions() {
        const container = document.getElementById('activePositions');
        if (!this.positions || this.positions.length === 0) {
            container.innerHTML = '<div class="empty-state">No active positions</div>';
            return;
        }
        
        container.innerHTML = this.positions.map(p => `
            <div class="signal-item">
                <div class="signal-info">
                    <span class="signal-token">${p.token}</span>
                    <span class="signal-chain">${p.chain.toUpperCase()} | ${p.size}</span>
                </div>
                <span class="signal-confidence ${(p.pnlPercent || 0) >= 0 ? 'high' : ''}">${(p.pnlPercent || 0) >= 0 ? '+' : ''}${(p.pnlPercent || 0).toFixed(1)}%</span>
            </div>
        `).join('');
    }
    
    // ========== SETTINGS==========
    saveSettings() {
        const settings = {
            aiApiKey: document.getElementById('aiApiKey').value,
            aiProvider: document.getElementById('aiProvider').value,
            aiModel: document.getElementById('aiModel').value,
            telegramBotToken: document.getElementById('telegramToken').value,
            telegramChannelId: document.getElementById('telegramChannel').value,
            positionSize: parseFloat(document.getElementById('positionSize').value) || 100,
            minConfidence: parseInt(document.getElementById('minConfidence').value) || 80,
            takeProfit: parseFloat(document.getElementById('takeProfit').value) || 50,
            stopLoss: parseFloat(document.getElementById('stopLoss').value) || 10,
            autoBuyEnabled: document.getElementById('autoBuyEnabled').checked,
            autoBuyThreshold: parseInt(document.getElementById('autoBuyThreshold').value) || 85
        };
        
        this.socket.emit('saveSettings', settings);
        this.addLog('💾 Settings saved!', 'success');
    }
    
    // ========== UI HELPERS ==========
    updateStatus(status, type) {
        const indicator = document.getElementById('statusIndicator');
        const text = document.getElementById('statusText');
        indicator.className = 'status-indicator ' + type;
        text.textContent = status;
    }
    
    updatePrices(prices) {
        if (!prices) return;
        Object.keys(prices).forEach(chain => {
            const el = document.getElementById('price' + chain.charAt(0).toUpperCase() + chain.slice(1));
            if (el) {
                el.textContent = '$' + (prices[chain] ? prices[chain].toFixed(2) : '---');
            }
        });
    }
    
    updateStats(stats) {
        if (!stats) return;
        document.getElementById('statSignals').textContent = stats.signalsToday || 0;
        document.getElementById('statWins').textContent = stats.winningTrades || 0;
        document.getElementById('statPnl').textContent = '$' + (stats.totalPnl || 0).toFixed(2);
        document.getElementById('statWinRate').textContent = (stats.winRate || 0) + '%';
    }
    
    addLog(msg, type = 'info') {
        const container = document.getElementById('logsContainer');
        if (container.querySelector('.empty-state')) {
            container.innerHTML = '';
        }
        
        const el = document.createElement('div');
        el.className = 'log-entry ' + type;
        const time = new Date().toLocaleTimeString();
        el.textContent = `[${time}] ${msg}`;
        container.insertBefore(el, container.firstChild);
        
        // Keep only last 100 logs
        while (container.children.length > 100) {
            container.removeChild(container.lastChild);
        }
    }
}

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new BaseCrabDashboard();
});

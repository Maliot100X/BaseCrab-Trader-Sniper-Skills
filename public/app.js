// BASECRAB Trading Dashboard - Main Application
class BaseCrabDashboard {
    constructor() {
        this.socket = null;
        this.connected = false;
        this.botRunning = false;
        this.settings = {};
        this.signals = [];
        this.trades = [];
        this.positions = [];
        this.wallets = [];
        this.balances = {};
        
        this.init();
    }
    
    init() {
        this.setupSocket();
        this.setupEventListeners();
        this.loadSettings();
    }
    
    setupSocket() {
        try {
            this.socket = io();
            
            this.socket.on('connect', () => {
                this.connected = true;
                this.updateStatus('Connected', 'active');
                this.addLog('Connected to BASECRAB server', 'success');
            });
            
            this.socket.on('disconnect', () => {
                this.connected = false;
                this.updateStatus('Disconnected', 'error');
                this.addLog('Disconnected from server', 'error');
            });
            
            this.socket.on('signal', (signal) => {
                this.addSignal(signal);
                this.addLog(`New signal: ${signal.token} on ${signal.chain} (${signal.confidence}%)`, 'info');
            });
            
            this.socket.on('trade', (trade) => {
                this.addTrade(trade);
                this.addLog(`Trade executed: ${trade.type} ${trade.token} @ $${trade.price}`, 'success');
            });
            
            this.socket.on('priceUpdate', (prices) => {
                this.updatePrices(prices);
            });
            
            this.socket.on('balanceUpdate', (balances) => {
                this.updateBalances(balances);
            });
            
            this.socket.on('positionUpdate', (positions) => {
                this.updatePositions(positions);
            });
            
            this.socket.on('statsUpdate', (stats) => {
                this.updateStats(stats);
            });
            
            this.socket.on('log', (message) => {
                this.addLog(message, 'info');
            });
            
        } catch (error) {
            console.error('Socket connection error:', error);
            this.updateStatus('Offline', 'error');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Start/Stop buttons
        document.getElementById('startBtn').addEventListener('click', () => this.startBot());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopBot());
        
        // Scanner
        document.getElementById('scanNow').addEventListener('click', () => this.scanMarket());
        document.querySelectorAll('.chain-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chain-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Auto-buy slider
        const autoBuySlider = document.getElementById('autoBuyThreshold');
        const autoBuyValue = document.getElementById('autoBuyValue');
        autoBuySlider.addEventListener('input', (e) => {
            autoBuyValue.textContent = e.target.value + '%';
        });
        
        // Wallet management
        document.getElementById('addWallet').addEventListener('click', () => this.addWallet());
        
        // Settings
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
    }
    
    switchTab(tabId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }
    
    updateStatus(status, type) {
        const indicator = document.getElementById('statusIndicator');
        const text = document.getElementById('statusText');
        
        indicator.className = 'status-indicator ' + type;
        text.textContent = status;
    }
    
    startBot() {
        if (this.socket && this.connected) {
            this.socket.emit('startBot', this.settings);
            this.botRunning = true;
            this.addLog('Bot starting...', 'success');
            document.getElementById('startBtn').disabled = true;
        } else {
            this.addLog('Cannot start: Not connected to server', 'error');
        }
    }
    
    stopBot() {
        if (this.socket && this.connected) {
            this.socket.emit('stopBot');
            this.botRunning = false;
            this.addLog('Bot stopped', 'info');
            document.getElementById('startBtn').disabled = false;
        }
    }
    
    scanMarket() {
        if (this.socket && this.connected) {
            const activeChain = document.querySelector('.chain-btn.active').dataset.chain;
            this.socket.emit('scan', { chain: activeChain });
            this.addLog(`Scanning ${activeChain} market...`, 'info');
        }
    }
    
    addSignal(signal) {
        this.signals.unshift(signal);
        if (this.signals.length > 50) this.signals.pop();
        
        const container = document.getElementById('liveSignals');
        if (this.signals.length === 1) {
            container.innerHTML = '';
        }
        
        const signalEl = document.createElement('div');
        signalEl.className = 'signal-item';
        signalEl.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${signal.token}</span>
                <span class="signal-chain">${signal.chain}</span>
            </div>
            <span class="signal-confidence ${signal.confidence >= 80 ? 'high' : 'medium'}">${signal.confidence}%</span>
            <div class="signal-actions">
                <button class="btn btn-primary" onclick="dashboard.buySignal('${signal.token}')">Buy</button>
                <button class="btn btn-danger" onclick="dashboard.skipSignal('${signal.id}')">Skip</button>
            </div>
        `;
        container.insertBefore(signalEl, container.firstChild);
    }
    
    addTrade(trade) {
        this.trades.unshift(trade);
        if (this.trades.length > 20) this.trades.pop();
        
        const container = document.getElementById('recentTrades');
        if (this.trades.length === 1) {
            container.innerHTML = '';
        }
        
        const tradeEl = document.createElement('div');
        tradeEl.className = 'signal-item';
        tradeEl.innerHTML = `
            <div class="signal-info">
                <span class="signal-token">${trade.token}</span>
                <span class="signal-chain">${trade.type.toUpperCase()} @ $${trade.price}</span>
            </div>
            <span class="signal-confidence ${trade.pnl >= 0 ? 'high' : 'medium'}">
                ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}
            </span>
        `;
        container.insertBefore(tradeEl, container.firstChild);
    }
    
    updatePrices(prices) {
        Object.keys(prices).forEach(chain => {
            const el = document.getElementById(chain + 'Price');
            if (el) {
                el.textContent = '$' + prices[chain].toLocaleString();
            }
        });
    }
    
    updateBalances(balances) {
        this.balances = balances;
        const container = document.getElementById('balancesList');
        const entries = Object.entries(balances);
        
        if (entries.length === 0) {
            container.innerHTML = '<div class="empty-state">No wallet balances to display.</div>';
            return;
        }
        
        container.innerHTML = entries.map(([chain, balance]) => `
            <div class="ticker">
                <img src="tokens/${chain}.png" alt="${chain}">
                <span>${chain.charAt(0).toUpperCase() + chain.slice(1)}</span>
                <span class="price">$${balance.toLocaleString()}</span>
            </div>
        `).join('');
    }
    
    updatePositions(positions) {
        this.positions = positions;
        const container = document.getElementById('activePositions');
        
        if (positions.length === 0) {
            container.innerHTML = '<div class="empty-state">No active positions.</div>';
            return;
        }
        
        container.innerHTML = positions.map(pos => `
            <div class="signal-item">
                <div class="signal-info">
                    <span class="signal-token">${pos.token}</span>
                    <span class="signal-chain">${pos.size} @ $${pos.entryPrice}</span>
                </div>
                <span class="signal-confidence ${pos.pnl >= 0 ? 'high' : 'medium'}">
                    ${pos.pnl >= 0 ? '+' : ''}${pos.pnlPercent.toFixed(1)}%
                </span>
                <button class="btn btn-danger" onclick="dashboard.closePosition('${pos.id}')">Close</button>
            </div>
        `).join('');
    }
    
    updateStats(stats) {
        document.getElementById('signalsToday').textContent = stats.signalsToday || 0;
        document.getElementById('winningTrades').textContent = stats.winningTrades || 0;
        document.getElementById('totalPnl').textContent = '$' + (stats.totalPnl || 0).toFixed(2);
        document.getElementById('winRate').textContent = (stats.winRate || 0) + '%';
    }
    
    addWallet() {
        const chain = document.getElementById('walletChain').value;
        const privateKey = document.getElementById('walletPrivateKey').value;
        
        if (!privateKey) {
            this.addLog('Please enter a private key', 'error');
            return;
        }
        
        if (this.socket && this.connected) {
            this.socket.emit('addWallet', { chain, privateKey });
            this.addLog(`Wallet added for ${chain}`, 'success');
            document.getElementById('walletPrivateKey').value = '';
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('basecrab_settings');
        if (saved) {
            this.settings = JSON.parse(saved);
            
            // Populate form
            document.getElementById('aiProvider').value = this.settings.aiProvider || 'openai';
            document.getElementById('aiApiKey').value = this.settings.aiApiKey || '';
            document.getElementById('aiModel').value = this.settings.aiModel || '';
            document.getElementById('aiMaxTokens').value = this.settings.aiMaxTokens || 4096;
            document.getElementById('telegramBotToken').value = this.settings.telegramBotToken || '';
            document.getElementById('telegramChannelId').value = this.settings.telegramChannelId || '';
            document.getElementById('telegramGroupId').value = this.settings.telegramGroupId || '';
            
            // RPC endpoints
            if (this.settings.rpc) {
                document.getElementById('rpcBase').value = this.settings.rpc.base || '';
                document.getElementById('rpcEthereum').value = this.settings.rpc.ethereum || '';
                document.getElementById('rpcBnb').value = this.settings.rpc.bnb || '';
                document.getElementById('rpcSolana').value = this.settings.rpc.solana || '';
                document.getElementById('rpcZora').value = this.settings.rpc.zora || '';
            }
            
            // Trading settings
            document.getElementById('minConfidence').value = this.settings.minConfidence || 80;
            document.getElementById('positionSize').value = this.settings.positionSize || 100;
            document.getElementById('takeProfit').value = this.settings.takeProfit || 50;
            document.getElementById('stopLoss').value = this.settings.stopLoss || 10;
            document.getElementById('slippage').value = this.settings.slippage || 5;
            document.getElementById('maxDailyTrades').value = this.settings.maxDailyTrades || 20;
            document.getElementById('autoBuyThreshold').value = this.settings.autoBuyThreshold || 85;
            document.getElementById('autoBuyEnabled').checked = this.settings.autoBuyEnabled || false;
        }
    }
    
    saveSettings() {
        this.settings = {
            aiProvider: document.getElementById('aiProvider').value,
            aiApiKey: document.getElementById('aiApiKey').value,
            aiModel: document.getElementById('aiModel').value,
            aiMaxTokens: parseInt(document.getElementById('aiMaxTokens').value),
            telegramBotToken: document.getElementById('telegramBotToken').value,
            telegramChannelId: document.getElementById('telegramChannelId').value,
            telegramGroupId: document.getElementById('telegramGroupId').value,
            rpc: {
                base: document.getElementById('rpcBase').value,
                ethereum: document.getElementById('rpcEthereum').value,
                bnb: document.getElementById('rpcBnb').value,
                solana: document.getElementById('rpcSolana').value,
                zora: document.getElementById('rpcZora').value
            },
            minConfidence: parseInt(document.getElementById('minConfidence').value),
            positionSize: parseFloat(document.getElementById('positionSize').value),
            takeProfit: parseFloat(document.getElementById('takeProfit').value),
            stopLoss: parseFloat(document.getElementById('stopLoss').value),
            slippage: parseFloat(document.getElementById('slippage').value),
            maxDailyTrades: parseInt(document.getElementById('maxDailyTrades').value),
            autoBuyThreshold: parseInt(document.getElementById('autoBuyThreshold').value),
            autoBuyEnabled: document.getElementById('autoBuyEnabled').checked
        };
        
        localStorage.setItem('basecrab_settings', JSON.stringify(this.settings));
        
        if (this.socket && this.connected) {
            this.socket.emit('updateSettings', this.settings);
        }
        
        this.addLog('Settings saved successfully', 'success');
    }
    
    addLog(message, type = 'info') {
        const container = document.getElementById('logsContainer');
        if (container.querySelector('.empty-state')) {
            container.innerHTML = '';
        }
        
        const entry = document.createElement('div');
        entry.className = 'log-entry ' + type;
        entry.textContent = '[' + new Date().toLocaleTimeString() + '] ' + message;
        container.insertBefore(entry, container.firstChild);
    }
    
    buySignal(token) {
        if (this.socket && this.connected) {
            this.socket.emit('buySignal', { token });
            this.addLog(`Buying signal: ${token}`, 'info');
        }
    }
    
    skipSignal(id) {
        this.signals = this.signals.filter(s => s.id !== id);
        document.getElementById('liveSignals').innerHTML = this.signals.map(s => `
            <div class="signal-item">
                <div class="signal-info">
                    <span class="signal-token">${s.token}</span>
                    <span class="signal-chain">${s.chain}</span>
                </div>
                <span class="signal-confidence ${s.confidence >= 80 ? 'high' : 'medium'}">${s.confidence}%</span>
                <div class="signal-actions">
                    <button class="btn btn-primary" onclick="dashboard.buySignal('${s.token}')">Buy</button>
                    <button class="btn btn-danger" onclick="dashboard.skipSignal('${s.id}')">Skip</button>
                </div>
            </div>
        `).join('') || '<div class="empty-state">No signals yet.</div>';
    }
    
    closePosition(id) {
        if (this.socket && this.connected) {
            this.socket.emit('closePosition', { id });
            this.addLog(`Closing position: ${id}`, 'info');
        }
    }
}

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new BaseCrabDashboard();
});

class MarketTrendAnalyzer {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.updateMarketData();
        this.initializeChart();
        // Update data every 5 minutes
        setInterval(() => this.updateMarketData(), 300000);
    }

    async updateMarketData() {
        try {
            // Simulate API call for market data
            const marketData = await this.fetchMarketData();
            this.updateUI(marketData);
        } catch (error) {
            console.error('Error updating market data:', error);
            this.showError();
        }
    }

    async fetchMarketData() {
        // TODO: Replace with actual API calls
        // This is mock data for demonstration
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    volume24h: '$4.7B',
                    totalCoins: 10404,
                    successfulCoins: 127,
                    marketSentiment: 'Bullish',
                    trendDirection: 'bullish',
                    topPerformers: [
                        { 
                            name: 'Its Time To Full Port',
                            image: 'images/fullport.png',
                            change: '4000X'
                        },
                        { 
                            name: 'MAX',
                            image: 'images/max.png',
                            change: '3000X'
                        },
                        { 
                            name: 'Alchemist AI',
                            image: 'images/alch.png',
                            change: '17,600X'
                        },
                        { 
                            name: 'Darksun',
                            image: 'images/darksun.png',
                            change: '4600X'
                        }
                    ]
                });
            }, 1000);
        });
    }

    updateUI(data) {
        // Update volume
        document.getElementById('volume-24h').textContent = data.volume24h;
        
        // Update total coins
        document.getElementById('total-coins').textContent = 
            data.totalCoins.toLocaleString();
        
        // Update successful coins
        document.getElementById('successful-coins').textContent = 
            `${data.successfulCoins.toLocaleString()} coins`;
        
        // Calculate and update success rate
        const successRate = ((data.successfulCoins / data.totalCoins) * 100).toFixed(2);
        document.getElementById('success-rate').textContent = `${successRate}%`;
        
        // Update market sentiment
        document.getElementById('market-sentiment').textContent = 
            data.marketSentiment;
        
        // Update trend status
        document.getElementById('trend-status').textContent = 
            `Market is ${data.marketSentiment}`;
        
        // Update trend direction indicator
        const trendElement = document.getElementById('trend-direction');
        trendElement.className = data.trendDirection;
        
        // Update top performers
        this.updateTopPerformers(data.topPerformers);
    }

    updateTopPerformers(performers) {
        const container = document.getElementById('coins-list');
        container.innerHTML = performers.map(coin => `
            <div class="metric-card">
                <h3>${coin.name}</h3>
                ${coin.image ? `<img src="${coin.image}" alt="${coin.name}" class="coin-image">` : ''}
                <p class="change ${coin.change.includes('X') ? 'multiplier' : coin.change.startsWith('+') ? 'positive' : 'negative'}">
                    ${coin.change}
                </p>
            </div>
        `).join('');
    }

    showError() {
        // Show error state in UI
        document.getElementById('trend-status').textContent = 
            'Error loading market data';
        document.getElementById('trend-direction').className = 'neutral';
    }

    initializeChart() {
        const ctx = document.getElementById('weeklyChart').getContext('2d');
        
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Success Rate (%)',
                data: [1.41, 1.83, 0.86, 0.98, 1.12, 1.32, 0.86],
                backgroundColor: '#2c3e50',
                borderRadius: 5,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: '%',
                            font: {
                                family: 'Inter',
                                size: 14,
                                weight: 500
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Days',
                            font: {
                                family: 'Inter',
                                size: 14,
                                weight: 500
                            }
                        }
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}

// Initialize the analyzer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarketTrendAnalyzer();
});

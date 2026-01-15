const http = require('http');

const PORT = 3000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
    // 1. CORS Headers (Allow All for Demo)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Handle Preflight Options
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 3. Logger
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // 4. Routes
    if (req.url === '/' || req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'API Operational',
            service: 'FashionERP API',
            timestamp: new Date().toISOString()
        }));
    }
    else if (req.url === '/admin/dashboard') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            systemStatus: 'OPERATIONAL',
            activeUsers: 42,
            aiServiceLoad: '12%',
            dailyVisualGenerations: 156,
            estimatedCostToday: '$14.50'
        }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`\n🚀 API Server running at http://${HOST}:${PORT}/`);
    console.log('   Ready to accept connections...\n');
});

// Prevent crash on unhandled errors
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

// Einfacher Proxy um Vite's Host-Validierung zu umgehen
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true
});

// Host-Header auf localhost:5173 umschreiben
proxy.on('proxyReq', (proxyReq, req, res) => {
  proxyReq.setHeader('host', 'localhost:5173');
});

const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(5174, '0.0.0.0', () => {
  console.log('🔄 Proxy läuft auf Port 5174');
  console.log('   → Leitet weiter an Vite auf Port 5173');
  console.log('   → Umgeht Host-Validierung');
});

const http = require('http');

http.createServer((req, res) => {
  console.log(`🔓 [Captured] ${req.url}`);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK\n');
}).listen(8000, () => {
  console.log('🎯 Attacker server listening on port 8000...');
});

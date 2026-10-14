const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS & basic headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  let safePath = decodeURI(req.url.split('?')[0]);
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  // Prevent directory traversal
  const resolvedPath = path.normalize(path.join(PUBLIC_DIR, safePath));
  if (!resolvedPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Proibido');
    return;
  }

  fs.stat(resolvedPath, (err, stats) => {
    if (err) {
      // Check if appending .html works
      if (fs.existsSync(resolvedPath + '.html')) {
        return serveFile(resolvedPath + '.html', res);
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Não Encontrado</h1><p>O arquivo ${safePath} não existe.</p><p><a href="/index.html">Voltar ao Início</a></p>`);
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(resolvedPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        return serveFile(indexPath, res);
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Diretório sem index.html</h1>');
      return;
    }

    serveFile(resolvedPath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro interno ao ler arquivo: ' + err.message);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 PostoRH Sistema Operacional rodando em:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`   (Abra o link acima no navegador)`);
  console.log(`======================================================\n`);
});

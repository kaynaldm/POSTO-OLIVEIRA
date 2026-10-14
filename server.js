const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Explicit static references so @vercel/nft traces and bundles every file into the Lambda package
const KNOWN_FILES = {
  '/index.html': { path: path.join(__dirname, 'index.html'), type: 'text/html; charset=utf-8' },
  '/colaboradores.html': { path: path.join(__dirname, 'colaboradores.html'), type: 'text/html; charset=utf-8' },
  '/frequencia.html': { path: path.join(__dirname, 'frequencia.html'), type: 'text/html; charset=utf-8' },
  '/financeiro-vales.html': { path: path.join(__dirname, 'financeiro-vales.html'), type: 'text/html; charset=utf-8' },
  '/mapa-unidades.html': { path: path.join(__dirname, 'mapa-unidades.html'), type: 'text/html; charset=utf-8' },
  '/sync-store.js': { path: path.join(__dirname, 'sync-store.js'), type: 'application/javascript; charset=utf-8' }
};

// In-memory cache loaded safely
const CACHED_FILES = {};
for (const [route, info] of Object.entries(KNOWN_FILES)) {
  try {
    if (fs.existsSync(info.path)) {
      CACHED_FILES[route] = {
        content: fs.readFileSync(info.path),
        type: info.type
      };
    }
  } catch (e) {
    console.warn('Falha ao pré-carregar:', route, e.message);
  }
}

// Aliases for clean URLs (o sistema agora inicia direto em Colaboradores)
const ROUTE_ALIASES = {
  '/': '/colaboradores.html',
  '/index': '/colaboradores.html',
  '/index.html': '/colaboradores.html',
  '/dashboard': '/colaboradores.html',
  '/dashboard.html': '/colaboradores.html',
  '/colaboradores': '/colaboradores.html',
  '/frequencia': '/frequencia.html',
  '/financeiro-vales': '/financeiro-vales.html',
  '/vales': '/financeiro-vales.html',
  '/mapa-unidades': '/mapa-unidades.html',
  '/mapa': '/mapa-unidades.html'
};

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
  res.setHeader('Access-Control-Allow-Origin', '*');

  let safePath = decodeURI(req.url.split('?')[0]);
  if (ROUTE_ALIASES[safePath]) {
    safePath = ROUTE_ALIASES[safePath];
  }

  // 1. Check in-memory cache first (instant response, 0ms, zero disk dependency)
  if (CACHED_FILES[safePath]) {
    res.writeHead(200, { 'Content-Type': CACHED_FILES[safePath].type });
    res.end(CACHED_FILES[safePath].content);
    return;
  }

  // 2. Check if appending .html matches in cache
  if (CACHED_FILES[safePath + '.html']) {
    res.writeHead(200, { 'Content-Type': CACHED_FILES[safePath + '.html'].type });
    res.end(CACHED_FILES[safePath + '.html'].content);
    return;
  }

  // 3. Disk fallback for any dynamic or newly added files
  const resolvedPath = path.normalize(path.join(PUBLIC_DIR, safePath));
  if (!resolvedPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Proibido');
    return;
  }

  fs.stat(resolvedPath, (err, stats) => {
    if (err) {
      if (fs.existsSync(resolvedPath + '.html')) {
        return serveFile(resolvedPath + '.html', res);
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Não Encontrado</h1><p>O arquivo ${safePath} não foi localizado.</p><p><a href="/index.html">Voltar ao Início</a></p>`);
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

// Export for Vercel serverless function runtime
module.exports = server;

// Listen locally or in standalone container
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 PostoRH Sistema Operacional rodando em:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`======================================================\n`);
  });
}

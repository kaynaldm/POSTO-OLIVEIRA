const https = require('https');
const http = require('http');
const { URL } = require('url');

const urls = [
  'https://share.google/6FmEZ4N0yM1wyBWJ9',
  'https://share.google/tCX5zk6Fq9u9c9iPx',
  'https://share.google/TnS8bTCKjQVXS8nR9',
  'https://share.google/iOqPd83FYTclfm2Dk'
];

function fetchWithRedirect(urlStr, depth = 0) {
  return new Promise((resolve) => {
    if (depth > 10) return resolve({ url: urlStr, error: 'Too many redirects' });
    try {
      const u = new URL(urlStr);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.get(urlStr, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = new URL(res.headers.location, urlStr).href;
          return resolve(fetchWithRedirect(nextUrl, depth + 1));
        }

        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const titleMatch = body.match(/<title>([^<]+)<\/title>/i);
          const metaTitle = body.match(/meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                            body.match(/meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i);
          const metaDesc = body.match(/meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                           body.match(/meta\s+content=["']([^"']+)["']\s+property=["']og:description["']/i);
          resolve({
            finalUrl: urlStr,
            title: titleMatch ? titleMatch[1] : null,
            metaTitle: metaTitle ? metaTitle[1] : null,
            metaDesc: metaDesc ? metaDesc[1] : null,
            bodySnippet: body.slice(0, 1000)
          });
        });
      });
      req.on('error', (err) => resolve({ url: urlStr, error: err.message }));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({ url: urlStr, error: 'Timeout' });
      });
    } catch (e) {
      resolve({ url: urlStr, error: e.message });
    }
  });
}

(async () => {
  for (let i = 0; i < urls.length; i++) {
    const res = await fetchWithRedirect(urls[i]);
    console.log(`\n=== URL ${i + 1}: ${urls[i]} ===`);
    console.log('Final URL:', res.finalUrl);
    console.log('Title:', res.title);
    console.log('Meta Title:', res.metaTitle);
    console.log('Meta Desc:', res.metaDesc);
  }
})();

const https = require('https');

const finalUrls = [
  { id: 1, name: 'Link 1', url: 'https://www.google.com/search?client=safari&hs=DGoq&sca_esv=3876714711009027&hl=pt-br&kgmid=/g/11c467dn05&q=Posto+Oliveira+Na+Francesa&kgs=679ba75233167510' },
  { id: 2, name: 'Link 2', url: 'https://www.google.com/search?client=safari&hs=av8V&sca_esv=3876714711009027&hl=pt-br&kgmid=/g/11c467dn05&q=Posto+Oliveira+Na+Francesa&kgs=a50b21e43340b016' },
  { id: 3, name: 'Link 3', url: 'https://www.google.com/search?client=safari&hs=av8V&hl=pt-br&output=search&kgmid=/g/11ddxt33wj&q=Posto+Equador&kgs=41a7ae50a778ab35' },
  { id: 4, name: 'Link 4', url: 'https://www.google.com/search?client=safari&hs=FGoq&hl=pt-br&output=search&kgmid=/g/11c2ph2l3h&q=Posto+Equador&kgs=06aa7171a14544d4' }
];

async function getPlaceInfo(item) {
  return new Promise((resolve) => {
    https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9'
      }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        // Find title / address from Google Search Knowledge Graph
        const titleMatch = body.match(/<h2[^>]*data-attrid="title"[^>]*><span>([^<]+)<\/span>/i) ||
                           body.match(/data-attrid="title"[^>]*>([^<]+)/i) ||
                           body.match(/<title>([^<]+)<\/title>/i);

        const addrMatch = body.match(/data-attrid="kc:\/location\/location:address"[^>]*>[\s\S]*?<span[^>]*class="LrzXr"[^>]*>([^<]+)<\/span>/i) ||
                          body.match(/class="LrzXr"[^>]*>([^<]+)<\/span>/i);

        console.log(`\n=== ITEM ${item.id} (${item.name}) ===`);
        console.log('Title:', titleMatch ? titleMatch[1] : null);
        console.log('Address:', addrMatch ? addrMatch[1] : null);

        // Print any snippets containing Parintins
        const snippets = body.match(/[A-Za-z0-9\s,\.\-ºª/]{10,80}(?:Parintins|Amazonas|AM)[A-Za-z0-9\s,\.\-ºª/]{0,80}/gi);
        if (snippets) {
          console.log('Snippets:', [...new Set(snippets)].slice(0, 3));
        }
        resolve();
      });
    }).on('error', err => {
      console.error(err);
      resolve();
    });
  });
}

(async () => {
  for (const item of finalUrls) {
    await getPlaceInfo(item);
  }
})();

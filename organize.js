const fs = require('fs');
const path = require('path');

const ROOT = 'd:\\POSTO DE GASOLINA';
const SRC = path.join(ROOT, 'POSTO', 'GASOLINA');

const pages = [
  {
    srcDir: 'dashboard_operacional_e_kpis',
    outName: 'index.html',
    key: 'dashboard'
  },
  {
    srcDir: 'gest_o_de_colaboradores',
    outName: 'colaboradores.html',
    key: 'colaboradores'
  },
  {
    srcDir: 'gest_o_de_frequ_ncia_e_apontamentos',
    outName: 'frequencia.html',
    key: 'frequencia'
  },
  {
    srcDir: 'financeiro_e_gest_o_de_vales',
    outName: 'financeiro-vales.html',
    key: 'financeiro-vales'
  },
  {
    srcDir: 'mapa_de_unidades_da_rede',
    outName: 'mapa-unidades.html',
    key: 'mapa-unidades'
  }
];

const navMapping = {
  'dashboard': 'index.html',
  'colaboradores': 'colaboradores.html',
  'frequencia': 'frequencia.html',
  'financeiro-vales': 'financeiro-vales.html',
  'mapa-unidades': 'mapa-unidades.html'
};

const activeClasses = 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-secondary-container text-on-secondary-container font-semibold rounded-lg shadow-sm';
const inactiveClasses = 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-low hover:text-on-surface transition-colors';

// Create docs and screenshots dirs
fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'screenshots'), { recursive: true });

// Copy DESIGN.md
const designSrc = path.join(SRC, 'postorh_executive_operations', 'DESIGN.md');
if (fs.existsSync(designSrc)) {
  fs.copyFileSync(designSrc, path.join(ROOT, 'docs', 'DESIGN.md'));
  console.log('Copied docs/DESIGN.md');
}

// Process HTML files
pages.forEach(p => {
  const filePath = path.join(SRC, p.srcDir, 'code.html');
  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Copy screenshot if present
  const screenSrc = path.join(SRC, p.srcDir, 'screen.png');
  if (fs.existsSync(screenSrc)) {
    fs.copyFileSync(screenSrc, path.join(ROOT, 'screenshots', `${p.key}.png`));
  }

  // Update nav tags: <a ... data-path="KEY" ...>
  // We can match all <a [^>]*data-path="([^"]+)"[^>]*>...</a> and replace attributes
  content = content.replace(/<a\s+([^>]*?)data-path="([^"]+)"([^>]*)>/g, (match, prefix, dataPath, suffix) => {
    const targetUrl = navMapping[dataPath] || '#';
    const isCurrent = dataPath === p.key;

    // Remove old href and class and aria-current
    let clean = (prefix + ' ' + suffix)
      .replace(/href="[^"]*"/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/aria-current="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const classToUse = isCurrent ? activeClasses : inactiveClasses;
    const aria = isCurrent ? ' aria-current="page"' : '';

    return `<a href="${targetUrl}" data-path="${dataPath}" class="${classToUse}"${aria} ${clean}>`.replace(/\s{2,}/g, ' ');
  });

  fs.writeFileSync(path.join(ROOT, p.outName), content, 'utf8');
  console.log(`Generated: ${p.outName}`);

  if (p.outName === 'index.html') {
    // Also create dashboard.html as alias
    fs.writeFileSync(path.join(ROOT, 'dashboard.html'), content, 'utf8');
    console.log('Generated: dashboard.html (alias)');
  }
});

console.log('Organization complete.');

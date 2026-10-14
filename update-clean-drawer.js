const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const files = [
  { file: 'index.html', key: 'dashboard' },
  { file: 'dashboard.html', key: 'dashboard' },
  { file: 'colaboradores.html', key: 'colaboradores' },
  { file: 'frequencia.html', key: 'frequencia' },
  { file: 'financeiro-vales.html', key: 'financeiro-vales' },
  { file: 'mapa-unidades.html', key: 'mapa-unidades' }
];

function buildDrawerHtml(activeKey) {
  const navItems = [
    { key: 'dashboard', href: 'index.html', icon: 'dashboard', title: 'Dashboard', desc: 'Indicadores e Alertas' },
    { key: 'colaboradores', href: 'colaboradores.html', icon: 'badge', title: 'Colaboradores', desc: 'Cadastro e Quadro' },
    { key: 'frequencia', href: 'frequencia.html', icon: 'fact_check', title: 'Frequência', desc: 'Turnos e Justificativas' },
    { key: 'financeiro-vales', href: 'financeiro-vales.html', icon: 'payments', title: 'Financeiro & Vales', desc: 'Adiantamentos e Baixas' }
  ];

  const activeClass = 'flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-xl shadow-sm transition-all';
  const inactiveClass = 'flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container hover:text-on-surface transition-colors';

  const navHtml = navItems.map(item => {
    const isCurrent = item.key === activeKey;
    const cls = isCurrent ? activeClass : inactiveClass;
    const aria = isCurrent ? ' aria-current="page"' : '';
    return `        <a href="${item.href}" class="${cls}"${aria}>
          <span class="material-symbols-outlined text-xl leading-none text-secondary">${item.icon}</span>
          <div class="flex flex-col flex-1">
            <span class="leading-none text-sm font-semibold">${item.title}</span>
            <span class="text-xs opacity-70 mt-1 leading-none">${item.desc}</span>
          </div>
        </a>`;
  }).join('\n');

  return `  <!-- Off-Canvas Drawer (Abre por cima do sistema, sem mexer no layout) -->
  <aside id="sidebar-drawer" style="border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; border-left: none !important; border-top: none !important; border-bottom: none !important;" class="fixed top-0 left-0 h-full w-72 sm:w-80 bg-surface-container-lowest z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out -translate-x-full select-none">
    <div class="flex flex-col">
      <!-- Drawer Header -->
      <div class="h-16 px-5 flex items-center justify-between border-b border-surface-container-low">
        <a href="index.html" class="flex flex-col select-none">
          <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold leading-none">PostoRH</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1 font-semibold">Rede Operacional</span>
        </a>
        <button onclick="closeSidebar()" title="Fechar Menu" type="button" class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <!-- Modules Section -->
      <div class="px-5 pt-4 pb-2">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Módulos do Sistema</span>
      </div>

      <!-- Links -->
      <nav class="flex flex-col gap-1.5 px-3">
${navHtml}
      </nav>
    </div>
  </aside>`;
}

files.forEach(({ file, key }) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match the aside block
  const drawerRegex = /<!-- Off-Canvas Drawer[\s\S]*?<\/aside>/i;

  if (drawerRegex.test(content)) {
    const newDrawer = buildDrawerHtml(key);
    content = content.replace(drawerRegex, newDrawer);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated drawer in ${file}`);
  } else {
    // Try matching <aside id="sidebar-drawer" ... </aside>
    const asideRegex = /<aside id="sidebar-drawer"[\s\S]*?<\/aside>/i;
    if (asideRegex.test(content)) {
      const newDrawer = buildDrawerHtml(key);
      content = content.replace(asideRegex, newDrawer);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated drawer (fallback) in ${file}`);
    } else {
      console.warn(`Could not find drawer in ${file}`);
    }
  }
});

console.log('Finished updating drawer in all files.');

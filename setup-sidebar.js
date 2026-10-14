const fs = require('fs');
const path = require('path');

const ROOT = 'd:\\POSTO DE GASOLINA';

const files = [
  { file: 'index.html', key: 'dashboard' },
  { file: 'dashboard.html', key: 'dashboard' },
  { file: 'colaboradores.html', key: 'colaboradores' },
  { file: 'frequencia.html', key: 'frequencia' },
  { file: 'financeiro-vales.html', key: 'financeiro-vales' },
  { file: 'mapa-unidades.html', key: 'mapa-unidades' }
];

const cssToInject = `
<style id="sidebar-collapsible-css">
  #sidebar {
    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  #main-layout {
    transition: padding-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  #top-header {
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  html.sidebar-collapsed #sidebar {
    width: 4.5rem !important;
  }
  html.sidebar-collapsed #main-layout {
    padding-left: 4.5rem !important;
  }
  html.sidebar-collapsed #top-header {
    left: 4.5rem !important;
  }
  html.sidebar-collapsed .sidebar-label-hide {
    display: none !important;
  }
  html.sidebar-collapsed .sidebar-nav-item {
    justify-content: center !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  html.sidebar-collapsed .sidebar-nav-item .material-symbols-outlined {
    font-size: 1.35rem !important;
    margin: 0 !important;
  }
  html.sidebar-collapsed .sidebar-footer-box {
    padding: 0.5rem !important;
    margin: 0.5rem !important;
    align-items: center !important;
    justify-content: center !important;
  }
  html.sidebar-collapsed #sidebar-toggle-btn span {
    transform: rotate(180deg);
  }
</style>
<script id="sidebar-init-script">
  if (localStorage.getItem('posto_sidebar_collapsed') === 'true') {
    document.documentElement.classList.add('sidebar-collapsed');
  }
  function toggleSidebar() {
    const isCollapsed = document.documentElement.classList.toggle('sidebar-collapsed');
    localStorage.setItem('posto_sidebar_collapsed', isCollapsed ? 'true' : 'false');
  }
</script>
`;

function buildSidebarHtml(activeKey) {
  const navItems = [
    { key: 'dashboard', href: 'index.html', icon: 'dashboard', title: 'Dashboard', desc: 'Indicadores e Alertas' },
    { key: 'colaboradores', href: 'colaboradores.html', icon: 'badge', title: 'Colaboradores', desc: 'Cadastro e Quadro' },
    { key: 'frequencia', href: 'frequencia.html', icon: 'fact_check', title: 'Frequência', desc: 'Turnos e Justificativas' },
    { key: 'financeiro-vales', href: 'financeiro-vales.html', icon: 'payments', title: 'Financeiro & Vales', desc: 'Adiantamentos e Baixas' },
    { key: 'mapa-unidades', href: 'mapa-unidades.html', icon: 'local_gas_station', title: 'Mapa de Unidades', desc: 'Geolocalização de Postos' }
  ];

  const activeClass = 'sidebar-nav-item flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-secondary-container text-on-secondary-container font-semibold rounded-lg shadow-sm';
  const inactiveClass = 'sidebar-nav-item flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-low hover:text-on-surface transition-colors';

  const navHtml = navItems.map(item => {
    const isCurrent = item.key === activeKey;
    const cls = isCurrent ? activeClass : inactiveClass;
    const aria = isCurrent ? ' aria-current="page"' : '';
    return `        <a href="${item.href}" data-path="${item.key}" title="${item.title} - ${item.desc}" class="${cls}"${aria}>
          <span class="material-symbols-outlined text-lg leading-none shrink-0">${item.icon}</span>
          <div class="flex flex-col flex-1 sidebar-label-hide overflow-hidden whitespace-nowrap">
            <span class="leading-none">${item.title}</span>
            <span class="font-label-sm text-label-sm opacity-70 mt-space-xs leading-none">${item.desc}</span>
          </div>
        </a>`;
  }).join('\n');

  return `<aside id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-x-hidden select-none">
    <div class="flex flex-col">
      <div class="h-14 px-3 flex items-center justify-between border-b border-surface-container-low/40">
        <div class="flex items-center gap-2 overflow-hidden">
          <img alt="PostoRH Logo" class="h-8 w-8 min-w-[32px] object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqLPJyzwGtdcyPQSu3MVYjOFUDTFWVLfzYcFyxNWAtT5vrvQbPhy1oEDGHT5309xE1DNA1HvsuWEY3Jyik6sWT_kvqnHVDCBoM5npDqrIrskq1owlrcG7Mrk1cSO26RtCwtU9UGFXHKBnWOlbeIZxMeBZWoyg0YFCcaNX_aKg3NgPz10i_DQbeN9X72tcrVe6pQSNjeBd1GZt3IpSXqlIElS0_guswZp8XCqBLnV5kWwDiMjazghnTpg"/>
          <div class="flex flex-col sidebar-label-hide whitespace-nowrap">
            <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">PostoRH</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Rede Operacional</span>
          </div>
        </div>
        <button id="sidebar-toggle-btn" onclick="toggleSidebar()" title="Recolher / Expandir Menu" type="button" class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all cursor-pointer flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl transition-transform duration-300">menu_open</span>
        </button>
      </div>
      <div class="px-gutter pt-space-md pb-space-xs sidebar-label-hide">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Módulos do Sistema</span>
      </div>
      <nav class="flex flex-col gap-space-xs px-2 pt-2">
${navHtml}
      </nav>
    </div>
    <div class="sidebar-footer-box p-space-md m-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs">
      <div class="flex items-center justify-between">
        <span class="font-label-sm text-label-sm text-on-surface font-semibold sidebar-label-hide whitespace-nowrap">PostoRH Enterprise</span>
        <span class="font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded-lg font-bold">v1.0.4</span>
      </div>
      <div class="flex items-center gap-space-xs">
        <span class="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse shrink-0"></span>
        <span class="font-label-sm text-label-sm text-on-surface-variant sidebar-label-hide whitespace-nowrap">Sincronização Ativa</span>
      </div>
    </div>
  </aside>
  <div id="main-layout" class="pl-64">
  <header id="top-header" class="fixed top-0 left-64 right-0 h-14 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-lg">
    <div class="flex items-center gap-space-md">
      <button onclick="toggleSidebar()" type="button" title="Alternar Menu Lateral" class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center">
        <span class="material-symbols-outlined text-xl">menu</span>
      </button>`;
}

files.forEach(({ file, key }) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Inject CSS and Init script in head if not present
  if (!content.includes('sidebar-collapsible-css')) {
    content = content.replace('</head>', `${cssToInject}\n</head>`);
  }

  // Replace <aside ... </aside><div class="pl-64"><header class="fixed top-0 left-64 ...">
  // We match from <aside to the first part of <header ... <div class="flex items-center gap-...
  const asideRegex = /<aside[\s\S]*?<\/aside>\s*<div class="pl-64">\s*<header[\s\S]*?<div class="flex items-center gap-(?:gutter|space-md)">/i;

  const newSidebar = buildSidebarHtml(key);

  if (asideRegex.test(content)) {
    content = content.replace(asideRegex, newSidebar);
    console.log(`Updated sidebar in ${file}`);
  } else {
    console.warn(`Could not match aside pattern in ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Collapsible sidebar implementation complete.');

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

function buildDrawerHtml(activeKey) {
  const navItems = [
    { key: 'dashboard', href: 'index.html', icon: 'dashboard', title: 'Dashboard', desc: 'Indicadores e Alertas' },
    { key: 'colaboradores', href: 'colaboradores.html', icon: 'badge', title: 'Colaboradores', desc: 'Cadastro e Quadro' },
    { key: 'frequencia', href: 'frequencia.html', icon: 'fact_check', title: 'Frequência', desc: 'Turnos e Justificativas' },    { key: 'financeiro-vales', href: 'financeiro-vales.html', icon: 'payments', title: 'Financeiro & Vales', desc: 'Adiantamentos e Baixas' }
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

  return `<!-- Backdrop Overlay -->
  <div id="sidebar-backdrop" onclick="closeSidebar()" class="fixed inset-0 bg-primary-container/40 backdrop-blur-xs z-50 transition-opacity duration-300 opacity-0 pointer-events-none"></div>

  <!-- Off-Canvas Drawer (Abre por cima do sistema, sem mexer no layout) -->
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
  </aside>

  <div id="main-layout" class="w-full min-h-screen">
  <header id="top-header" class="fixed top-0 left-0 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-gutter-lg">
    <div class="flex items-center gap-3">
      <!-- Botão Hambúrguer (3 pauzinhos) -->
      <button onclick="toggleSidebar()" type="button" title="Abrir Menu de Navegação" class="p-2 rounded-xl text-on-surface hover:bg-surface-container transition-all flex items-center justify-center cursor-pointer">
        <span class="material-symbols-outlined text-2xl leading-none">menu</span>
      </button>

      <!-- Logo no Header para identidade constante -->
      <a href="index.html" class="flex items-center gap-2.5 mr-2 hover:opacity-90 transition-opacity">
        <img alt="PostoRH Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqLPJyzwGtdcyPQSu3MVYjOFUDTFWVLfzYcFyxNWAtT5vrvQbPhy1oEDGHT5309xE1DNA1HvsuWEY3Jyik6sWT_kvqnHVDCBoM5npDqrIrskq1owlrcG7Mrk1cSO26RtCwtU9UGFXHKBnWOlbeIZxMeBZWoyg0YFCcaNX_aKg3NgPz10i_DQbeN9X72tcrVe6pQSNjeBd1GZt3IpSXqlIElS0_guswZp8XCqBLnV5kWwDiMjazghnTpg"/>
        <div class="flex flex-col hidden sm:flex">
          <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">PostoRH</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[10px] leading-none mt-0.5">Rede Operacional</span>
        </div>
      </a>

      <!-- Trilha e status -->
      <div class="hidden xl:flex items-center gap-2 font-label-md text-label-md text-on-surface-variant border-l border-surface-container-high pl-4">
        <span class="material-symbols-outlined text-base leading-none">admin_panel_settings</span>
        <span class="font-semibold text-on-surface">PostoRH</span>
        <span class="material-symbols-outlined text-xs leading-none opacity-40">chevron_right</span>
        <span>Central Operacional de Gestão</span>
      </div>`;
}

const jsDrawerScript = `
<script id="drawer-script">
  function openSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('-translate-x-full');
      drawer.classList.add('translate-x-0');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('-translate-x-full');
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  function toggleSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    if (drawer && drawer.classList.contains('translate-x-0')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
</script>
`;

files.forEach(({ file, key }) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove previous injected css / scripts if present
  content = content.replace(/<style id="sidebar-collapsible-css">[\s\S]*?<\/style>/i, '');
  content = content.replace(/<script id="sidebar-init-script">[\s\S]*?<\/script>/i, '');
  content = content.replace(/<script id="drawer-script">[\s\S]*?<\/script>/i, '');

  // Add drawer script right before </body>
  content = content.replace('</body>', `${jsDrawerScript}\n</body>`);

  // Match the entire aside block and header start
  // Regex matches from <aside to the end of the first breadcrumb/div in header
  const regex = /<aside[\s\S]*?<\/aside>\s*<div[^>]*class="[^"]*pl-(?:64|4\.5|20|16)[^"]*"[^>]*>\s*<header[\s\S]*?<div class="flex items-center gap-(?:gutter|space-md|3)">[\s\S]*?(?:Central Operacional de Gestão<\/span>\s*<\/div>|<div class="hidden lg:flex)/i;

  const drawerHtml = buildDrawerHtml(key);

  // Let's replace the whole top navigation section cleanly
  // Let's find the section between <body ...> and <div class="flex items-center gap-space-xs bg-surface-container-low px-space-sm
  const fullAsideAndHeaderRegex = /<aside[\s\S]*?<\/aside>\s*<div[^>]*>\s*<header[\s\S]*?<div class="flex items-center gap-(?:gutter|space-md)">[\s\S]*?(?=<div class="flex items-center gap-space-xs bg-surface-container-low)/i;

  if (fullAsideAndHeaderRegex.test(content)) {
    content = content.replace(fullAsideAndHeaderRegex, `${drawerHtml}\n    `);
    console.log(`Successfully updated ${file}`);
  } else {
    console.warn(`Could not match header regex in ${file}, trying alternate`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('All files updated with hamburger drawer overlay.');

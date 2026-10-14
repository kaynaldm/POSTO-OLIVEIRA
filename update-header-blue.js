const fs = require('fs');
const path = require('path');

const ROOT = 'd:\\POSTO DE GASOLINA';

const files = [
  'index.html',
  'dashboard.html',
  'colaboradores.html',
  'frequencia.html',
  'financeiro-vales.html',
  'mapa-unidades.html'
];

const newHeaderHtml = `<header id="top-header" class="fixed top-0 left-0 right-0 h-14 bg-secondary text-on-secondary shadow-md z-40 flex items-center justify-between px-4 sm:px-gutter-lg">
    <div class="flex items-center gap-3">
      <!-- Botão Hambúrguer (3 pauzinhos) -->
      <button onclick="toggleSidebar()" type="button" title="Abrir Menu de Navegação" class="p-2 -ml-2 rounded-xl text-white hover:bg-white/15 transition-all flex items-center justify-center cursor-pointer">
        <span class="material-symbols-outlined text-2xl leading-none">menu</span>
      </button>

      <!-- Nome PostoRH -->
      <a href="index.html" class="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
        <span class="font-headline-md text-headline-md tracking-tight font-bold text-white">PostoRH</span>
        <span class="text-xs uppercase tracking-wider text-white/80 font-semibold hidden sm:inline">• Rede Operacional</span>
      </a>
    </div>

    <!-- Usuário e Perfil -->
    <div class="flex items-center gap-3">
      <span class="font-label-lg text-label-lg font-semibold text-white hidden sm:inline">Carlos Eduardo Mendes</span>
      <img alt="Carlos Eduardo Mendes" class="w-9 h-9 rounded-full object-cover ring-2 ring-white/40 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgcUVoUOeTzmLXpjnbnOZvoWco-abRnb0OX-VJrcbkpGxI6bmJ7NJMQz7mQ0qu8d1sMM46SvGt8z-PVfMgl_RnzV3f2y4cTDPdznec5WVFoItvg1orRc3CpVBIwws8AKgXFvlOHCsElNWk67_MSL9Qy-_q6np--pS7QzZ3kIgpSqAvWDVTQwn29b2yZrI5_SKv3n15x9AtvurZKAZJOVJdQD4wVXn3R8nzaa-eFFfQFB50tWW9RDi7bA"/>
    </div>
  </header>`;

files.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match from <header id="top-header" to </header>
  const headerRegex = /<header id="top-header"[\s\S]*?<\/header>/i;

  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newHeaderHtml);
    console.log(`Updated blue header in ${file}`);
  } else {
    console.warn(`Could not find header in ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Blue header update completed.');

const fs = require('fs');
const path = require('path');

const ROOT = 'd:\\POSTO DE GASOLINA';

const allFiles = [
  'index.html',
  'dashboard.html',
  'colaboradores.html',
  'frequencia.html',
  'financeiro-vales.html',
  'mapa-unidades.html'
];

// Global rounded style injection
const globalRoundedCss = `
<style id="custom-rounded-theme">
  /* THEME: ULTRA PROFISSIONAL, BORDAS ARREDONDADAS E CORES HARMONIOSAS */
  :root {
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --radius-full: 9999px;
  }

  .rounded-sm { border-radius: var(--radius-sm) !important; }
  .rounded { border-radius: var(--radius-sm) !important; }
  .rounded-md { border-radius: var(--radius-md) !important; }
  .rounded-lg { border-radius: var(--radius-lg) !important; }
  .rounded-xl { border-radius: var(--radius-xl) !important; }
  .rounded-2xl { border-radius: var(--radius-2xl) !important; }
  .rounded-full { border-radius: var(--radius-full) !important; }

  /* Elementos arredondados automáticos */
  button:not(.rounded-full) {
    border-radius: var(--radius-md) !important;
  }
  input, select, textarea {
    border-radius: var(--radius-md) !important;
  }

  /* Cards e painéis suaves */
  .bg-surface-container-lowest,
  .bg-white {
    border-radius: var(--radius-xl);
    border: 1px solid rgba(226, 232, 240, 0.9);
    box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 2px 4px -1px rgba(15, 23, 42, 0.02);
  }

  /* Tabelas com cantos 100% arredondados */
  table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }
  .overflow-x-auto {
    border-radius: var(--radius-xl) !important;
    overflow: hidden !important;
  }
  thead th:first-child {
    border-top-left-radius: var(--radius-xl) !important;
  }
  thead th:last-child {
    border-top-right-radius: var(--radius-xl) !important;
  }
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: var(--radius-xl) !important;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: var(--radius-xl) !important;
  }

  /* Status Pills arredondadas */
  .status-badge {
    border-radius: 9999px !important;
    font-weight: 700 !important;
    padding: 0.35rem 0.85rem !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.375rem !important;
    font-size: 0.75rem !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
</style>
`;

allFiles.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Tailwind Config borderRadius
  content = content.replace(
    /"borderRadius":\{"DEFAULT":"0\.125rem"[^}]+\}/,
    `"borderRadius":{"sm":"0.375rem","DEFAULT":"0.625rem","md":"0.75rem","lg":"1rem","xl":"1.25rem","2xl":"1.5rem","3xl":"2rem","full":"9999px"}`
  );

  // Inject or update custom-rounded-theme
  if (!content.includes('custom-rounded-theme')) {
    content = content.replace('</head>', `${globalRoundedCss}\n</head>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated design tokens & rounded CSS in ${file}`);
});

console.log('Global styling update completed.');

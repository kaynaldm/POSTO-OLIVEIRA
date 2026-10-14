const fs = require('fs');
const path = require('path');

const filePath = 'd:\\POSTO DE GASOLINA\\financeiro-vales.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Action buttons in module header
content = content.replace(
  /<button class="inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg px-space-md py-2 rounded-lg transition-colors shadow-sm" id="btn-open-repasse">[\s\S]*?<\/button>\s*<button class="inline-flex items-center gap-space-xs bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-lg text-label-lg px-space-md py-2 rounded-lg transition-all shadow-md" id="btn-open-vale">[\s\S]*?<\/button>/i,
  `<button class="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow cursor-pointer" id="btn-open-repasse">
    <span class="material-symbols-outlined text-lg text-blue-600">add_card</span>
    <span>+ Lançar Recebimento / Repasse</span>
  </button>
  <button class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer" id="btn-open-vale">
    <span class="material-symbols-outlined text-lg">receipt_long</span>
    <span>+ Emitir Novo Vale / Adiantamento</span>
  </button>`
);

// 2. Cascading Filter Bar
content = content.replace(
  /<div class="bg-surface-container-low rounded-xl p-space-sm flex flex-wrap items-center gap-space-sm">[\s\S]*?<!-- Primary Financial Metrics Grid/i,
  `<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-2 px-2 py-1">
      <span class="material-symbols-outlined text-blue-600 text-xl">tune</span>
      <span class="text-xs text-slate-800 uppercase font-extrabold tracking-wider">Filtros:</span>
    </div>
    <div class="flex-1 min-w-[160px] max-w-xs">
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-3 text-base text-slate-400 pointer-events-none">location_city</span>
        <select class="w-full bg-slate-50/70 hover:bg-white text-slate-800 text-xs font-semibold pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs" id="filter-city">
          <option value="todos">Todos os Municípios (SP)</option>
          <option selected="" value="campinas">Campinas e RMC</option>
          <option value="sao-paulo">São Paulo (Capital)</option>
          <option value="sorocaba">Sorocaba & Região</option>
        </select>
        <span class="material-symbols-outlined absolute right-2.5 text-xs text-slate-400 pointer-events-none">expand_more</span>
      </div>
    </div>
    <div class="flex-1 min-w-[200px] max-w-sm">
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-3 text-base text-slate-400 pointer-events-none">local_gas_station</span>
        <select class="w-full bg-slate-50/70 hover:bg-white text-slate-800 text-xs font-semibold pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs" id="filter-station">
          <option value="todos">Todas as Unidades (Rede PostoRH)</option>
          <option selected="" value="posto-01">Posto 01 - Rodovia Anhanguera KM 98</option>
          <option value="posto-04">Posto 04 - Av. Brasil Norte</option>
          <option value="posto-09">Posto 09 - Marginal Tietê Express</option>
        </select>
        <span class="material-symbols-outlined absolute right-2.5 text-xs text-slate-400 pointer-events-none">expand_more</span>
      </div>
    </div>
    <div class="flex-1 min-w-[220px]">
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-3 text-base text-slate-400 pointer-events-none">person_search</span>
        <select class="w-full bg-slate-50/70 hover:bg-white text-slate-800 text-xs font-semibold pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs" id="filter-collab">
          <option selected="" value="todos">Todos os Colaboradores do Quadro (94)</option>
          <option value="1">Marcos Vinicius da Silva (Frentista Noturno)</option>
          <option value="2">Juliana Rocha Prado (Operadora de Caixa)</option>
          <option value="3">Rodrigo Antunes Bento (Frentista Diurno)</option>
          <option value="4">Cleber Souza Lima (Líder de Pista)</option>
        </select>
        <span class="material-symbols-outlined absolute right-2.5 text-xs text-slate-400 pointer-events-none">expand_more</span>
      </div>
    </div>
    <div class="flex items-center gap-2 ml-auto">
      <button class="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-blue-600">file_download</span>
        <span>Exportar DRE Pessoal</span>
      </button>
    </div>
  </div>
</div>
<!-- Primary Financial Metrics Grid`
);

// 3. Extrato Geral de Vales Tab Strip
content = content.replace(
  /<div class="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-wrap items-center justify-between gap-space-md">[\s\S]*?<\/div>\s*<\/div>/i,
  `<div class="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
    <div class="flex items-center gap-2" id="tab-nav">
      <button class="px-4 py-2 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs flex items-center gap-2 cursor-pointer" id="tab-btn-vales">
        <span class="material-symbols-outlined text-lg">receipt_long</span>
        <span>Extrato Geral de Vales</span>
        <span class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">142</span>
      </button>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 gap-2">
        <span class="material-symbols-outlined text-base text-slate-400">filter_list</span>
        <span class="text-xs text-slate-500 font-medium">Status Folha:</span>
        <select class="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer">
          <option>Todos os Status</option>
          <option>Pendente de Desconto</option>
          <option>Descontado em Folha</option>
          <option>Compensado em Caixa</option>
        </select>
      </div>
      <button class="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-colors cursor-pointer" title="Atualizar dados em tempo real">
        <span class="material-symbols-outlined text-lg leading-none">sync</span>
      </button>
    </div>
  </div>`
);

// 4. Table Header and Content Card
const newTableHtml = `<!-- TAB 1: EXTRATO GERAL DE VALES (TABLE CONTENT) -->
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col" id="content-vales">
    <div class="px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 border-b border-slate-200/80">
      <div class="flex items-center gap-3">
        <div class="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
        <span class="text-base font-bold text-slate-900 tracking-tight">Registros de Vales & Adiantamentos Salariais</span>
        <span class="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">Turnos 1, 2 e 3</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">Mostrando 6 de 142 lançamentos</span>
      </div>
    </div>
    <div class="overflow-x-auto w-full">
      <table class="w-full text-left font-body-md text-body-md border-collapse">
        <thead>
          <tr class="bg-slate-100/90 text-slate-700 text-xs font-extrabold uppercase tracking-wider border-b-2 border-slate-200">
            <th class="py-3.5 px-5">Protocolo / ID</th>
            <th class="py-3.5 px-4">Data / Horário</th>
            <th class="py-3.5 px-4">Colaborador</th>
            <th class="py-3.5 px-4">Posto / Lotação</th>
            <th class="py-3.5 px-4 text-right">Valor Vale</th>
            <th class="py-3.5 px-4 text-center">Status Folha</th>
            <th class="py-3.5 px-4 text-center">Assinatura Digital</th>
            <th class="py-3.5 px-4 text-center">Ações Operacionais</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-800">
          <!-- Row 1 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8841</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">24/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">08:42:15</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">MV</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Marcos Vinicius da Silva</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Frentista Noturno • Salário: R$ 2.450,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 01 - Rod. Anhanguera KM 98</span>
                <span class="text-[11px] text-slate-500">Campinas - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 350,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Pendente de Desconto
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">verified</span> Biometria Ok
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer" title="Estornar/Cancelar Vale">
                  <span class="material-symbols-outlined text-lg leading-none">cancel</span>
                </button>
              </div>
            </td>
          </tr>
          <!-- Row 2 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8840</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">23/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">17:15:00</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">JR</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Juliana Rocha Prado</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Operadora de Caixa • Salário: R$ 2.180,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 04 - Av. Brasil Norte</span>
                <span class="text-[11px] text-slate-500">Campinas - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 500,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Pendente de Desconto
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">draw</span> Assinado PIN
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer" title="Estornar/Cancelar Vale">
                  <span class="material-symbols-outlined text-lg leading-none">cancel</span>
                </button>
              </div>
            </td>
          </tr>
          <!-- Row 3 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8839</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">22/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">11:08:33</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">RA</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Rodrigo Antunes Bento</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Frentista Diurno • Salário: R$ 2.450,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 01 - Rod. Anhanguera KM 98</span>
                <span class="text-[11px] text-slate-500">Campinas - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 200,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span> Descontado em Folha
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">verified</span> Biometria Ok
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <span class="text-xs text-emerald-600 font-bold px-2 py-0.5 rounded-md bg-emerald-50">Liquidado</span>
              </div>
            </td>
          </tr>
          <!-- Row 4 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8838</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">21/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">19:30:12</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">CS</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Cleber Souza Lima</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Líder de Pista • Salário: R$ 3.200,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 09 - Marginal Tietê Express</span>
                <span class="text-[11px] text-slate-500">São Paulo - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 600,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span> Compensado
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">lock</span> Chave Token
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <span class="text-xs text-emerald-600 font-bold px-2 py-0.5 rounded-md bg-emerald-50">Liquidado</span>
              </div>
            </td>
          </tr>
          <!-- Row 5 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8837</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">20/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">14:02:44</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">AB</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Alisson Bruno Rezende</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Frentista • Salário: R$ 2.450,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 01 - Rod. Anhanguera KM 98</span>
                <span class="text-[11px] text-slate-500">Campinas - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 280,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Pendente de Desconto
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">verified</span> Biometria Ok
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer" title="Estornar/Cancelar Vale">
                  <span class="material-symbols-outlined text-lg leading-none">cancel</span>
                </button>
              </div>
            </td>
          </tr>
          <!-- Row 6 -->
          <tr class="hover:bg-blue-50/40 transition-colors group">
            <td class="py-3 px-5">
              <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200/80 shadow-2xs">#VAL-2024-8836</span>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs font-bold text-slate-900">19/10/2024</div>
              <div class="text-[11px] text-slate-500 font-medium">10:14:02</div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white">TB</div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900 leading-tight">Tatiane Barreto Silva</span>
                  <span class="text-xs text-slate-500 leading-tight mt-0.5">Atendente de Conveniência • Salário: R$ 2.100,00</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-800">Posto 04 - Av. Brasil Norte</span>
                <span class="text-[11px] text-slate-500">Campinas - SP</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
              R$ 150,00
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span> Descontado em Folha
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                <span class="material-symbols-outlined text-sm">draw</span> Assinado PIN
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="Visualizar Recibo">
                  <span class="material-symbols-outlined text-lg leading-none">receipt</span>
                </button>
                <span class="text-xs text-emerald-600 font-bold px-2 py-0.5 rounded-md bg-emerald-50">Liquidado</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table Footer / Pagination -->
    <div class="px-6 py-3.5 bg-slate-50/80 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3 text-xs text-slate-600 font-semibold">
        <span>Linhas por página:</span>
        <select class="bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs font-bold">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>Página 1 de 15</span>
      </div>
      <div class="flex items-center gap-1.5">
        <button class="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 disabled:opacity-40 cursor-pointer" disabled="">
          <span class="material-symbols-outlined text-base">chevron_left</span>
        </button>
        <button class="px-3 py-1 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs cursor-pointer">1</button>
        <button class="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer">2</button>
        <button class="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer">3</button>
        <span class="text-xs text-slate-400 font-bold px-1">...</span>
        <button class="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer">15</button>
        <button class="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs cursor-pointer">
          <span class="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>
    </div>
  </div>`;

// Replace from <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col" id="content-vales"> to </div>\s*<!-- SLIDE-OVER
content = content.replace(
  /<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col" id="content-vales">[\s\S]*?<\/table>\s*<\/div>\s*<!-- Table Footer[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i,
  `${newTableHtml}\n  </div>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully upgraded financeiro-vales.html table, badges, filters and rounded shapes!');

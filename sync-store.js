// PostoRH Central Store & Data Synchronization System
(function() {
  const STORAGE_KEY = 'postoRH_colaboradores';
  const STATIONS = [
    { id: 'posto-oliveira-francesa', name: 'Posto Oliveira - Na Francesa', bairro: 'Francesa', address: 'Av. João Meireles, 30-136' },
    { id: 'posto-oliveira-odovaldo', name: 'Posto Oliveira - Odovaldo Novo', bairro: 'Odovaldo Novo', address: 'Estrada Odovaldo Novo' },
    { id: 'posto-equador-sham', name: 'Posto Equador - Conjunto Sham', bairro: 'Conjunto Sham', address: 'Rua Souza Filho, 142-282' },
    { id: 'posto-equador-barreirinha', name: 'Posto Equador - Barreirinha', bairro: 'João Pinheiro', address: 'Rua Barreirinha, 1181-1293' }
  ];

  window.PostoStore = {
    getStations: function() {
      return STATIONS;
    },
    getStationName: function(id) {
      const s = STATIONS.find(x => x.id === id);
      return s ? s.name : id;
    },
    getStationBairro: function(id) {
      const s = STATIONS.find(x => x.id === id);
      return s ? s.bairro : 'Parintins';
    },
    _scrollLockCount: 0,
    lockBodyScroll: function() {
      this._scrollLockCount++;
      document.body.classList.add('overflow-hidden');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    },
    unlockBodyScroll: function(forceAll = false) {
      if (forceAll) {
        this._scrollLockCount = 0;
      } else {
        this._scrollLockCount = Math.max(0, this._scrollLockCount - 1);
      }
      if (this._scrollLockCount === 0) {
        document.body.classList.remove('overflow-hidden');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    },
    getColaboradores: function() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(c => ({
              ...c,
              status: c.status || 'Ativo'
            }));
          }
        }
        // Default initial seed matching the required fields
        const initialSeed = [
          {
            id: 'COL-001',
            matricula: '#0481',
            nome: 'Valdir Antonio Silveira',
            cpf: '182.492.018-44',
            dataNascimento: '1988-05-14',
            dataInicio: '2021-02-15',
            dataAdmissao: '2021-02-15',
            sexo: 'Masculino',
            cargo: 'frentista_lider',
            cargoLabel: 'Frentista Líder',
            salario: 'R$ 2.850,00',
            municipio: 'Parintins (AM)',
            posto: 'posto-oliveira-francesa',
            postoLabel: 'Posto Oliveira - Na Francesa',
            bairro: 'Francesa',
            turno: 'Turno Manhã (06:00 - 14:20)',
            status: 'Ativo',
            initials: 'VA'
          },
          {
            id: 'COL-002',
            matricula: '#0482',
            nome: 'Mariana Souza dos Santos',
            cpf: '402.819.330-91',
            dataNascimento: '1995-09-22',
            dataInicio: '2022-06-01',
            dataAdmissao: '2022-06-01',
            sexo: 'Feminino',
            cargo: 'operador_caixa',
            cargoLabel: 'Operador(a) de Caixa',
            salario: 'R$ 2.100,00',
            municipio: 'Parintins (AM)',
            posto: 'posto-oliveira-francesa',
            postoLabel: 'Posto Oliveira - Na Francesa',
            bairro: 'Francesa',
            turno: 'Turno Manhã (06:00 - 14:20)',
            status: 'Ativo',
            initials: 'MS'
          },
          {
            id: 'COL-003',
            matricula: '#0483',
            nome: 'José Carlos Albuquerque',
            cpf: '098.221.782-31',
            dataNascimento: '1990-11-03',
            dataInicio: '2020-03-10',
            dataAdmissao: '2020-03-10',
            sexo: 'Masculino',
            cargo: 'gerente_posto',
            cargoLabel: 'Gerente de Posto',
            salario: 'R$ 4.500,00',
            municipio: 'Parintins (AM)',
            posto: 'posto-oliveira-odovaldo',
            postoLabel: 'Posto Oliveira - Odovaldo Novo',
            bairro: 'Odovaldo Novo',
            turno: 'Comercial (08:00 - 18:00)',
            status: 'Ativo',
            initials: 'JC'
          },
          {
            id: 'COL-004',
            matricula: '#0484',
            nome: 'Raimundo Nonato Batista',
            cpf: '551.402.119-02',
            dataNascimento: '1984-07-19',
            dataInicio: '2023-01-15',
            dataAdmissao: '2023-01-15',
            sexo: 'Masculino',
            cargo: 'frentista',
            cargoLabel: 'Frentista de Pista',
            salario: 'R$ 2.200,00',
            municipio: 'Parintins (AM)',
            posto: 'posto-equador-sham',
            postoLabel: 'Posto Equador - Conjunto Sham',
            bairro: 'Conjunto Sham',
            turno: 'Turno Tarde (14:00 - 22:20)',
            status: 'Ativo',
            initials: 'RN'
          },
          {
            id: 'COL-005',
            matricula: '#0485',
            nome: 'Amanda Ferreira Lima',
            cpf: '712.903.654-18',
            dataNascimento: '1998-12-08',
            dataInicio: '2023-08-20',
            dataAdmissao: '2023-08-20',
            sexo: 'Feminino',
            cargo: 'frentista',
            cargoLabel: 'Frentista de Pista',
            salario: 'R$ 2.200,00',
            municipio: 'Parintins (AM)',
            posto: 'posto-equador-barreirinha',
            postoLabel: 'Posto Equador - Barreirinha',
            bairro: 'João Pinheiro',
            turno: 'Turno Noite (22:00 - 06:20)',
            status: 'Ativo',
            initials: 'AF'
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeed));
        return initialSeed;
      } catch (e) {
        console.error('Erro ao ler colaboradores:', e);
        return [];
      }
    },
    saveColaboradores: function(list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('postoRH_sync', { detail: list }));
      } catch (e) {
        console.error('Erro ao salvar colaboradores:', e);
      }
    },
    addColaborador: function(data) {
      const list = this.getColaboradores();
      const nextNum = list.length + 1;
      const id = 'COL-' + String(nextNum).padStart(3, '0');
      const matricula = '#' + String(480 + nextNum).padStart(4, '0');
      
      const parts = (data.nome || 'Colaborador').trim().split(/\s+/);
      const initials = (parts[0][0] + (parts[1] ? parts[1][0] : parts[0][1] || '')).toUpperCase();
      
      const colab = {
        id: id,
        matricula: matricula,
        nome: data.nome.trim(),
        cpf: this.maskCPF(data.cpf),
        dataNascimento: data.dataNascimento || '',
        dataInicio: data.dataInicio || data.dataAdmissao || new Date().toISOString().split('T')[0],
        dataAdmissao: data.dataInicio || data.dataAdmissao || new Date().toISOString().split('T')[0],
        sexo: data.sexo || 'Masculino',
        cargo: data.cargo || 'frentista',
        cargoLabel: data.cargoLabel || 'Frentista de Pista',
        salario: data.salario ? this.maskCurrency(data.salario) : 'R$ 2.450,00',
        municipio: 'Parintins (AM)',
        posto: data.posto || 'posto-oliveira-francesa',
        postoLabel: this.getStationName(data.posto),
        bairro: this.getStationBairro(data.posto),
        desligamento: data.desligamento || '—',
        turno: data.turno || 'Turno Manhã (06:00 - 14:20)',
        valesTotal: 0,
        valesQtd: 0,
        status: data.status || 'Ativo',
        initials: initials
      };

      list.unshift(colab); // newest first
      this.saveColaboradores(list);
      return colab;
    },
    deleteColaborador: function(id) {
      let list = this.getColaboradores();
      list = list.filter(c => c.id !== id);
      this.saveColaboradores(list);
      return list;
    },
    clearAll: function() {
      this.saveColaboradores([]);
      return [];
    },
    formatDateBR: function(dateStr) {
      if (!dateStr || dateStr === '—') return '—';
      if (dateStr.includes('/')) return dateStr;
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    },
    maskCPF: function(value) {
      let v = (value || '').replace(/\D/g, '').slice(0, 11);
      if (v.length > 9) {
        return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (v.length > 6) {
        return v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (v.length > 3) {
        return v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }
      return v;
    },
    maskCurrency: function(value) {
      let v = (value || '').replace(/\D/g, '');
      if (!v) return 'R$ 0,00';
      let num = (parseInt(v, 10) / 100).toFixed(2);
      return 'R$ ' + num.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    parseCurrency: function(value) {
      if (typeof value === 'number') return value;
      if (!value) return 0;
      let v = (value || '').replace(/\D/g, '');
      if (!v) return 0;
      return parseInt(v, 10) / 100;
    },
    formatCurrency: function(num) {
      const val = typeof num === 'number' ? num : 0;
      return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    // Gestão de Frequência e Apontamentos
    getAllFrequencia: function() {
      const FREQ_KEY = 'postoRH_frequencia';
      try {
        const raw = localStorage.getItem(FREQ_KEY);
        if (raw) return JSON.parse(raw);
        // Seed inicial demonstrativo profissional para Outubro de 2024
        const seed = {
          'COL-001': {
            '2024-10-15': { status: 'falta_justificada', obs: 'Atestado médico 24h - Dr. Roberto CRM 4921' }
          },
          'COL-002': {
            '2024-10-22': { status: 'falta_injustificada', obs: 'Ausência sem aviso prévio', valorDesconto: 70.00 },
            '2024-10-24': { status: 'falta_injustificada', obs: 'Não compareceu ao turno e sem justificativa', valorDesconto: 70.00 }
          },
          'COL-003': {
            '2024-10-24': { status: 'falta_justificada', obs: 'Atestado médico homologado' }
          },
          'COL-004': {
            '2024-10-08': { status: 'falta_justificada', obs: 'Acompanhamento hospitalar familiar com declaração' },
            '2024-10-24': { status: 'falta_justificada', obs: 'Declaração de comparecimento judicial' }
          },
          'COL-005': {
            '2024-10-18': { status: 'falta_injustificada', obs: 'Falta sem justificativa prévia', valorDesconto: 73.33 }
          }
        };
        localStorage.setItem(FREQ_KEY, JSON.stringify(seed));
        return seed;
      } catch (e) {
        console.error('Erro ao ler frequência:', e);
        return {};
      }
    },
    saveAllFrequencia: function(freqObj) {
      const FREQ_KEY = 'postoRH_frequencia';
      try {
        localStorage.setItem(FREQ_KEY, JSON.stringify(freqObj));
        window.dispatchEvent(new CustomEvent('postoRH_frequencia_sync', { detail: freqObj }));
      } catch (e) {
        console.error('Erro ao salvar frequência:', e);
      }
    },
    getStatusDia: function(colabId, dateStr) {
      const all = this.getAllFrequencia();
      if (all[colabId] && all[colabId][dateStr]) {
        const item = all[colabId][dateStr];
        return {
          status: item.status || 'presente',
          obs: item.obs || '',
          valorDesconto: (item.valorDesconto !== undefined && item.valorDesconto !== null) ? item.valorDesconto : null
        };
      }
      return { status: 'presente', obs: '', valorDesconto: null };
    },
    setStatusDia: function(colabId, dateStr, status, obs, valorDesconto) {
      const all = this.getAllFrequencia();
      if (!all[colabId]) all[colabId] = {};
      
      let finalValorDesconto = null;
      if (valorDesconto !== undefined && valorDesconto !== null && valorDesconto !== '') {
        finalValorDesconto = typeof valorDesconto === 'number' ? valorDesconto : this.parseCurrency(valorDesconto);
      }

      all[colabId][dateStr] = {
        status: status || 'presente',
        obs: obs || '',
        valorDesconto: finalValorDesconto
      };
      this.saveAllFrequencia(all);
      return all[colabId][dateStr];
    },
    calcularDescontoDia: function(salarioStr) {
      const sal = this.parseCurrency(salarioStr);
      return sal > 0 ? (sal / 30) : 0;
    },
    getHistoricoMes: function(colabId, ano, mes) {
      // ano = 2024, mes = 10 (1-indexed)
      const allColabs = this.getColaboradores();
      const colab = allColabs.find(c => c.id === colabId) || {};
      const valorDiaPadrao = this.calcularDescontoDia(colab.salario);
      const allFreq = this.getAllFrequencia();
      const colabFreq = allFreq[colabId] || {};

      const daysInMonth = new Date(ano, mes, 0).getDate();
      const dias = {};
      let totalPresencas = 0;
      let totalFaltasJustificadas = 0;
      let totalFaltasInjustificadas = 0;
      let somaDescontos = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const dayStr = String(d).padStart(2, '0');
        const monthStr = String(mes).padStart(2, '0');
        const dateKey = `${ano}-${monthStr}-${dayStr}`;

        const record = colabFreq[dateKey];
        if (record) {
          if (record.status === 'falta_justificada') {
            totalFaltasJustificadas++;
            dias[d] = {
              dia: d,
              dateStr: dateKey,
              status: 'falta_justificada',
              obs: record.obs || 'Justificada com comprovante',
              isDesconto: false,
              valorDesconto: 0
            };
          } else if (record.status === 'falta_injustificada') {
            totalFaltasInjustificadas++;
            const vDesconto = (record.valorDesconto !== undefined && record.valorDesconto !== null) 
              ? record.valorDesconto 
              : valorDiaPadrao;
            somaDescontos += vDesconto;
            dias[d] = {
              dia: d,
              dateStr: dateKey,
              status: 'falta_injustificada',
              obs: record.obs || 'Falta sem justificativa',
              isDesconto: true,
              valorDesconto: vDesconto
            };
          } else {
            totalPresencas++;
            dias[d] = {
              dia: d,
              dateStr: dateKey,
              status: 'presente',
              obs: '',
              isDesconto: false,
              valorDesconto: 0
            };
          }
        } else {
          // Dias úteis padrão considerados como presença até a data de hoje
          totalPresencas++;
          dias[d] = {
            dia: d,
            dateStr: dateKey,
            status: 'presente',
            obs: '',
            isDesconto: false,
            valorDesconto: 0
          };
        }
      }

      return {
        colab: colab,
        ano: ano,
        mes: mes,
        daysInMonth: daysInMonth,
        dias: dias,
        totalPresencas: totalPresencas,
        totalFaltasJustificadas: totalFaltasJustificadas,
        totalFaltasInjustificadas: totalFaltasInjustificadas,
        valorDia: valorDiaPadrao,
        valorDescontoTotal: somaDescontos
      };
    },
    // ==========================================
    // GESTÃO DE VALES E ADIANTAMENTOS
    // ==========================================
    getVales: function() {
      const VALES_KEY = 'postoRH_vales';
      try {
        const seedVales = [
          {
            id: 'VAL-001',
            colabId: 'COL-001',
            nome: 'Valdir Antonio Silveira',
            matricula: '#0481',
            cpf: '182.492.018-44',
            posto: 'posto-oliveira-francesa',
            postoLabel: 'Posto Oliveira - Na Francesa',
            turno: 'Turno Manhã',
            horario: '06:00 às 14:20',
            dataVale: '2024-10-10',
            valor: 'R$ 350,00',
            valorNum: 350.00,
            initials: 'VA'
          },
          {
            id: 'VAL-002',
            colabId: 'COL-002',
            nome: 'Mariana Souza dos Santos',
            matricula: '#0482',
            cpf: '402.819.330-91',
            posto: 'posto-oliveira-francesa',
            postoLabel: 'Posto Oliveira - Na Francesa',
            turno: 'Turno Manhã',
            horario: '06:00 às 14:20',
            dataVale: '2024-10-18',
            valor: 'R$ 200,00',
            valorNum: 200.00,
            initials: 'MS'
          },
          {
            id: 'VAL-003',
            colabId: 'COL-003',
            nome: 'José Carlos Albuquerque',
            matricula: '#0483',
            cpf: '098.221.782-31',
            posto: 'posto-oliveira-odovaldo',
            postoLabel: 'Posto Oliveira - Odovaldo Novo',
            turno: 'Comercial',
            horario: '08:00 às 18:00',
            dataVale: '2024-10-14',
            valor: 'R$ 300,00',
            valorNum: 300.00,
            initials: 'JC'
          },
          {
            id: 'VAL-004',
            colabId: 'COL-004',
            nome: 'Raimundo Nonato Batista',
            matricula: '#0484',
            cpf: '551.402.119-02',
            posto: 'posto-equador-sham',
            postoLabel: 'Posto Equador - Conjunto Sham',
            turno: 'Turno Tarde',
            horario: '14:00 às 22:20',
            dataVale: '2024-10-22',
            valor: 'R$ 250,00',
            valorNum: 250.00,
            initials: 'RN'
          },
          {
            id: 'VAL-005',
            colabId: 'COL-005',
            nome: 'Amanda Ferreira Lima',
            matricula: '#0485',
            cpf: '712.903.654-18',
            posto: 'posto-equador-barreirinha',
            postoLabel: 'Posto Equador - Barreirinha',
            turno: 'Turno Noite',
            horario: '22:00 às 06:20',
            dataVale: '2024-10-12',
            valor: 'R$ 200,00',
            valorNum: 200.00,
            initials: 'AF'
          },
          {
            id: 'VAL-006',
            colabId: 'COL-001',
            nome: 'Valdir Antonio Silveira',
            matricula: '#0481',
            cpf: '182.492.018-44',
            posto: 'posto-oliveira-francesa',
            postoLabel: 'Posto Oliveira - Na Francesa',
            turno: 'Turno Manhã',
            horario: '06:00 às 14:20',
            dataVale: '2024-10-24',
            valor: 'R$ 150,00',
            valorNum: 150.00,
            initials: 'VA'
          }
        ];

        const data = localStorage.getItem(VALES_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          // Se tiver os postos completos ou for customizado pelo usuário, usa
          if (Array.isArray(parsed) && parsed.length >= 6) return parsed;
        }

        localStorage.setItem(VALES_KEY, JSON.stringify(seedVales));
        return seedVales;
      } catch(e) {
        console.error('Erro ao ler vales:', e);
        return [];
      }
    },
    getValesDoColaboradorNoMes: function(colabId, anoMes) {
      if (!colabId || !anoMes) return [];
      const vales = this.getVales();
      return vales.filter(v => v.colabId === colabId && v.dataVale && v.dataVale.startsWith(anoMes));
    },
    saveVales: function(list) {
      const VALES_KEY = 'postoRH_vales';
      try {
        localStorage.setItem(VALES_KEY, JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('postoRH_vales_sync', { detail: list }));
      } catch(e) {
        console.error('Erro ao salvar vales:', e);
      }
    },
    addVale: function(valeData) {
      const list = this.getVales();
      const nextNum = list.length + 1;
      const id = 'VAL-' + String(nextNum).padStart(3, '0');
      
      const colab = this.getColaboradores().find(c => c.id === valeData.colabId) || {};
      const valorNum = this.parseCurrency(valeData.valor);

      let horarioExt = '06:00 às 14:20';
      if (colab.turno) {
        if (colab.turno.includes('Manhã')) horarioExt = '06:00 às 14:20';
        else if (colab.turno.includes('Tarde')) horarioExt = '14:00 às 22:20';
        else if (colab.turno.includes('Noite')) horarioExt = '22:00 às 06:20';
        else if (colab.turno.includes('Comercial')) horarioExt = '08:00 às 18:00';
      }

      const novoVale = {
        id: id,
        colabId: valeData.colabId,
        nome: colab.nome || valeData.nome || 'Colaborador',
        matricula: colab.matricula || '#0000',
        cpf: colab.cpf || '',
        posto: colab.posto || valeData.posto || 'posto-oliveira-francesa',
        postoLabel: colab.postoLabel || this.getStationName(colab.posto || valeData.posto),
        turno: colab.turno ? colab.turno.split('(')[0].trim() : 'Turno Manhã',
        horario: horarioExt,
        dataVale: valeData.dataVale || new Date().toISOString().split('T')[0],
        valor: this.maskCurrency(String(Math.round(valorNum * 100))),
        valorNum: valorNum,
        initials: colab.initials || 'CO'
      };

      list.unshift(novoVale);
      this.saveVales(list);
      return novoVale;
    },
    deleteVale: function(id) {
      let list = this.getVales();
      list = list.filter(v => v.id !== id);
      this.saveVales(list);
      return list;
    },
    updateVale: function(id, patch) {
      let list = this.getVales();
      const idx = list.findIndex(v => v.id === id);
      if (idx !== -1) {
        if (patch.valor !== undefined) {
          const vNum = typeof patch.valor === 'number' ? patch.valor : this.parseCurrency(patch.valor);
          list[idx].valorNum = vNum;
          list[idx].valor = this.maskCurrency(String(Math.round(vNum * 100)));
        }
        if (patch.dataVale) list[idx].dataVale = patch.dataVale;
        this.saveVales(list);
        return list[idx];
      }
      return null;
    }
  };

  // Cross-tab synchronization
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new CustomEvent('postoRH_sync', { detail: window.PostoStore.getColaboradores() }));
    }
    if (e.key === 'postoRH_frequencia') {
      window.dispatchEvent(new CustomEvent('postoRH_frequencia_sync', { detail: window.PostoStore.getAllFrequencia() }));
    }
    if (e.key === 'postoRH_vales') {
      window.dispatchEvent(new CustomEvent('postoRH_vales_sync', { detail: window.PostoStore.getVales() }));
    }
  });
})();

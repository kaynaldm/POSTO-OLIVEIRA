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
    getColaboradores: function() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
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
        cargo: data.cargo || 'frentista',
        cargoLabel: data.cargoLabel || 'Frentista de Pista',
        municipio: 'Parintins (AM)',
        posto: data.posto || 'posto-oliveira-francesa',
        postoLabel: this.getStationName(data.posto),
        bairro: this.getStationBairro(data.posto),
        dataAdmissao: data.dataAdmissao || new Date().toISOString().split('T')[0],
        desligamento: data.desligamento || '—',
        turno: data.turno || 'Turno Manhã (06:00 - 14:20)',
        salario: data.salario || 'R$ 2.450,00',
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
    }
  };

  // Cross-tab synchronization
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new CustomEvent('postoRH_sync', { detail: window.PostoStore.getColaboradores() }));
    }
  });
})();

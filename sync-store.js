// PostoRH Central Store & Data Synchronization System
(function() {
  const STORAGE_KEY = 'postoRH_colaboradores';
  const FREQ_KEY = 'postoRH_frequencia';
  const VALES_KEY = 'postoRH_vales';
  const SEED_VERSION_KEY = 'postoRH_seed_v5_oficial_completo';

  // In-memory cache de alto desempenho para leitura instantânea (0ms) sem custo de JSON.parse repetido
  let _cachedColaboradores = null;
  let _cachedFrequencia = null;
  let _cachedVales = null;

  const STATIONS = [
    { id: 'posto-oliveira-francesa', name: 'Posto Oliveira - Na Francesa', bairro: 'Francesa', address: 'Av. João Meireles, 30-136' },
    { id: 'posto-oliveira-odovaldo', name: 'Posto Oliveira - Odovaldo Novo', bairro: 'Odovaldo Novo', address: 'Estrada Odovaldo Novo' },
    { id: 'posto-equador-sham', name: 'Posto Equador - Conjunto Sham', bairro: 'Conjunto Sham', address: 'Rua Souza Filho, 142-282' },
    { id: 'posto-equador-barreirinha', name: 'Posto Equador - Barreirinha', bairro: 'João Pinheiro', address: 'Rua Barreirinha, 1181-1293' }
  ];

  // Base Seed: 20 Colaboradores distribuídos pelas 4 unidades de Parintins
  const DEMO_COLABORADORES = [
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
    },
    {
      id: 'COL-006',
      matricula: '#0486',
      nome: 'Lucas Gabriel Pinheiro',
      cpf: '321.654.987-12',
      dataNascimento: '1996-03-25',
      dataInicio: '2022-11-10',
      dataAdmissao: '2022-11-10',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Frentista de Pista',
      salario: 'R$ 2.200,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-francesa',
      postoLabel: 'Posto Oliveira - Na Francesa',
      bairro: 'Francesa',
      turno: 'Turno Tarde (14:00 - 22:20)',
      status: 'Ativo',
      initials: 'LP'
    },
    {
      id: 'COL-007',
      matricula: '#0487',
      nome: 'Beatriz Cristina Ramos',
      cpf: '456.789.123-45',
      dataNascimento: '1999-07-14',
      dataInicio: '2023-04-01',
      dataAdmissao: '2023-04-01',
      sexo: 'Feminino',
      cargo: 'operador_caixa',
      cargoLabel: 'Operador(a) de Caixa',
      salario: 'R$ 2.100,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-francesa',
      postoLabel: 'Posto Oliveira - Na Francesa',
      bairro: 'Francesa',
      turno: 'Turno Tarde (14:00 - 22:20)',
      status: 'Ativo',
      initials: 'BR'
    },
    {
      id: 'COL-008',
      matricula: '#0488',
      nome: 'Marcos Vinicius Farias',
      cpf: '654.321.789-99',
      dataNascimento: '1992-10-30',
      dataInicio: '2021-08-15',
      dataAdmissao: '2021-08-15',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Frentista de Pista',
      salario: 'R$ 2.200,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-francesa',
      postoLabel: 'Posto Oliveira - Na Francesa',
      bairro: 'Francesa',
      turno: 'Turno Noite (22:00 - 06:20)',
      status: 'Ativo',
      initials: 'MF'
    },
    {
      id: 'COL-009',
      matricula: '#0489',
      nome: 'Francisca Helena Prado',
      cpf: '789.123.456-00',
      dataNascimento: '1987-02-18',
      dataInicio: '2020-05-20',
      dataAdmissao: '2020-05-20',
      sexo: 'Feminino',
      cargo: 'frentista_lider',
      cargoLabel: 'Frentista Líder',
      salario: 'R$ 2.850,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      bairro: 'Odovaldo Novo',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'FP'
    },
    {
      id: 'COL-010',
      matricula: '#0490',
      nome: 'Thiago Lima Mendonça',
      cpf: '852.963.741-55',
      dataNascimento: '1994-11-12',
      dataInicio: '2023-02-10',
      dataAdmissao: '2023-02-10',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Frentista de Pista',
      salario: 'R$ 2.200,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      bairro: 'Odovaldo Novo',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'TM'
    },
    {
      id: 'COL-011',
      matricula: '#0491',
      nome: 'Camila Rocha Barbosa',
      cpf: '963.852.741-66',
      dataNascimento: '2000-08-05',
      dataInicio: '2023-09-01',
      dataAdmissao: '2023-09-01',
      sexo: 'Feminino',
      cargo: 'operador_caixa',
      cargoLabel: 'Operador(a) de Caixa',
      salario: 'R$ 2.100,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      bairro: 'Odovaldo Novo',
      turno: 'Turno Tarde (14:00 - 22:20)',
      status: 'Ativo',
      initials: 'CB'
    },
    {
      id: 'COL-012',
      matricula: '#0492',
      nome: 'Rodrigo Otávio Melo',
      cpf: '147.258.369-77',
      dataNascimento: '1991-04-19',
      dataInicio: '2022-01-20',
      dataAdmissao: '2022-01-20',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Frentista de Pista',
      salario: 'R$ 2.200,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      bairro: 'Odovaldo Novo',
      turno: 'Turno Noite (22:00 - 06:20)',
      status: 'Ativo',
      initials: 'RM'
    },
    {
      id: 'COL-013',
      matricula: '#0493',
      nome: 'Gleice Kelly Guimarães',
      cpf: '258.369.147-88',
      dataNascimento: '1989-12-02',
      dataInicio: '2019-10-15',
      dataAdmissao: '2019-10-15',
      sexo: 'Feminino',
      cargo: 'gerente_posto',
      cargoLabel: 'Gerente de Posto',
      salario: 'R$ 4.500,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      bairro: 'Conjunto Sham',
      turno: 'Comercial (08:00 - 18:00)',
      status: 'Ativo',
      initials: 'GG'
    },
    {
      id: 'COL-014',
      matricula: '#0494',
      nome: 'Anderson Silva de Oliveira',
      cpf: '369.147.258-99',
      dataNascimento: '1986-06-28',
      dataInicio: '2021-07-01',
      dataAdmissao: '2021-07-01',
      sexo: 'Masculino',
      cargo: 'frentista_lider',
      cargoLabel: 'Frentista Líder',
      salario: 'R$ 2.850,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      bairro: 'Conjunto Sham',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'AO'
    },
    {
      id: 'COL-015',
      matricula: '#0495',
      nome: 'Larissa Danielle Cruz',
      cpf: '159.357.486-22',
      dataNascimento: '1997-01-17',
      dataInicio: '2023-05-15',
      dataAdmissao: '2023-05-15',
      sexo: 'Feminino',
      cargo: 'operador_caixa',
      cargoLabel: 'Operador(a) de Caixa',
      salario: 'R$ 2.100,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      bairro: 'Conjunto Sham',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'LC'
    },
    {
      id: 'COL-016',
      matricula: '#0496',
      nome: 'Samuel Costa Vieira',
      cpf: '357.951.482-33',
      dataNascimento: '1993-09-09',
      dataInicio: '2022-08-01',
      dataAdmissao: '2022-08-01',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Frentista de Pista',
      salario: 'R$ 2.200,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      bairro: 'Conjunto Sham',
      turno: 'Turno Noite (22:00 - 06:20)',
      status: 'Ativo',
      initials: 'SV'
    },
    {
      id: 'COL-017',
      matricula: '#0497',
      nome: 'Davi Henrique Castro',
      cpf: '482.357.951-44',
      dataNascimento: '1985-08-23',
      dataInicio: '2020-02-01',
      dataAdmissao: '2020-02-01',
      sexo: 'Masculino',
      cargo: 'gerente_posto',
      cargoLabel: 'Gerente de Posto',
      salario: 'R$ 4.500,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      bairro: 'João Pinheiro',
      turno: 'Comercial (08:00 - 18:00)',
      status: 'Ativo',
      initials: 'DC'
    },
    {
      id: 'COL-018',
      matricula: '#0498',
      nome: 'Juliana Paes Nascimento',
      cpf: '753.159.852-55',
      dataNascimento: '1996-12-14',
      dataInicio: '2023-03-20',
      dataAdmissao: '2023-03-20',
      sexo: 'Feminino',
      cargo: 'operador_caixa',
      cargoLabel: 'Operador(a) de Caixa',
      salario: 'R$ 2.100,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      bairro: 'João Pinheiro',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'JN'
    },
    {
      id: 'COL-019',
      matricula: '#0499',
      nome: 'Paulo Roberto Brandão',
      cpf: '852.159.753-66',
      dataNascimento: '1990-05-07',
      dataInicio: '2021-12-05',
      dataAdmissao: '2021-12-05',
      sexo: 'Masculino',
      cargo: 'frentista_lider',
      cargoLabel: 'Frentista Líder',
      salario: 'R$ 2.850,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      bairro: 'João Pinheiro',
      turno: 'Turno Tarde (14:00 - 22:20)',
      status: 'Ativo',
      initials: 'PB'
    },
    {
      id: 'COL-020',
      matricula: '#0500',
      nome: 'Edilson Marinho Duarte',
      cpf: '951.753.357-77',
      dataNascimento: '1987-10-11',
      dataInicio: '2022-04-10',
      dataAdmissao: '2022-04-10',
      sexo: 'Masculino',
      cargo: 'frentista',
      cargoLabel: 'Lubrificador / Serviços Gerais',
      salario: 'R$ 2.300,00',
      municipio: 'Parintins (AM)',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      bairro: 'João Pinheiro',
      turno: 'Turno Manhã (06:00 - 14:20)',
      status: 'Ativo',
      initials: 'ED'
    }
  ];

  // Base Seed Frequência / Faltas
  const DEMO_FREQUENCIA = {
    'COL-001': {
      '2024-10-15': { status: 'falta_justificada', obs: 'Atestado odontológico cirúrgico - CRO 1842' }
    },
    'COL-002': {
      '2024-10-22': { status: 'falta_injustificada', obs: 'Ausência sem aviso prévio', valorDesconto: 70.00 },
      '2024-10-24': { status: 'falta_injustificada', obs: 'Não compareceu ao turno da manhã sem aviso prévio', valorDesconto: 70.00 }
    },
    'COL-004': {
      '2024-10-08': { status: 'falta_justificada', obs: 'Acompanhamento hospitalar familiar com declaração' },
      '2024-10-24': { status: 'falta_justificada', obs: 'Declaração de comparecimento judicial (Fórum de Parintins)' }
    },
    'COL-005': {
      '2024-10-18': { status: 'falta_injustificada', obs: 'Falta sem justificativa prévia', valorDesconto: 73.33 },
      '2024-10-24': { status: 'falta_justificada', obs: 'Comprovante de doação de sangue no Hemonúcleo de Parintins' }
    },
    'COL-007': {
      '2024-10-24': { status: 'falta_justificada', obs: 'Atestado médico 24h - Dr. Roberto CRM 4921 (Gastroenterite)' }
    },
    'COL-008': {
      '2024-10-11': { status: 'falta_justificada', obs: 'Atestado médico 48h - Pronto Socorro Parintins' }
    },
    'COL-010': {
      '2024-10-24': { status: 'falta_injustificada', obs: 'Ausência não justificada na escala matutina', valorDesconto: 73.33 }
    },
    'COL-011': {
      '2024-10-17': { status: 'falta_injustificada', obs: 'Falta no turno sem justificativa', valorDesconto: 70.00 }
    },
    'COL-014': {
      '2024-10-08': { status: 'falta_justificada', obs: 'Acompanhamento de dependente em consulta médica' }
    },
    'COL-016': {
      '2024-10-20': { status: 'falta_injustificada', obs: 'Sem justificativa informada', valorDesconto: 73.33 }
    },
    'COL-019': {
      '2024-10-04': { status: 'falta_justificada', obs: 'Declaração de exames periódicos de saúde ocupacional' }
    }
  };

  // Base Seed Vales e Adiantamentos (16 registros ricos em Outubro/2024)
  const DEMO_VALES = [
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
    },
    {
      id: 'VAL-007',
      colabId: 'COL-006',
      nome: 'Lucas Gabriel Pinheiro',
      matricula: '#0486',
      cpf: '321.654.987-12',
      posto: 'posto-oliveira-francesa',
      postoLabel: 'Posto Oliveira - Na Francesa',
      turno: 'Turno Tarde',
      horario: '14:00 às 22:20',
      dataVale: '2024-10-19',
      valor: 'R$ 180,00',
      valorNum: 180.00,
      initials: 'LP'
    },
    {
      id: 'VAL-008',
      colabId: 'COL-009',
      nome: 'Francisca Helena Prado',
      matricula: '#0489',
      cpf: '789.123.456-00',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-08',
      valor: 'R$ 400,00',
      valorNum: 400.00,
      initials: 'FP'
    },
    {
      id: 'VAL-009',
      colabId: 'COL-009',
      nome: 'Francisca Helena Prado',
      matricula: '#0489',
      cpf: '789.123.456-00',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-23',
      valor: 'R$ 200,00',
      valorNum: 200.00,
      initials: 'FP'
    },
    {
      id: 'VAL-010',
      colabId: 'COL-010',
      nome: 'Thiago Lima Mendonça',
      matricula: '#0490',
      cpf: '852.963.741-55',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-15',
      valor: 'R$ 150,00',
      valorNum: 150.00,
      initials: 'TM'
    },
    {
      id: 'VAL-011',
      colabId: 'COL-011',
      nome: 'Camila Rocha Barbosa',
      matricula: '#0491',
      cpf: '963.852.741-66',
      posto: 'posto-oliveira-odovaldo',
      postoLabel: 'Posto Oliveira - Odovaldo Novo',
      turno: 'Turno Tarde',
      horario: '14:00 às 22:20',
      dataVale: '2024-10-17',
      valor: 'R$ 250,00',
      valorNum: 250.00,
      initials: 'CB'
    },
    {
      id: 'VAL-012',
      colabId: 'COL-014',
      nome: 'Anderson Silva de Oliveira',
      matricula: '#0494',
      cpf: '369.147.258-99',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-11',
      valor: 'R$ 300,00',
      valorNum: 300.00,
      initials: 'AO'
    },
    {
      id: 'VAL-013',
      colabId: 'COL-016',
      nome: 'Samuel Costa Vieira',
      matricula: '#0496',
      cpf: '357.951.482-33',
      posto: 'posto-equador-sham',
      postoLabel: 'Posto Equador - Conjunto Sham',
      turno: 'Turno Noite',
      horario: '22:00 às 06:20',
      dataVale: '2024-10-20',
      valor: 'R$ 200,00',
      valorNum: 200.00,
      initials: 'SV'
    },
    {
      id: 'VAL-014',
      colabId: 'COL-018',
      nome: 'Juliana Paes Nascimento',
      matricula: '#0498',
      cpf: '753.159.852-55',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-16',
      valor: 'R$ 220,00',
      valorNum: 220.00,
      initials: 'JN'
    },
    {
      id: 'VAL-015',
      colabId: 'COL-019',
      nome: 'Paulo Roberto Brandão',
      matricula: '#0499',
      cpf: '852.159.753-66',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      turno: 'Turno Tarde',
      horario: '14:00 às 22:20',
      dataVale: '2024-10-21',
      valor: 'R$ 350,00',
      valorNum: 350.00,
      initials: 'PB'
    },
    {
      id: 'VAL-016',
      colabId: 'COL-020',
      nome: 'Edilson Marinho Duarte',
      matricula: '#0500',
      cpf: '951.753.357-77',
      posto: 'posto-equador-barreirinha',
      postoLabel: 'Posto Equador - Barreirinha',
      turno: 'Turno Manhã',
      horario: '06:00 às 14:20',
      dataVale: '2024-10-24',
      valor: 'R$ 150,00',
      valorNum: 150.00,
      initials: 'ED'
    }
  ];

  // Auto-upgrade / seed check
  function ensureDemonstrationData() {
    try {
      const currentVer = localStorage.getItem(SEED_VERSION_KEY);
      const existingColabs = localStorage.getItem(STORAGE_KEY);
      let colabsCount = 0;
      if (existingColabs) {
        try {
          const parsed = JSON.parse(existingColabs);
          if (Array.isArray(parsed)) colabsCount = parsed.length;
        } catch(e) {}
      }
      
      // Se não tem dados, ou a versão de demonstração é antiga (< v5), ou tem menos de 20 colaboradores, atualiza com a equipe completa
      if (currentVer !== 'v5_completo' || colabsCount < 20) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_COLABORADORES));
        localStorage.setItem(FREQ_KEY, JSON.stringify(DEMO_FREQUENCIA));
        localStorage.setItem(VALES_KEY, JSON.stringify(DEMO_VALES));
        localStorage.setItem(SEED_VERSION_KEY, 'v5_completo');
      }
    } catch(e) {
      console.warn('Erro ao verificar dados de demonstração:', e);
    }
  }

  ensureDemonstrationData();

  window.PostoStore = {
    getStations: function() {
      return STATIONS;
    },
    getStationName: function(id) {
      const s = STATIONS.find(x => x.id === id);
      return s ? s.name : (id || 'Posto');
    },
    getStationBairro: function(id) {
      const s = STATIONS.find(x => x.id === id);
      return s ? s.bairro : 'Parintins';
    },

    // Controle robusto e suave de scroll do body (evita travamento de tela)
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

    // Reinicializar dados demonstrativos a qualquer momento
    resetDemoData: function() {
      _cachedColaboradores = DEMO_COLABORADORES.slice();
      _cachedFrequencia = JSON.parse(JSON.stringify(DEMO_FREQUENCIA));
      _cachedVales = DEMO_VALES.slice();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_COLABORADORES));
      localStorage.setItem(FREQ_KEY, JSON.stringify(DEMO_FREQUENCIA));
      localStorage.setItem(VALES_KEY, JSON.stringify(DEMO_VALES));
      localStorage.setItem(SEED_VERSION_KEY, 'v5_completo');
      window.dispatchEvent(new CustomEvent('postoRH_sync', { detail: DEMO_COLABORADORES }));
      window.dispatchEvent(new CustomEvent('postoRH_frequencia_sync', { detail: DEMO_FREQUENCIA }));
      window.dispatchEvent(new CustomEvent('postoRH_vales_sync', { detail: DEMO_VALES }));
      return true;
    },

    // ==========================================
    // COLABORADORES
    // ==========================================
    getColaboradores: function() {
      if (_cachedColaboradores && _cachedColaboradores.length > 0) {
        return _cachedColaboradores;
      }
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            _cachedColaboradores = parsed.map(c => ({
              ...c,
              status: c.status || 'Ativo'
            }));
            return _cachedColaboradores;
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_COLABORADORES));
        _cachedColaboradores = DEMO_COLABORADORES.slice();
        return _cachedColaboradores;
      } catch (e) {
        console.error('Erro ao ler colaboradores:', e);
        _cachedColaboradores = DEMO_COLABORADORES.slice();
        return _cachedColaboradores;
      }
    },
    saveColaboradores: function(list) {
      _cachedColaboradores = list;
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

      list.unshift(colab);
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

    // ==========================================
    // FORMATAÇÃO E MÁSCARAS OTIMIZADAS
    // ==========================================
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
      if (typeof value === 'number') return isNaN(value) ? 0 : value;
      if (!value) return 0;
      let v = String(value).replace(/\D/g, '');
      if (!v) return 0;
      return parseInt(v, 10) / 100;
    },
    formatCurrency: function(num) {
      const val = typeof num === 'number' && !isNaN(num) ? num : 0;
      return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    // ==========================================
    // GESTÃO DE FREQUÊNCIA E APONTAMENTOS
    // ==========================================
    getAllFrequencia: function() {
      if (_cachedFrequencia) return _cachedFrequencia;
      try {
        const raw = localStorage.getItem(FREQ_KEY);
        if (raw) {
          _cachedFrequencia = JSON.parse(raw);
          return _cachedFrequencia;
        }
        localStorage.setItem(FREQ_KEY, JSON.stringify(DEMO_FREQUENCIA));
        _cachedFrequencia = JSON.parse(JSON.stringify(DEMO_FREQUENCIA));
        return _cachedFrequencia;
      } catch (e) {
        console.error('Erro ao ler frequência:', e);
        _cachedFrequencia = JSON.parse(JSON.stringify(DEMO_FREQUENCIA));
        return _cachedFrequencia;
      }
    },
    saveAllFrequencia: function(freqObj) {
      _cachedFrequencia = freqObj;
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
      if (_cachedVales && _cachedVales.length > 0) return _cachedVales;
      try {
        const data = localStorage.getItem(VALES_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            _cachedVales = parsed;
            return _cachedVales;
          }
        }
        localStorage.setItem(VALES_KEY, JSON.stringify(DEMO_VALES));
        _cachedVales = DEMO_VALES.slice();
        return _cachedVales;
      } catch(e) {
        console.error('Erro ao ler vales:', e);
        _cachedVales = DEMO_VALES.slice();
        return _cachedVales;
      }
    },
    getValesDoColaboradorNoMes: function(colabId, anoMes) {
      if (!colabId || !anoMes) return [];
      const vales = this.getVales();
      return vales.filter(v => v.colabId === colabId && v.dataVale && v.dataVale.startsWith(anoMes));
    },
    saveVales: function(list) {
      _cachedVales = list;
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
      _cachedColaboradores = null;
      window.dispatchEvent(new CustomEvent('postoRH_sync', { detail: window.PostoStore.getColaboradores() }));
    }
    if (e.key === FREQ_KEY) {
      _cachedFrequencia = null;
      window.dispatchEvent(new CustomEvent('postoRH_frequencia_sync', { detail: window.PostoStore.getAllFrequencia() }));
    }
    if (e.key === VALES_KEY) {
      _cachedVales = null;
      window.dispatchEvent(new CustomEvent('postoRH_vales_sync', { detail: window.PostoStore.getVales() }));
    }
  });
})();

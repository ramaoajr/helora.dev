/**
 * Portuguese copy — the version served at `/`.
 *
 * Every string here was lifted verbatim from the components it used to live
 * in, so extracting it changed nothing a visitor can see.
 *
 * Shape rules, which `en.js` must follow exactly:
 *
 * - Items that pair with an icon carry a `key`. The component owns the icon
 *   map and looks the icon up by that key, so the two files never have to
 *   agree on array order or length, and a renamed item fails visibly in review
 *   instead of silently shifting every icon by one.
 * - No markup and no class names. A string that needs a link or bold inside it
 *   gets split into parts, as the consent label does.
 * - Copy only. Section ids, anchors and icons are structure and stay in the
 *   components.
 */

const pt = {
  // What `<html lang>` carries, and what the contact form reports to the
  // automation so the auto-reply comes back in this language.
  locale: 'pt',
  htmlLang: 'pt-BR',

  // Where this version's data-processing page lives.
  privacyPath: '/privacidade',

  // The other version, for the language switch. `lang` goes on the anchor so a
  // screen reader announces "English" in English rather than reading it with
  // Portuguese phonemes.
  alternate: { label: 'English', href: '/en', lang: 'en' },

  // Strings nobody sees: labels for assistive technology, and the names of
  // landmarks a screen-reader user navigates by.
  a11y: {
    mainNav: 'Navegação principal',
    toTop: 'Ir para o topo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    footerNav: 'Links do rodapé',
    closeDialog: 'Fechar',
    newTab: ' (abre em nova aba)',
    languageSwitch: 'Ver este site em inglês',
  },

  nav: {
    items: [
      { id: 'problems', label: 'Problemas' },
      { id: 'services', label: 'Serviços' },
      { id: 'how-we-work', label: 'Processo' },
      { id: 'who-its-for', label: 'Para quem' },
      { id: 'technologies', label: 'O que construímos' },
    ],
    cta: 'Falar com a HeloraDev',
  },

  hero: {
    eyebrow: 'Consultoria operacional e tecnologia sob medida',
    title: 'Sua operação não deveria depender de planilhas e memória.',
    lead:
      'A HeloraDev organiza fluxos, automatiza tarefas e cria sistemas internos para ' +
      'empresas que precisam de mais controle, menos retrabalho e decisões baseadas em dados.',
    primaryCta: 'Descrever minha operação',
    secondaryCta: 'Conhecer serviços',
    imageAlt:
      'Planilhas, mensagens e documentos dispersos sendo transformados em um sistema conectado',
  },

  problems: {
    eyebrow: 'Problemas que resolvemos',
    title: 'Operações travam antes de parecerem grandes problemas.',
    lead:
      'Quando processos dependem de planilhas, mensagens e memória, a empresa perde tempo, ' +
      'controle e previsibilidade todos os dias.',
    items: [
      {
        key: 'spreadsheets',
        title: 'Planilhas controlando tudo',
        description: 'Dados críticos ficam em arquivos soltos, sem dono claro e sem histórico confiável.',
      },
      {
        key: 'scattered',
        title: 'Informação espalhada',
        description: 'WhatsApp, e-mail, sistemas e conversas guardam pedaços diferentes da operação.',
      },
      {
        key: 'rework',
        title: 'Retrabalho recorrente',
        description: 'A equipe refaz conferências, atualizações e cópias manuais que poderiam ser automáticas.',
      },
      {
        key: 'visibility',
        title: 'Pouca visibilidade',
        description: 'Prazos, responsáveis e gargalos só aparecem quando o problema já virou urgência.',
      },
      {
        key: 'nonstandard',
        title: 'Processos sem padrão',
        description: 'Cada pessoa executa de um jeito, o que torna treinamento, escala e qualidade instáveis.',
      },
      {
        key: 'lateReports',
        title: 'Relatórios atrasados',
        description: 'Indicadores chegam tarde porque dependem de coleta, limpeza e consolidação manual.',
      },
      {
        key: 'untraceable',
        title: 'Erros difíceis de rastrear',
        description: 'Falhas em cadastro, pedido ou atendimento passam por várias mãos antes de serem percebidas.',
      },
      {
        key: 'unclearStatus',
        title: 'Status pouco claro',
        description: 'Clientes e gestores perguntam onde algo está porque não existe uma fonte única de verdade.',
      },
      {
        key: 'growth',
        title: 'Crescimento sem controle',
        description: 'A demanda aumenta, mas os processos continuam dependentes de esforço manual e memória.',
      },
    ],
  },

  services: {
    eyebrow: 'Serviços',
    title: 'Sistemas, automações e clareza para a operação real.',
    lead:
      'A HeloraDev atua como parceira técnica e estratégica para empresas que precisam ' +
      'organizar o trabalho antes de escalar.',
    items: [
      {
        key: 'automation',
        title: 'Automação',
        description:
          'Automatizamos tarefas repetitivas e integrações entre ferramentas para reduzir esforço manual.',
        examples: ['alertas e aprovações', 'sincronização de dados', 'relatórios automáticos'],
      },
      {
        key: 'customSystems',
        title: 'Sistemas sob medida',
        description: 'Criamos aplicações internas para fluxos que não cabem em ferramentas genéricas.',
        examples: ['portais operacionais', 'dashboards de controle', 'gestão de ordens e solicitações'],
      },
      {
        key: 'operations',
        title: 'Organização operacional',
        description: 'Mapeamos processos, eliminamos ruído e transformamos rotinas soltas em fluxos claros.',
        examples: ['SOPs e checklists', 'responsáveis e prazos', 'indicadores de operação'],
      },
      {
        key: 'consulting',
        title: 'Consultoria técnica',
        description:
          'Ajudamos a decidir o que automatizar, o que integrar e qual tecnologia usar em cada etapa.',
        examples: ['diagnóstico de stack', 'arquitetura de solução', 'roadmap de implementação'],
      },
    ],
  },

  howWeWork: {
    eyebrow: 'Como trabalhamos',
    title: 'Primeiro entendemos. Depois construímos.',
    lead:
      'O processo reduz risco, evita soluções genéricas e mantém a tecnologia conectada ao que ' +
      'a operação precisa entregar.',
    // Ordered: the component numbers these 01..04 and draws the connector
    // between them, so the sequence is the message.
    steps: [
      {
        title: 'Diagnóstico',
        description: 'Entendemos a operação, os gargalos, as ferramentas atuais e o impacto de cada problema.',
      },
      {
        title: 'Planejamento',
        description:
          'Definimos o fluxo ideal, prioridades, riscos e o caminho técnico mais simples para implementar.',
      },
      {
        title: 'Implementação',
        description: 'Construímos automações, sistemas e integrações com ciclos curtos e validação operacional.',
      },
      {
        title: 'Acompanhamento',
        description: 'Ajustamos o que foi implantado, medimos resultado e evoluímos a operação com dados reais.',
      },
    ],
  },

  about: {
    eyebrow: 'Sobre a HeloraDev',
    title: 'Não somos uma agência de sites. Somos uma parceira para organizar a operação.',
    paragraphs: [
      'Trabalhamos com empresas que já sentem o limite de processos manuais, ferramentas ' +
        'desconectadas e decisões sem visibilidade. Nosso foco é entender a rotina real, ' +
        'simplificar o fluxo e transformar o que funciona no improviso em sistema.',
      'A solução pode ser uma automação, uma aplicação interna, uma integração ou apenas uma ' +
        'nova forma de organizar responsabilidades. O ponto central é sempre o mesmo: tecnologia ' +
        'aplicada ao controle operacional, sem excesso e sem promessa genérica.',
    ],
  },

  whoItsFor: {
    eyebrow: 'Para quem',
    title: 'Empresas com operação concreta, rotina intensa e pouco espaço para retrabalho.',
    lead: 'Atuamos melhor onde processo, equipe e informação precisam andar juntos todos os dias.',
    items: [
      {
        key: 'logistics',
        title: 'Logística',
        description: 'Operações com entregas, status, rotas, ocorrências e comunicação entre equipes.',
      },
      {
        key: 'warehouses',
        title: 'Armazéns',
        description: 'Controle de recebimento, separação, inventário, expedição e produtividade operacional.',
      },
      {
        key: 'maintenance',
        title: 'Manutenção',
        description: 'Ordens de serviço, SLA, técnicos em campo, peças, chamados e histórico de atendimento.',
      },
      {
        key: 'serviceProviders',
        title: 'Prestadores',
        description:
          'Empresas de serviço que precisam padronizar execução, agenda, cobrança e acompanhamento.',
      },
      {
        key: 'offices',
        title: 'Escritórios',
        description: 'Times administrativos com aprovações, documentos, tarefas recorrentes e relatórios.',
      },
      {
        key: 'scaling',
        title: 'Empresas em expansão',
        description: 'PMEs que cresceram, mas ainda operam com controles frágeis e processos informais.',
      },
    ],
  },

  technologies: {
    eyebrow: 'O que construímos',
    title: 'O que fica funcionando na sua empresa.',
    lead: 'Oito frentes. Um projeto costuma usar três ou quatro.',
    items: [
      {
        key: 'customSoftware',
        title: 'Software sob medida',
        description: 'Sistemas que rodam no navegador, feitos para o seu fluxo.',
      },
      {
        key: 'mobileApps',
        title: 'Aplicativos móveis',
        description: 'Para quem trabalha fora do escritório, direto no celular.',
      },
      {
        key: 'aiAgents',
        title: 'Agentes de IA',
        description: 'Respondem, triam e executam tarefas sem alguém no meio.',
      },
      {
        key: 'automations',
        title: 'Automações e integrações',
        description: 'Fazem suas ferramentas conversarem entre si.',
      },
      {
        key: 'databases',
        title: 'Bancos de dados profissionais',
        description: 'Um lugar só para o dado, com histórico e dono.',
      },
      {
        key: 'reporting',
        title: 'Relatórios e painéis',
        description: 'O número do dia pronto, sem montar planilha.',
      },
      {
        key: 'accessControl',
        title: 'Contas e controle de acesso',
        description: 'Cada pessoa vê o que precisa, e só isso.',
      },
      {
        key: 'payments',
        title: 'Serviços de pagamento',
        description: 'Cobrança, assinatura e repasse dentro do sistema.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'Próximo passo',
    title: 'Conte onde a sua operação trava.',
    lead:
      'Vamos entender a sua operação e identificar onde tecnologia pode gerar resultado ' +
      'sem criar complexidade desnecessária.',
    cta: 'Falar com a HeloraDev',
    // Reassurance line under the button (response time, "no commitment", and
    // the like). Still pending from the site owner; while it is null the whole
    // line stays out of the DOM.
    reassurance: null,
  },

  footer: {
    quickLinks: [
      { id: 'services', label: 'Serviços' },
      { id: 'how-we-work', label: 'Como trabalhamos' },
      { id: 'technologies', label: 'O que construímos' },
    ],
    // A function because the year is computed at render, never hardcoded.
    copyright: (year) => `© ${year} HeloraDev. Todos os direitos reservados.`,
  },

  form: {
    title: 'Fale com a HeloraDev',
    descriptionStep1: 'Preencha o formulário e vamos responder em breve.',
    descriptionStep2: 'Conte um pouco mais sobre o que você precisa.',
    labels: {
      name: 'Nome',
      company: 'Empresa',
      email: 'Email',
      phone: 'Telefone',
      subject: 'Assunto',
      message: 'Mensagem',
    },
    dialCodePlaceholder: 'Código',
    phonePlaceholder: '11 91234-5678',
    // Which dial code the <select> starts on. The list of codes itself is
    // structure and lives in the component; only the starting choice is
    // local to the audience.
    defaultDialCode: '+55',
    back: 'Voltar',
    next: 'Próximo',
    submit: 'Enviar',
    submitting: 'Enviando...',
    success: { title: 'Mensagem enviada!', description: 'Vamos responder em breve.' },
    failure: { title: 'Erro', description: 'Algo deu errado. Tente novamente.' },
    // Data-use note under the submit button. Pending from the site owner; null
    // keeps the line out of the DOM.
    dataUseNote: null,
  },

  consent: {
    // Split at the link: the anchor has to be a real element in the JSX, so the
    // sentence cannot be one string.
    label:
      'Concordo com o tratamento dos meus dados e em ser contactado no e-mail ou telefone que informei.',
    linkText: 'Como tratamos seus dados',
    marketingLabel:
      'Quero receber novidades da HeloraDev por e-mail. Posso cancelar quando quiser.',
    error: 'Para enviar, você precisa concordar com o tratamento dos seus dados.',
  },
};

export default pt;

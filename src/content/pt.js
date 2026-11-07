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

  // Where the logo and the back link on the privacy page point.
  homePath: '/',

  // The other version, for the language switch. `lang` goes on the anchor so a
  // screen reader announces "English" in English rather than reading it with
  // Portuguese phonemes.
  // `privacyPath` is the OTHER language's data page, so the switch on that
  // page lands on the same text rather than bouncing to its home page.
  alternate: { label: 'English', href: '/en', lang: 'en', privacyPath: '/privacy' },

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
  // The data-processing page, as blocks rather than JSX. Each block is a
  // single-key object: `p` a paragraph, `ul` a list, `pending` an answer the
  // site owner still owes. A `{mail}` token inside a paragraph is replaced with
  // the contact link, so the copy stays plain text and the anchor stays real
  // markup.
  privacy: {
    title: 'Como tratamos seus dados',
    versionLabel: (date) => `Versão em vigor desde ${date}.`,
    backToHome: 'Voltar para o início',
    sections: [
      {
        title: 'Em resumo',
        blocks: [
          { p: 'Você preenche o formulário do site porque quer falar com a gente. O que chega aqui serve para três coisas:' },
          { ul: [
            'responder à sua mensagem;',
            'guardar o registro do seu interesse, para acompanhar a conversa;',
            'enviar novidades por e-mail — isso só para quem marcou a caixa opcional antes de enviar.',
          ] },
          { p: 'Fora disso, nada. Seus dados não são vendidos nem passados para que outra empresa use por conta própria.' },
        ],
      },
      {
        title: 'Quem responde por isso',
        blocks: [
          { p: 'A HeloraDev é gerida por MJ de Campos, residente em Liverpool, na Inglaterra, que decide o que acontece com as informações recebidas pelo site.' },
          { p: 'É também quem atende os pedidos sobre dados pessoais — não há outra pessoa encarregada disso. Escreva para {mail}, que é o canal para qualquer assunto desta página.' },
        ],
      },
      {
        title: 'O que o formulário recolhe',
        blocks: [
          { p: 'Os campos que você preenche:' },
          { ul: [
            'nome;',
            'empresa, se quiser informar;',
            'e-mail;',
            'telefone, se quiser informar;',
            'assunto e mensagem.',
          ] },
          { p: 'E o registro do próprio envio, gerado junto:' },
          { ul: [
            'data e hora em que você concordou;',
            'a versão do texto de consentimento que estava no ar;',
            'se a caixa opcional de e-mails foi marcada;',
            'o idioma da página de onde você escreveu.',
          ] },
          { p: 'Nenhum outro campo é aceito. O servidor descarta o que não estiver nessa lista, mesmo que chegue junto com o envio.' },
        ],
      },
      {
        title: 'Para onde vão',
        blocks: [
          { p: 'O que você escreve no formulário vai direto para o nosso CRM, onde o contato fica registrado e a conversa é acompanhada.' },
        ],
      },
      {
        title: 'Medição de visitas',
        blocks: [
          { p: 'O site conta visitas sem guardar nada no seu navegador — nenhum cookie, nenhum identificador, nada que permita reconhecer você numa próxima vez. Esta página é contada como qualquer outra.' },
          { p: 'Fica só o número somado: quantas pessoas abriram cada página, de que país e por qual link chegaram. Não dá para ligar nenhum desses números a uma pessoa.' },
          { p: 'Como não existe nada guardado no seu navegador, não há o que recusar nem caixa de aviso a aceitar.' },
        ],
      },
      {
        title: 'Por quanto tempo ficam guardados',
        blocks: [
          { p: 'Os registros ficam 365 dias, contados do último contato ou da última movimentação. Passado esse prazo sem nada acontecer, são apagados.' },
          { p: 'Quem se torna cliente sai dessa contagem, porque a relação comercial tem obrigações de guarda próprias.' },
        ],
      },
      {
        title: 'Proteção',
        blocks: [
          { p: 'As chaves da automação ficam só no servidor e nunca chegam ao navegador de quem visita o site. O retorno do formulário não revela nada sobre o que acontece depois.' },
          { p: 'Os registros ficam atrás de credenciais criptografadas, e não existe acesso de fora.' },
        ],
      },
      {
        title: 'Seus direitos',
        blocks: [
          { p: 'Basta um e-mail para:' },
          { ul: [
            'saber se existe algum registro seu;',
            'ver o que está guardado;',
            'corrigir o que estiver errado;',
            'pedir que tudo seja apagado;',
            'retirar a concordância que você deu ao enviar o formulário;',
            'sair da lista de e-mails, se tiver marcado a caixa opcional.',
          ] },
          { p: 'Mande o pedido para {mail}.' },
          { p: 'Todo pedido é respondido em até 14 dias úteis.' },
        ],
      },
      {
        title: 'Versões deste texto',
        blocks: [
          { p: 'Mudar uma palavra do consentimento cria uma versão nova, e é ela que fica anotada em cada envio a partir dali. A data no alto da página mostra qual está valendo agora.' },
        ],
      },
    ],
  },

};

export default pt;

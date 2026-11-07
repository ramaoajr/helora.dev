/**
 * British English copy — the version served at `/en`.
 *
 * Not a translation of `pt.js`. The Brazilian copy is written for a market
 * where WhatsApp carries half the operation and "PME" is the buyer's own word
 * for themselves; neither lands here. The structure, section order and item
 * keys match exactly, so the components need no branches — the argument
 * underneath is pitched at a different reader.
 *
 * Deliberate differences from the Portuguese, so a later editor does not
 * "correct" them back:
 *
 * - The hero leads on key-person risk rather than on spreadsheets alone. Work
 *   living in one person's head is the failure a UK operations manager has
 *   already been bitten by.
 * - The scattered-information item names email threads, chat and shared
 *   drives. WhatsApp is not where a British SME loses things.
 * - The About heading argues against being another subscription, because this
 *   buyer is usually already paying for tools that do not talk to each other.
 * - Technical consulting promises to say what NOT to build. In a sceptical
 *   market, turning work down is the claim that carries weight.
 * - Sector names follow UK usage: field service, professional services,
 *   warehousing, SMEs.
 *
 * Spelling is British throughout (organise, prioritise, behaviour). Nothing
 * here states a response time, a client name, a metric, a company number or a
 * credential, because none has been established.
 */

const en = {
  locale: 'en',
  htmlLang: 'en-GB',

  privacyPath: '/privacy',

  // Where the logo and the back link on the privacy page point.
  homePath: '/en',

  // `lang` on the anchor so a screen reader announces the Portuguese label
  // with Portuguese phonemes rather than reading it as English.
  // See the note in pt.js.
  alternate: { label: 'Português', href: '/', lang: 'pt-BR', privacyPath: '/privacidade' },

  a11y: {
    mainNav: 'Main navigation',
    toTop: 'Back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    footerNav: 'Footer links',
    closeDialog: 'Close',
    newTab: ' (opens in a new tab)',
    languageSwitch: 'View this site in Portuguese',
  },

  nav: {
    items: [
      { id: 'problems', label: 'Problems' },
      { id: 'services', label: 'Services' },
      { id: 'how-we-work', label: 'Process' },
      { id: 'who-its-for', label: "Who it's for" },
      { id: 'technologies', label: 'What we build' },
    ],
    cta: 'Talk to HeloraDev',
  },

  hero: {
    eyebrow: 'Operations consulting and software built to fit',
    title: "Too much of your operation lives in spreadsheets and people's heads.",
    lead:
      'HeloraDev maps how the work actually runs, automates what repeats and builds the ' +
      'internal systems your off-the-shelf tools were never going to cover.',
    primaryCta: 'Tell us about your operation',
    secondaryCta: 'See what we do',
    imageAlt:
      'Scattered spreadsheets, messages and documents being drawn together into one connected system',
  },

  problems: {
    eyebrow: 'Problems we fix',
    title: 'Operations seize up long before anyone calls it a problem.',
    lead:
      'When a process depends on spreadsheets, message threads and the person who remembers, ' +
      'the cost is paid every day — in time, in rework and in decisions made without the numbers.',
    items: [
      {
        key: 'spreadsheets',
        title: 'Spreadsheets running the business',
        description: 'Critical figures sit in files with no owner, no history and three versions in circulation.',
      },
      {
        key: 'scattered',
        title: 'Information in six places',
        description:
          'Email threads, chat messages, shared drives and somebody’s inbox each hold a different part of it.',
      },
      {
        key: 'rework',
        title: 'The same work, twice',
        description: 'People re-check, re-key and re-copy between the very tools meant to save them the trouble.',
      },
      {
        key: 'visibility',
        title: 'No view of the work',
        description: 'Deadlines, owners and bottlenecks surface only once they have become somebody’s emergency.',
      },
      {
        key: 'nonstandard',
        title: 'Everyone does it differently',
        description: 'With no agreed method, training drags, quality drifts and growth multiplies both.',
      },
      {
        key: 'lateReports',
        title: 'Reporting that arrives late',
        description: 'Month-end waits on somebody collecting, cleaning and stitching the numbers together by hand.',
      },
      {
        key: 'untraceable',
        title: 'Errors nobody can trace',
        description: 'A wrong record or a missed order passes through several pairs of hands before anyone notices.',
      },
      {
        key: 'unclearStatus',
        title: 'Nobody can say where it is',
        description: 'Customers and managers chase for status because no single place holds the answer.',
      },
      {
        key: 'growth',
        title: 'Growth the process cannot take',
        description: 'Volume climbs, while the work still rests on manual effort and the people who remember how.',
      },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'Systems, automation and a clear view of the work.',
    lead:
      'HeloraDev is the technical partner for businesses that need the operation sorted ' +
      'before it scales.',
    items: [
      {
        key: 'automation',
        title: 'Automation',
        description: "We take the repetitive work, and the copying between tools, off your team's hands.",
        examples: ['alerts and approvals', 'data kept in sync', 'reports that run themselves'],
      },
      {
        key: 'customSystems',
        title: 'Software built to fit',
        description: 'Internal applications for the processes no off-the-shelf tool was shaped around.',
        examples: ['operational portals', 'control dashboards', 'job and request tracking'],
      },
      {
        key: 'operations',
        title: 'Operational groundwork',
        description:
          'We map the process, cut what earns nothing and turn improvised routines into an agreed method.',
        examples: ['SOPs and checklists', 'owners and deadlines', 'operational measures'],
      },
      {
        key: 'consulting',
        title: 'Technical consulting',
        description: 'We help you decide what to automate, what to integrate and what to leave alone.',
        examples: ['stack review', 'solution architecture', 'implementation roadmap'],
      },
    ],
  },

  howWeWork: {
    eyebrow: 'How we work',
    title: 'Understand first. Build second.',
    lead:
      'The order keeps risk down, keeps generic solutions out and keeps the technology tied to ' +
      'what the operation has to deliver.',
    steps: [
      {
        title: 'Diagnosis',
        description:
          'We learn how the work runs today: the bottlenecks, the tools already in place and what each problem costs.',
      },
      {
        title: 'Plan',
        description:
          'We agree the target process, the priorities, the risks and the simplest technical route to reach it.',
      },
      {
        title: 'Build',
        description:
          'Automation, systems and integrations, in short cycles, checked against the real operation as we go.',
      },
      {
        title: 'Follow-through',
        description: 'We adjust what went live, measure what changed and keep improving it on real data.',
      },
    ],
  },

  about: {
    eyebrow: 'About HeloraDev',
    title: 'Not a web agency, and not another tool to add to the stack.',
    paragraphs: [
      'We work with businesses that have hit the limit of manual process, disconnected tools ' +
        'and decisions made without the numbers. The job is to understand how the work really ' +
        'runs, simplify it, and turn what currently survives on improvisation into something ' +
        'dependable.',
      'That might be an automation, an internal application, an integration between things you ' +
        'already pay for, or simply a clearer answer to who owns what. The point does not change: ' +
        'technology applied to operational control, with nothing added for its own sake.',
    ],
  },

  whoItsFor: {
    eyebrow: "Who it's for",
    title: 'Businesses with a real operation, a busy week and no room to do things twice.',
    lead: 'We do our best work where process, people and information have to move together every day.',
    items: [
      {
        key: 'logistics',
        title: 'Logistics',
        description: 'Deliveries, status, routes, exceptions and the handovers between teams.',
      },
      {
        key: 'warehouses',
        title: 'Warehousing',
        description: 'Goods in, picking, stock counts, despatch and the productivity behind them.',
      },
      {
        key: 'maintenance',
        title: 'Field service',
        description: 'Job sheets, SLAs, engineers on site, parts, call-outs and service history.',
      },
      {
        key: 'serviceProviders',
        title: 'Service businesses',
        description: 'Teams that need delivery, scheduling, invoicing and follow-up to run the same way every time.',
      },
      {
        key: 'offices',
        title: 'Professional services',
        description: 'Back-office teams with approvals, documents, recurring tasks and reporting.',
      },
      {
        key: 'scaling',
        title: 'Growing SMEs',
        description: 'Businesses that have outgrown the controls and informal habits that got them here.',
      },
    ],
  },

  technologies: {
    eyebrow: 'What we build',
    title: 'What stays working in your business.',
    lead: 'Eight areas. A project usually draws on three or four.',
    items: [
      {
        key: 'customSoftware',
        title: 'Web applications',
        description: 'Systems that run in the browser, shaped around your process.',
      },
      {
        key: 'mobileApps',
        title: 'Mobile apps',
        description: 'For the people doing the work away from a desk.',
      },
      {
        key: 'aiAgents',
        title: 'AI agents',
        description: 'They answer, triage and act without a person in the middle.',
      },
      {
        key: 'automations',
        title: 'Automation and integration',
        description: 'Your existing tools, finally talking to each other.',
      },
      {
        key: 'databases',
        title: 'Proper databases',
        description: 'One home for the data, with history and an owner.',
      },
      {
        key: 'reporting',
        title: 'Reporting and dashboards',
        description: "Today's numbers already there, with no spreadsheet to assemble.",
      },
      {
        key: 'accessControl',
        title: 'Accounts and permissions',
        description: 'Each person sees what they need, and nothing else.',
      },
      {
        key: 'payments',
        title: 'Payments',
        description: 'Billing, subscriptions and payouts inside the system.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'Next step',
    title: 'Tell us where your operation gets stuck.',
    lead:
      'We will work out where the operation loses time, and where technology earns its place ' +
      'without making the business harder to run.',
    cta: 'Talk to HeloraDev',
    reassurance: null,
  },

  footer: {
    quickLinks: [
      { id: 'services', label: 'Services' },
      { id: 'how-we-work', label: 'How we work' },
      { id: 'technologies', label: 'What we build' },
    ],
    copyright: (year) => `© ${year} HeloraDev. All rights reserved.`,
  },

  form: {
    title: 'Talk to HeloraDev',
    descriptionStep1: "Fill in the form and we'll get back to you.",
    descriptionStep2: 'Tell us a little more about what you need.',
    labels: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      subject: 'Subject',
      message: 'Message',
    },
    dialCodePlaceholder: 'Code',
    // No leading zero: the dial code in the <select> already precedes it.
    phonePlaceholder: '7400 123456',
    defaultDialCode: '+44',
    back: 'Back',
    next: 'Next',
    submit: 'Send',
    submitting: 'Sending...',
    success: { title: 'Message sent', description: "We'll get back to you." },
    failure: { title: 'Not sent', description: 'Something went wrong. Please try again.' },
    dataUseNote: null,
  },

  consent: {
    label:
      "I agree to my data being processed and to being contacted on the email address or phone number I've given.",
    linkText: 'How we handle your data',
    marketingLabel:
      'Send me occasional updates from HeloraDev by email. I can unsubscribe at any time.',
    error: 'Please agree to your data being processed before sending.',
  },
  // Same block shape as pt.js — see the note there.
  privacy: {
    title: 'How we handle your data',
    versionLabel: (date) => `In force since ${date}.`,
    backToHome: 'Back to the home page',
    sections: [
      {
        title: 'In short',
        blocks: [
          { p: 'You fill in the form because you want to talk to us. What reaches us does three things:' },
          { ul: [
            'answers your message;',
            'keeps a record of your interest, so the conversation can be picked up;',
            'sends email updates — only to people who ticked the optional box before sending.',
          ] },
          { p: 'Nothing beyond that. Your data is not sold, and not handed to another company to use for its own ends.' },
        ],
      },
      {
        title: 'Who answers for this',
        blocks: [
          { p: 'HeloraDev is run by MJ de Campos, resident in Liverpool, England, who decides what happens to the information the site receives.' },
          { p: 'The same person handles requests about personal data — nobody else is appointed to it. Write to {mail}, which is the channel for anything on this page.' },
        ],
      },
      {
        title: 'What the form collects',
        blocks: [
          { p: 'The fields you fill in:' },
          { ul: [
            'name;',
            'company, if you want to give it;',
            'email;',
            'phone, if you want to give it;',
            'subject and message.',
          ] },
          { p: 'And the record of the submission itself, created alongside it:' },
          { ul: [
            'the date and time you agreed;',
            'which version of the consent text was live;',
            'whether the optional email box was ticked;',
            'the language of the page you wrote from.',
          ] },
          { p: 'No other field is accepted. The server discards anything outside that list, even when it arrives with the submission.' },
        ],
      },
      {
        title: 'Where it goes',
        blocks: [
          { p: 'What you write in the form goes straight to our CRM, where the contact is recorded and the conversation is picked up.' },
        ],
      },
      {
        title: 'Measuring visits',
        blocks: [
          { p: 'The site counts visits without storing anything in your browser — no cookie, no identifier, nothing that would recognise you on a later visit. This page is counted like any other.' },
          { p: 'What is kept is the total: how many people opened each page, from which country, and which link brought them. None of those numbers can be traced back to a person.' },
          { p: 'Because nothing is stored in your browser, there is nothing to refuse and no banner to accept.' },
        ],
      },
      {
        title: 'How long it is kept',
        blocks: [
          { p: 'Records are kept for 365 days, counted from the last contact or the last movement. Once that passes with nothing happening, they are deleted.' },
          { p: 'Anyone who becomes a client falls outside that count, because a commercial relationship carries retention duties of its own.' },
        ],
      },
      {
        title: 'Protection',
        blocks: [
          { p: "The automation's keys stay on the server and never reach the browser of anyone visiting the site. The form's reply gives nothing away about what happens next." },
          { p: 'Records sit behind encrypted credentials, and there is no access from outside.' },
        ],
      },
      {
        title: 'Your rights',
        blocks: [
          { p: 'One email is enough to:' },
          { ul: [
            'find out whether any record of you exists;',
            'see what is held;',
            'correct anything wrong;',
            'ask for all of it to be deleted;',
            'withdraw the agreement you gave when sending the form;',
            'come off the email list, if you ticked the optional box.',
          ] },
          { p: 'Send the request to {mail}.' },
          { p: 'Every request is answered within 14 working days.' },
          // See the note in pt.js.
          { optout: true },
        ],
      },
      {
        title: 'Versions of this text',
        blocks: [
          { p: 'Changing a word of the consent creates a new version, and that is the one recorded against every submission from then on. The date at the top of the page shows which is in force.' },
        ],
      },
    ],
  },

  // See the note in pt.js.
  optout: {
    trigger: 'Come off the email list',
    title: 'Come off the email list',
    description:
      'Type the address you want removed. This does not delete the rest of your record — for that, write to dev4me@helora.dev.',
    emailLabel: 'Your email',
    submit: 'Remove me',
    submitting: 'Sending...',
    successTitle: 'Request received',
    successBody:
      "If that address is on the list, it comes off now and you'll get a confirmation by email. If it is not, there is nothing to do, and no email is sent.",
    errorBody:
      'We could not send your request just now. Try again, or write to dev4me@helora.dev.',
    close: 'Close',
  },

};

export default en;

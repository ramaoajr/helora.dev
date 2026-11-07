import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { CONSENT_VERSION } from '@/lib/consent';
import { cn } from '@/lib/utils';

// One column, narrow by design: this is a page to be read, not scanned.
const SHELL = 'mx-auto w-full max-w-[36rem] px-4 sm:px-6 lg:px-8';

/**
 * The date on screen is derived from `CONSENT_VERSION`, never typed by hand.
 * That constant is also what gets stamped on every consent record, so the
 * version a visitor reads here and the version recorded against their name
 * cannot drift apart.
 */
const [versionYear, versionMonth, versionDay] = CONSENT_VERSION.split('-');
const VERSION_DATE = `${versionDay}/${versionMonth}/${versionYear}`;

/**
 * A gap the site owner still has to fill. Rendered loud on purpose: an
 * unanswered item should be impossible to miss while reviewing the page, and
 * must never be guessed at in the meantime.
 */
const Pending = ({ children }) => (
  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-semibold text-primary">
    {`{{PENDENTE: ${children}}}`}
  </span>
);

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-h3 text-copy-strong">{title}</h2>
    {children}
  </section>
);

const List = ({ children }) => (
  <ul className="list-disc space-y-2 pl-5 marker:text-primary">{children}</ul>
);

const MailLink = () => (
  <a href="mailto:dev4me@helora.dev" className="text-copy-strong underline hover:text-primary">
    dev4me@helora.dev
  </a>
);

const PrivacyHeader = () => (
  <header className="border-b border-white/[0.08] bg-brand-blue">
    <div className={cn(SHELL, 'flex h-20 items-center')}>
      <a href="/">
        {/* 151x32 holds the asset's own 1600x339 ratio, so nothing stretches. */}
        <img
          src="/logo-header.png"
          alt="HeloraDev"
          width="151"
          height="32"
          decoding="async"
          className="h-8 w-auto shrink-0"
        />
      </a>
    </div>
  </header>
);

const PrivacyFooter = () => (
  <footer className="border-t border-white/[0.08] bg-brand-deep py-8">
    <div className={cn(SHELL, 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between')}>
      <a
        href="mailto:dev4me@helora.dev"
        className="inline-flex items-center gap-2 rounded py-3 text-body font-semibold text-copy-strong transition-colors duration-200 ease-out-soft hover:text-primary sm:py-2"
      >
        <Mail className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
        <span>dev4me@helora.dev</span>
      </a>
      <p className="text-micro text-copy-muted">
        © {new Date().getFullYear()} HeloraDev. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

const PrivacyPage = () => (
  <div className="min-h-screen bg-brand-blue text-body text-copy">
    <PrivacyHeader />

    <main>
      <div className={cn(SHELL, 'py-12 lg:py-16')}>
        <h1 className="text-h2-sm lg:text-h2 text-copy-strong">Como tratamos seus dados</h1>
        <p className="mt-3 text-micro text-copy-muted">Versão em vigor desde {VERSION_DATE}.</p>

        <div className="mt-10 space-y-10">
          <Section title="Em resumo">
            <p>
              Você preenche o formulário do site porque quer falar com a gente. O que chega aqui
              serve para três coisas:
            </p>
            <List>
              <li>responder à sua mensagem;</li>
              <li>guardar o registro do seu interesse, para acompanhar a conversa;</li>
              <li>
                enviar novidades por e-mail — isso só para quem marcou a caixa opcional antes de
                enviar.
              </li>
            </List>
            <p>
              Fora disso, nada. Seus dados não são vendidos nem passados para que outra empresa use
              por conta própria.
            </p>
          </Section>

          <Section title="Quem responde por isso">
            <p>
              A HeloraDev é gerida por MJ de Campos, residente em Liverpool, na Inglaterra, que
              decide o que acontece com as informações recebidas pelo site.
            </p>
            <p>
              É também quem atende os pedidos sobre dados pessoais — não há outra pessoa encarregada
              disso. Escreva para <MailLink />, que é o canal para qualquer assunto desta página.
            </p>
          </Section>

          <Section title="O que o formulário recolhe">
            <p>Os campos que você preenche:</p>
            <List>
              <li>nome;</li>
              <li>empresa, se quiser informar;</li>
              <li>e-mail;</li>
              <li>telefone, se quiser informar;</li>
              <li>assunto e mensagem.</li>
            </List>
            <p>E o registro do próprio envio, gerado junto:</p>
            <List>
              <li>data e hora em que você concordou;</li>
              <li>a versão do texto de consentimento que estava no ar;</li>
              <li>se a caixa opcional de e-mails foi marcada;</li>
              <li>o idioma da página de onde você escreveu.</li>
            </List>
            <p>
              Nenhum outro campo é aceito. O servidor descarta o que não estiver nessa lista, mesmo
              que chegue junto com o envio.
            </p>
          </Section>

          <Section title="Para onde vão">
            <p>
              O que você escreve no formulário vai direto para o nosso CRM, onde o contato fica
              registrado e a conversa é acompanhada.
            </p>
          </Section>

          <Section title="Medição de visitas">
            <p>
              Esta página não carrega nenhum script de medição: ninguém é contado por ler o texto
              aqui. As demais páginas do site usam o Google Analytics e o pixel da Meta para contar
              visitas e cliques.
            </p>
            <p>
              <Pending>texto sobre cookies, incluindo o que cada um guarda e como recusar a medição</Pending>
            </p>
          </Section>

          <Section title="Por quanto tempo ficam guardados">
            <p>
              Os registros ficam 365 dias, contados do último contato ou da última movimentação.
              Passado esse prazo sem nada acontecer, são apagados.
            </p>
            <p>
              Quem se torna cliente sai dessa contagem, porque a relação comercial tem obrigações
              de guarda próprias.
            </p>
          </Section>

          <Section title="Proteção">
            <p>
              As chaves da automação ficam só no servidor e nunca chegam ao navegador de quem
              visita o site. O retorno do formulário não revela nada sobre o que acontece depois.
            </p>
            <p>
              Os registros ficam atrás de credenciais criptografadas, e não existe acesso de fora.
            </p>
          </Section>

          <Section title="Seus direitos">
            <p>Basta um e-mail para:</p>
            <List>
              <li>saber se existe algum registro seu;</li>
              <li>ver o que está guardado;</li>
              <li>corrigir o que estiver errado;</li>
              <li>pedir que tudo seja apagado;</li>
              <li>retirar a concordância que você deu ao enviar o formulário;</li>
              <li>sair da lista de e-mails, se tiver marcado a caixa opcional.</li>
            </List>
            <p>
              Mande o pedido para <MailLink />.
            </p>
            <p>Todo pedido é respondido em até 14 dias úteis.</p>
          </Section>

          <Section title="Versões deste texto">
            <p>
              Mudar uma palavra do consentimento cria uma versão nova, e é ela que fica anotada em
              cada envio a partir dali. A data no alto da página mostra qual está valendo agora.
            </p>
          </Section>
        </div>

        <a
          href="/"
          className="mt-12 inline-flex items-center gap-2 rounded text-small text-copy transition-colors duration-200 ease-out-soft hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Voltar para o início</span>
        </a>
      </div>
    </main>

    <PrivacyFooter />
  </div>
);

export default PrivacyPage;

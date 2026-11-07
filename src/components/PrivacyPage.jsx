import React, { useState } from 'react';
import { ArrowLeft, Languages, Mail } from 'lucide-react';
import { CONSENT_VERSION } from '@/lib/consent';
import { useCopy } from '@/content/CopyContext';
import { Button } from '@/components/ui/button';
import OptOutDialog from '@/components/OptOutDialog';
import { cn } from '@/lib/utils';

// One column, narrow by design: this is a page to be read, not scanned.
const SHELL = 'mx-auto w-full max-w-[36rem] px-4 sm:px-6 lg:px-8';

/**
 * The date on screen is derived from `CONSENT_VERSION`, never typed by hand.
 * That constant is also what gets stamped on every consent record, so the
 * version a visitor reads here and the version recorded against their name
 * cannot drift apart.
 *
 * DD/MM/YYYY reads the same in Brazil and in the UK, so one derivation serves
 * both language versions and neither can show a date the other would misread.
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

const MailLink = () => (
  <a href="mailto:dev4me@helora.dev" className="text-copy-strong underline hover:text-primary">
    dev4me@helora.dev
  </a>
);

/**
 * Replaces the `{mail}` token in a copy string with the real anchor.
 *
 * The alternative was to put markup in the copy modules and render it with
 * `dangerouslySetInnerHTML`, which would turn every translated sentence into
 * an injection surface for the sake of one link.
 */
const withMail = (text) =>
  text
    .split('{mail}')
    .flatMap((part, index) => (index === 0 ? [part] : [<MailLink key={index} />, part]));

const Block = ({ block, optout, onOptout }) => {
  // The one block that does something rather than says something.
  if (block.optout) {
    return (
      <Button variant="outline" onClick={onOptout} className="w-full sm:w-auto">
        {optout.trigger}
      </Button>
    );
  }

  if (block.ul) {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-primary">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.pending) {
    return (
      <p>
        <Pending>{block.pending}</Pending>
      </p>
    );
  }

  return <p>{withMail(block.p)}</p>;
};

const PrivacyHeader = ({ homePath, alternate, languageLabel, privacyPath }) => (
  <header className="border-b border-white/[0.08] bg-brand-blue">
    <div className={cn(SHELL, 'flex h-20 items-center justify-between')}>
      <a href={homePath}>
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
      {/* Points at the OTHER language's privacy page, not at its home page: a
          reader who switches here wants this text, in the other language. */}
      <a
        href={privacyPath}
        hrefLang={alternate.lang}
        lang={alternate.lang}
        aria-label={languageLabel}
        className="inline-flex items-center gap-2 rounded py-2 text-small text-copy transition-colors duration-200 ease-out-soft hover:text-copy-strong"
      >
        <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{alternate.label}</span>
      </a>
    </div>
  </header>
);

const PrivacyFooter = ({ copyright }) => (
  <footer className="border-t border-white/[0.08] bg-brand-deep py-8">
    <div className={cn(SHELL, 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between')}>
      <a
        href="mailto:dev4me@helora.dev"
        className="inline-flex items-center gap-2 rounded py-3 text-body font-semibold text-copy-strong transition-colors duration-200 ease-out-soft hover:text-primary sm:py-2"
      >
        <Mail className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
        <span>dev4me@helora.dev</span>
      </a>
      <p className="text-micro text-copy-muted">{copyright(new Date().getFullYear())}</p>
    </div>
  </footer>
);

const PrivacyPage = () => {
  const { privacy, footer, homePath, alternate, a11y, optout } = useCopy();
  const [optOutOpen, setOptOutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-blue text-body text-copy">
      <PrivacyHeader
        homePath={homePath}
        alternate={alternate}
        languageLabel={a11y.languageSwitch}
        privacyPath={alternate.privacyPath}
      />

      <main>
        <div className={cn(SHELL, 'py-12 lg:py-16')}>
          <h1 className="text-h2-sm lg:text-h2 text-copy-strong">{privacy.title}</h1>
          <p className="mt-3 text-micro text-copy-muted">{privacy.versionLabel(VERSION_DATE)}</p>

          <div className="mt-10 space-y-10">
            {privacy.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-h3 text-copy-strong">{section.title}</h2>
                {section.blocks.map((block, index) => (
                  // Index as key: the blocks of a section are a fixed, ordered
                  // list that is never reordered, filtered or appended to.
                  <Block
                    key={index}
                    block={block}
                    optout={optout}
                    onOptout={() => setOptOutOpen(true)}
                  />
                ))}
              </section>
            ))}
          </div>

          <a
            href={homePath}
            className="mt-12 inline-flex items-center gap-2 rounded text-small text-copy transition-colors duration-200 ease-out-soft hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{privacy.backToHome}</span>
          </a>
        </div>
      </main>

      <PrivacyFooter copyright={footer.copyright} />

      <OptOutDialog open={optOutOpen} onOpenChange={setOptOutOpen} />
    </div>
  );
};

export default PrivacyPage;

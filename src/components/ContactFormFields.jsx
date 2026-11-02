import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// One surface for every control so the native <select> stops reading as a
// different design system from the shadcn inputs.
const FIELD_SURFACE =
  'bg-white/[0.05] border-white/[0.10] text-copy-strong placeholder:text-copy-muted focus:border-primary';
const FIELD_HEIGHT = 'h-11';
// The native <select> has no shadcn wrapper, so it repeats the structural half
// of `Input`'s class list to land on the same box and the same focus ring.
const SELECT_BASE =
  'flex w-[110px] shrink-0 items-center rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/**
 * Label + control + error message. The asterisk is decorative — `aria-required`
 * on the control carries the meaning. The error text is the browser's own
 * `validationMessage`, so no copy is authored here.
 */
const Field = ({ id, label, required = false, error, children }) => (
  <div className="space-y-2">
    <Label id={`${id}-label`} htmlFor={id} className="text-small text-copy">
      {label}
      {required && (
        <span className="text-primary" aria-hidden="true"> *</span>
      )}
    </Label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-micro text-destructive">
        {error}
      </p>
    )}
  </div>
);

/**
 * The two field groups of the contact form. On mobile they alternate as steps
 * 1 and 2; from `sm` up both are visible at once and `step` stops mattering.
 */
const ContactFormFields = ({
  step,
  formData,
  errors,
  countryCode,
  countryCodes,
  onChange,
  onCountryChange,
  nameInputRef,
}) => {
  const fieldProps = (id) => ({
    id,
    name: id,
    value: formData[id],
    onChange,
    'aria-invalid': errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
  });

  return (
    <>
      {/* Step 1 Fields */}
      <div className={cn('space-y-5', step === 2 && 'hidden sm:block')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="name" label="Nome" required error={errors.name}>
            <Input
              {...fieldProps('name')}
              ref={nameInputRef}
              required
              aria-required="true"
              className={cn(FIELD_HEIGHT, FIELD_SURFACE)}
            />
          </Field>
          <Field id="company" label="Empresa" required error={errors.company}>
            <Input
              {...fieldProps('company')}
              required
              aria-required="true"
              className={cn(FIELD_HEIGHT, FIELD_SURFACE)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="email" label="Email" required error={errors.email}>
            <Input
              {...fieldProps('email')}
              type="email"
              required
              aria-required="true"
              className={cn(FIELD_HEIGHT, FIELD_SURFACE)}
            />
          </Field>
          <Field id="phone" label="Telefone">
            <div className="flex gap-2">
              {/* Named by the "Telefone" label rather than a new string — the
                  copy for this screen is frozen. */}
              <select
                value={countryCode}
                onChange={onCountryChange}
                aria-labelledby="phone-label"
                className={cn(SELECT_BASE, FIELD_HEIGHT, FIELD_SURFACE)}
              >
                <option value="" disabled>Código</option>
                {countryCodes.map(c => (<option key={c.code} value={c.dial}>{c.flag} {c.dial}</option>))}
              </select>
              <Input
                {...fieldProps('phone')}
                type="tel"
                placeholder="1234567890"
                className={cn('flex-1', FIELD_HEIGHT, FIELD_SURFACE)}
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Step 2 Fields */}
      <div className={cn('space-y-5', step === 1 && 'hidden sm:block')}>
        <Field id="subject" label="Assunto">
          <Input {...fieldProps('subject')} className={cn(FIELD_HEIGHT, FIELD_SURFACE)} />
        </Field>
        <Field id="message" label="Mensagem">
          <Textarea {...fieldProps('message')} className={cn('min-h-[120px]', FIELD_SURFACE)} />
        </Field>
      </div>
    </>
  );
};

export default ContactFormFields;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/context/ContactFormContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const COUNTRY_CODES = [
  { code: 'GB', dial: '+44', flag: '🇬🇧' }, { code: 'US', dial: '+1', flag: '🇺🇸' },
  { code: 'AU', dial: '+61', flag: '🇦🇺' }, { code: 'CA', dial: '+1', flag: '🇨🇦' },
  { code: 'DE', dial: '+49', flag: '🇩🇪' }, { code: 'FR', dial: '+33', flag: '🇫🇷' },
  { code: 'IN', dial: '+91', flag: '🇮🇳' }, { code: 'ES', dial: '+34', flag: '🇪🇸' },
  { code: 'IT', dial: '+39', flag: '🇮🇹' }, { code: 'BR', dial: '+55', flag: '🇧🇷' },
  { code: 'JP', dial: '+81', flag: '🇯🇵' }, { code: 'CN', dial: '+86', flag: '🇨🇳' },
];

const ContactFormModal = () => {
  const { isOpen, closeContactForm } = useContactForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState('+44');
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });

  useEffect(() => {
    fetch('https://ipapi.co/json/').then(res => res.json()).then(data => {
      const matched = COUNTRY_CODES.find(c => c.code === data.country_code);
      if (matched) setCountryCode(matched.dial);
    }).catch(() => console.warn('Could not detect country.'));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleCountryChange = (e) => setCountryCode(e.target.value);

  const handleNext = () => {
    const nameInput = document.getElementById('name');
    const companyInput = document.getElementById('company');
    const emailInput = document.getElementById('email');

    if (!nameInput?.checkValidity() || !companyInput?.checkValidity() || !emailInput?.checkValidity()) {
      if (!nameInput?.checkValidity()) nameInput?.reportValidity();
      else if (!companyInput?.checkValidity()) companyInput?.reportValidity();
      else emailInput?.reportValidity();
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Manual validation to handle "noValidate" on form
    const nameInput = document.getElementById('name');
    const companyInput = document.getElementById('company');
    const emailInput = document.getElementById('email');

    if (nameInput && companyInput && emailInput) {
      const isNameInvalid = !nameInput.checkValidity();
      const isCompanyInvalid = !companyInput.checkValidity();
      const isEmailInvalid = !emailInput.checkValidity();

      if (isNameInvalid || isCompanyInvalid || isEmailInvalid) {
        if (isNameInvalid) nameInput.reportValidity();
        else if (isCompanyInvalid) companyInput.reportValidity();
        else isEmailInvalid && emailInput.reportValidity();
        
        return;
      }
    }

    setLoading(true);
    const payload = { ...formData, phone: formData.phone ? `${countryCode} ${formData.phone}` : '' };
    try {
      const response = await fetch('https://hook.eu1.make.com/4sakszkabyj9dilwxytsj33tjwo0qo56', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-make-apikey': '8V_vaCSDHc6fnLR'
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      
      // Track 'Lead' event on successful submission
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }

      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(closeContactForm, 1000);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative grid w-full max-w-2xl gap-4 border border-border bg-background p-6 shadow-2xl rounded-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" onClick={closeContactForm} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></Button>
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-sm text-gray-400">
                {step === 1 ? "Fill out the form and we'll get back to you shortly." : "Tell us a bit more about what you need."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 pt-4" noValidate>
              {/* Step 1 Fields */}
              <div className={cn("space-y-4", step === 2 && "hidden sm:block")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name" className="text-gray-200">Name <span className="text-primary">*</span></Label><Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary" /></div>
                  <div className="space-y-2"><Label htmlFor="company" className="text-gray-200">Company <span className="text-primary">*</span></Label><Input id="company" name="company" required value={formData.company} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="email" className="text-gray-200">Email <span className="text-primary">*</span></Label><Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary" /></div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-200">Phone</Label>
                    <div className="flex gap-2">
                      <select value={countryCode} onChange={handleCountryChange} className="w-[110px] flex h-12 items-center justify-between rounded-md border border-border bg-[#052441] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-ring"><option value="" disabled>Code</option>{COUNTRY_CODES.map(c => (<option key={c.code} value={c.dial}>{c.flag} {c.dial}</option>))}</select>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary flex-1 h-12" placeholder="1234567890" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 Fields */}
              <div className={cn("space-y-4", step === 1 && "hidden sm:block")}>
                <div className="space-y-2"><Label htmlFor="subject" className="text-gray-200">Subject</Label><Input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary" /></div>
                <div className="space-y-2"><Label htmlFor="message" className="text-gray-200">Message</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} className="bg-[#052441] border-border text-white focus:border-primary min-h-[100px]" /></div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-4 sm:mt-0 sm:block">
                {/* Back Button (Mobile Only) */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className={cn("flex-1 sm:hidden", step === 1 && "hidden")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                {/* Next Button (Mobile Only) */}
                <Button
                  type="button"
                  onClick={handleNext}
                  className={cn("w-full sm:hidden", step === 2 && "hidden")}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "font-bold",
                    step === 1 ? "hidden sm:block w-full mt-4" : "flex-[2] sm:w-full sm:mt-4"
                  )}
                >
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : 'Submit'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import 'react-day-picker/dist/style.css';
import { CheckCircle2, ChevronRight, MapPin, Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export function Booking() {
  const searchParams = useSearchParams();
  const addressParam = searchParams.get('address');
  const nameParam = searchParams.get('name');
  const emailParam = searchParams.get('email');
  const phoneParam = searchParams.get('phone');
  const serviceParam = searchParams.get('service');
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [service, setService] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  // Form fields state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [isAddressLocked, setIsAddressLocked] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (addressParam || nameParam || emailParam || phoneParam) {
      setFormData(prev => ({ 
        ...prev, 
        address: addressParam || prev.address,
        name: nameParam || prev.name,
        email: emailParam || prev.email,
        phone: phoneParam || prev.phone,
      }));
    }
    
    if (addressParam) {
      setIsAddressLocked(true);
    }
    
    if (serviceParam === 'kontrola' || addressParam) {
      setService('Bezplatná kontrola oken');
      setStep(3); // Skip to step 3 (Date & Time)
    }
  }, [addressParam, nameParam, emailParam, phoneParam, serviceParam]);
  
  const availableTimes = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'];

  const serviceOptions: Record<string, { types: { id: string, label: string, img: string }[], colors?: { id: string, label: string, hex: string }[] }> = {
    'Garážová vrata': {
      types: [
        { id: 'sekcni', label: 'Sekční vrata', img: 'https://web2.itnahodinu.cz/QAPI/WhatsApp-Image-2025-11-07-at-15.08.16.webp' },
        { id: 'rolovaci', label: 'Rolovací vrata', img: 'https://web2.itnahodinu.cz/QAPI/IMG_6817.webp' },
        { id: 'dvoukridla', label: 'Dvoukřídlá vrata', img: 'https://web2.itnahodinu.cz/QAPI/po-2.webp' },
      ],
      colors: [
        { id: 'antracit', label: 'Antracit', hex: '#333333' },
        { id: 'bila', label: 'Bílá', hex: '#FFFFFF' },
        { id: 'zlaty-dub', label: 'Zlatý dub', hex: '#8B5A2B' },
        { id: 'orech', label: 'Ořech', hex: '#5C4033' },
        { id: 'mahagon', label: 'Mahagon', hex: '#4C0000' },
      ]
    },
    'Servis oken': {
      types: [
        { id: 'plastova', label: 'Plastová okna', img: 'https://web2.itnahodinu.cz/QAPI/IMG_8265.webp' },
        { id: 'drevena', label: 'Dřevěná okna', img: 'https://web2.itnahodinu.cz/QAPI/IMG_8266-1536x864.webp' },
        { id: 'hlinikova', label: 'Hliníková okna', img: 'https://web2.itnahodinu.cz/QAPI/po-2.webp' },
      ]
    },
    'Stínicí technika': {
      types: [
        { id: 'zaluzie', label: 'Venkovní žaluzie', img: 'https://web2.itnahodinu.cz/QAPI/4.webp' },
        { id: 'rolety', label: 'Venkovní rolety', img: 'https://web2.itnahodinu.cz/QAPI/10.webp' },
        { id: 'markyzy', label: 'Markýzy', img: 'https://web2.itnahodinu.cz/QAPI/IMG_6817.webp' },
      ],
      colors: [
        { id: 'stribrna', label: 'Stříbrná', hex: '#C0C0C0' },
        { id: 'antracit', label: 'Antracit', hex: '#333333' },
        { id: 'bila', label: 'Bílá', hex: '#FFFFFF' },
      ]
    },
    'Průmyslová vrata': {
      types: [
        { id: 'sekcni-prum', label: 'Sekční průmyslová', img: 'https://web2.itnahodinu.cz/QAPI/prumyslova-vrata-qapi.webp' },
        { id: 'rychlobezna', label: 'Rychloběžná', img: 'https://web2.itnahodinu.cz/QAPI/vrata-qapi-uvod-original.webp' },
      ],
      colors: [
        { id: 'modra', label: 'Modrá', hex: '#003366' },
        { id: 'cervena', label: 'Červená', hex: '#CC0000' },
        { id: 'stribrna', label: 'Stříbrná', hex: '#C0C0C0' },
        { id: 'antracit', label: 'Antracit', hex: '#333333' },
      ]
    },
    'Bezplatná kontrola oken': {
      types: [
        { id: 'kontrola', label: 'Komplexní diagnostika', img: 'https://web2.itnahodinu.cz/QAPI/IMG_8265.webp' }
      ]
    }
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setError('Vyplňte prosím všechny povinné údaje (Jméno, Telefon, E-mail, Adresa).');
      return;
    }
    
    if (!agreedToTerms) {
      setError('Pro odeslání poptávky musíte souhlasit se zpracováním osobních údajů.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          type: selectedType,
          color: selectedColor,
          date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          time: selectedTime,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se odeslat poptávku.');
      }

      // Seznam Conversion Hit
      if (typeof window !== 'undefined') {
        const consent = localStorage.getItem('cookie-consent');
        let seznamConsent = 0;
        if (consent) {
          try {
            const parsed = JSON.parse(consent);
            if (parsed.ad_storage === 'granted') seznamConsent = 1;
          } catch (e) {}
        }
        
        (window as any).sznIVA = (window as any).sznIVA || {};
        (window as any).sznIVA.IS = (window as any).sznIVA.IS || {};
        if (typeof (window as any).sznIVA.IS.updateIdentities === 'function') {
          (window as any).sznIVA.IS.updateIdentities({ eid: null });
        }
        
        if ((window as any).rc && (window as any).rc.conversionHit) {
          (window as any).rc.conversionHit({
            id: 100256578,
            value: null,
            consent: seznamConsent
          });
        }
      }

      setStep(5); // Success step
    } catch (err) {
      setError('Něco se pokazilo. Zkuste to prosím znovu nebo nám zavolejte.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rezervace" className="py-16 md:py-20 lg:py-24 2xl:py-32 bg-background relative overflow-hidden [perspective:1000px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto [transform-style:preserve-3d]">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[var(--text-h2)] font-bold text-white leading-[1.1] tracking-tighter drop-shadow-lg"
            >
              Získejte cenu do <span className="text-primary italic font-light">2 minut</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mt-6 text-[var(--text-base)] text-white/60 font-light max-w-2xl mx-auto leading-relaxed"
            >
              Odpovězte na pár rychlých otázek a my vám připravíme nezávaznou kalkulaci na míru.
            </motion.p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 md:mb-12 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/5 -z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            {[
              { num: 1, label: 'Služba' },
              { num: 2, label: 'Detaily' },
              { num: 3, label: 'Pref. termín' },
              { num: 4, label: 'Údaje' },
              { num: 5, label: 'Hotovo' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2 md:gap-3 bg-muted px-1 sm:px-2 md:px-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-lg text-xs sm:text-sm md:text-base ${
                  step >= s.num ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-110' : 'bg-background border border-white/10 text-white/40'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" /> : s.num}
                </div>
                <span className={`text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest font-bold hidden sm:block ${
                  step >= s.num ? 'text-primary drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]' : 'text-white/60'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: -15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-muted/30 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
          >
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-6" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-display font-bold text-white mb-8">S čím přesně potřebujete pomoci?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Bezplatná kontrola oken', 'Garážová vrata', 'Servis oken', 'Stínicí technika'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setService(item)}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                        service === item 
                          ? 'border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                          : 'border-white/5 hover:border-primary/30 text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="font-bold text-lg">{item}</div>
                      <div className="text-sm opacity-60 mt-2 font-light">Profesionální řešení na míru</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 md:mt-12 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!service}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                  >
                    Pokračovat <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-8" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-display font-bold text-white mb-8">Upřesněte detaily</h3>
                
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-white">Vyberte typ</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {serviceOptions[service]?.types.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-500 transform hover:-translate-y-1 h-32 group ${
                          selectedType === type.id 
                            ? 'border-primary shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                            : 'border-white/5 hover:border-primary/30'
                        }`}
                      >
                        <Image src={type.img} alt={type.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        <div className="absolute bottom-4 left-4 font-bold text-lg text-white z-10">{type.label}</div>
                        {selectedType === type.id && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                            <CheckCircle2 className="w-4 h-4 text-background" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {serviceOptions[service]?.colors && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white">Vyberte barvu</h4>
                    <div className="flex flex-wrap gap-4">
                      {serviceOptions[service].colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                            selectedColor === color.id ? 'scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div 
                            className={`w-12 h-12 rounded-full border-2 shadow-lg ${selectedColor === color.id ? 'border-primary' : 'border-white/20'}`}
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className={`text-xs ${selectedColor === color.id ? 'text-primary font-bold' : 'text-white/60'}`}>
                            {color.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 md:mt-12 flex flex-col-reverse sm:flex-row justify-between gap-4">
                  <button
                    onClick={handlePrev}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/30 hover:bg-white/5 transition-colors text-center"
                  >
                    Zpět
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedType || (serviceOptions[service]?.colors && !selectedColor)}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                  >
                    Pokračovat <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-8" style={{ transform: "translateZ(20px)" }}>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Vyberte si preferovaný termín</h3>
                  <p className="text-white/60 text-sm mb-8">Tento termín je orientační. Budeme se snažit mu co nejvíce přiblížit a přesný čas vám potvrdíme telefonicky.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="flex justify-center bg-muted/30 p-4 md:p-6 rounded-2xl border border-white/5 shadow-inner overflow-x-auto">
                    <style>{`
                      .rdp { --rdp-cell-size: 35px; --rdp-accent-color: var(--color-primary); --rdp-background-color: var(--color-background); margin: 0; }
                      @media (min-width: 768px) { .rdp { --rdp-cell-size: 40px; } }
                      .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: var(--color-primary); color: var(--color-background); font-weight: bold; box-shadow: 0 0 15px rgba(212,175,55,0.5); }
                      .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: rgba(255,255,255,0.1); }
                      .rdp-day_today { font-weight: bold; color: var(--color-primary); }
                    `}</style>
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={cs}
                      disabled={{ before: new Date() }}
                      className="text-white"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Dostupné časy
                    </h4>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-4">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 px-4 rounded-xl border text-center transition-all duration-300 transform hover:-translate-y-1 ${
                              selectedTime === time
                                ? 'border-primary bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : 'border-white/5 hover:border-primary/50 text-white hover:bg-white/5'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-white/40 font-light border border-dashed border-white/10 rounded-2xl p-6 text-center bg-muted/10">
                        Nejprve prosím vyberte datum v kalendáři
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 md:mt-12 flex flex-col-reverse sm:flex-row justify-between gap-4">
                  <button
                    onClick={handlePrev}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/30 hover:bg-white/5 transition-colors text-center"
                  >
                    Zpět
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                  >
                    Pokračovat <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: User Details */}
            {step === 4 && (
              <div className="space-y-8" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-display font-bold text-white mb-8">Kam se máme ozvat?</h3>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 flex items-center gap-2 uppercase tracking-widest">
                      <User className="w-4 h-4 text-primary" /> Jméno a příjmení *
                    </label>
                    <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/20 shadow-inner" placeholder="Jan Novák" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 flex items-center gap-2 uppercase tracking-widest">
                      <Phone className="w-4 h-4 text-primary" /> Telefon *
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/20 shadow-inner" placeholder="+420 123 456 789" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 flex items-center gap-2 uppercase tracking-widest">
                      <Mail className="w-4 h-4 text-primary" /> E-mail *
                    </label>
                    <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/20 shadow-inner" placeholder="jan@novak.cz" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 flex items-center gap-2 uppercase tracking-widest">
                      <MapPin className="w-4 h-4 text-primary" /> Adresa realizace *
                    </label>
                    <input 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      type="text" 
                      className={`w-full bg-background/50 border ${isAddressLocked ? 'border-primary/50 text-white/80' : 'border-white/5 text-white'} rounded-xl px-4 py-4 focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/20 shadow-inner`} 
                      placeholder="Ulice, Město, PSČ" 
                      required 
                      readOnly={isAddressLocked}
                    />
                    {isAddressLocked && (
                      <p className="text-xs text-primary/80 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> Adresa ověřena z předchozího kroku
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-white/60 flex items-center gap-2 uppercase tracking-widest">
                      <MessageSquare className="w-4 h-4 text-primary" /> Poznámka (volitelné)
                    </label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all resize-none placeholder:text-white/20 shadow-inner" placeholder="Specifikujte vaše požadavky..." />
                  </div>
                  
                  <div className="md:col-span-2 flex items-start gap-3 mt-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 border border-white/20 rounded bg-background/50 checked:bg-primary checked:border-primary focus:ring-primary focus:ring-offset-background transition-colors cursor-pointer"
                      />
                    </div>
                    <label htmlFor="terms" className="text-sm text-white/60 font-light cursor-pointer">
                      Souhlasím se <a href="/ochrana-osobnich-udaju" target="_blank" className="text-primary hover:underline">zpracováním osobních údajů</a> a beru na vědomí <a href="/obchodni-podminky" target="_blank" className="text-primary hover:underline">obchodní podmínky</a>.
                    </label>
                  </div>
                </div>

                <div className="mt-8 md:mt-12 flex flex-col-reverse sm:flex-row justify-between gap-6 items-center">
                  <button
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/30 hover:bg-white/5 transition-colors text-center disabled:opacity-50"
                  >
                    Zpět
                  </button>
                  <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.address || !agreedToTerms}
                      className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground font-bold text-base md:text-lg uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                    >
                      {isSubmitting ? 'Odesílám...' : '[ REZERVOVAT PREFEROVANÝ TERMÍN ZDARMA ]'} <CheckCircle2 className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm font-light mt-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span><strong>100% ZDARMA.</strong> Žádné skryté poplatky. Výjezd technika vás k ničemu nezavazuje.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="text-center py-12 space-y-6" style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                  className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/50 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold text-white drop-shadow-lg">Rezervace úspěšná</h3>
                <p className="text-white/60 font-light max-w-md mx-auto leading-relaxed">
                  Děkujeme za vaši rezervaci. Na zadaný e-mail jsme vám zaslali potvrzení. 
                  Náš technik se s vámi brzy spojí.
                </p>
                <div className="pt-8">
                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedDate(undefined);
                      setSelectedTime(null);
                      setService('');
                      setSelectedType('');
                      setSelectedColor('');
                    }}
                    className="px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/30 hover:bg-white/5 transition-colors"
                  >
                    Nová rezervace
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, Copy, Mail, Phone } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeader } from './SectionHeader';
import { AmbientGlow } from './AmbientGlow';

const EMAIL = profileData.email;
const SUBJECT = 'Hello Keerthi';

/**
 * A bare mailto: link does nothing when the visitor has no default mail app (common on Windows,
 * and for anyone who uses Gmail/Outlook in the browser), so offer the webmail composers too.
 */
const composeOptions = [
  {
    label: 'Gmail',
    hint: 'Opens in a new tab',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}`,
    external: true
  },
  {
    label: 'Outlook',
    hint: 'Opens in a new tab',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(EMAIL)}&subject=${encodeURIComponent(SUBJECT)}`,
    external: true
  },
  {
    label: 'Default mail app',
    hint: 'Apple Mail, Outlook desktop…',
    href: `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`,
    external: false
  }
];

const linkPill =
  'pressable glass-chip inline-flex items-center gap-2 min-h-[40px] px-4 rounded-full text-primary/80 hover:text-primary hover:bg-primary/10';

/**
 * Copies text, falling back to a hidden textarea + execCommand where the async Clipboard API
 * is blocked (embedded webviews, plain-http LAN previews). Resolves to whether it worked.
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    previouslyFocused?.focus();
    return ok;
  }
};

/** "Write an email" button that opens a small menu of ways to compose. */
const EmailChooser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="email-options"
        data-cursor="pointer"
        className="pressable group inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-xs sm:text-sm font-medium bg-primary text-black hover:bg-[#e8e5d3]"
      >
        Write an email
        <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ease-out-strong ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Positioning lives on a plain wrapper: Framer's transform would override translate-x centering */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-64">
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="email-options"
            // Grows out of the button above it, not from its own center
            style={{ transformOrigin: 'top center' }}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="glass-blur rounded-2xl p-1.5 text-left"
          >
            {composeOptions.map((option) => (
              <li key={option.label}>
                <a
                  href={option.href}
                  {...(option.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => setIsOpen(false)}
                  className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-primary/10 transition-colors duration-150"
                >
                  <span className="w-8 h-8 rounded-lg glass-chip flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm text-primary">{option.label}</span>
                    <span className="block text-[11px] text-primary/60 truncate">{option.hint}</span>
                  </span>
                  {option.external && (
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-primary/60 transition-transform duration-200 ease-out-strong group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    // If both copy paths are blocked, the address is still visible and selectable above
    if (await copyToClipboard(EMAIL)) setCopied(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 md:py-40 px-4 md:px-6">
      <AmbientGlow tone="amber" intensity={0.2} className="left-1/2 -translate-x-1/2 top-1/3 w-[60rem] max-w-[160vw] h-[40rem]" />
      <div className="relative max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="05 / Contact"
          lines={[{ text: 'Let’s start a conversation.' }]}
          align="center"
          size="lg"
          className="mb-12 sm:mb-16"
        >
          <p className="text-gray-400 text-sm mt-3">Whether for collaboration, engineering roles, or technical questions.</p>
        </SectionHeader>

        <div className="glass-shell mb-10">
          {/* No overflow-hidden here: the email menu needs to be able to extend past the card */}
          <div className="glass-core px-6 py-12 sm:p-16 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none"
              style={{ background: 'radial-gradient(60% 70% at 50% 0%, rgba(214,140,72,0.14), transparent 70%)' }}
            />
            <div className="relative">
              <p className="text-primary/60 text-[10px] sm:text-xs tracking-[0.22em] uppercase mb-4">Email</p>
              <p className="text-primary text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight break-all select-all">
                {EMAIL}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-5">
                Based in {profileData.location} · <span className="font-serif italic text-primary/90 text-[1.1em]">available</span>{' '}
                for opportunities
              </p>

              <div className="flex flex-wrap items-start justify-center gap-3 mt-10">
                <EmailChooser />
                <button
                  type="button"
                  onClick={copyEmail}
                  className="pressable glass-chip inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-primary text-xs sm:text-sm font-medium hover:bg-primary/10"
                  data-cursor="pointer"
                >
                  {/* Blur-crossfade between states so the swap reads as one morph rather than two labels trading places */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={copied ? 'copied' : 'copy'}
                      className="inline-flex items-center gap-3"
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {copied ? 'Copied' : 'Copy address'}
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                      </span>
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
              <p className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm">
          <a href={`tel:${profileData.phone.replace(/\s/g, '')}`} className={linkPill}>
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="tabular-nums">{profileData.phone}</span>
          </a>
          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className={linkPill}>
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a href={profileData.github} target="_blank" rel="noopener noreferrer" className={linkPill}>
            GitHub <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <p className="text-center text-primary/60 text-xs mt-16">
          © {new Date().getFullYear()} {profileData.name} · Designed &amp; built with React
        </p>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeader } from './SectionHeader';
import { AmbientGlow } from './AmbientGlow';
import { ActionLink } from './ActionLink';

const mailtoHref = `mailto:${profileData.email}?subject=${encodeURIComponent('Hello Keerthi')}`;

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

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    // If both copy paths are blocked, the address is still visible and selectable above
    if (await copyToClipboard(profileData.email)) setCopied(true);
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
          <div className="glass-core px-6 py-12 sm:p-16 text-center overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(60% 70% at 50% 0%, rgba(214,140,72,0.14), transparent 70%)' }}
            />
            <div className="relative">
              <p className="text-primary/60 text-[10px] sm:text-xs tracking-[0.22em] uppercase mb-4">Email</p>
              <a
                href={mailtoHref}
                className="inline-block text-primary text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight break-all hover:opacity-80 transition-opacity"
              >
                {profileData.email}
              </a>
              <p className="text-gray-400 text-xs sm:text-sm mt-5">
                Based in {profileData.location} · <span className="font-serif italic text-primary/90 text-[1.1em]">available</span>{' '}
                for opportunities
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                <ActionLink href={mailtoHref} icon={Mail}>
                  Write an email
                </ActionLink>
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

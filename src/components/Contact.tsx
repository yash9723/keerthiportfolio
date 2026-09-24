import React, { useState } from 'react';
import { profileData } from '../data/profile';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-black py-24 sm:py-32 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.05]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-3">
            05 / Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#dedbc8]">
            Let&rsquo;s start a conversation.
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Whether for collaboration, engineering roles, or technical questions.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-[#101010] border border-[#dedbc8]/[0.08] rounded-3xl p-6 sm:p-12 mb-16 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-4">🚀</span>
              <h3 className="text-lg font-bold text-[#dedbc8] mb-2">Message Dispatched</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed mb-6">
                Thank you! Your payload has successfully bypassed all hurdles. Keerthi will get back to you soon.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: '', email: '', subject: '', message: '' });
                  setSubmitted(false);
                }}
                className="px-5 py-2 bg-[#dedbc8]/10 border border-[#dedbc8]/20 text-[#dedbc8] rounded-xl text-xs hover:bg-[#dedbc8]/20 transition-all cursor-pointer"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#dedbc8]/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border border-[#dedbc8]/15 rounded-xl px-4 py-3 text-sm text-[#dedbc8] focus:outline-none focus:border-[#dedbc8]/50 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#dedbc8]/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-[#dedbc8]/15 rounded-xl px-4 py-3 text-sm text-[#dedbc8] focus:outline-none focus:border-[#dedbc8]/50 transition-colors"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#dedbc8]/50 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black/50 border border-[#dedbc8]/15 rounded-xl px-4 py-3 text-sm text-[#dedbc8] focus:outline-none focus:border-[#dedbc8]/50 transition-colors"
                  placeholder="Inquiry / Opportunity"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#dedbc8]/50 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/50 border border-[#dedbc8]/15 rounded-xl px-4 py-3 text-sm text-[#dedbc8] focus:outline-none focus:border-[#dedbc8]/50 transition-colors resize-none"
                  placeholder="How can we build together?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#dedbc8] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all cursor-pointer shadow-lg"
              >
                Send Message &rarr;
              </button>
            </form>
          )}
        </div>

        {/* Direct Connect Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#dedbc8]/60">
          <a
            href={`mailto:${profileData.email}`}
            className="hover:text-[#dedbc8] transition-colors flex items-center gap-2"
          >
            ✉ {profileData.email}
          </a>
          <span className="w-1 h-1 rounded-full bg-[#dedbc8]/20" />
          <a
            href={`tel:${profileData.phone}`}
            className="hover:text-[#dedbc8] transition-colors flex items-center gap-2"
          >
            📞 {profileData.phone}
          </a>
          <span className="w-1 h-1 rounded-full bg-[#dedbc8]/20" />
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dedbc8] transition-colors"
          >
            LinkedIn ↗
          </a>
          <span className="w-1 h-1 rounded-full bg-[#dedbc8]/20" />
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dedbc8] transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
};

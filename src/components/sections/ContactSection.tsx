'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageSquare, Github, Linkedin, Twitter, Download, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/devkunal2812', handle: '@devkunal2812', color: '#f0f4ff' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/devkunal', handle: '/in/devkunal', color: '#0a66c2' },
    { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/devkunal', handle: '@devkunal', color: '#1da1f2' },
    { icon: Mail, label: 'Email', href: 'mailto:devkunal2812@gmail.com', handle: 'devkunal2812@gmail.com', color: '#00d4ff' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="section-label justify-center mb-4">
            <span className="before:hidden">Get In Touch</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Let&apos;s{' '}
            <span className="gradient-text">Build Together</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Whether you have a project idea, a job opportunity, or just want to connect —
            I&apos;d love to hear from you. I typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6 neon-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
                <span className="font-mono text-xs text-accent-emerald">Available for opportunities</span>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Open for Work</h3>
              <p className="text-sm text-text-secondary">
                Looking for full-time roles, internships, and freelance projects.
                Full Stack Developer specializing in React/Next.js + AI.
              </p>
              <a
                href="/resume.pdf"
                download
                className="mt-4 flex items-center gap-2 text-sm text-accent-cyan hover:text-white transition-colors"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-text-primary mb-4">Connect With Me</h3>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, href, handle, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all group"
                  >
                    <Icon size={16} style={{ color }} className="transition-transform group-hover:scale-110" />
                    <div>
                      <div className="text-xs text-text-muted">{label}</div>
                      <div className="text-sm text-text-primary group-hover:text-accent-cyan transition-colors">{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="glass-card rounded-2xl p-5">
              <div className="space-y-2 text-xs font-mono text-text-muted">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="text-accent-cyan">{'< 24 hours'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timezone</span>
                  <span className="text-accent-cyan">IST (GMT+5:30)</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="text-accent-emerald">Immediate</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-accent-cyan" />
                <h3 className="font-display font-semibold text-text-primary">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-text-muted">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Recruiter Name"
                      className="w-full bg-surface-02 border border-border hover:border-border-hover focus:border-accent-cyan/50 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-text-muted">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="hello@company.com"
                      className="w-full bg-surface-02 border border-border hover:border-border-hover focus:border-accent-cyan/50 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-text-muted">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Job Opportunity / Project Collaboration"
                    className="w-full bg-surface-02 border border-border hover:border-border-hover focus:border-accent-cyan/50 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-text-muted">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-surface-02 border border-border hover:border-border-hover focus:border-accent-cyan/50 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : status === 'sent' ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle size={16} />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === 'sent' && (
                  <p className="text-center text-sm text-accent-emerald">
                    Thanks! I&apos;ll get back to you within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Download, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

const fd = (d: number) => ({ duration: 0.7, delay: d, ease: [0.16,1,0.3,1] as [number,number,number,number] });

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setStatus('error'); }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputCls = "w-full bg-cream border border-black/10 hover:border-black/20 focus:border-orange-DEFAULT rounded-xl px-4 py-3 text-sm text-ink placeholder:text-stone outline-none transition-all duration-200";

  return (
    <section id="contact" ref={ref} className="relative py-28 bg-cream overflow-hidden">
      {/* Animated blobs */}
      <motion.div
        animate={{ rotate: [0, 12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-64 h-64 bg-orange-pale blob opacity-60 pointer-events-none -translate-x-1/3 -translate-y-1/3"
      />
      <motion.div
        animate={{ rotate: [0, -10, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-0 w-52 h-52 bg-orange-pale blob opacity-50 pointer-events-none translate-x-1/4 translate-y-1/4"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-16">
          <div className="section-label mb-3">Get In Touch</div>
          <h2 className="display-heading text-4xl md:text-6xl">
            Let&apos;s Build<br /><span className="text-orange-DEFAULT">Together</span>
          </h2>
          <p className="text-stone mt-4 max-w-lg">
            Whether you have a project, job opportunity, or just want to connect — I typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={fd(0.2)} className="lg:col-span-2 space-y-4">
            {/* Availability */}
            <motion.div whileHover={{ y: -3 }} className="card p-6 border-l-4 border-l-green-500 transition-all hover:shadow-card-hover">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[11px] text-green-700">Open for opportunities</span>
              </div>
              <h3 className="font-heading font-semibold text-ink mb-1.5">Available Now</h3>
              <p className="text-sm text-stone">Looking for full-time roles, internships, and freelance projects in Full Stack / AI.</p>
              <a href="/resume.pdf" download className="inline-flex items-center gap-1.5 mt-4 text-sm text-orange-DEFAULT hover:underline font-medium">
                <Download size={13} /> Download Resume
              </a>
            </motion.div>

            {/* Socials */}
            <div className="card p-6">
              <h3 className="font-heading font-semibold text-sm text-ink mb-4">Find Me Online</h3>
              <div className="space-y-2">
                {[
                  { Icon: Github, label: 'GitHub', handle: '@devkunal2812', href: 'https://github.com/devkunal2812' },
                  { Icon: Linkedin, label: 'LinkedIn', handle: '/in/devkunal', href: 'https://linkedin.com/in/devkunal' },
                  { Icon: Twitter, label: 'Twitter / X', handle: '@devkunal', href: 'https://twitter.com/devkunal' },
                  { Icon: Mail, label: 'Email', handle: 'devkunal2812@gmail.com', href: 'mailto:devkunal2812@gmail.com' },
                ].map(({ Icon, label, handle, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-cream transition-colors group">
                    <Icon size={15} className="text-stone group-hover:text-orange-DEFAULT transition-colors" />
                    <div>
                      <div className="text-[10px] font-mono text-stone">{label}</div>
                      <div className="text-sm text-ink group-hover:text-orange-DEFAULT transition-colors">{handle}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="card p-5">
              {[
                { k: 'Response time', v: '< 24 hours' },
                { k: 'Timezone', v: 'IST (GMT+5:30)' },
                { k: 'Preferred contact', v: 'Email / LinkedIn' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between items-center text-xs py-2 border-b border-black/5 last:border-0">
                  <span className="font-mono text-stone">{k}</span>
                  <span className="font-medium text-ink">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={fd(0.3)} className="lg:col-span-3">
            <div className="card p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={17} className="text-orange-DEFAULT" />
                <h3 className="font-heading font-semibold text-ink">Send a Message</h3>
              </div>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-stone block mb-1.5">Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="John Doe" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-stone block mb-1.5">Email</label>
                    <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="hello@company.com" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-stone block mb-1.5">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={onChange} required placeholder="Job Opportunity / Project Collaboration" className={inputCls} />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-stone block mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={5}
                    placeholder="Tell me about your project or opportunity..." className={`${inputCls} resize-none`} />
                </div>
                <motion.button type="submit" disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full justify-center disabled:opacity-60">
                  {status === 'sending' ? (<><div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />Sending...</>)
                  : status === 'sent' ? (<><CheckCircle size={15} />Message Sent!</>)
                  : status === 'error' ? (<><AlertCircle size={15} />Try Again</>)
                  : (<><Send size={15} />Send Message</>)}
                </motion.button>
                {status === 'sent' && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-600">
                    Thanks! I&apos;ll get back to you within 24 hours.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

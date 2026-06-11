'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowDown, Download } from 'lucide-react';

const roles = ['Full Stack Developer', 'React & Next.js Expert', 'AI Integration Engineer', 'Open Source Contributor'];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const str = roles[current];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === str) { t = setTimeout(() => setDeleting(true), 2200); }
    else if (deleting && text === '') { setDeleting(false); setCurrent((p) => (p + 1) % roles.length); }
    else { t = setTimeout(() => setText(deleting ? str.slice(0, text.length - 1) : str.slice(0, text.length + 1)), deleting ? 35 : 75); }
    return () => clearTimeout(t);
  }, [text, deleting, current]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden dot-grid">

      {/* Floating 3D blobs — orange, warm, reference-matching */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large orange blob top-right */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -right-16 w-72 h-72 bg-orange-DEFAULT blob opacity-90" />
        {/* Small orange ball */}
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-32 right-64 w-10 h-10 rounded-full bg-orange-DEFAULT" />
        {/* Cream/stone bottom-left blob */}
        <motion.div animate={{ y: [0, 16, 0], rotate: [0, -6, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-muted blob opacity-60" />
        {/* Small stone ball */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-48 left-64 w-8 h-8 rounded-full bg-stone-light opacity-70" />
        {/* Squiggle-like ring */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 right-24 w-20 h-20 rounded-full border-4 border-orange-DEFAULT opacity-30" />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-40 w-12 h-12 rounded-full border-[3px] border-orange-muted opacity-40" />
      </div>

      {/* Fade overlay for dot grid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Status */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 bg-white border border-black/8 rounded-full shadow-card">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[11px] text-stone">Available for opportunities</span>
          </motion.div>

          {/* Main heading — big, editorial */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <h1 className="display-heading text-6xl md:text-8xl lg:text-9xl mb-4">
              KUNAL<br />
              <span className="text-orange-DEFAULT">BUILDS.</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs text-stone">›</span>
            <span className="font-heading text-lg md:text-xl text-stone font-medium min-w-[300px]">
              {text}<span className="text-orange-DEFAULT animate-cursor-blink">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="text-base md:text-lg text-stone leading-relaxed max-w-xl mb-8">
            I craft <span className="text-ink font-semibold">intelligent digital experiences</span> using React, Next.js, Node.js, and AI —
            turning complex problems into clean, scalable solutions.
          </motion.p>

          {/* Tech pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-2 mb-10">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AI/ML'].map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-3 mb-12">
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
              View Projects →
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
              Let's Talk
            </button>
            <a href="/resume.pdf" download className="btn-outline">
              <Download size={14} /> Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/devkunal2812', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/devkunal', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com/devkunal', label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 bg-white border border-black/8 rounded-lg flex items-center justify-center text-stone hover:text-orange-DEFAULT hover:border-orange-DEFAULT/30 transition-all shadow-card">
                <Icon size={15} />
              </a>
            ))}
            <div className="w-px h-5 bg-black/10" />
            <span className="font-mono text-xs text-stone">@devkunal2812</span>
          </motion.div>
        </div>

        {/* Floating stats — top right on desktop */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4">
          {[
            { val: '15+', label: 'Projects' },
            { val: '5+', label: 'Hackathons' },
            { val: '2+', label: 'Yrs Exp' },
          ].map(({ val, label }) => (
            <motion.div key={label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="card px-5 py-4 text-center">
              <div className="font-heading font-bold text-2xl text-orange-DEFAULT">{val}</div>
              <div className="font-mono text-[10px] text-stone mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-stone hover:text-orange-DEFAULT transition-colors">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}

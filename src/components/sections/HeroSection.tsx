'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowDown, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), { ssr: false });

const roles = ['Full Stack Developer', 'React & Next.js Expert', 'AI Integration Engineer', 'Open Source Contributor'];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const blobX = useTransform(springX, [-400, 400], [-20, 20]);
  const blobY = useTransform(springY, [-400, 400], [-20, 20]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  // Typewriter
  useEffect(() => {
    const str = roles[current];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === str) { t = setTimeout(() => setDeleting(true), 2200); }
    else if (deleting && text === '') { setDeleting(false); setCurrent((p) => (p + 1) % roles.length); }
    else { t = setTimeout(() => setText(deleting ? str.slice(0, text.length - 1) : str.slice(0, text.length + 1)), deleting ? 35 : 75); }
    return () => clearTimeout(t);
  }, [text, deleting, current]);

  return (
    <section ref={sectionRef} id="hero" onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden dot-grid">

      {/* Parallax blob decorations */}
      <motion.div style={{ x: blobX, y: blobY }}
        className="absolute -top-16 -right-16 w-80 h-80 bg-orange-DEFAULT blob opacity-80 pointer-events-none" />
      <motion.div style={{ x: useTransform(springX, [-400,400], [15,-15]), y: useTransform(springY, [-400,400], [15,-15]) }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-muted blob opacity-50 pointer-events-none" />
      <motion.div style={{ x: useTransform(springX, [-400,400], [-10,10]) }}
        className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-orange-DEFAULT opacity-60 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left — Text */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-black/8 rounded-full shadow-card">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[11px] text-stone">Available for opportunities</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="display-heading text-6xl md:text-7xl lg:text-8xl">
              KUNAL<br /><span className="text-orange-DEFAULT">BUILDS.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="flex items-center gap-2">
              <span className="font-mono text-xs text-stone">›</span>
              <span className="font-heading text-lg md:text-xl text-stone font-medium min-w-[280px]">
                {text}<span className="text-orange-DEFAULT animate-cursor-blink">|</span>
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="text-base text-stone leading-relaxed max-w-lg">
              I craft <span className="text-ink font-semibold">intelligent digital experiences</span> using
              React, Next.js, Node.js and AI — turning complex problems into clean, scalable solutions.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AI/ML'].map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary">View Projects →</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline">Let&apos;s Talk</button>
              <a href="/resume.pdf" download className="btn-outline"><Download size={14} /> Resume</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex items-center gap-3">
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

          {/* Right — 3D Canvas */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16,1,0.3,1] }}
            className="relative h-[460px] lg:h-[560px]">
            <HeroCanvas />

            {/* Floating stat cards over canvas */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="absolute top-8 -left-4 card px-5 py-4 text-center shadow-card-hover">
              <div className="font-heading font-extrabold text-2xl text-orange-DEFAULT">15+</div>
              <div className="font-mono text-[10px] text-stone mt-0.5">Projects</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
              className="absolute bottom-20 -right-4 card px-5 py-4 text-center shadow-card-hover">
              <div className="font-heading font-extrabold text-2xl text-orange-DEFAULT">5+</div>
              <div className="font-mono text-[10px] text-stone mt-0.5">Hackathons</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
              className="absolute bottom-40 -left-6 card px-5 py-4 text-center shadow-card-hover">
              <div className="font-heading font-extrabold text-2xl text-orange-DEFAULT">2+</div>
              <div className="font-mono text-[10px] text-stone mt-0.5">Yrs Exp</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-stone hover:text-orange-DEFAULT transition-colors">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}

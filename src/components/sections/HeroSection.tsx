'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Code2, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

const roles = [
  'Full Stack Developer',
  'React & Next.js Expert',
  'AI Integration Specialist',
  'Node.js Engineer',
  'Open Source Contributor',
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  // Typewriter effect
  useEffect(() => {
    const text = roles[currentRole];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? text.slice(0, displayText.length - 1)
          : text.slice(0, displayText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void z-10 pointer-events-none" />

      {/* Grid fade */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-void/40 to-void z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent-cyan/20"
            >
              <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span className="font-mono text-xs text-text-secondary">
                Available for opportunities
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-sm text-accent-cyan tracking-widest uppercase">
                  &gt; Hello, World! I&apos;m
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
              >
                <span className="block text-text-primary">Kunal</span>
                <span className="block gradient-text">Builds.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-xl md:text-2xl font-display text-text-secondary"
              >
                <span className="text-accent-cyan">&lt;</span>
                <span className="min-w-[280px]">
                  {displayText}
                  <span className="text-accent-cyan animate-cursor-blink">|</span>
                </span>
                <span className="text-accent-cyan">/&gt;</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              Building{' '}
              <span className="text-accent-cyan font-medium">intelligent digital experiences</span>{' '}
              with React, Next.js, Node.js, and AI. Turning complex problems into elegant solutions
              that scale.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AI/ML'].map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group"
              >
                <Code2 size={16} />
                View Projects
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber"
              >
                <Sparkles size={14} />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/devkunal2812', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/devkunal', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/devkunal', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, color: '#00d4ff' }}
                  className="p-2 text-text-muted hover:text-accent-cyan transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
              <div className="w-px h-5 bg-border" />
              <span className="font-mono text-xs text-text-muted">@devkunal2812</span>
            </motion.div>
          </motion.div>

          {/* Right — 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <HeroScene />

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute top-8 -left-4 glass-card rounded-xl p-4 border border-accent-cyan/20"
            >
              <div className="font-display font-bold text-2xl text-accent-cyan">15+</div>
              <div className="font-mono text-xs text-text-muted mt-1">Projects Built</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-16 -right-4 glass-card rounded-xl p-4 border border-accent-violet/20"
            >
              <div className="font-display font-bold text-2xl text-accent-violet">5+</div>
              <div className="font-mono text-xs text-text-muted mt-1">Hackathons</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="absolute bottom-40 -left-8 glass-card rounded-xl p-4 border border-accent-emerald/20"
            >
              <div className="font-display font-bold text-2xl text-accent-emerald">2+</div>
              <div className="font-mono text-xs text-text-muted mt-1">Years Exp.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}

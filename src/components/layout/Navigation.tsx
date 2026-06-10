'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = navItems.map((item) => item.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 glass-card border-b border-white/5'
            : 'py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-lg opacity-80" />
              <div className="absolute inset-[1px] bg-void rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm gradient-text">K</span>
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-text-primary leading-none">Kunal</div>
              <div className="font-mono text-[10px] text-accent-cyan leading-none mt-0.5">Full Stack Dev</div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  'relative px-4 py-2 font-sans text-sm transition-all duration-300 rounded-lg',
                  activeSection === item.href.slice(1)
                    ? 'text-accent-cyan'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-accent-cyan/10 rounded-lg border border-accent-cyan/20"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-cyan border border-accent-cyan/30 rounded-lg hover:border-accent-cyan/60 hover:bg-accent-cyan/5 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </motion.a>
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-sm py-2 px-5"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 right-0 z-40 glass-card border-b border-white/5 py-6"
          >
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-3 px-4 text-sm font-medium text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm text-accent-cyan border border-accent-cyan/30 rounded-lg"
                >
                  <Download size={14} />
                  Resume
                </a>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-primary text-sm py-2 px-5 flex-1 justify-center"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

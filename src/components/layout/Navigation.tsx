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
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((i) => i.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled ? 'py-3 bg-cream/90 backdrop-blur-md border-b border-black/6' : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center group-hover:bg-orange-DEFAULT transition-colors duration-300">
              <span className="font-heading font-bold text-sm text-cream">K</span>
            </div>
            <span className="font-heading font-bold text-ink text-sm tracking-tight">kunalbuilds</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  activeSection === item.href.slice(1)
                    ? 'text-orange-DEFAULT bg-orange-pale'
                    : 'text-stone hover:text-ink hover:bg-black/4'
                )}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <a href="/resume.pdf" download
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-stone hover:text-ink border border-black/10 hover:border-black/20 rounded-lg transition-all">
              <Download size={13} /> Resume
            </a>
            <button onClick={() => scrollTo('#contact')} className="btn-primary py-2 px-5 text-sm">
              Hire Me →
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-stone hover:text-ink">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-black/6 py-4">
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button key={item.href}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-2.5 px-3 text-sm font-medium text-stone hover:text-orange-DEFAULT hover:bg-orange-pale rounded-lg transition-all">
                  {item.label}
                </motion.button>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-black/6">
                <a href="/resume.pdf" download className="btn-outline text-sm py-2 px-4">Resume</a>
                <button onClick={() => scrollTo('#contact')} className="btn-primary text-sm py-2 flex-1 justify-center">Hire Me</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

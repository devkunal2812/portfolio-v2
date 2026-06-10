'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  Navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com/devkunal2812' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/devkunal' },
    { label: 'Twitter / X', href: 'https://twitter.com/devkunal' },
    { label: 'Email Me', href: 'mailto:devkunal2812@gmail.com' },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 bg-surface/50">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-lg opacity-80" />
                <div className="absolute inset-[1px] bg-void rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-sm gradient-text">K</span>
                </div>
              </div>
              <div>
                <div className="font-display font-bold text-sm text-text-primary">Kunal</div>
                <div className="font-mono text-[10px] text-accent-cyan">Full Stack Developer</div>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Building intelligent digital experiences with React, Next.js, Node.js, and AI.
              Available for internships, full-time roles, and freelance projects.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/devkunal2812' },
                { icon: Linkedin, href: 'https://linkedin.com/in/devkunal' },
                { icon: Twitter, href: 'https://twitter.com/devkunal' },
                { icon: Mail, href: 'mailto:devkunal2812@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        if (href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            Built with
            <Heart size={11} className="text-red-500 fill-red-500" />
            using Next.js, Three.js & Framer Motion
          </p>
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Kunal. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

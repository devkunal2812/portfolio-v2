'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-orange-DEFAULT rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-white">K</span>
              </div>
              <div>
                <div className="font-heading font-bold text-sm">kunalbuilds</div>
                <div className="font-mono text-[10px] text-orange-DEFAULT">Full Stack Developer</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Building intelligent digital experiences with React, Next.js, Node.js, and AI.
            </p>
            <div className="flex items-center gap-2">
              {[
                { Icon: Github, href: 'https://github.com/devkunal2812' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/devkunal' },
                { Icon: Twitter, href: 'https://twitter.com/devkunal' },
                { Icon: Mail, href: 'mailto:devkunal2812@gmail.com' },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-DEFAULT flex items-center justify-center text-white/50 hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'].map((l) => (
                <li key={l}>
                  <button onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-white/50 hover:text-orange-DEFAULT transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">Let&apos;s Work</h4>
            <p className="text-sm text-white/50 mb-5 leading-relaxed">Open for internships, full-time roles, and freelance projects.</p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-DEFAULT hover:bg-orange-light text-white rounded-lg text-sm font-medium transition-colors">
              Get In Touch →
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-white/8">
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            Built with <Heart size={11} className="text-orange-DEFAULT fill-orange-DEFAULT" /> using Next.js & Framer Motion
          </p>
          <p className="font-mono text-xs text-white/30">© {new Date().getFullYear()} Kunal. All rights reserved.</p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-DEFAULT flex items-center justify-center text-white/40 hover:text-white transition-all">
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

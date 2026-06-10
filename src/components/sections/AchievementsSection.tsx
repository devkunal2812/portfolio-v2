'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Code2, Star, Users, Zap } from 'lucide-react';

const achievements = [
  {
    category: 'Hackathons',
    icon: Trophy,
    color: '#f59e0b',
    items: [
      {
        title: 'Smart India Hackathon 2023',
        subtitle: 'College Winner → State Round',
        description: 'Built AI-powered attendance system. Led 5-person team to college-level victory.',
        badge: '🏆 Winner',
      },
      {
        title: 'HackFest 2024',
        subtitle: 'Top 10 Finalists',
        description: 'Real-time collaborative tool with WebRTC. Competed against 200+ teams.',
        badge: '🥉 Top 10',
      },
      {
        title: 'Code for Good 2023',
        subtitle: 'Runner Up',
        description: 'Built a social impact platform connecting NGOs with volunteers.',
        badge: '🥈 Runner Up',
      },
      {
        title: 'Internal Hackathon',
        subtitle: '1st Place',
        description: 'E-learning platform with AI tutor capabilities for college students.',
        badge: '🥇 1st Place',
      },
    ],
  },
  {
    category: 'Certifications',
    icon: Award,
    color: '#00d4ff',
    items: [
      {
        title: 'Meta Frontend Developer',
        subtitle: 'Meta / Coursera',
        description: 'Professional certification covering React, JavaScript, and UX design.',
        badge: '✅ Verified',
      },
      {
        title: 'MongoDB Developer Path',
        subtitle: 'MongoDB University',
        description: 'Comprehensive MongoDB certification covering aggregations, indexing, and Atlas.',
        badge: '✅ Certified',
      },
      {
        title: 'AWS Cloud Practitioner',
        subtitle: 'Amazon Web Services',
        description: 'Foundational AWS certification covering cloud concepts and core services.',
        badge: '✅ Certified',
      },
    ],
  },
  {
    category: 'Open Source',
    icon: Code2,
    color: '#10b981',
    items: [
      {
        title: '10+ Merged PRs',
        subtitle: 'Multiple Repositories',
        description: 'Bug fixes, features, and documentation contributions to popular open-source projects.',
        badge: '📦 Contributor',
      },
      {
        title: 'GitHub Stars',
        subtitle: '100+ across projects',
        description: 'Personal projects and tools that developers find useful and bookmark.',
        badge: '⭐ 100+ Stars',
      },
      {
        title: 'Hacktoberfest 2023',
        subtitle: 'Completed',
        description: 'Completed Hacktoberfest challenge with 4+ quality contributions.',
        badge: '🎃 Completed',
      },
    ],
  },
  {
    category: 'Community',
    icon: Users,
    color: '#7c3aed',
    items: [
      {
        title: 'Tech Club Lead',
        subtitle: 'College Developer Community',
        description: 'Led and organized tech workshops, hackathons, and coding competitions for 200+ students.',
        badge: '👑 Lead',
      },
      {
        title: 'Workshop Speaker',
        subtitle: 'React & Next.js',
        description: 'Conducted multiple workshops on React best practices and modern web development.',
        badge: '🎤 Speaker',
      },
    ],
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-label mb-4">Achievements</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Milestones &{' '}
            <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl">
            A track record of competitive wins, certifications, and community impact.
          </p>
        </motion.div>

        {/* Grid of categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                >
                  <cat.icon size={18} style={{ color: cat.color }} />
                </div>
                <h3 className="font-display font-bold text-text-primary">{cat.category}</h3>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + ci * 0.1 + ii * 0.07 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-medium text-sm text-text-primary">{item.title}</span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
                          style={{ color: cat.color, background: `${cat.color}10`, border: `1px solid ${cat.color}25` }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-xs text-accent-cyan mb-1">{item.subtitle}</div>
                      <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 glass-card rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5+', label: 'Hackathons Participated', icon: Trophy },
              { value: '3', label: 'Certifications Earned', icon: Award },
              { value: '10+', label: 'Open Source Contributions', icon: Code2 },
              { value: '200+', label: 'Students Mentored', icon: Users },
            ].map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="space-y-2"
              >
                <Icon size={20} className="mx-auto text-accent-cyan opacity-60" />
                <div className="font-display font-bold text-3xl gradient-text-cyan">{value}</div>
                <div className="font-mono text-xs text-text-muted">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

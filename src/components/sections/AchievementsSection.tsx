'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Code2, Users } from 'lucide-react';

const groups = [
  { cat: 'Hackathons', Icon: Trophy, items: [
    { title: 'Smart India Hackathon 2023', sub: 'College Winner → State Round', badge: '🏆 Winner', desc: 'Led 5-person team to build AI attendance system in 24 hours.' },
    { title: 'HackFest 2024', sub: 'Top 10 Finalists', badge: '🥉 Top 10', desc: 'Real-time collaborative tool with WebRTC. 200+ competing teams.' },
    { title: 'Code for Good 2023', sub: 'Runner Up', badge: '🥈 Runner Up', desc: 'Social impact platform connecting NGOs with volunteers.' },
    { title: 'Internal Hackathon', sub: '1st Place', badge: '🥇 1st Place', desc: 'AI-powered e-learning platform for college students.' },
  ]},
  { cat: 'Certifications', Icon: Award, items: [
    { title: 'Meta Frontend Developer', sub: 'Meta / Coursera', badge: '✅ Verified', desc: 'Professional cert covering React, JS, and UX design.' },
    { title: 'MongoDB Developer Path', sub: 'MongoDB University', badge: '✅ Certified', desc: 'Aggregations, indexing, Atlas — comprehensive MongoDB cert.' },
    { title: 'AWS Cloud Practitioner', sub: 'Amazon Web Services', badge: '✅ Certified', desc: 'Foundational AWS certification covering core cloud services.' },
  ]},
  { cat: 'Open Source', Icon: Code2, items: [
    { title: '10+ Merged PRs', sub: 'Multiple Repos', badge: '📦 Contributor', desc: 'Bug fixes, features, and docs across popular open-source projects.' },
    { title: '100+ GitHub Stars', sub: 'Personal Projects', badge: '⭐ 100+ Stars', desc: 'Developer tools and templates that people actually use.' },
    { title: 'Hacktoberfest 2023', sub: 'Completed', badge: '🎃 Done', desc: '4+ quality contributions completing the Hacktoberfest challenge.' },
  ]},
  { cat: 'Community', Icon: Users, items: [
    { title: 'Tech Club Lead', sub: 'College Dev Community', badge: '👑 Lead', desc: 'Organized workshops, hackathons, and competitions for 200+ students.' },
    { title: 'Workshop Speaker', sub: 'React & Next.js', badge: '🎤 Speaker', desc: 'Conducted workshops on React best practices and modern web dev.' },
  ]},
];

const summaryStats = [
  { val: '5+', label: 'Hackathons', Icon: Trophy },
  { val: '3', label: 'Certifications', Icon: Award },
  { val: '10+', label: 'Open Source PRs', Icon: Code2 },
  { val: '200+', label: 'Students Mentored', Icon: Users },
];

const fd = (d: number) => ({ duration: 0.7, delay: d, ease: [0.16,1,0.3,1] as [number,number,number,number] });

export default function AchievementsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" ref={ref} className="relative py-28 bg-white overflow-hidden">
      {/* Decorative blob bottom-right */}
      <motion.div
        animate={{ rotate: [0, -8, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-60 h-60 bg-orange-pale blob opacity-50 pointer-events-none translate-x-1/4 translate-y-1/4"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-16">
          <div className="section-label mb-3">Achievements</div>
          <h2 className="display-heading text-4xl md:text-6xl">
            Milestones &amp;<br /><span className="text-orange-DEFAULT">Recognition</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {groups.map((g, gi) => (
            <motion.div key={g.cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={fd(0.1 + gi * 0.1)}
              whileHover={{ y: -4 }}
              className="card p-6 transition-all hover:shadow-card-hover"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-9 h-9 bg-orange-pale rounded-lg flex items-center justify-center cursor-default">
                  <g.Icon size={16} className="text-orange-DEFAULT" />
                </motion.div>
                <h3 className="font-heading font-bold text-ink">{g.cat}</h3>
              </div>
              <div className="space-y-3">
                {g.items.map((item, ii) => (
                  <motion.div key={ii}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={fd(0.25 + gi * 0.1 + ii * 0.07)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-cream transition-colors group/item"
                  >
                    <motion.span
                      whileHover={{ scale: 1.5 }}
                      className="w-1.5 h-1.5 rounded-full bg-orange-DEFAULT mt-2 shrink-0 cursor-default" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-medium text-sm text-ink truncate">{item.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-pale text-orange-DEFAULT shrink-0 border border-orange-DEFAULT/15">
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-xs text-orange-muted mb-0.5">{item.sub}</div>
                      <p className="text-xs text-stone leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={fd(0.7)}
          className="card p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {summaryStats.map(({ val, label, Icon }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="space-y-2 cursor-default"
              >
                <motion.div whileHover={{ rotate: 10 }}>
                  <Icon size={18} className="mx-auto text-orange-DEFAULT opacity-70" />
                </motion.div>
                <div className="font-heading font-extrabold text-3xl text-ink">{val}</div>
                <div className="font-mono text-[10px] text-stone">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const SkillsCanvas = dynamic(() => import('@/components/3d/SkillsCanvas'), { ssr: false });

const categories = [
  { title: 'Frontend', icon: '⚡', skills: [
    { name: 'React.js', pct: 90 }, { name: 'Next.js', pct: 88 },
    { name: 'TypeScript', pct: 82 }, { name: 'Tailwind CSS', pct: 90 },
    { name: 'Framer Motion', pct: 78 }, { name: 'Three.js', pct: 65 },
  ]},
  { title: 'Backend', icon: '🔧', skills: [
    { name: 'Node.js', pct: 85 }, { name: 'Express.js', pct: 85 },
    { name: 'REST APIs', pct: 88 }, { name: 'GraphQL', pct: 70 },
    { name: 'Socket.io', pct: 75 }, { name: 'Python / FastAPI', pct: 72 },
  ]},
  { title: 'Database & Cloud', icon: '☁️', skills: [
    { name: 'MongoDB', pct: 85 }, { name: 'PostgreSQL', pct: 80 },
    { name: 'Supabase', pct: 82 }, { name: 'Redis', pct: 68 },
    { name: 'Firebase', pct: 75 }, { name: 'Vercel / Railway', pct: 85 },
  ]},
  { title: 'AI & Tools', icon: '🤖', skills: [
    { name: 'OpenAI API', pct: 80 }, { name: 'LangChain', pct: 72 },
    { name: 'pgvector / Pinecone', pct: 68 }, { name: 'Git & GitHub', pct: 90 },
    { name: 'Docker', pct: 65 }, { name: 'Linux / CLI', pct: 78 },
  ]},
];

const fd = (d: number) => ({ duration: 0.7, delay: d, ease: [0.16,1,0.3,1] as [number,number,number,number] });

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="relative py-28 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-pale blob opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-16">
          <div className="section-label mb-3">Technical Skills</div>
          <h2 className="display-heading text-4xl md:text-6xl">
            My Technology<br /><span className="text-orange-DEFAULT">Stack</span>
          </h2>
          <p className="text-stone mt-4 max-w-lg">Refined through real projects, hackathons, and production deployments.</p>
        </motion.div>

        {/* 3D sphere + skill bars side by side */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={fd(0.1)}
            className="relative h-[400px]">
            <SkillsCanvas />
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-stone">
              drag to spin
            </p>
          </motion.div>

          <div className="space-y-5">
            {categories.slice(0, 2).map((cat, ci) => (
              <motion.div key={cat.title}
                initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={fd(0.2 + ci * 0.1)}
                className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center text-base">{cat.icon}</div>
                  <h3 className="font-heading font-semibold text-ink">{cat.title}</h3>
                </div>
                <div className="space-y-2.5">
                  {cat.skills.map((s, si) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-mono text-stone">{s.name}</span>
                        <span className="font-mono text-orange-DEFAULT">{s.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${s.pct}%` } : {}}
                          transition={{ duration: 1.4, delay: 0.4 + ci * 0.1 + si * 0.06, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-muted to-orange-DEFAULT" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom 2 categories */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {categories.slice(2).map((cat, ci) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0.5 + ci * 0.1)}
              className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center text-base">{cat.icon}</div>
                <h3 className="font-heading font-semibold text-ink">{cat.title}</h3>
              </div>
              <div className="space-y-2.5">
                {cat.skills.map((s, si) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-mono text-stone">{s.name}</span>
                      <span className="font-mono text-orange-DEFAULT">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${s.pct}%` } : {}}
                        transition={{ duration: 1.4, delay: 0.6 + ci * 0.1 + si * 0.06, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-muted to-orange-DEFAULT" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={fd(0.8)}>
          <div className="section-label mb-5">Tools I Work With</div>
          <div className="flex flex-wrap gap-2">
            {['React','Next.js','TypeScript','Node.js','Express','MongoDB','PostgreSQL','Supabase','Redis','Python','Docker','Git','Tailwind','OpenAI','LangChain','Vercel'].map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.04 }} whileHover={{ scale: 1.08, y: -2 }}
                className="tech-badge cursor-default">{t}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

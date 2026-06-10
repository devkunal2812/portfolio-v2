'use client';

import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const SkillSphere = dynamic(() => import('@/components/3d/SkillSphere'), { ssr: false });

const skillCategories = [
  {
    title: 'Frontend',
    color: '#00d4ff',
    icon: '⚡',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 78 },
      { name: 'Three.js', level: 65 },
    ],
  },
  {
    title: 'Backend',
    color: '#7c3aed',
    icon: '🔧',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 88 },
      { name: 'GraphQL', level: 70 },
      { name: 'Socket.io', level: 75 },
      { name: 'Python/FastAPI', level: 72 },
    ],
  },
  {
    title: 'Database & Cloud',
    color: '#10b981',
    icon: '☁️',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Supabase', level: 82 },
      { name: 'Redis', level: 68 },
      { name: 'Firebase', level: 75 },
      { name: 'Vercel/Railway', level: 85 },
    ],
  },
  {
    title: 'AI & Tools',
    color: '#f59e0b',
    icon: '🤖',
    skills: [
      { name: 'OpenAI API', level: 80 },
      { name: 'LangChain', level: 72 },
      { name: 'Pinecone/pgvector', level: 68 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'Linux/CLI', level: 78 },
    ],
  },
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Tailwind', icon: '💨' },
  { name: 'Python', icon: '🐍' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Git', icon: '📦' },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-label mb-4">Technical Skills</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            My{' '}
            <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl">
            A curated toolkit refined through real projects, hackathons, and production deployments.
          </p>
        </motion.div>

        {/* 3D Sphere + Categories */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* 3D Skills Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="h-[400px] relative"
          >
            <SkillSphere />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="font-mono text-xs text-text-muted">Hover to interact</div>
              </div>
            </div>
          </motion.div>

          {/* Skill bars */}
          <div className="space-y-6">
            {skillCategories.slice(0, 2).map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + ci * 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-display font-semibold text-text-primary">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-text-secondary font-mono">{skill.name}</span>
                        <span className="font-mono" style={{ color: cat.color }}>{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-surface-02 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.5 + si * 0.07, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${cat.color}cc, ${cat.color})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom two categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skillCategories.slice(2).map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + ci * 0.15 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-display font-semibold text-text-primary">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-text-secondary font-mono">{skill.name}</span>
                      <span className="font-mono" style={{ color: cat.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-surface-02 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.8 + si * 0.07, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${cat.color}cc, ${cat.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="relative overflow-hidden"
        >
          <div className="section-label mb-6">Tech I Work With</div>
          <div className="flex gap-4 flex-wrap">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 cursor-default"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="font-mono text-sm text-text-secondary">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

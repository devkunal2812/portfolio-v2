'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { User, Code, Zap, Globe } from 'lucide-react';

const stats = [
  { value: 15, suffix: '+', label: 'Projects Built', icon: Code },
  { value: 5, suffix: '+', label: 'Hackathons', icon: Zap },
  { value: 2, suffix: '+', label: 'Years Coding', icon: User },
  { value: 10, suffix: '+', label: 'Open Source PRs', icon: Globe },
];

const timeline = [
  {
    year: '2022',
    title: 'Started Coding Journey',
    description: 'Began with HTML/CSS/JS, quickly fell in love with building things for the web. First project: a weather app.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#00d4ff',
  },
  {
    year: '2023',
    title: 'React & Full Stack',
    description: 'Dived deep into React ecosystem, Node.js, and databases. Built first full-stack applications with MongoDB and PostgreSQL.',
    tech: ['React', 'Node.js', 'MongoDB', 'PostgreSQL'],
    color: '#7c3aed',
  },
  {
    year: '2023',
    title: 'First Hackathon Win',
    description: 'Participated in Smart India Hackathon and multiple college hackathons. Built AI-powered solutions under 24-hour sprints.',
    tech: ['Next.js', 'Python', 'FastAPI', 'OpenAI'],
    color: '#10b981',
  },
  {
    year: '2024',
    title: 'AI & Advanced Projects',
    description: 'Started integrating AI into full-stack applications. Built RAG chatbots, AI analytics dashboards, and intelligent automation tools.',
    tech: ['Next.js', 'Supabase', 'LangChain', 'TypeScript'],
    color: '#f59e0b',
  },
  {
    year: '2024–25',
    title: 'Freelancing & Open Source',
    description: 'Started freelancing for clients, contributing to open-source projects, and building a personal brand as a developer.',
    tech: ['Full Stack', 'SaaS', 'DevOps', 'Vercel'],
    color: '#00d4ff',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-label mb-4">About Me</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            The Developer{' '}
            <span className="gradient-text">Behind the Code</span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 space-y-4">
              <p className="text-base text-text-secondary leading-relaxed">
                I&apos;m a passionate <span className="text-accent-cyan font-medium">Full Stack Developer</span> from
                India, currently pursuing my degree while building production-grade applications.
                My journey started with curiosity — wondering how websites work — and evolved into
                a deep love for crafting intelligent digital experiences.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                I specialize in the <span className="text-accent-violet font-medium">React/Next.js ecosystem</span>,
                backend development with <span className="text-accent-emerald font-medium">Node.js and Express</span>,
                and integrating <span className="text-accent-amber font-medium">AI/ML capabilities</span> into
                web applications. From RAG chatbots to real-time analytics dashboards, I build
                things that matter.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                When not coding, I&apos;m participating in hackathons, contributing to open source, or exploring
                the latest in AI and web technology. I believe the best code is code that solves real problems.
              </p>
            </div>

            {/* Personal details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Location', value: 'India 🇮🇳', color: 'cyan' },
                { label: 'Status', value: 'Open to Work', color: 'emerald' },
                { label: 'Availability', value: 'Immediate', color: 'violet' },
                { label: 'Type', value: 'Internship/Full-time', color: 'amber' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass-card rounded-xl p-4">
                  <div className="font-mono text-xs text-text-muted mb-1">{label}</div>
                  <div className={`font-medium text-sm text-accent-${color}`}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card-hover rounded-2xl p-6 text-center group"
                >
                  <Icon size={20} className="mx-auto mb-3 text-accent-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="font-display font-bold text-3xl gradient-text-cyan">
                    {statsInView && (
                      <CountUp end={value} duration={2.5} delay={0.5 + i * 0.1} />
                    )}
                    {suffix}
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-2">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* What I bring */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-text-primary mb-4">What I Bring to the Table</h3>
              <div className="space-y-3">
                {[
                  { skill: 'Full Stack Architecture', level: 88 },
                  { skill: 'UI/UX Implementation', level: 82 },
                  { skill: 'API Design & Integration', level: 85 },
                  { skill: 'AI/ML Integration', level: 75 },
                  { skill: 'Database Design', level: 80 },
                ].map(({ skill, level }, i) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary font-mono">{skill}</span>
                      <span className="text-accent-cyan">{level}%</span>
                    </div>
                    <div className="h-1 bg-surface-02 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #00d4ff, #7c3aed)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="section-label mb-8">My Journey</div>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block timeline-line" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 ${i % 2 === 0 ? '' : 'md:direction-rtl'}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:block absolute left-1/2 top-6 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 z-10"
                    style={{ borderColor: item.color, backgroundColor: '#020408', boxShadow: `0 0 10px ${item.color}60` }}
                  />

                  <div className={`glass-card-hover rounded-2xl p-6 ${i % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono text-xs" style={{ color: item.color }}>{item.year}</span>
                        <h3 className="font-display font-semibold text-text-primary mt-1">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="tech-badge text-[10px]" style={{ color: item.color, borderColor: `${item.color}30` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

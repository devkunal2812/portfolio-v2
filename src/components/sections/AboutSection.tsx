'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { MapPin, Briefcase, Clock, Code } from 'lucide-react';

const timeline = [
  { year: '2022', title: 'Started the Journey', desc: 'HTML, CSS, JavaScript — built first weather app and fell in love with web development.', color: '#D4500A' },
  { year: '2023', title: 'React & Full Stack', desc: 'Dived into React, Node.js, MongoDB, PostgreSQL. Built first production full-stack apps.', color: '#C4784A' },
  { year: '2023', title: 'First Hackathon Win', desc: 'Smart India Hackathon — led a 5-person team to build an AI attendance system. Won college level.', color: '#D4500A' },
  { year: '2024', title: 'AI & Advanced Stack', desc: 'LangChain, RAG chatbots, Supabase, TypeScript. Started freelancing for real clients.', color: '#C4784A' },
  { year: '2025', title: 'Building & Growing', desc: 'Open source contributions, SaaS projects, developer community leadership.', color: '#D4500A' },
];

const stats = [
  { val: 15, suffix: '+', label: 'Projects Built' },
  { val: 5, suffix: '+', label: 'Hackathons' },
  { val: 2, suffix: '+', label: 'Years Coding' },
  { val: 10, suffix: '+', label: 'Open Source PRs' },
];

const fd = (d: number) => ({ duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] });

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="about" ref={ref} className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-16">
          <div className="section-label mb-3">About Me</div>
          <h2 className="display-heading text-4xl md:text-6xl">
            The Developer<br /><span className="text-orange-DEFAULT">Behind the Code</span>
          </h2>
        </motion.div>

        {/* Two cols */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Story */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={fd(0.15)} className="space-y-5">
            <p className="text-base text-stone leading-relaxed">
              I'm a passionate <span className="text-ink font-semibold">Full Stack Developer</span> from India,
              building production-grade applications while pursuing my degree. My journey started with curiosity
              about how websites work and evolved into a deep love for crafting intelligent digital experiences.
            </p>
            <p className="text-base text-stone leading-relaxed">
              I specialize in the <span className="text-ink font-semibold">React/Next.js ecosystem</span>,
              backend development with <span className="text-ink font-semibold">Node.js</span>, and integrating
              <span className="text-orange-DEFAULT font-semibold"> AI/ML capabilities</span> into web apps —
              from RAG chatbots to real-time dashboards.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: MapPin, label: 'Location', val: 'India 🇮🇳' },
                { icon: Briefcase, label: 'Status', val: 'Open to Work' },
                { icon: Clock, label: 'Availability', val: 'Immediate' },
                { icon: Code, label: 'Looking For', val: 'Internship / FT' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-3 p-3.5 bg-cream rounded-xl border border-black/6">
                  <Icon size={14} className="text-orange-DEFAULT mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-stone mb-0.5">{label}</div>
                    <div className="font-medium text-sm text-ink">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats + bars */}
          <motion.div ref={statsRef} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={fd(0.3)} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ val, suffix, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="card p-5 text-center hover:shadow-card-hover transition-all">
                  <div className="font-heading font-extrabold text-3xl text-orange-DEFAULT">
                    {statsInView && <CountUp end={val} duration={2} delay={0.3} />}{suffix}
                  </div>
                  <div className="font-mono text-[10px] text-stone mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
            <div className="card p-5 space-y-4">
              <h3 className="font-heading font-semibold text-sm text-ink">Core Strengths</h3>
              {[
                { name: 'Full Stack Architecture', pct: 88 },
                { name: 'React / Next.js', pct: 90 },
                { name: 'API Design & Node.js', pct: 85 },
                { name: 'AI / LLM Integration', pct: 75 },
                { name: 'Database Design', pct: 80 },
              ].map(({ name, pct }, i) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-stone font-mono">{name}</span>
                    <span className="text-orange-DEFAULT font-mono">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 1.4, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                      className="h-full rounded-full bg-orange-DEFAULT" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0.5)}>
          <div className="section-label mb-8">My Journey</div>
          <div className="relative pl-6 border-l-2 border-black/8 space-y-8">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }} className="relative">
                <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white"
                  style={{ borderColor: item.color }} />
                <div className="card p-5 hover:shadow-card-hover transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-orange-DEFAULT">{item.year}</span>
                    <h3 className="font-heading font-semibold text-ink">{item.title}</h3>
                  </div>
                  <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

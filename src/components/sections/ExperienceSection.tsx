'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Freelance Full Stack Developer', company: 'Self-Employed', url: 'https://kunalbuilds.me',
    period: 'Jan 2024 – Present', location: 'Remote', type: 'Freelance',
    desc: 'Delivering full-stack web solutions for clients across India and internationally — SaaS dashboards, e-commerce platforms, and AI-powered tools.',
    points: [
      'Built and deployed 5+ production applications for clients',
      'Integrated AI capabilities using OpenAI API and LangChain',
      'Reduced client page load time by 60% through Next.js optimization',
      'Maintained 100% client satisfaction rating',
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Supabase', 'OpenAI API'],
    typeColor: '#D4500A',
  },
  {
    role: 'Open Source Contributor', company: 'Various Projects', url: 'https://github.com/devkunal2812',
    period: 'Jun 2023 – Present', location: 'Remote', type: 'Open Source',
    desc: 'Contributing bug fixes, features, and documentation to open-source projects in the React and Node.js ecosystem.',
    points: [
      '10+ merged pull requests across different repositories',
      'Fixed critical authentication vulnerability in a popular NPM package',
      'Added TypeScript types to a widely-used utility library',
      '100+ GitHub stars across personal projects',
    ],
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    typeColor: '#059669',
  },
  {
    role: 'Technical Lead — Smart India Hackathon', company: 'College Team', url: '#',
    period: 'Sep – Dec 2023', location: 'Onsite', type: 'Hackathon',
    desc: 'Led a 5-person team building an AI attendance & analytics system for educational institutions. Won college level, advanced to state round.',
    points: [
      'Architected full-stack system in under 24 hours',
      'Led all technical decisions for AI/ML integration',
      'Presented to a panel of 15+ industry judges',
      'Advanced to national round of Smart India Hackathon',
    ],
    tech: ['Python', 'FastAPI', 'React', 'OpenCV', 'PostgreSQL'],
    typeColor: '#d97706',
  },
  {
    role: 'Web Development Intern', company: 'Local Startup', url: '#',
    period: 'May – Aug 2023', location: 'Hybrid', type: 'Internship',
    desc: 'Frontend and backend development for a logistics startup — main dashboard, REST APIs, and database query performance improvements.',
    points: [
      'Reduced API response time by 40% through query optimization',
      'Implemented real-time tracking with Socket.io',
      'Built reusable component library used across 3 products',
      'Mentored 2 junior developers on React best practices',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    typeColor: '#7c3aed',
  },
];

const fd = (d: number) => ({ duration: 0.7, delay: d, ease: [0.16,1,0.3,1] as [number,number,number,number] });

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="relative py-28 bg-cream overflow-hidden">
      {/* Decorative blob */}
      <motion.div
        animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-56 h-56 bg-orange-pale blob opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-16">
          <div className="section-label mb-3">Experience</div>
          <h2 className="display-heading text-4xl md:text-6xl">
            My Professional<br /><span className="text-orange-DEFAULT">Path</span>
          </h2>
        </motion.div>

        <div className="relative pl-6 border-l-2 border-black/8 space-y-8">
          {experiences.map((exp, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={fd(0.15 + i * 0.12)}
              className="relative group"
            >
              {/* Animated timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300 }}
                className="absolute -left-[29px] top-6 w-3.5 h-3.5 rounded-full border-2 bg-white transition-transform group-hover:scale-125"
                style={{ borderColor: exp.typeColor, boxShadow: `0 0 0 0px ${exp.typeColor}40` }}
              />

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="card p-6 md:p-7 hover:shadow-card-hover transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border"
                        style={{ color: exp.typeColor, borderColor: `${exp.typeColor}30`, background: `${exp.typeColor}10` }}>
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-ink">{exp.role}</h3>
                    <a href={exp.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm mt-1 hover:underline"
                      style={{ color: exp.typeColor }}>
                      <Briefcase size={12} />{exp.company}<ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-stone shrink-0">
                    <span className="flex items-center gap-1.5"><Calendar size={11} />{exp.period}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={11} />{exp.location}</span>
                  </div>
                </div>

                <p className="text-sm text-stone leading-relaxed mb-4">{exp.desc}</p>

                <ul className="space-y-1.5 mb-5">
                  {exp.points.map((pt, pi) => (
                    <motion.li key={pi}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.12 + pi * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-stone">
                      <span className="w-1 h-1 rounded-full mt-2 shrink-0 bg-orange-DEFAULT" />
                      {pt}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

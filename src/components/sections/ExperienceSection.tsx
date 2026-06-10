'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    companyUrl: 'https://kunalbuilds.me',
    period: 'Jan 2024 – Present',
    duration: '1+ year',
    location: 'Remote',
    type: 'Freelance',
    color: '#00d4ff',
    description:
      'Delivering full-stack web solutions for clients across India and internationally. Projects include SaaS dashboards, e-commerce platforms, and AI-powered tools.',
    achievements: [
      'Built and deployed 5+ production applications for clients',
      'Integrated AI capabilities using OpenAI and LangChain',
      'Reduced client\'s page load time by 60% through Next.js optimization',
      'Maintained 100% client satisfaction rating',
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Supabase', 'OpenAI API'],
  },
  {
    role: 'Open Source Contributor',
    company: 'Various Projects',
    companyUrl: 'https://github.com/devkunal2812',
    period: 'Jun 2023 – Present',
    duration: '1.5+ years',
    location: 'Remote',
    type: 'Open Source',
    color: '#10b981',
    description:
      'Contributing bug fixes, features, and documentation to open-source projects. Active contributor to React and Node.js ecosystem libraries.',
    achievements: [
      '10+ merged pull requests across different repositories',
      'Fixed critical authentication vulnerability in a popular NPM package',
      'Added TypeScript types to a widely-used utility library',
      'Maintained personal open-source projects with 100+ GitHub stars',
    ],
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
  },
  {
    role: 'Technical Lead — Smart India Hackathon',
    company: 'College Team',
    companyUrl: '#',
    period: 'Sep 2023 – Dec 2023',
    duration: '3 months',
    location: 'Onsite',
    type: 'Hackathon',
    color: '#f59e0b',
    description:
      'Led a 5-person team to build an AI-powered attendance and analytics system for educational institutions. Won at the college level, advanced to state round.',
    achievements: [
      'Architected the full-stack system in under 24 hours',
      'Led technical decisions for AI/ML integration',
      'Presented to a panel of 15+ industry judges',
      'Advanced to national round of Smart India Hackathon',
    ],
    tech: ['Python', 'FastAPI', 'React', 'OpenCV', 'PostgreSQL'],
  },
  {
    role: 'Web Development Intern',
    company: 'Local Startup',
    companyUrl: '#',
    period: 'May 2023 – Aug 2023',
    duration: '4 months',
    location: 'Hybrid',
    type: 'Internship',
    color: '#7c3aed',
    description:
      'Worked on frontend and backend development for a logistics startup. Contributed to the main dashboard, implemented REST APIs, and improved database query performance.',
    achievements: [
      'Reduced API response time by 40% through query optimization',
      'Implemented real-time tracking with Socket.io',
      'Built reusable component library used across 3 products',
      'Mentored 2 junior developers on React best practices',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
  },
];

const typeColors: Record<string, string> = {
  Freelance: '#00d4ff',
  'Open Source': '#10b981',
  Hackathon: '#f59e0b',
  Internship: '#7c3aed',
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-label mb-4">Experience</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            My{' '}
            <span className="gradient-text">Professional Path</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-violet/50 to-transparent" />

          <div className="space-y-8 pl-12 md:pl-20">
            {experiences.map((exp, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-12 md:-left-[52px] top-6 w-4 h-4 rounded-full border-2 bg-void transition-all duration-300 group-hover:scale-125"
                  style={{ borderColor: exp.color, boxShadow: `0 0 15px ${exp.color}60` }}
                />

                <div className="glass-card-hover rounded-2xl p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full border"
                          style={{ color: typeColors[exp.type], borderColor: `${typeColors[exp.type]}40`, background: `${typeColors[exp.type]}10` }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-text-primary">{exp.role}</h3>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm mt-1 transition-colors"
                        style={{ color: exp.color }}
                      >
                        <Briefcase size={13} />
                        {exp.company}
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-text-muted shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-5">
                    {exp.achievements.map((a, ai) => (
                      <li key={ai} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                        {a}
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-badge text-[10px]" style={{ color: exp.color, borderColor: `${exp.color}25` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

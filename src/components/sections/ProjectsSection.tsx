'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Eye } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Analytics Dashboard',
    subtitle: 'Full-Stack SaaS Application',
    description:
      'A comprehensive analytics platform with AI-powered insights. Features real-time data visualization, predictive analytics using LLMs, RAG-based natural language queries, and automated reporting.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Chart.js', 'Tailwind'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 24,
    forks: 8,
    color: '#00d4ff',
    gradient: 'from-[#00d4ff]/20 to-[#0d1fa3]/20',
    featured: true,
    category: 'AI / SaaS',
  },
  {
    id: 2,
    title: 'RAG Chatbot Platform',
    subtitle: 'AI-Powered Knowledge Base',
    description:
      'A Retrieval-Augmented Generation chatbot that indexes custom documents and answers questions with cited sources. Built with LangChain, pgvector, and OpenAI GPT-4.',
    tech: ['Next.js', 'LangChain', 'pgvector', 'PostgreSQL', 'OpenAI', 'Node.js'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 18,
    forks: 5,
    color: '#7c3aed',
    gradient: 'from-[#7c3aed]/20 to-[#4c1d95]/20',
    featured: true,
    category: 'AI / ML',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack MERN Application',
    description:
      'A feature-complete e-commerce solution with product management, cart, payments via Razorpay, order tracking, and admin dashboard. Supports real-time notifications.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Redis', 'Razorpay'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 31,
    forks: 12,
    color: '#10b981',
    gradient: 'from-[#10b981]/20 to-[#065f46]/20',
    featured: false,
    category: 'E-Commerce',
  },
  {
    id: 4,
    title: 'Real-Time Collaboration Tool',
    subtitle: 'WebSocket-Powered App',
    description:
      'A collaborative workspace with live document editing, presence indicators, voice channels, and task management. Similar to Notion meets Discord.',
    tech: ['Next.js', 'Socket.io', 'MongoDB', 'Redis', 'WebRTC', 'Tailwind'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 15,
    forks: 4,
    color: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-[#78350f]/20',
    featured: false,
    category: 'Collaboration',
  },
  {
    id: 5,
    title: 'DevPulse — Dev Portfolio Builder',
    subtitle: 'SaaS Tool for Developers',
    description:
      'Generate beautiful developer portfolios from a GitHub username. Pulls repositories, contributions, and languages automatically. Custom themes and export to Vercel.',
    tech: ['Next.js', 'GitHub API', 'Supabase', 'TypeScript', 'Framer Motion'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 42,
    forks: 19,
    color: '#00d4ff',
    gradient: 'from-[#00d4ff]/20 to-[#7c3aed]/20',
    featured: false,
    category: 'Dev Tools',
  },
  {
    id: 6,
    title: 'Smart Attendance System',
    subtitle: 'Hackathon Project — Winner',
    description:
      'Face recognition-based attendance system with QR fallback, admin dashboard, analytics, and bulk export. Built in 24 hours at Smart India Hackathon.',
    tech: ['Python', 'FastAPI', 'React', 'OpenCV', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/devkunal2812',
    live: 'https://kunalbuilds.me',
    stars: 28,
    forks: 9,
    color: '#10b981',
    gradient: 'from-[#10b981]/20 to-[#7c3aed]/20',
    featured: false,
    category: 'AI / Hackathon',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group glass-card rounded-2xl overflow-hidden cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Glow border */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}40, 0 0 40px ${project.color}15` }}
      />

      <div className="relative z-10 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent-amber/10 border border-accent-amber/30 text-accent-amber">
                  ⭐ Featured
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-text-muted mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge text-[10px]" style={{ color: project.color, borderColor: `${project.color}25` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Star size={12} /> {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} /> {project.forks}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all"
              style={{ color: project.color, borderColor: `${project.color}40` }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category.split(' / ')[0])))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-emerald/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="section-label mb-4">Projects</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
              Things I&apos;ve{' '}
              <span className="gradient-text">Built</span>
            </h2>
            <p className="text-text-secondary max-w-md">
              A selection of projects across AI, full-stack, and developer tooling — each solving a real problem.
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-accent-cyan text-void'
                  : 'glass-card text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm mb-4">
            More projects available on GitHub
          </p>
          <motion.a
            href="https://github.com/devkunal2812"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-cyber inline-flex"
          >
            <Github size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

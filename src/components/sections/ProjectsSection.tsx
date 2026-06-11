'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const projects = [
  {
    id: 1, title: 'AI Analytics Dashboard', sub: 'Full-Stack SaaS',
    desc: 'Real-time analytics with AI-powered insights, predictive analytics via LLMs, RAG-based natural language queries, and automated reporting.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Chart.js'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 24, forks: 8, category: 'AI', featured: true,
  },
  {
    id: 2, title: 'RAG Chatbot Platform', sub: 'AI Knowledge Base',
    desc: 'Retrieval-Augmented Generation chatbot indexing custom documents, answering questions with cited sources using LangChain and GPT-4.',
    tech: ['Next.js', 'LangChain', 'pgvector', 'PostgreSQL', 'OpenAI'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 18, forks: 5, category: 'AI', featured: true,
  },
  {
    id: 3, title: 'E-Commerce Platform', sub: 'MERN Full-Stack',
    desc: 'Feature-complete e-commerce with product management, cart, Razorpay payments, order tracking, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'Razorpay'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 31, forks: 12, category: 'Full Stack', featured: false,
  },
  {
    id: 4, title: 'Real-Time Collab Tool', sub: 'WebSocket App',
    desc: 'Collaborative workspace with live document editing, presence indicators, voice channels, and task management.',
    tech: ['Next.js', 'Socket.io', 'MongoDB', 'Redis', 'WebRTC'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 15, forks: 4, category: 'Full Stack', featured: false,
  },
  {
    id: 5, title: 'DevPulse — Portfolio Builder', sub: 'SaaS Dev Tool',
    desc: 'Generate beautiful portfolios from a GitHub username. Pulls repos, contributions, and languages. Custom themes, export to Vercel.',
    tech: ['Next.js', 'GitHub API', 'Supabase', 'TypeScript'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 42, forks: 19, category: 'Dev Tools', featured: false,
  },
  {
    id: 6, title: 'Smart Attendance System', sub: 'Hackathon Winner',
    desc: 'Face recognition attendance system with QR fallback, admin dashboard, analytics. Built in 24 hours at Smart India Hackathon.',
    tech: ['Python', 'FastAPI', 'React', 'OpenCV', 'PostgreSQL'],
    github: 'https://github.com/devkunal2812', live: 'https://kunalbuilds.me',
    stars: 28, forks: 9, category: 'AI', featured: false,
  },
];

const cats = ['All', 'AI', 'Full Stack', 'Dev Tools'];
const fd = (d: number) => ({ duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] });

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative py-28 bg-white overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-pale blob opacity-50 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0)} className="mb-12">
          <div className="section-label mb-3">Projects</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="display-heading text-4xl md:text-6xl">
              Things I've<br /><span className="text-orange-DEFAULT">Built</span>
            </h2>
            <p className="text-stone max-w-xs text-sm leading-relaxed">Real projects solving real problems — AI, full-stack, and developer tooling.</p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0.15)}
          className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                filter === c
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-transparent text-stone border-black/10 hover:border-orange-DEFAULT hover:text-orange-DEFAULT'
              }`}>
              {c}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.article key={p.id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={fd(i * 0.08)}
                className="card-hover group flex flex-col p-6">
                {/* Top */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="tag-orange">{p.category}</span>
                      {p.featured && <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-mono text-amber-700">★ Featured</span>}
                    </div>
                    <h3 className="font-heading font-bold text-ink text-base leading-tight">{p.title}</h3>
                    <p className="font-mono text-[10px] text-stone mt-0.5">{p.sub}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-stone leading-relaxed mb-4 flex-1">{p.desc}</p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/6">
                  <div className="flex items-center gap-3 text-xs text-stone">
                    <span className="flex items-center gap-1"><Star size={11} />{p.stars}</span>
                    <span className="flex items-center gap-1"><GitFork size={11} />{p.forks}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 text-stone hover:text-ink transition-colors rounded-lg hover:bg-cream">
                      <Github size={15} />
                    </a>
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-ink text-cream rounded-lg hover:bg-orange-DEFAULT transition-colors">
                      <ExternalLink size={11} /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={fd(0.7)}
          className="mt-12 text-center">
          <p className="text-stone text-sm mb-4">More projects on GitHub</p>
          <a href="https://github.com/devkunal2812" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Github size={15} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

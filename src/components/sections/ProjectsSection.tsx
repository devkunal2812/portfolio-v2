'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const projects = [
  { id:1, title:'AI Analytics Dashboard', sub:'Full-Stack SaaS', desc:'Real-time analytics with AI-powered insights, predictive analytics via LLMs, RAG-based natural language queries, and automated reporting.', tech:['Next.js','TypeScript','Supabase','OpenAI','Chart.js'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:24, forks:8, category:'AI', featured:true },
  { id:2, title:'RAG Chatbot Platform', sub:'AI Knowledge Base', desc:'Retrieval-Augmented Generation chatbot indexing custom documents and answering questions with cited sources using LangChain and GPT-4.', tech:['Next.js','LangChain','pgvector','PostgreSQL','OpenAI'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:18, forks:5, category:'AI', featured:true },
  { id:3, title:'E-Commerce Platform', sub:'MERN Full-Stack', desc:'Feature-complete e-commerce with product management, cart, Razorpay payments, order tracking, and admin dashboard.', tech:['React','Node.js','MongoDB','Redis','Razorpay'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:31, forks:12, category:'Full Stack', featured:false },
  { id:4, title:'Real-Time Collab Tool', sub:'WebSocket App', desc:'Collaborative workspace with live document editing, presence indicators, voice channels, and task management.', tech:['Next.js','Socket.io','MongoDB','Redis','WebRTC'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:15, forks:4, category:'Full Stack', featured:false },
  { id:5, title:'DevPulse — Portfolio Builder', sub:'SaaS Dev Tool', desc:'Generate beautiful portfolios from a GitHub username. Pulls repos, contributions, and languages. Custom themes, one-click Vercel deploy.', tech:['Next.js','GitHub API','Supabase','TypeScript'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:42, forks:19, category:'Dev Tools', featured:false },
  { id:6, title:'Smart Attendance System', sub:'Hackathon Winner', desc:'Face recognition attendance with QR fallback, admin dashboard, analytics. Built in 24 hours at Smart India Hackathon.', tech:['Python','FastAPI','React','OpenCV','PostgreSQL'], github:'https://github.com/devkunal2812', live:'https://kunalbuilds.me', stars:28, forks:9, category:'AI', featured:false },
];

const cats = ['All', 'AI', 'Full Stack', 'Dev Tools'];

function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, [-80, 80], [0, 100]);
  const glowY = useTransform(y, [-80, 80], [0, 100]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }}
      style={{ perspective: 800 }}>
      <motion.div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="card group flex flex-col p-6 cursor-default relative overflow-hidden h-full">

        {/* Shimmer glow on hover */}
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{ background: useTransform([glowX, glowY], ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(212,80,10,0.08) 0%, transparent 60%)`) }} />

        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="tag-orange">{project.category}</span>
                {project.featured && <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-mono text-amber-700">★ Featured</span>}
              </div>
              <h3 className="font-heading font-bold text-ink text-base leading-tight">{project.title}</h3>
              <p className="font-mono text-[10px] text-stone mt-0.5">{project.sub}</p>
            </div>
          </div>
          <p className="text-sm text-stone leading-relaxed mb-4 flex-1">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-black/6">
            <div className="flex items-center gap-3 text-xs text-stone">
              <span className="flex items-center gap-1"><Star size={11} />{project.stars}</span>
              <span className="flex items-center gap-1"><GitFork size={11} />{project.forks}</span>
            </div>
            <div className="flex items-center gap-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-stone hover:text-ink transition-colors rounded-lg hover:bg-cream">
                <Github size={15} />
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-ink text-cream rounded-lg hover:bg-orange-DEFAULT transition-colors">
                <ExternalLink size={11} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative py-28 bg-white overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-pale blob opacity-50 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-12">
          <div className="section-label mb-3">Projects</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="display-heading text-4xl md:text-6xl">
              Things I&apos;ve<br /><span className="text-orange-DEFAULT">Built</span>
            </h2>
            <p className="text-stone max-w-xs text-sm leading-relaxed">Real projects solving real problems — AI, full-stack, and developer tooling.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${filter === c ? 'bg-ink text-cream border-ink' : 'bg-transparent text-stone border-black/10 hover:border-orange-DEFAULT hover:text-orange-DEFAULT'}`}>
              {c}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => <TiltCard key={p.id} project={p} index={i} />)}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
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

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Snowfall from 'react-snowfall'
import { Link, Element, animateScroll as scroll } from 'react-scroll'
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Send,
  Sparkles,
  Sun,
  Wand2,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import './index.css'

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

const skills = [
  { name: 'React', percent: 92, color: '#61dafb', logo: 'https://cdn.simpleicons.org/react/61dafb' },
  { name: 'Next.js', percent: 86, color: '#ffffff', logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'TypeScript', percent: 88, color: '#3178c6', logo: 'https://cdn.simpleicons.org/typescript/3178c6' },
  { name: 'Framer Motion', percent: 84, color: '#f04cf0', logo: 'https://cdn.simpleicons.org/framer/f04cf0' },
  { name: 'Tailwind CSS', percent: 90, color: '#38bdf8', logo: 'https://cdn.simpleicons.org/tailwindcss/38bdf8' },
  { name: 'Node.js', percent: 82, color: '#77b255', logo: 'https://cdn.simpleicons.org/nodedotjs/77b255' },
  { name: 'Express', percent: 80, color: '#f5ec99', logo: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'GraphQL', percent: 78, color: '#e535ab', logo: 'https://cdn.simpleicons.org/graphql/e535ab' },
  { name: 'MongoDB', percent: 76, color: '#00ed64', logo: 'https://cdn.simpleicons.org/mongodb/00ed64' },
  { name: 'Storybook', percent: 75, color: '#ff4785', logo: 'https://cdn.simpleicons.org/storybook/ff4785' },
  { name: 'Vitest', percent: 74, color: '#5bba4f', logo: 'https://cdn.simpleicons.org/vitest/5bba4f' },
  { name: 'Playwright', percent: 72, color: '#45ba76', logo: 'https://cdn.simpleicons.org/playwright/45ba76' },
]

const projects = [
  {
    title: 'Nova Commerce',
    tag: 'web',
    tech: ['React', 'Stripe', 'Sanity', 'Framer Motion'],
    description:
      'Headless storefront with animated product stories, shoppable reels, and realtime cart.',
    link: 'https://example.com',
    repo: 'https://github.com/example/nova',
  },
  {
    title: 'Signal Desk',
    tag: 'dashboard',
    tech: ['Next.js', 'GraphQL', 'Tailwind', 'Recharts'],
    description:
      'Analytics cockpit for revenue teams with live KPI tiles, anomaly alerts, and filters.',
    link: 'https://example.com',
    repo: 'https://github.com/example/signal-desk',
  },
  {
    title: 'Palette',
    tag: 'ui',
    tech: ['React', 'Storybook', 'CSS Variables'],
    description:
      'Design system kit with tokens, theming, motion presets, and usage-ready components.',
    link: 'https://example.com',
    repo: 'https://github.com/example/palette',
  },
  {
    title: 'Flow Fields',
    tag: 'experiments',
    tech: ['Canvas', 'Noise', 'Shaders'],
    description:
      'Playable generative gallery with saved palettes, exports, and physics-based motion.',
    link: 'https://example.com',
    repo: 'https://github.com/example/flow-fields',
  },
]

const experience = [
  {
    period: '2023 — Now',
    role: 'Senior Frontend Engineer',
    place: 'Freelance / Remote',
    summary: 'Shipping high-polish marketing sites and SaaS dashboards for startups.',
  },
  {
    period: '2021 — 2023',
    role: 'Product Engineer',
    place: 'Studio Nine',
    summary: 'Led React + motion rebuilds that lifted session time by 28%.',
  },
  {
    period: '2018 — 2021',
    role: 'Front-End Developer',
    place: 'PixelCraft',
    summary: 'Built component libraries, onboarding flows, and analytics surfaces.',
  },
]

const socials = [
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@yourname.dev', label: 'Email' },
]

const profileImage = '/profile.png'

function useRotatingText(words, delay = 1800) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), delay)
    return () => clearInterval(id)
  }, [words, delay])
  return words[index]
}

function useTheme() {
  const prefersDark = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored || (prefersDark() ? 'dark' : 'light')
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: 'easeOut' },
  }),
}

function Reveal({ children, custom = 0, className, ...rest }) {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { amount: 0.35 })

  useEffect(() => {
    if (inView) controls.start('show')
    else controls.start('hidden')
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      custom={custom}
      variants={fade}
      initial="hidden"
      animate={controls}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

function Badge({ children }) {
  return (
    <span className="pill">
      <Sparkles className="h-4 w-4 text-accent2" />
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, kicker }) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.25em] text-accent2">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl font-display text-white">{title}</h2>
      {kicker && <p className="text-sm text-white/70 max-w-2xl">{kicker}</p>}
    </div>
  )
}

function SkillOrbit() {
  const [hovered, setHovered] = useState(null)
  const radius = 140

  return (
    <div className="relative mt-10 mb-6 flex items-center justify-center">
      <div className="relative h-[360px] w-full max-w-[560px]">
        {[110, 160, 210].map((r, i) => (
          <div
            key={r}
            className="absolute inset-0 m-auto rounded-full border border-white/10"
            style={{ width: r * 2, height: r * 2, filter: 'drop-shadow(0 0 30px rgba(113,39,186,0.25))' }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-28 w-28 rounded-full bg-gradient-to-b from-accent/70 to-accent2/50 blur-[2px]" />
          <div className="absolute h-24 w-24 rounded-full bg-surface/80 border border-white/10 grid place-items-center text-white font-semibold">
            Stack
          </div>
        </div>

        {skills.map((skill, idx) => {
          const angle = (idx / skills.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const active = hovered === idx
          const offset = 110
          const tx = Math.cos(angle) * offset
          const ty = Math.sin(angle) * offset
          return (
            <motion.div
              key={skill.name}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
              }}
              onHoverStart={() => setHovered(idx)}
              onHoverEnd={() => setHovered(null)}
            >
              <motion.div
                whileHover={{ scale: 1.14, rotate: 4, zIndex: 30 }}
                className="relative grid place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-lg shadow-panel overflow-hidden"
                style={{ width: 58, height: 58 }}
              >
                <img src={skill.logo} alt={skill.name} className="h-7 w-7 object-contain" />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={
                    active
                      ? { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
                      : { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }
                  }
                  className="absolute left-1/2 top-1/2 rounded-2xl border border-white/15 bg-white/12 backdrop-blur-xl px-4 py-3 min-w-[220px] shadow-panel z-20 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px)`,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                  }}
                >
                  <p className="text-xs font-semibold text-white">{skill.name}</p>
                  <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={active ? { width: `${skill.percent}%` } : { width: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.9))`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-white/70">{skill.percent}% proficiency</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1
  return (
    <Reveal
      custom={index}
      className={clsx(
        'relative flex flex-col gap-8 md:gap-12 items-center',
        reversed ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent2">
          Featured Project
        </p>
        <h3 className="text-3xl md:text-4xl font-display text-white">{project.title}</h3>
        <div className="relative rounded-3xl overflow-hidden shadow-panel">
          <div className="absolute inset-0 bg-aurora-1 opacity-40 blur-3xl" />
          <div className="relative bg-gradient-to-r from-white/8 via-white/4 to-white/8 border border-white/10 px-6 py-6 md:px-8 md:py-7">
            <p className="text-base text-white/85 leading-7">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <a
            href={project.link}
            className="btn-ghost rounded-full px-3 py-2 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Live <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={project.repo}
            className="btn-ghost rounded-full px-3 py-2 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Code <Github className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-radial from-accent/25 via-transparent to-transparent blur-[120px]"
        />
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 via-white/6 to-transparent shadow-panel">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35" />
          <div className="absolute left-4 top-4 pill bg-white/10 text-[11px]">Wireframe</div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">
              {project.tag}
            </span>
          </div>
          <div className="flex h-full items-center justify-center text-white/70 text-sm tracking-wide">
            Preview placeholder
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ExperienceItem({ item, index }) {
  return (
    <Reveal custom={index} className="relative pl-8" viewport={{ amount: 0.35 }}>
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-accent shadow-glow" />
      <p className="text-xs uppercase tracking-[0.2em] text-accent2">{item.period}</p>
      <h3 className="text-lg font-semibold text-white mt-1">{item.role}</h3>
      <p className="text-sm text-white/70">{item.place}</p>
      <p className="text-sm text-white/70 mt-2 leading-6">{item.summary}</p>
    </Reveal>
  )
}

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-panel"
    >
      <div className="absolute inset-0 bg-aurora-1 opacity-40 blur-3xl" />
      <img
        src={profileImage}
        alt="Portrait of Ashwin by the ocean"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-5 top-5 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-md"
      >
        <p className="text-xs text-white/70">Role</p>
        <p className="text-base font-semibold text-white">Frontend Engineer</p>
      </motion.div>

      <div className="absolute right-5 top-6">
        <span className="pill bg-white/15 text-white text-[10px]">Seaside energy</span>
      </div>

      <div className="absolute right-5 bottom-6 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-md">
        <p className="text-xs text-white/70">Location</p>
        <p className="text-base font-semibold text-white">Chicago, US</p>
      </div>
    </motion.div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })
  return (
    <motion.div
      className="fixed left-0 top-0 h-1 bg-gradient-to-r from-accent to-accent2 z-40"
      style={{ scaleX: width, transformOrigin: '0% 50%' }}
    />
  )
}

function FloatingGlows() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -90])
  const y2 = useTransform(scrollY, [0, 600], [0, 80])
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[140px] z-0"
        style={{ y: y1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed right-[-120px] bottom-[-40px] h-[520px] w-[520px] rounded-full bg-accent2/18 blur-[150px] z-0"
        style={{ y: y2 }}
      />
    </>
  )
}

function App() {
  const titleCycle = useRotatingText(['React Specialist', 'Creative Coder', 'UI Engineer'])
  const { theme, setTheme } = useTheme()
  const [filter, setFilter] = useState('all')
  const { register, handleSubmit, reset } = useForm()

  const filteredProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.tag === filter)),
    [filter],
  )

  const onSubmit = (values) => {
    console.table(values) // quick debug in devtools
    alert('Thanks! Your message is on its way.')
    reset()
  }

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 bg-noise opacity-30 [background-size:120px_120px]" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white/5 via-transparent to-accent/10 blur-3xl" />
      <Snowfall
        color="rgba(255,255,255,0.7)"
        snowflakeCount={180}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <ScrollProgress />
      <FloatingGlows />

      <header className="sticky top-0 z-30 backdrop-blur-lg bg-surface/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <button
            onClick={() => scroll.scrollToTop({ duration: 500 })}
            className="flex items-center gap-2 text-white font-display text-lg"
          >
            <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-accent2 grid place-items-center text-surface font-semibold shadow-glow">
              A
            </span>
            <span className="hidden sm:block">Ashwin</span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={550}
                offset={-90}
                className="cursor-pointer hover:text-white"
                spy
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://example.com/resume.pdf"
              className="btn-ghost text-xs hidden sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              Resume
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn-ghost rounded-full p-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <Element name="hero" className="pt-20 md:pt-28">
          <section className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div className="space-y-6">
              <Badge>Available for select projects</Badge>
              <Reveal className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-tight">
                  Building vivid digital stories with{' '}
                  <span className="text-accentText">React</span>
                  .
                </h1>
                <p className="text-lg text-white/70 leading-7 max-w-2xl">
                  I craft expressive interfaces, motion-rich product tours, and fast, accessible
                  web apps for brands who care about detail.
                </p>
              </Reveal>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                <span className="pill bg-white/10 text-white">
                  <Wand2 className="h-4 w-4 text-accent" />
                  {titleCycle}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent2" />
                  Based in Chicago, US
                </span>
                <span>6+ yrs shipping</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="projects" smooth duration={550} offset={-90} className="btn-primary">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="contact" smooth duration={550} offset={-90} className="btn-ghost">
                  Let&apos;s Talk
                </Link>
              </div>

              <div className="flex gap-3">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="btn-ghost rounded-full p-3"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <ProfilePhoto />
          </section>
        </Element>

        <Element name="about" className="mt-24 md:mt-32">
          <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-start">
            <Reveal>
              <SectionTitle
                eyebrow="About"
                title="Strategy-led design, code-level craft."
                kicker="I work closely with founders and product teams to turn fuzzy briefs into expressive, measurable experiences."
              />
              <div className="mt-6 space-y-3 text-white/70 leading-7">
                <p>
                  From landing pages that tell a story to dashboards that feel effortless, I combine
                  systems thinking, rapid prototyping, and motion to ship experiences people remember.
                </p>
                <p>
                  I keep a tight feedback loop, pair with designers, and lean on reusable patterns so
                  teams can move faster without trading polish.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Projects', value: '48+' },
                  { label: 'Avg uplift', value: '28%+ session time' },
                  { label: 'Response', value: '> 48 hrs' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl px-3 py-4">
                    <p className="text-xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="space-y-5">
              <div className="glass rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Availability</p>
                    <p className="text-lg text-white font-semibold">March 2026</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-glow" />
                </div>
                <p className="text-sm text-white/70 mt-3 leading-6">
                  Open to fractional roles, launches, and short, intense sprints.
                </p>
              </div>
              <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
                <p className="text-sm text-white/70">Highlights</p>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>• Led rebuilds that cut Time-to-Interactive by 42%.</li>
                  <li>• Designed token systems shared across web + native.</li>
                  <li>• Mentored teams on a11y and motion guidelines.</li>
                </ul>
              </div>
            </Reveal>
          </section>
        </Element>

        <Element name="skills" className="mt-24 md:mt-32">
          <section className="space-y-6">
            <SectionTitle
              eyebrow="Skills"
              title="Orbiting stack."
              kicker="Hover any icon to see depth and proficiency."
            />
            <SkillOrbit />
          </section>
        </Element>

        <Element name="projects" className="mt-24 md:mt-32">
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SectionTitle eyebrow="Work" title="Featured builds." />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="pill bg-white/5">
                  <Filter className="h-4 w-4 text-accent2" />
                  Filters
                </span>
                {['all', 'web', 'dashboard', 'ui', 'experiments'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs border transition',
                      filter === tag
                        ? 'bg-accent text-surface border-transparent'
                        : 'border-white/15 text-white/80 hover:border-white/30',
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-16">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.title} project={project} index={idx} />
              ))}
            </div>
          </section>
        </Element>

        <Element name="experience" className="mt-24 md:mt-32">
          <section className="space-y-8">
            <SectionTitle eyebrow="Experience" title="Momentum over the years." />
            <div className="relative pl-4 md:pl-8">
              <div className="absolute left-1 md:left-5 top-2 bottom-2 w-px bg-white/10" />
              <div className="space-y-8">
                {experience.map((item, idx) => (
                  <ExperienceItem key={item.role} item={item} index={idx} />
                ))}
              </div>
            </div>
          </section>
        </Element>

        <Element name="contact" className="mt-24 md:mt-32 mb-20">
          <section className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div className="space-y-5">
              <SectionTitle eyebrow="Contact" title="Let’s build something vivid." />
              <p className="text-white/70 leading-7">
                Tell me about your product, timeline, and what success looks like. I reply within 48
                hours.
              </p>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5 text-accent2" />
                <a href="mailto:hello@yourname.dev" className="hover:text-white">
                  hello@yourname.dev
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-accent2" />
                Chicago, IL — Remote friendly
              </div>
            </div>

            <Reveal>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass rounded-3xl p-6 border border-white/10 space-y-4"
              >
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm text-white/80 space-y-1">
                  Name
                  <input
                    {...register('name', { required: true })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-sm text-white/80 space-y-1">
                  Email
                  <input
                    {...register('email', { required: true })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                    placeholder="you@email.com"
                    type="email"
                  />
                </label>
              </div>
              <label className="text-sm text-white/80 space-y-1">
                Project
                <input
                  {...register('project')}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  placeholder="Website redesign, SaaS dashboard..."
                />
              </label>
              <label className="text-sm text-white/80 space-y-1">
                Message
                <textarea
                  {...register('message', { required: true })}
                  className="w-full min-h-[140px] rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  placeholder="What are you building?"
                />
              </label>
              <button type="submit" className="btn-primary w-full justify-center">
                Send it
                <Send className="h-4 w-4" />
              </button>
              </form>
            </Reveal>
          </section>
        </Element>
      </main>

      <footer className="max-w-6xl mx-auto px-5 sm:px-8 pb-12 pt-10 text-sm text-white/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Ashwin. Crafted with React & motion.</span>
        <div className="flex gap-3">
          {socials.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white" target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App

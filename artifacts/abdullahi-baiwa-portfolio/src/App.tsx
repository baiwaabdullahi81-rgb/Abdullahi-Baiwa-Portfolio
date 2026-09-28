import { useEffect, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Bug,
  Check,
  ChevronRight,
  CircleAlert,
  Code2,
  Download,
  ExternalLink,
  Facebook,
  FileText,
  Github,
  Globe2,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Palette,
  Phone,
  Radar,
  ScanLine,
  ShieldCheck,
  Terminal,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { profile, type Project } from '@/data/profile';

const queryClient = new QueryClient();

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  return <div className={`reveal ${delay} ${className}`}>{children}</div>;
}

function SectionHeading({ index, kicker, title, detail }: { index: string; kicker: string; title: string; detail?: string }) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[140px_1fr_280px] md:items-end">
      <p className="font-mono-ui text-xs tracking-[.2em] text-[hsl(var(--primary))]">{index} / 06</p>
      <div>
        <p className="mb-3 font-mono-ui text-[10px] uppercase tracking-[.28em] text-[hsl(var(--muted-foreground))]">{kicker}</p>
        <h2 className="font-display text-4xl font-bold tracking-[-.04em] text-[hsl(var(--foreground))] md:text-6xl">{title}</h2>
      </div>
      {detail && <p className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))] md:justify-self-end">{detail}</p>}
    </div>
  );
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" data-testid="link-logo" className="group flex items-center gap-3">
      <span className="relative grid size-9 place-items-center border border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-sm font-bold text-[hsl(var(--foreground))] transition-transform group-hover:-rotate-6">AB</span>
      <span className={`font-display text-sm font-bold tracking-[-.03em] ${inverse ? 'text-[hsl(40_33%_96%)]' : 'text-[hsl(var(--foreground))]'}`}>ABDULLAHI BAIWA</span>
    </a>
  );
}

function Nav({ onCv }: { onCv: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: 'top', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--border)/.75)] bg-[hsl(var(--background)/.88)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => <button key={link.id} onClick={() => go(link.id)} data-testid={`link-nav-${link.id}`} className="font-mono-ui text-[10px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]">{link.label}</button>)}
          <button onClick={onCv} data-testid="button-download-cv" className="flex items-center gap-2 border border-[hsl(var(--foreground))] px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[.15em] transition-colors hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"><Download size={13} /> CV</button>
        </nav>
        <button onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu" className="grid size-10 place-items-center border border-[hsl(var(--border))] md:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      {open && <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-5 md:hidden">
        <div className="grid gap-1">
          {links.map((link) => <button key={link.id} onClick={() => go(link.id)} data-testid={`link-mobile-${link.id}`} className="border-b border-[hsl(var(--border)/.7)] py-3 text-left font-mono-ui text-xs uppercase tracking-[.18em]">{link.label}</button>)}
          <button onClick={() => { setOpen(false); onCv(); }} data-testid="button-mobile-cv" className="mt-3 flex items-center gap-2 py-3 text-left font-mono-ui text-xs uppercase tracking-[.18em] text-[hsl(var(--primary))]"><Download size={14} /> Download CV</button>
        </div>
      </div>}
    </header>
  );
}

function Hero({ onCv }: { onCv: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <section id="top" className="relative overflow-hidden bg-[hsl(210_29%_14%)] text-[hsl(40_33%_96%)]">
      <div className="scanline absolute inset-0 opacity-50" />
      <div className="absolute -right-24 top-20 size-96 rounded-full border border-[hsl(var(--primary)/.35)] opacity-70" />
      <div className="absolute -right-6 top-44 size-64 rounded-full border border-[hsl(var(--accent)/.35)]" />
      <div className="grid-paper absolute inset-0 opacity-[.09]" />
      <div className="relative mx-auto grid min-h-[720px] max-w-[1240px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.18fr_.82fr] lg:px-10 lg:pb-28">
        <div>
          <Reveal><div className="mb-8 flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.2em] text-[hsl(var(--accent))]"><span className="size-2 bg-[hsl(var(--accent))]" /> Based in {profile.location}</div></Reveal>
          <Reveal delay="reveal-delay-1"><p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[hsl(40_18%_68%)]">Hello, It&apos;s Me</p><h1 className="mt-4 max-w-4xl font-display text-6xl font-bold leading-[.94] tracking-[-.065em] sm:text-7xl lg:text-[clamp(4.4rem,7.4vw,7.6rem)]">Build<br /><span className="text-[hsl(var(--primary))]">securely.</span></h1></Reveal>
          <Reveal delay="reveal-delay-2"><p className="mt-8 max-w-xl font-display text-xl font-semibold leading-tight text-[hsl(40_33%_96%)] sm:text-2xl">{profile.primaryTitle}</p><p className="mt-4 max-w-xl text-base leading-7 text-[hsl(40_18%_78%)] sm:text-lg">{profile.tagline}</p></Reveal>
          <Reveal delay="reveal-delay-3"><div className="mt-10 flex flex-wrap items-center gap-3"><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-hire" className="group flex items-center gap-3 bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--foreground))] transition-transform hover:-translate-y-1">Hire Me <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" /></button><button onClick={onCv} data-testid="button-hero-cv" className="flex items-center gap-3 border border-[hsl(40_18%_78%/.35)] px-5 py-3.5 text-sm text-[hsl(40_18%_90%)] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"><FileText size={15} /> Download CV</button><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-about" className="w-full text-left font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(40_18%_66%)] transition-colors hover:text-[hsl(var(--accent))] sm:w-auto sm:px-2">More About Me <ArrowDown size={12} className="ml-1 inline" /></button></div></Reveal>
          <Reveal delay="reveal-delay-4"><div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[hsl(40_18%_78%/.18)] pt-5 font-mono-ui text-[10px] uppercase tracking-[.17em] text-[hsl(40_18%_65%)]">{profile.specialties.slice(0, 4).map((specialty) => <span key={specialty}>{specialty}</span>)}</div></Reveal>
        </div>
        <Reveal delay="reveal-delay-2" className="lg:justify-self-end">
          <div className="relative mx-auto max-w-[360px] lg:mr-3">
            <div className="absolute -inset-3 border border-[hsl(var(--primary)/.4)]" />
            <div className="relative aspect-[4/5] overflow-hidden bg-[hsl(210_22%_20%)]">
              {!imageFailed ? <img src={profile.profileImagePath} alt={`${profile.name} profile`} onError={() => setImageFailed(true)} className="size-full object-cover grayscale mix-blend-luminosity" data-testid="img-profile" /> : <div className="grid size-full content-center justify-items-center gap-5 p-10 text-center"><div className="grid size-28 place-items-center border border-[hsl(var(--accent))] font-display text-4xl font-bold text-[hsl(var(--accent))]">{profile.initials}</div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">Profile image slot</p><p className="mt-3 text-xs leading-5 text-[hsl(40_18%_70%)]">Add <code className="text-[hsl(var(--primary))]">/public/images/profile.jpg</code> to personalize this frame.</p></div></div>}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[hsl(210_29%_14%/.78)] p-4 font-mono-ui text-[9px] uppercase tracking-[.17em]"><span>AB / 2026</span><span className="flex items-center gap-2 text-[hsl(var(--primary))]"><span className="size-1.5 rounded-full bg-[hsl(var(--primary))]" /> Available</span></div>
            </div>
            <div className="absolute -bottom-10 -left-10 hidden border border-[hsl(var(--accent)/.5)] bg-[hsl(210_29%_14%)] px-4 py-3 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[hsl(40_18%_72%)] sm:block"><ScanLine size={14} className="mb-2 text-[hsl(var(--accent))]" /> Think clearly.<br />Build carefully.</div>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-ui text-[9px] uppercase tracking-[.2em] text-[hsl(40_18%_60%)] md:flex"><span className="h-8 w-px bg-[hsl(var(--accent))]" /> Scroll to inspect</div>
    </section>
  );
}

function About() {
  return <section id="about" className="relative overflow-hidden bg-[hsl(var(--background))] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1240px]"><SectionHeading index="01" kicker="A little context" title="Useful curiosity." detail="The best technical work makes the right thing easier to do — and the wrong thing harder to miss." /><div className="grid gap-12 lg:grid-cols-[1fr_.75fr]"><Reveal className="max-w-2xl"><div className="space-y-6 text-lg leading-8 text-[hsl(var(--muted-foreground))]">{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-10 grid gap-3 border-t border-[hsl(var(--border))] pt-6 sm:grid-cols-2">{profile.infoCards.map((card) => <div key={card.label} className="border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.55)] p-5"><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">{card.label}</p><p className="mt-3 font-display text-lg font-bold">{card.value}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{card.detail}</p></div>)}</div></Reveal><Reveal delay="reveal-delay-2" className="lg:justify-self-end"><div className="grid max-w-sm gap-4 border-l-2 border-[hsl(var(--accent))] pl-6"><div className="flex items-center gap-3 text-[hsl(var(--primary))]"><Radar size={18} /><span className="font-mono-ui text-[10px] uppercase tracking-[.18em]">Working principle</span></div><p className="font-display text-3xl font-semibold leading-tight tracking-[-.04em]">“Understand the system before you optimize the surface.”</p><p className="font-mono-ui text-[10px] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">— The standard I bring to a brief</p></div></Reveal></div></div></section>;
}

const serviceIcons: LucideIcon[] = [ShieldCheck, Radar, Code2, Network, Palette, Terminal, Wrench, Bug];

function WhatIDo() {
  return <section id="what-i-do" className="bg-[hsl(210_29%_14%)] px-5 py-24 text-[hsl(40_33%_96%)] sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1240px]"><div className="mb-12 grid gap-5 md:grid-cols-[140px_1fr]"><p className="font-mono-ui text-xs tracking-[.2em] text-[hsl(var(--accent))]">02 / 06</p><div><p className="mb-3 font-mono-ui text-[10px] uppercase tracking-[.28em] text-[hsl(40_18%_62%)]">Technology, security &amp; digital solutions</p><h2 className="font-display text-4xl font-bold tracking-[-.04em] md:text-6xl">What I do.</h2></div></div><div className="grid border-t border-[hsl(40_18%_78%/.2)] sm:grid-cols-2 lg:grid-cols-4">{profile.services.map((service, index) => { const Icon = serviceIcons[index]; return <Reveal key={service.number} delay={`reveal-delay-${(index % 3) + 1}`} className="border-b border-[hsl(40_18%_78%/.2)] sm:border-r"><article className="group min-h-[280px] p-6 transition-colors hover:bg-[hsl(var(--primary)/.1)] lg:p-7"><div className="flex items-start justify-between"><span className="font-mono-ui text-xs text-[hsl(var(--accent))]">{service.number}</span><Icon size={23} strokeWidth={1.4} className="text-[hsl(var(--primary))] transition-transform group-hover:-translate-y-1" /></div><h3 className="mt-16 max-w-[220px] font-display text-xl font-bold leading-tight tracking-[-.04em]">{service.title}</h3><p className="mt-4 text-sm leading-6 text-[hsl(40_18%_72%)]">{service.text}</p></article></Reveal>})}</div></div></section>;
}

function SkillBars({ skills }: { skills: readonly { readonly label: string; readonly value: number }[] }) {
  return <div className="grid gap-6">{skills.map((skill, index) => <Reveal key={skill.label} delay={`reveal-delay-${(index % 3) + 1}`}><div data-testid={`skill-${skill.label.toLowerCase().replace(/[^a-z]+/g, '-')}`}><div className="mb-2 flex items-end justify-between gap-4"><h3 className="font-display text-base font-bold">{skill.label}</h3><span className="font-mono-ui text-sm text-[hsl(var(--primary))]">{skill.value}%</span></div><div className="h-2 bg-[hsl(var(--background))]"><div className="skill-fill h-full w-full bg-[hsl(var(--primary))]" style={{ '--skill-progress': skill.value / 100 } as CSSProperties} /></div></div></Reveal>)}</div>;
}

function Skills() {
  return <section id="skills" className="bg-[hsl(var(--secondary))] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1240px]"><SectionHeading index="03" kicker="Portfolio indicators" title="Skills in practice." detail="These are self-described portfolio indicators, not official certifications or objective industry measurements." /><div className="grid gap-14 lg:grid-cols-2"><Reveal><div className="mb-7 flex items-center gap-3"><Code2 size={18} className="text-[hsl(var(--primary))]" /><h3 className="font-mono-ui text-xs uppercase tracking-[.18em]">Technical Skills</h3></div><SkillBars skills={profile.technicalSkills} /></Reveal><Reveal delay="reveal-delay-2"><div className="mb-7 flex items-center gap-3"><Radar size={18} className="text-[hsl(var(--accent))]" /><h3 className="font-mono-ui text-xs uppercase tracking-[.18em]">Professional Skills</h3></div><SkillBars skills={profile.professionalSkills} /></Reveal></div></div></section>;
}

function ProjectCard({ project }: { project: Project }) {
  const [view, setView] = useState<'overview' | 'case-study'>('overview');
  const [imageFailed, setImageFailed] = useState(false);
  const isReady = project.state === 'demo-available';
  return <Reveal><article className={`group relative overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${project.accent === 'amber' ? 'border-t-[hsl(var(--accent))]' : 'border-t-[hsl(var(--primary))]'} border-t-4`} data-testid={`card-project-${project.id}`}><div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[310px] overflow-hidden bg-[hsl(210_29%_14%)] p-7 text-[hsl(40_33%_96%)] lg:min-h-[390px] lg:p-9">{!imageFailed && <img src={project.imagePath} alt="" aria-hidden="true" onError={() => setImageFailed(true)} className="absolute inset-0 size-full object-cover opacity-20 mix-blend-screen" />}{imageFailed && <div className="grid-paper absolute inset-0 opacity-10" />}<div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[hsl(40_18%_67%)]">{project.eyebrow}</span><span className={`border px-2 py-1 font-mono-ui text-[9px] uppercase tracking-[.15em] ${isReady ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]' : 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'}`}>{isReady ? 'Demo available' : 'Coming soon'}</span></div><div><div className={`mb-5 size-14 border ${isReady ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--accent))]'} p-3`}><div className={`size-full ${isReady ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent))]'}`} /></div><h3 className="font-display text-4xl font-bold tracking-[-.06em] lg:text-5xl">{project.title}</h3><p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[.2em] text-[hsl(40_18%_65%)]">{project.type}</p><p className="mt-3 font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(40_18%_62%)]">Replace with {project.imagePath}</p></div></div></div><div className="flex flex-col p-7 lg:p-9"><div className="mb-7 flex gap-2 border-b border-[hsl(var(--border))] pb-3"><button onClick={() => setView('overview')} data-testid={`button-project-overview-${project.id}`} className={`font-mono-ui text-[10px] uppercase tracking-[.15em] ${view === 'overview' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))'}`}>Overview</button><span className="text-[hsl(var(--border))]">/</span><button onClick={() => setView('case-study')} data-testid={`button-project-case-study-${project.id}`} className={`font-mono-ui text-[10px] uppercase tracking-[.15em] ${view === 'case-study' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))'}`}>Case study</button></div><p className="text-lg leading-8 text-[hsl(var(--foreground))]">{view === 'case-study' ? project.detail : project.description}</p><div className="mt-auto pt-10"><div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="border border-[hsl(var(--border))] px-2.5 py-1.5 font-mono-ui text-[9px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">{tag}</span>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-5"><span className={`flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.12em] ${isReady ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--accent))]'}`}><span className="size-1.5 rounded-full bg-current" /> {project.demoLabel}</span><div className="flex flex-wrap gap-4">{isReady ? <><button onClick={() => setView('overview')} data-testid={`button-view-project-${project.id}`} className="flex items-center gap-2 text-xs font-bold hover:text-[hsl(var(--primary))]">{project.viewProjectLabel} <ExternalLink size={14} /></button><button onClick={() => setView('case-study')} data-testid={`button-case-study-${project.id}`} className="flex items-center gap-2 text-xs font-bold hover:text-[hsl(var(--primary))]">{project.caseStudyLabel} <ArrowUpRight size={14} /></button></> : <span className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{project.viewProjectLabel}</span>}</div></div></div></div></div></article></Reveal>;
}

function Work() {
  return <section id="projects" className="bg-[hsl(var(--background))] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1240px]"><SectionHeading index="04" kicker="Selected work" title="Proof of thinking." detail="A small, honest selection. Each project is shown at the stage it is actually in." /><div className="grid gap-8">{profile.projects.map(project => <ProjectCard key={project.id} project={project} />)}</div></div></section>;
}

function Experience() {
  return <section id="experience" className="bg-[hsl(var(--secondary))] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1240px]"><SectionHeading index="05" kicker="Experience & credentials" title="Practical, not inflated." detail="Approximately two years of hands-on technology experience, shown without invented employers, titles or dates." /><div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr]"><div className="relative border-l border-[hsl(var(--primary)/.45)] pl-7"><Reveal><p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">Approximately 2 years hands-on experience</p><h3 className="mt-3 font-display text-2xl font-bold tracking-[-.04em]">Technology practice across security, software and systems.</h3></Reveal><ul className="mt-8 grid gap-4">{profile.experience.map((item, index) => <Reveal key={item} delay={`reveal-delay-${(index % 3) + 1}`}><li className="relative flex gap-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]"><span className="mt-2 size-2 shrink-0 bg-[hsl(var(--primary))]" />{item}</li></Reveal>)}</ul></div><div className="border-t border-[hsl(var(--border))] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><div className="flex items-center gap-3"><Award size={18} className="text-[hsl(var(--accent))]" /><h3 className="font-display text-xl font-bold">Certificates</h3></div><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Exact certificate names, dates and images can be added to the data file when available.</p><div className="mt-7 grid gap-3">{profile.credentials.map(credential => <div key={credential.label} className="border border-[hsl(var(--border))] bg-[hsl(var(--background)/.5)] p-5"><div className="flex items-start justify-between gap-4"><p className="font-display font-bold">{credential.label}</p><span className="flex shrink-0 items-center gap-1.5 font-mono-ui text-[9px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]"><CircleAlert size={12} /> {credential.status}</span></div><p className="mt-3 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{credential.detail}</p></div>)}</div><div className="mt-3 border border-dashed border-[hsl(var(--border))] p-4 font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><GraduationCap size={14} className="mr-2 inline text-[hsl(var(--primary))]" /> Add certificate details in <code>src/data/profile.ts</code></div><div className="mt-8 border-t border-[hsl(var(--border))] pt-6"><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">Awards</p><p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">More achievements coming soon.</p></div></div></div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Use a valid email address.';
    if (form.message.trim().length < 20) next.message = 'Tell me a little more — at least 20 characters.';
    setErrors(next);
    if (Object.keys(next).length) { setStatus('error'); return; }
    setStatus('success');
  };
  return <section id="contact" className="relative overflow-hidden bg-[hsl(210_29%_14%)] px-5 py-24 text-[hsl(40_33%_96%)] sm:px-8 lg:px-10 lg:py-32"><div className="grid-paper absolute inset-0 opacity-[.08]" /><div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.9fr_1.1fr]"><Reveal><p className="font-mono-ui text-[10px] uppercase tracking-[.25em] text-[hsl(var(--accent))]">Get in touch</p><h2 className="mt-5 max-w-lg font-display text-5xl font-bold leading-[.94] tracking-[-.06em]">Let&apos;s Build Something Secure</h2><p className="mt-7 max-w-md text-sm leading-7 text-[hsl(40_18%_72%)]">I&apos;m open to discussing cybersecurity, web development, networking, technical support and digital projects.</p><div className="mt-10 space-y-4 border-t border-[hsl(40_18%_78%/.18)] pt-6"><a href={`mailto:${profile.email}`} data-testid="link-contact-email" className="flex items-center gap-3 text-sm transition-colors hover:text-[hsl(var(--accent))]"><Mail size={16} className="text-[hsl(var(--accent))]" /> {profile.email}</a><a href={`tel:${profile.phone}`} data-testid="link-contact-phone" className="flex items-center gap-3 text-sm text-[hsl(40_18%_72%)] transition-colors hover:text-[hsl(var(--accent))]"><Phone size={16} className="text-[hsl(var(--primary))]" /> {profile.phone}</a><div className="flex items-center gap-3 text-sm text-[hsl(40_18%_72%)]"><MapPin size={16} className="text-[hsl(var(--primary))]" /> {profile.location}</div></div></Reveal><Reveal delay="reveal-delay-2"><form onSubmit={submit} noValidate className="border border-[hsl(40_18%_78%/.25)] bg-[hsl(210_22%_18%/.75)] p-6 sm:p-8" data-testid="form-contact"><div className="grid gap-6 sm:grid-cols-2"><Field label="Your name" id="name" value={form.name} error={errors.name} onChange={value => setForm({ ...form, name: value })} /><Field label="Email address" id="email" type="email" value={form.email} error={errors.email} onChange={value => setForm({ ...form, email: value })} /></div><div className="mt-6"><Field label="Message" id="message" value={form.message} error={errors.message} onChange={value => setForm({ ...form, message: value })} textarea /></div>{status === 'success' && <div className="mt-6 flex gap-3 border border-[hsl(var(--primary)/.55)] bg-[hsl(var(--primary)/.1)] p-4 text-sm leading-6 text-[hsl(40_18%_87%)]" role="status" data-testid="status-contact-success"><Check size={18} className="mt-1 shrink-0 text-[hsl(var(--primary))]" /><span><strong className="text-[hsl(var(--primary))]">Form checked.</strong> Submission is not configured yet, so nothing was sent. Please email directly for now.</span></div>}{status === 'error' && Object.keys(errors).length > 0 && <p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--accent))]" role="alert" data-testid="status-contact-error">Check the highlighted fields above.</p>}<button type="submit" data-testid="button-submit-contact" className="mt-7 flex w-full items-center justify-center gap-3 bg-[hsl(var(--accent))] px-5 py-4 text-sm font-bold text-[hsl(var(--foreground))] transition-transform hover:-translate-y-1">Send Message <ChevronRight size={17} /></button><p className="mt-4 text-center font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(40_18%_55%)]">No tracking · no hidden submission</p></form></Reveal></div></section>;
}

function Field({ label, id, value, onChange, error, type = 'text', textarea = false }: { label: string; id: string; value: string; onChange: (value: string) => void; error?: string; type?: string; textarea?: boolean }) {
  const common = { id, name: id, value, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value), 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined, 'data-testid': `input-${id}`, className: `mt-2 w-full border bg-transparent px-3 py-3 text-sm text-[hsl(40_33%_96%)] outline-none transition-colors placeholder:text-[hsl(40_18%_50%)] focus:border-[hsl(var(--primary))] ${error ? 'border-[hsl(var(--accent))]' : 'border-[hsl(40_18%_78%/.3)]'}` };
  return <label htmlFor={id} className="block font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(40_18%_68%)]">{label}{textarea ? <textarea {...common} rows={5} placeholder="A few useful details..." /> : <input {...common} type={type} placeholder={id === 'name' ? 'Your name' : 'you@example.com'} />}{error && <span id={`${id}-error`} className="mt-2 block font-mono-ui text-[9px] normal-case tracking-normal text-[hsl(var(--accent))]">{error}</span>}</label>;
}

function Footer({ onCv }: { onCv: () => void }) {
  return <footer className="bg-[hsl(210_29%_14%)] px-5 pb-10 pt-8 text-[hsl(40_18%_72%)] sm:px-8 lg:px-10"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-7 border-t border-[hsl(40_18%_78%/.2)] pt-8 md:flex-row md:items-end"><div><Logo inverse /><p className="mt-5 max-w-xs text-xs leading-5">A technically curious builder from Bida, creating clearer, safer digital systems.</p></div><div className="flex flex-wrap items-center gap-5"><a href="https://www.instagram.com/naijaradartv" target="_blank" rel="noreferrer" data-testid="link-instagram" className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.13em] transition-colors hover:text-[hsl(var(--accent))]"><Instagram size={14} /> @naijaradartv</a><a href="https://www.tiktok.com/@naijaradartv" target="_blank" rel="noreferrer" data-testid="link-tiktok" className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.13em] transition-colors hover:text-[hsl(var(--accent))]"><span className="text-sm leading-none">♪</span> @naijaradartv</a><span data-testid="link-facebook" className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.13em]"><Facebook size={14} /> Dev by Abdul</span><span title="GitHub profile not created yet" data-testid="link-github-placeholder" className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.13em] text-[hsl(40_18%_48%)]"><Github size={14} /> GitHub soon</span><button onClick={onCv} data-testid="button-footer-cv" className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.13em] transition-colors hover:text-[hsl(var(--accent))]"><FileText size={14} /> CV status</button></div></div><div className="mt-12 flex flex-col justify-between gap-2 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[hsl(40_18%_48%)] sm:flex-row"><span>© {new Date().getFullYear()} {profile.shortName}</span><span>Built with care / No invented claims</span></div></div></footer>;
}

function Home() {
  const [notice, setNotice] = useState('');
  const showCv = () => {
    setNotice(`CV file not configured yet. Add ${profile.cvPath} to the public folder to enable downloads.`);
    window.setTimeout(() => setNotice(''), 6000);
  };
  useEffect(() => {
    document.title = 'Abdullahi Dangana Baiwa | Cybersecurity & Web Developer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Abdullahi Dangana Baiwa is a cybersecurity-focused web developer and networking enthusiast from Bida, Niger State, Nigeria, working across cybersecurity, ethical hacking, web development, networking, Linux, UI/UX and technical support.');
  }, []);
  return <div className="noise min-h-[100dvh] overflow-x-hidden"><Nav onCv={showCv} /><main><Hero onCv={showCv} /><About /><WhatIDo /><Skills /><Work /><Experience /><Contact /></main><Footer onCv={showCv} /><a href={profile.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Abdullahi on WhatsApp" data-testid="link-whatsapp" className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[0_8px_24px_rgba(18,105,99,.28)] transition-transform hover:-translate-y-1"><MessageCircle size={23} /></a>{notice && <div role="status" data-testid="status-cv-missing" className="fixed bottom-5 left-5 z-40 flex max-w-sm items-start gap-3 border border-[hsl(var(--accent))] bg-[hsl(210_29%_14%)] p-4 text-xs leading-5 text-[hsl(40_33%_96%)] shadow-xl"><CircleAlert size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss notice" data-testid="button-dismiss-notice"><X size={15} /></button></div>}</div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
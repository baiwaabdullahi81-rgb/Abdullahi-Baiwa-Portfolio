import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Bug,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Code2,
  Download,
  ExternalLink,
  Facebook,
  FileText,
  Folder,
  Github,
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
  ShieldCheck,
  Terminal,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import { profile, type Project } from '@/data/profile';

const serviceIcons: LucideIcon[] = [ShieldCheck, Radar, Code2, Network, Palette, Terminal, Wrench, Bug];

const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const typingPhrases = [
  'A CYBERSECURITY STUDENT',
  'A WEB DEVELOPER',
  'A NETWORKING SPECIALIST',
  'A UI/UX DESIGNER',
  'AN ETHICAL HACKER',
];

function useSectionVisibility<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible, hasEntered };
}

function useTypewriter(phrases: readonly string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const isComplete = text === phrase;
    const isEmpty = text.length === 0;
    const delay = isComplete && !deleting ? 1500 : isEmpty && deleting ? 450 : deleting ? 52 : 82;
    const timer = window.setTimeout(() => {
      if (!deleting && !isComplete) {
        setText(phrase.slice(0, text.length + 1));
      } else if (!deleting && isComplete) {
        setDeleting(true);
      } else if (deleting && !isEmpty) {
        setText(text.slice(0, -1));
      } else {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, phrases, text]);

  return text;
}

function useAnimatedValue(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const startedAt = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Logo() {
  return (
    <a href="#top" className="site-logo" data-testid="link-logo" aria-label="Return to home">
      <span className="logo-mark">AB</span>
      <span className="logo-word">Portfolio</span>
    </a>
  );
}

function Nav({ onCv }: { onCv: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              data-testid={`link-nav-${link.id}`}
              className={active === link.id ? 'nav-link active' : 'nav-link'}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
          className="mobile-menu-button"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              data-testid={`link-mobile-${link.id}`}
              className={active === link.id ? 'mobile-nav-link active' : 'mobile-nav-link'}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onCv(); }} data-testid="button-mobile-cv" className="mobile-nav-link cv-link">
            <Download size={16} /> Download CV
          </button>
        </div>
      )}
    </header>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  const links = [
    { label: 'Instagram', short: 'ig', href: 'https://www.instagram.com/naijaradartv', icon: <Instagram size={18} /> },
    { label: 'TikTok', short: '♪', href: 'https://www.tiktok.com/@naijaradartv', icon: <span className="social-letter">♪</span> },
    { label: 'WhatsApp', short: 'wa', href: profile.whatsappUrl, icon: <MessageCircle size={18} /> },
    { label: 'Email', short: '@', href: `mailto:${profile.email}`, icon: <Mail size={18} /> },
    { label: 'Facebook · Dev by Abdul', short: 'f', icon: <Facebook size={18} /> },
    { label: 'GitHub profile not created yet', short: 'gh', icon: <Github size={18} /> },
  ];
  return (
    <div className={compact ? 'social-links compact' : 'social-links'} aria-label="Social links">
      {links.map((link) => link.href ? (
        <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} aria-label={link.label} className="social-link">
          {link.icon}
        </a>
      ) : (
        <span key={link.label} aria-label={link.label} title={link.label} className="social-link disabled">
          {link.icon}
        </span>
      ))}
    </div>
  );
}

function Hero({ onCv }: { onCv: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);
  const typedPhrase = useTypewriter(typingPhrases);
  return (
    <section id="top" className="hero section-grid">
      <div className="shell hero-inner">
        <div className="hero-copy reveal">
          <p className="hero-kicker">Hello, It&apos;s Me</p>
          <h1 className="hero-name">
            Abdullahi <span>Baiwa</span>
          </h1>
          <h2 className="hero-role" aria-live="polite">And I&apos;m <span>{typedPhrase}</span><i className="typewriter-cursor" aria-hidden="true" /></h2>
          <p className="hero-description">
            Cybersecurity, web development, networking, ethical hacking and digital solutions built with clarity, care and practical problem solving.
          </p>
          <SocialLinks />
          <div className="hero-actions">
            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-about" className="button button-primary">
              More About Me
            </button>
            <button onClick={onCv} data-testid="button-hero-cv" className="button button-outline">
              Download CV
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-hire" className="hero-hire-link">
              Hire Me <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="hero-visual reveal reveal-delay-2">
          <div className="photo-ring">
            <div className="photo-inner">
              {!imageFailed ? (
               <img src={profile.profileImagePath} alt={`${profile.name} profile`} loading="eager" decoding="async" onError={() => setImageFailed(true)} data-testid="img-profile" />
              ) : (
                <div className="profile-fallback">
                  <span>{profile.initials}</span>
                  <small>Profile image slot</small>
                  <p>Add <code>/public/images/profile.jpg</code> later.</p>
                </div>
              )}
            </div>
          </div>
          <p className="photo-caption">Based in {profile.location}</p>
        </div>
      </div>
      <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="scroll-cue" aria-label="Scroll to About">
        <span>Scroll down</span>
        <ChevronDown size={22} />
      </button>
    </section>
  );
}

function About() {
  const [imageFailed, setImageFailed] = useState(false);
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
  return (
    <section ref={ref} id="about" className={`content-section section-grid section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell about-layout">
        <div className="section-title">
          <GraduationCap className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>About <span>Me</span></h2>
          <span className="title-line" />
        </div>
        <div className="about-profile">
          <div className="about-photo-ring">
            <div className="photo-inner">
               {!imageFailed ? <img src={profile.secondaryProfileImagePath} alt={`${profile.name} alternate profile`} loading="lazy" decoding="async" onError={() => setImageFailed(true)} /> : <div className="profile-fallback"><span>{profile.initials}</span></div>}
            </div>
          </div>
          <h3>Cybersecurity Specialist &amp; Web Developer</h3>
          <p className="about-lead">I work where secure systems, useful software and clear technical thinking meet.</p>
        </div>
        <div className="about-body">
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="info-grid">
            {profile.infoCards.map((card) => (
              <div key={card.label} className="info-card">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.detail}</small>
              </div>
            ))}
          </div>
          <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="text-action">
            See My Skills <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
  return (
    <section ref={ref} id="what-i-do" className={`content-section section-grid section-tint section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell">
        <div className="section-title">
          <BriefcaseBusiness className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>What I <span>Do</span></h2>
          <span className="title-line" />
          <p>SECURITY, SOFTWARE &amp; DIGITAL SOLUTIONS</p>
        </div>
        <div className="services-grid">
          {profile.services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.number} className="service-card reveal" style={{ '--delay': `${(index % 4) * 60}ms` } as CSSProperties}>
                <div className="service-top"><span>{service.number}</span></div>
                <div className="service-icon"><Icon size={46} strokeWidth={1.7} aria-hidden="true" /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillBars({ skills, visible }: { skills: readonly { readonly label: string; readonly value: number }[]; visible: boolean }) {
  return (
    <div className="skill-bars">
      {skills.map((skill, index) => (
        <SkillBar key={skill.label} skill={skill} index={index} visible={visible} />
      ))}
    </div>
  );
}

function SkillBar({ skill, index, visible }: { skill: { readonly label: string; readonly value: number }; index: number; visible: boolean }) {
  const animatedValue = useAnimatedValue(skill.value, visible);
  return (
    <div className="skill-row reveal" style={{ '--delay': `${index * 50}ms` } as CSSProperties} data-testid={`skill-${skill.label.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
      <div className="skill-label"><span>{skill.label}</span><strong>{Math.round(animatedValue)}%</strong></div>
      <div className="bar-track"><div className="bar-fill" style={{ width: `${animatedValue}%` }} /></div>
    </div>
  );
}

function SkillRing({ label, value, visible }: { label: string; value: number; visible: boolean }) {
  const circumference = 2 * Math.PI * 42;
  const animatedValue = useAnimatedValue(value, visible);
  return (
    <div className="skill-ring-wrap reveal">
      <div className="skill-ring">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="ring-base" cx="50" cy="50" r="42" />
          <circle className="ring-value" cx="50" cy="50" r="42" style={{ '--ring-length': circumference, '--ring-progress': circumference * (animatedValue / 100) } as CSSProperties} />
        </svg>
        <strong>{Math.round(animatedValue)}%</strong>
      </div>
      <span>{label}</span>
    </div>
  );
}

function Skills() {
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
  return (
    <section ref={ref} id="skills" className={`content-section section-grid section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell">
        <div className="section-title">
          <Code2 className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>My <span>Skills</span></h2>
          <span className="title-line" />
          <p>SELF-DESCRIBED PORTFOLIO INDICATORS</p>
        </div>
        <div className="skills-layout">
          <div>
            <h3 className="subsection-title">Technical Skills</h3>
            <SkillBars skills={profile.technicalSkills} visible={hasEntered} />
          </div>
          <div>
            <h3 className="subsection-title">Professional Skills</h3>
            <div className="rings-grid">
              {profile.professionalSkills.map((skill) => <SkillRing key={skill.label} label={skill.label} value={skill.value} visible={hasEntered} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [view, setView] = useState<'overview' | 'case-study'>('overview');
  const [imageFailed, setImageFailed] = useState(false);
  const isReady = project.state === 'demo-available';
  return (
    <article className={`project-card ${project.accent === 'amber' ? 'project-amber' : ''} reveal`} data-testid={`card-project-${project.id}`}>
      <div className="project-icon">{isReady ? <BriefcaseBusiness size={24} /> : <ShieldCheck size={24} />}</div>
       {!imageFailed && <img src={project.imagePath} alt="" aria-hidden="true" loading="lazy" decoding="async" onError={() => setImageFailed(true)} className="project-image" />}
      <div className="project-meta">{project.eyebrow} <span>{isReady ? 'Demo available' : 'Coming soon'}</span></div>
      <h3>{project.title}</h3>
      <p className="project-type">{project.type}</p>
      <p className="project-description">{view === 'case-study' ? project.detail : project.description}</p>
      <div className="tag-list">{project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="project-actions">
        {isReady ? (
          <>
            <button onClick={() => setView('overview')} data-testid={`button-view-project-${project.id}`}>{project.viewProjectLabel} <ExternalLink size={14} /></button>
            <button onClick={() => setView('case-study')} data-testid={`button-case-study-${project.id}`}>{project.caseStudyLabel} <ArrowUpRight size={14} /></button>
          </>
        ) : (
          <span>{project.viewProjectLabel}</span>
        )}
      </div>
      <div className="project-tabs" aria-label={`${project.title} content view`}>
        <button onClick={() => setView('overview')} data-testid={`button-project-overview-${project.id}`} className={view === 'overview' ? 'selected' : ''}>Overview</button>
        <button onClick={() => setView('case-study')} data-testid={`button-project-case-study-${project.id}`} className={view === 'case-study' ? 'selected' : ''}>Case study</button>
      </div>
    </article>
  );
}

function Work() {
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
  return (
    <section ref={ref} id="projects" className={`content-section section-grid section-tint section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell">
        <div className="section-title">
          <Folder className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>My <span>Projects</span></h2>
          <span className="title-line" />
          <p>SELECTED WORK, SHOWN HONESTLY</p>
        </div>
        <div className="projects-grid">{profile.projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </div>
    </section>
  );
}

function Experience() {
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
  return (
    <section ref={ref} id="experience" className={`content-section section-grid section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell">
        <div className="section-title">
          <BriefcaseBusiness className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>Experience <span>&amp; Credentials</span></h2>
          <span className="title-line" />
        </div>
        <div className="credentials-grid">
          <div className="credential-column">
            <h3 className="subsection-title"><BriefcaseBusiness size={19} /> Professional Experience</h3>
            <ul className="bullet-list">
              {profile.experience.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="credential-column">
            <h3 className="subsection-title"><Award size={19} /> Certificates</h3>
            <div className="credential-list">
              {profile.credentials.map((credential) => (
                <div key={credential.label} className="credential-item">
                  <strong>{credential.label}</strong>
                  <span>{credential.status}</span>
                  <p>{credential.detail}</p>
                </div>
              ))}
            </div>
            <p className="data-note"><GraduationCap size={15} /> Add exact details in <code>src/data/profile.ts</code>.</p>
          </div>
          <div className="credential-column">
            <h3 className="subsection-title"><Award size={19} /> Awards</h3>
            <div className="empty-state">
              <CircleAlert size={18} />
              <strong>More achievements coming soon.</strong>
              <p>No awards have been added until verified details are available.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, value, onChange, error, type = 'text', textarea = false }: { label: string; id: string; value: string; onChange: (value: string) => void; error?: string; type?: string; textarea?: boolean }) {
  const common = {
    id,
    name: id,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    'data-testid': `input-${id}`,
  };
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      {textarea ? <textarea {...common} rows={6} placeholder="A few useful details..." /> : <input {...common} type={type} placeholder={id === 'name' ? 'Your name' : 'you@example.com'} />}
      {error && <small id={`${id}-error`}>{error}</small>}
    </label>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, hasEntered } = useSectionVisibility<HTMLElement>();
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
  return (
    <section ref={ref} id="contact" className={`content-section section-grid section-tint contact-section section-reveal ${hasEntered ? 'is-visible' : ''}`}>
      <div className="shell">
        <div className="section-title">
          <Mail className="section-icon" size={48} strokeWidth={1.7} aria-hidden="true" />
          <h2>Get In <span>Touch</span></h2>
          <span className="title-line" />
          <p>I&apos;M OPEN TO DISCUSSING NEW OPPORTUNITIES AND INTERESTING PROJECTS</p>
        </div>
        <div className="contact-layout">
          <div className="contact-details">
            <h3>Let&apos;s Connect</h3>
            <a href={`mailto:${profile.email}`} data-testid="link-contact-email"><Mail size={18} />{profile.email}</a>
             <a href={`tel:${profile.phone}`} data-testid="link-contact-phone"><Phone size={18} />{profile.phone}</a>
             <a href={profile.whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><MessageCircle size={18} />WhatsApp</a>
            <div><MapPin size={18} />{profile.location}</div>
            <h4>Follow Me</h4>
            <SocialLinks compact />
          </div>
          <form onSubmit={submit} noValidate className="contact-form" data-testid="form-contact">
            <div className="form-grid">
              <Field label="Your name" id="name" value={form.name} error={errors.name} onChange={(value) => setForm({ ...form, name: value })} />
              <Field label="Email address" id="email" type="email" value={form.email} error={errors.email} onChange={(value) => setForm({ ...form, email: value })} />
            </div>
            <Field label="Message" id="message" value={form.message} error={errors.message} onChange={(value) => setForm({ ...form, message: value })} textarea />
            {status === 'success' && <div className="form-status success" role="status" data-testid="status-contact-success"><Check size={18} /><span><strong>Form checked.</strong> Submission is not configured yet, so nothing was sent. Please email directly for now.</span></div>}
            {status === 'error' && Object.keys(errors).length > 0 && <p className="form-error" role="alert" data-testid="status-contact-error">Check the highlighted fields above.</p>}
            <button type="submit" data-testid="button-submit-contact" className="button button-primary submit-button">Send Message <ChevronRight size={17} /></button>
            <p className="form-note">No tracking · no hidden submission</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ onCv }: { onCv: () => void }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div><Logo /><p>© {new Date().getFullYear()} {profile.shortName} · Built with care and no invented claims.</p></div>
        <div className="footer-actions">
          <button onClick={onCv} data-testid="button-footer-cv"><FileText size={15} /> CV status</button>
          <a href="#top" data-testid="link-back-to-top">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const showCv = () => {
    const link = document.createElement('a');
    link.href = profile.cvPath;
    link.download = 'Abdullahi-Dangana-Baiwa-CV.pdf';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  useEffect(() => {
    document.title = 'Abdullahi Dangana Baiwa | Cybersecurity & Web Developer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Abdullahi Dangana Baiwa is a cybersecurity-focused web developer and networking enthusiast from Bida, Niger State, Nigeria, working across cybersecurity, ethical hacking, web development, networking, Linux, UI/UX and technical support.');
    const hashId = window.location.hash.slice(1);
    if (hashId) window.requestAnimationFrame(() => document.getElementById(hashId)?.scrollIntoView());
  }, []);
  return (
    <div className="reference-portfolio">
      <Nav onCv={showCv} />
      <main>
        <Hero onCv={showCv} />
        <About />
        <WhatIDo />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer onCv={showCv} />
      <a href={profile.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Abdullahi on WhatsApp" data-testid="link-whatsapp" className="floating-whatsapp"><MessageCircle size={23} /></a>
    </div>
  );
}

export default Home;
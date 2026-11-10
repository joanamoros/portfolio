// src/pages/Home.tsx
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaInstagram, FaTiktok, FaGamepad,
  FaTv, FaDumbbell, FaChess, FaStrava, FaSpotify, FaJava, FaArrowRight, FaArrowDown, FaMapMarkerAlt,
} from "react-icons/fa";
import {
  SiThreads, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiGnubash, SiC,
  SiCplusplus, SiDotnet, SiPhp, SiReact, SiMysql, SiR,
} from "react-icons/si";
import emailjs from "@emailjs/browser";
import Reveal from "../components/Reveal";
import ProjectCarousel from "../components/ProjectCarousel";
import type { Project } from "../components/ProjectCarousel";
import avatarImg from "../assets/avatar.jpg";

// ── Tech stack ──────────────────────────────────────────────────────────────
// Iconos servidos desde el propio bundle (react-icons), sin peticiones externas.
interface Tech {
  name: string;
  icon: ReactNode;
}

const techGroups: { title: string; items: Tech[] }[] = [
  {
    title: "Lenguajes",
    items: [
      { name: "Java", icon: <FaJava /> },
      { name: "Python", icon: <SiPython /> },
      { name: "C", icon: <SiC /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "C#", icon: <SiDotnet /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "R", icon: <SiR /> },
      { name: "Bash", icon: <SiGnubash /> },
    ],
  },
  {
    title: "Web",
    items: [
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React", icon: <SiReact /> },
    ],
  },
  {
    title: "Datos",
    items: [{ name: "SQL", icon: <SiMysql /> }],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────
const featuredProjects: Project[] = [
  {
    title: "DNS Cache Viewer",
    description: "Herramienta para visualizar y analizar la caché DNS del sistema, facilitando la inspección y depuración de resoluciones de dominio.",
    techStack: ["Python", "Bash"],
    githubLink: "https://github.com/joanamoros/Trabajo-Fin-de-Grado",
  },
  {
    title: "Sistema de tickets turísticos",
    description: "Simulación de un sistema de venta de entradas turísticas, con diseño de base de datos relacional y lógica PL/SQL.",
    techStack: ["PL/SQL", "Oracle"],
    githubLink: "https://github.com/joanamoros/Proyecto-Grupal-DGBD",
  },
  {
    title: "Taller de Motocicletas en PHP",
    description: "Prácticas de la asignatura Desarrollo de Aplicaciones en Internet",
    techStack: ["PHP", "Laravel"],
    githubLink: "https://github.com/joanamoros/Practicas-DAI",
  },
  {
    title: "Java (POO)",
    description: "Prácticas de la asignatura Programación Orientada a Objetos",
    techStack: ["Java"],
    githubLink: "https://github.com/joanamoros/Programacion-Orientada-a-Objetos",
  },
  {
    title: "Pseudo DB",
    description: "Implementación de una base de datos simplificada en C, aplicando estructuras de datos, gestión de memoria dinámica y manejo de archivos.",
    techStack: ["C"],
    githubLink: "https://github.com/joanamoros/PseudoDB",
  },
];

// ── Experiencia ──────────────────────────────────────────────────────────────
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    role: "Prácticas extracurriculares",
    company: "NTT DATA Europe & Latam",
    period: "Octubre 2026 — Presente",
    description: "Diseño y ejecución de pruebas de software, automatización de tests y pruebas de rendimiento (performance) para asegurar la calidad de las aplicaciones.",
  },
  {
    role: "Prácticas extracurriculares",
    company: "VirtualDeploy S.L.",
    period: "Agosto 2026 — Septiembre 2026",
    description: "Asistencia técnica, desarrollo y optimización de software e integración de APIs para el consumo, procesamiento y almacenamiento de datos de servicios externos.",
  },
];

// ── "Beyond code" links ───────────────────────────────────────────────────────
const beyondLinks = [
  { label: "Instagram",  href: "https://www.instagram.com/_johan023/",  icon: <FaInstagram /> },
  { label: "TikTok",     href: "https://www.tiktok.com/@joanamoros23",     icon: <FaTiktok /> },
  { label: "Threads",    href: "https://www.threads.com/@_johan023",    icon: <SiThreads /> },
  { label: "Strava",     href: "https://www.strava.com/athletes/74996691",     icon: <FaStrava /> },
  { label: "Spotify",    href: "https://open.spotify.com/user/31nnarz6qcbgz42zba24ea3cwpya", icon: <FaSpotify /> },
  { label: "Clash Royale", href: "https://statsroyale.com/es/profile/J9JVGQJC",                     icon: <FaGamepad /> },
  { label: "Clash of Clans", href: "https://www.clashofstats.com/players/johan23-L2PLLJLQU/summary",                   icon: <FaGamepad /> },
  { label: "Brawl Stars", href: "https://brawlify.com/player/8YYQGL0Q8",                      icon: <FaGamepad /> },
  { label: "IMDb",       href: "https://www.imdb.com/es-es/user/ur184233438/",       icon: <FaTv /> },
  { label: "Hevy",       href: "https://hevy.com/user/joan_amoros",       icon: <FaDumbbell /> },
  { label: "Chess",      href: "https://www.chess.com/member/johan023",      icon: <FaChess /> },
];

const CV_URL = "/CV-noviembre-2026.pdf";
const EMAIL = "joanamorosramirez@gmail.com";

// Cabecera de sección reutilizable: número + rótulo + título
function SectionHeading({ index, label, title, children }: { index: string; label: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <p className="section-label">
        <span className="section-index">{index}</span>
        <span aria-hidden="true" className="section-rule" />
        {label}
      </p>
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    // Validación nativa del navegador (mensajes accesibles y localizados)
    if (!form.reportValidity()) return;
    setFormState("sending");
    try {
      await emailjs.sendForm(
        "service_2zj7e45",
        "template_8a4z64g",
        form,
        "jB5-_FJFa1Q98qkUN"
      );
      setFormState("ok");
      form.reset();
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="inicio" className="hero-section">
        <div className="hero-content">
          <div className="hero-meta enter" style={{ "--d": 0 } as React.CSSProperties}>
            <img src={avatarImg} alt="Joan Amorós" className="hero-avatar" width={56} height={56} />
            <div className="hero-meta-text">
              <span className="location">
                <FaMapMarkerAlt aria-hidden="true" /> Elche, Alicante · España
              </span>
            </div>
          </div>

          <h1 className="enter" style={{ "--d": 1 } as React.CSSProperties}>
            <span className="hero-eyebrow">Hola, soy</span>
            Joan <span className="hero-accent">Amorós</span>
          </h1>

          <p className="hero-subtitle enter" style={{ "--d": 2 } as React.CSSProperties}>
            <strong>Junior QA Engineer</strong> en NTT DATA
            <span className="hero-focus">
              <span>Software Testing</span>
              <span>Test Automation</span>
              <span>Performance</span>
            </span>
          </p>

          <div className="hero-actions enter" style={{ "--d": 3 } as React.CSSProperties}>
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos <FaArrowRight className="btn-icon" aria-hidden="true" />
            </a>
            <a href={CV_URL} download className="btn btn-outline">
              <FaFilePdf aria-hidden="true" /> Descargar CV
            </a>
            <div className="hero-social">
              <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <a href="#sobre-mi" className="scroll-cue" aria-label="Ir a la sección Sobre mí">
          <span>Scroll</span>
          <FaArrowDown aria-hidden="true" />
        </a>
      </section>

      {/* ── SOBRE MÍ ─────────────────────────────────────────────────────── */}
      <section id="sobre-mi" className="section">
        <Reveal className="section-inner">
          <SectionHeading index="01" label="Sobre mí" title="¿Quién soy?" />
          <div className="section-body">
            <p className="about-text">
              Graduado en Ingeniería Informática y actualmente cursando el Máster en Ciencia de Datos. Actualmente hago prácticas como Junior QA Engineer en NTT DATA, centradas en el diseño y la ejecución de pruebas, la automatización y el rendimiento. Tengo experiencia en Java, Python y bases de datos, e interés en el machine learning y en construir sistemas fiables y eficientes.
            </p>
            <dl className="facts">
              <div>
                <dt>Formación</dt>
                <dd>Graduado en Ingeniería Informática</dd>
              </div>
              <div>
                <dt>Cursando</dt>
                <dd>Máster en Ciencia de Datos</dd>
              </div>
              <div>
                <dt>Ahora</dt>
                <dd>Junior QA Engineer en NTT DATA</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section id="habilidades" className="section">
        <Reveal className="section-inner">
          <SectionHeading index="02" label="Tecnologías" title="Tech Stack" />
          <div className="section-body stack-groups">
            {techGroups.map((group) => (
              <div key={group.title} className="stack-group">
                <h3 className="stack-group-title">{group.title}</h3>
                <ul className="tech-grid">
                  {group.items.map((tech) => (
                    <li key={tech.name} className="tech-chip">
                      <span className="tech-chip-icon" aria-hidden="true">{tech.icon}</span>
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── EXPERIENCIA ──────────────────────────────────────────────────── */}
      <section id="experiencia" className="section">
        <Reveal className="section-inner">
          <SectionHeading index="03" label="Trayectoria" title="Experiencia" />
          <ol className="section-body timeline">
            {experience.map((item, index) => (
              <li key={index} className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <p className="timeline-date">{item.period}</p>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ── PROYECTOS ────────────────────────────────────────────────────── */}
      <section id="proyectos" className="section">
        <Reveal className="section-inner">
          <SectionHeading index="04" label="Trabajo" title="Proyectos destacados">
            <p className="section-note">{featuredProjects.length} proyectos · código abierto en GitHub</p>
          </SectionHeading>

          <div className="section-body">
            <ProjectCarousel projects={featuredProjects} />
          </div>
        </Reveal>
      </section>

      {/* ── MÁS ALLÁ DEL CÓDIGO ──────────────────────────────────────────── */}
      <section id="otros" className="section">
        <Reveal className="section-inner">
          <SectionHeading index="05" label="Personal" title="Más allá del teclado">
            <p className="section-note">
              Porque la vida no es solo commits y pull requests — aquí hay un poco más de mí.
            </p>
          </SectionHeading>
          <ul className="section-body beyond-grid">
            {beyondLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beyond-link"
                >
                  <span className="beyond-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────────────── */}
      <section id="contacto" className="section section--contact">
        <Reveal className="section-inner">
          <SectionHeading index="06" label="Contacto" title="Hablemos">
            <p className="section-note">
              ¿Tienes una propuesta, un proyecto o una pregunta? Escríbeme y te respondo lo antes posible.
            </p>
          </SectionHeading>

          <div className="section-body contact-layout">
            <ul className="contact-links">
              <li>
                <a href={`mailto:${EMAIL}`} className="contact-link">
                  <FaEnvelope aria-hidden="true" />
                  <span className="contact-link-text">
                    <span className="contact-link-label">Email</span>
                    <span className="contact-link-value">{EMAIL}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaLinkedin aria-hidden="true" />
                  <span className="contact-link-text">
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">Joan Amorós Ramírez</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaGithub aria-hidden="true" />
                  <span className="contact-link-text">
                    <span className="contact-link-label">GitHub</span>
                    <span className="contact-link-value">@joanamoros</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={CV_URL} download className="contact-link">
                  <FaFilePdf aria-hidden="true" />
                  <span className="contact-link-text">
                    <span className="contact-link-label">Currículum</span>
                    <span className="contact-link-value">Descargar CV (PDF)</span>
                  </span>
                </a>
              </li>
            </ul>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Nombre</label>
                  <input id="contactName" type="text" name="name" placeholder="Tu nombre" autoComplete="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email <span className="req" aria-hidden="true">*</span></label>
                  <input id="contactEmail" type="email" name="email" placeholder="tu@email.com" autoComplete="email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contactMsg">Mensaje <span className="req" aria-hidden="true">*</span></label>
                <textarea id="contactMsg" name="message" rows={5} placeholder="Cuéntame en qué puedo ayudarte..." required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={formState === "sending"}>
                  <span className={`btn-label ${formState === "sending" ? "btn-label--busy" : ""}`}>
                    {formState === "sending" ? "Enviando…" : "Enviar mensaje"}
                  </span>
                  <FaArrowRight className="btn-icon" aria-hidden="true" />
                </button>
                <p className="form-hint"><span aria-hidden="true">*</span> Campos obligatorios</p>
              </div>
              <div aria-live="polite" role="status" className="form-status">
                {formState === "ok" && (
                  <p className="form-feedback form-feedback--ok">Mensaje enviado correctamente. ¡Gracias!</p>
                )}
                {formState === "error" && (
                  <p className="form-feedback form-feedback--error">
                    Algo fue mal. Inténtalo de nuevo o escríbeme a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}

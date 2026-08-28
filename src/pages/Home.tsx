// src/pages/Home.tsx
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaInstagram, FaTiktok, FaGamepad, FaTv, FaDumbbell, FaChess, FaStrava, FaSpotify } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
/* import { GiClash, GiBrawl } from "react-icons/gi"; */
import emailjs from "@emailjs/browser";
import Reveal from "../components/Reveal";
import avatarImg from "../assets/avatar.jpg";

// ── Tech stack ──────────────────────────────────────────────────────────────
const techStack = [
  { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
  { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
  { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { name: "Python", icon: "https://skillicons.dev/icons?i=py" },
  { name: "Bash", icon: "https://skillicons.dev/icons?i=bash" },
  { name: "C", icon: "https://skillicons.dev/icons?i=c" },
  { name: "C++", icon: "https://skillicons.dev/icons?i=cpp" },
  { name: "C#", icon: "https://skillicons.dev/icons?i=cs" },
  { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
  { name: "PHP", icon: "https://skillicons.dev/icons?i=php" },
  { name: "React", icon: "https://skillicons.dev/icons?i=react" },
  { name: "SQL", icon: "https://skillicons.dev/icons?i=mysql" },
  { name: "R", icon: "https://skillicons.dev/icons?i=r" },
];

// ── Projects ─────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
}

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
// ⚠️ Placeholder: sustituye estos datos por tu experiencia real (puedes añadir
// tantos elementos como quieras, se listan del primero al último en el array).
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    role: "Prácticas extracurriculares",
    company: "VirtualDeploy S.L.",
    period: "Agosto 2026 — Presente",
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
  { label: "IMDb",       href: "imdb.com/es-es/user/ur184233438/",       icon: <FaTv /> },
  { label: "Hevy",       href: "https://hevy.com/user/joan_amoros",       icon: <FaDumbbell /> },
  { label: "Chess",      href: "https://www.chess.com/member/johan023",      icon: <FaChess /> },
];


// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [activeProject, setActiveProject] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  const totalProjects = featuredProjects.length;

  // Cuántas tarjetas caben según el ancho de pantalla
  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth < 768 ? 1 : 2);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Ventana deslizante de proyectos visibles a partir de activeProject
  const visibleProjects = Array.from({ length: Math.min(cardsPerView, totalProjects) }, (_, i) =>
    featuredProjects[(activeProject + i) % totalProjects]
  );

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % totalProjects);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormState("sending");
    try {
      await emailjs.sendForm(
        "service_2zj7e45",
        "template_8a4z64g",
        formRef.current,
        "jB5-_FJFa1Q98qkUN"
      );
      setFormState("ok");
      formRef.current.reset();
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="inicio" className="hero-section">
        <div className="hero-content fade-in-up">
          <img src={avatarImg} alt="Joan Amorós" className="hero-avatar" />
          <p className="hero-eyebrow">Hola, soy</p>
          <h1>
            Joan <span className="gradient-text">Amorós</span>
          </h1>
          <p className="hero-subtitle">Desarrollador Full Stack</p>
          <p className="location">📍 Elche, Alicante - España</p>
        </div>
        <a href="#sobre-mi" className="scroll-arrow" aria-label="Scroll hacia abajo">
          <span className="arrow-icon">↓</span>
        </a>
      </section>

      {/* ── SOBRE MÍ ─────────────────────────────────────────────────────── */}
      <section id="sobre-mi" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Sobre mí</p>
          <h2 className="section-title">¿Quién soy?</h2>
          <div className="about-card">
            <p className="about-text">Graduado en Ingeniería Informática enfocado en el desarrollo de software y el análisis de datos. Experiencia en Java, Python y bases de datos, con interés en machine learning y sistemas eficientes. Busco una oportunidad donde aplicar mis conocimientos en entornos reales y seguir creciendo técnicamente.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section id="habilidades" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Tecnologías</p>
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-icon-item">
                <img src={tech.icon} alt={tech.name} title={tech.name} className="tech-icon" loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── EXPERIENCIA ──────────────────────────────────────────────────── */}
      <section id="experiencia" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Trayectoria</p>
          <h2 className="section-title">Experiencia</h2>
          <div className="timeline">
            {experience.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-date">{item.period}</div>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PROYECTOS (CARRUSEL) ─────────────────────────────────────────── */}
      <section id="proyectos" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Trabajo</p>
          <div className="section-title-row">
            <h2 className="section-title">Proyectos destacados</h2>
            <span className="project-count">{totalProjects} proyectos</span>
          </div>

          <div className="carousel-container">
            <div className="carousel-row">
              <button
                className="carousel-btn carousel-btn-prev"
                onClick={prevProject}
                aria-label="Proyecto anterior"
              >
                ◀
              </button>

              <div className="carousel-track-container">
                <div key={activeProject} className="carousel-track fade-in-up">
                  {visibleProjects.map((project, i) => (
                    <div key={`${activeProject}-${i}`} className="carousel-card">
                      <h3>{project.title}</h3>
                      <div className="tech-tags">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <p>{project.description}</p>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="card-link">
                        Ver en GitHub <FaGithub size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="carousel-btn carousel-btn-next"
                onClick={nextProject}
                aria-label="Proyecto siguiente"
              >
                ▶
              </button>
            </div>

            <div className="carousel-dots">
              {featuredProjects.map((project, index) => (
                <button
                  key={project.title}
                  className={`carousel-dot ${index === activeProject ? "active" : ""}`}
                  onClick={() => setActiveProject(index)}
                  aria-label={`Ver proyecto: ${project.title}`}
                  aria-current={index === activeProject}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MÁS ALLÁ DEL CÓDIGO ──────────────────────────────────────────── */}
      <section id="otros" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Personal</p>
          <h2 className="section-title">Más allá del teclado</h2>
          <p className="beyond-intro">
            Porque la vida no es solo commits y pull requests — aquí hay un poco más de mí.
          </p>
          <div className="beyond-grid">
            {beyondLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="beyond-link"
              >
                <span className="beyond-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────────────── */}
      <section id="contacto" className="section">
        <Reveal className="section-inner">
          <p className="section-label">Contacto</p>
          <h2 className="section-title">Hablemos</h2>

          <div className="contact-links">
            <a href="mailto:joanamorosramirez@gmail.com" className="contact-link">
              <FaEnvelope /> joanamorosramirez@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaGithub /> GitHub
            </a>
            <a href="public/CV-2026.pdf" download className="contact-link">
              <FaFilePdf /> Descargar CV
            </a>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactName">Nombre</label>
                <input id="contactName" type="text" name="name" placeholder="Tu nombre" />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Email *</label>
                <input id="contactEmail" type="email" name="email" placeholder="tu@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contactMsg">Mensaje *</label>
              <textarea id="contactMsg" name="message" rows={5} placeholder="Cuéntame en qué puedo ayudarte..." required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formState === "sending"}>
              {formState === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
            {formState === "ok" && (
              <p className="form-feedback form-feedback--ok">✅ Mensaje enviado correctamente.</p>
            )}
            {formState === "error" && (
              <p className="form-feedback form-feedback--error">❌ Algo fue mal. Inténtalo de nuevo.</p>
            )}
          </form>
        </Reveal>
      </section>
    </>
  );
}
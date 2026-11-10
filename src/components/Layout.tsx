// src/components/Layout.tsx
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "#inicio",      label: "Inicio" },
  { href: "#sobre-mi",    label: "Sobre mí" },
  { href: "#habilidades", label: "Stack" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos",   label: "Proyectos" },
  { href: "#contacto",    label: "Contacto" },
];

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstSidebarLinkRef = useRef<HTMLAnchorElement>(null);

  const closeSidebar = () => setSidebarOpen(false);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // Resalta el enlace de navegación de la sección visible en pantalla
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Barra de progreso (transform, no width → sin recalcular layout) + estados ligados al scroll
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(scrollTop > 8);
      setShowBackToTop(scrollTop > 640);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Menú móvil: Escape para cerrar, bloqueo de scroll y gestión del foco
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstSidebarLinkRef.current?.focus();
    const menuBtn = menuBtnRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      menuBtn?.focus();
    };
  }, [sidebarOpen]);

  // Si se agranda la ventana con el menú abierto, se cierra
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = () => mq.matches && setSidebarOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <a href="#contenido" className="skip-link" inert={sidebarOpen}>Saltar al contenido</a>

      {/* Barra de progreso de lectura */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`nav-header ${scrolled ? "nav-header--scrolled" : ""}`}>
        <div className="nav-container">
          <button
            ref={menuBtnRef}
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={sidebarOpen}
            aria-controls="menu-movil"
          >
            <span className={`burger ${sidebarOpen ? "burger--open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <a href="#inicio" className="logo" aria-label="Joan Amorós, ir al inicio">
            <span className="logo-mark" aria-hidden="true">JA</span>
            <span className="logo-text">Joan Amorós</span>
          </a>

          <nav className="nav-links" aria-label="Principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={isActive ? "active" : undefined}
                  aria-current={isActive ? "location" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            title={`Modo ${theme === "light" ? "oscuro" : "claro"}`}
          >
            <span className={`theme-icon ${theme === "light" ? "is-visible" : ""}`} aria-hidden="true"><FaMoon /></span>
            <span className={`theme-icon ${theme === "dark" ? "is-visible" : ""}`} aria-hidden="true"><FaSun /></span>
          </button>
        </div>
      </header>

      {/* Menú lateral (móvil) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay--open" : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />
      <div
        id="menu-movil"
        className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}
        inert={!sidebarOpen}
      >
        <nav className="sidebar-nav" aria-label="Menú móvil">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                ref={i === 0 ? firstSidebarLinkRef : undefined}
                href={link.href}
                onClick={closeSidebar}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "location" : undefined}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="sidebar-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <main id="contenido" inert={sidebarOpen}>{children}</main>

      <footer className="footer" inert={sidebarOpen}>
        <div className="footer-inner">
          <p className="footer-name">Joan Amorós</p>
          <p className="footer-meta">© 2026 · Diseñado y desarrollado con React y Vite</p>
          <div className="footer-links">
            <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>

      {/* Botón flotante "volver arriba" */}
      <button
        className={`back-to-top ${showBackToTop ? "back-to-top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp />
      </button>
    </>
  );
}

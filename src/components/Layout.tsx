// src/components/Layout.tsx
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaBars, FaTimes, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navLinks = [
    { href: "#inicio",      label: "Inicio" },
    { href: "#sobre-mi",    label: "Sobre mí" },
    { href: "#habilidades", label: "Stack" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#proyectos",   label: "Proyectos" },
    { href: "#contacto",    label: "Contacto" },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Barra de progreso de scroll + botón "volver arriba"
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 480);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Barra de progreso de lectura */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="nav-header">
        <div className="nav-container">
          {/* Botón hamburguesa (solo visible en móvil <480px) */}
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>

          {/* Logo - centrado en móvil, izquierda en desktop */}
          <a href="#inicio" className="logo">
            <span className="logo-first">Joan</span> <span className="logo-last">Amorós</span>
          </a>

          {/* Navegación desktop (visible solo en desktop) */}
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === link.href.slice(1) ? "active" : undefined}
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botón tema (siempre visible a la derecha) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>

      {/* Sidebar lateral (solo para móviles) */}
      <>
        {/* Overlay (fondo oscuro al abrir el sidebar) */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay--open" : ""}`}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
          <div className="sidebar-header">
            <button
              className="sidebar-close-btn"
              onClick={closeSidebar}
              aria-label="Cerrar menú"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="sidebar-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={activeSection === link.href.slice(1) ? "active" : undefined}
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <p>© 2026 Joan Amorós. Todos los derechos reservados.</p>
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

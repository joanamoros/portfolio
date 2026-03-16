// src/components/Layout.tsx
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/projects", label: "Proyectos" },
    { path: "/blog", label: "Blog" },
    { path: "/races", label: "Carreras" },
  ];

  return (
    <>
      <header className="nav-header">
        <div className="nav-container">
          <Link to="/" className="logo">Joan Amorós</Link>
          <nav className="nav-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: theme === 'light' ? '#475569' : '#cbd5e1',
            }}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>

      <main>{children}</main>
      
      <footer className="footer">
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a
            href="https://github.com/joanamoros"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "1.5rem" }}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "1.5rem" }}
          >
            <FaLinkedin />
          </a>
        </div>
        <p>© 2026 Joan Amorós. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
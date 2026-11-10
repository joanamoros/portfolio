// src/components/ProjectCarousel.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

/**
 * Carrusel de proyectos basado en scroll-snap nativo:
 * - swipe/trackpad nativos en móvil y escritorio, sin dependencias
 * - todas las tarjetas con el mismo ancho y alto
 * - botones anterior/siguiente, indicador de posición y flechas del teclado
 */
export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const total = projects.length;
  const positions = Math.max(1, total - perView + 1);
  const lastIndex = positions - 1;

  // Distancia entre el inicio de una tarjeta y la siguiente
  const getStep = () => {
    const track = trackRef.current;
    const slides = track?.children;
    if (!track || !slides || slides.length < 2) return track?.clientWidth || 1;
    return (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft;
  };

  const measure = useCallback(() => {
    frame.current = 0;
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / step));
    setPerView(Math.min(visible, total));
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    const maxIndex = Math.max(0, total - visible);
    setIndex(atEnd ? maxIndex : Math.min(maxIndex, Math.round(track.scrollLeft / step)));
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(lastIndex, i));
    // El comportamiento (suave o instantáneo) lo decide el CSS: respeta prefers-reduced-motion
    track.scrollTo({ left: target * getStep() });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const firstVisible = index + 1;
  const lastVisible = Math.min(total, index + perView);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos destacados"
      onKeyDown={onKeyDown}
    >
      <div ref={trackRef} className="carousel-track">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="carousel-slide project-item"
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              aria-label={`${project.title}: ver código en GitHub (se abre en una pestaña nueva)`}
            >
              <div className="project-top">
                <span className="project-index" aria-hidden="true">{pad(i + 1)}</span>
                <span className="project-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-footer">
                <ul className="tech-tags" aria-label="Tecnologías">
                  {project.techStack.map((tech) => (
                    <li key={tech} className="tech-tag">{tech}</li>
                  ))}
                </ul>
                <span className="card-link" aria-hidden="true">
                  <FaGithub /> GitHub
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-status">
          <p className="carousel-count" aria-live="polite">
            {firstVisible === lastVisible
              ? `${pad(firstVisible)} / ${pad(total)}`
              : `${pad(firstVisible)}–${pad(lastVisible)} / ${pad(total)}`}
          </p>
          <div className="carousel-dots">
            {Array.from({ length: positions }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a la posición ${i + 1} de ${positions}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
        <div className="carousel-buttons">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Proyectos anteriores"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index + 1)}
            disabled={index >= lastIndex}
            aria-label="Proyectos siguientes"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

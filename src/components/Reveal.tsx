// src/components/Reveal.tsx
import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Envuelve su contenido y le añade la clase "in-view" (definida en style.css)
 * la primera vez que entra en el viewport, para un efecto de aparición suave
 * al hacer scroll. No modifica el contenido interno.
 */
export default function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${inView ? "in-view" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}

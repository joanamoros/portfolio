// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaStrava, FaInstagram, FaYoutube, FaChess } from "react-icons/fa";
import { SiTiktok, SiImdb, SiThreads, SiHevy } from "react-icons/si";
import { MdOutlineSportsEsports } from "react-icons/md";

export default function Home() {
  const [chessStats, setChessStats] = useState<{ bullet?: number; blitz?: number; rapid?: number }>({});

  useEffect(() => {
    async function fetchChessElo() {
      try {
        const res = await fetch("https://api.chess.com/pub/player/johan023/stats");
        const data = await res.json();
        setChessStats({
          bullet: data.chess_bullet?.last?.rating,
          blitz: data.chess_blitz?.last?.rating,
          rapid: data.chess_rapid?.last?.rating
        });
      } catch (error) {
        console.error("Error fetching Chess.com stats:", error);
      }
    }

    fetchChessElo();
  }, []);

  return (
    <>
      {/* Hero: solo título y subtítulo */}
      <section id="hero">
        <h1 className="text-4xl font-bold">Joan <span className="gradient-text">Amorós</span></h1>
        <p className="mt-2 text-lg">
          Desarrollador apasionado, corredor dedicado y creador de contenido. Conectando código, kilómetros y creatividad.
        </p>
      </section>

      {/* Contenido principal */}
      <section className="connect-section">
        <h2>Conecta Conmigo</h2>
        <p className="subtitle">Sígueme en mis diferentes plataformas y únete a mi viaje</p>

        {/* Tarjetas principales */}
        <div className="platforms-grid">
          <a href="https://github.com/joanamoros" target="_blank" rel="noopener noreferrer" className="platform-card github">
            <div className="platform-icon"><FaGithub size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">GitHub</div>
              <div className="platform-desc">Código y proyectos</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>

          <a href="https://www.linkedin.com/in/joan-amor%C3%B3s-ram%C3%ADrez-645a24224/" target="_blank" rel="noopener noreferrer" className="platform-card linkedin">
            <div className="platform-icon"><FaLinkedin size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">LinkedIn</div>
              <div className="platform-desc">Perfil profesional</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>

          <a href="https://www.strava.com/athletes/tu-id" target="_blank" rel="noopener noreferrer" className="platform-card strava">
            <div className="platform-icon"><FaStrava size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">Strava</div>
              <div className="platform-desc">Actividad deportiva</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>

          <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="platform-card instagram">
            <div className="platform-icon"><FaInstagram size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">Instagram</div>
              <div className="platform-desc">Momentos y lifestyle</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>

          <a href="https://www.youtube.com/@Johan023/" target="_blank" rel="noopener noreferrer" className="platform-card youtube">
            <div className="platform-icon"><FaYoutube size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">YouTube</div>
              <div className="platform-desc">Videos y tutoriales</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>

          {/* Chess.com con fetch de ELOs */}
          <a href="https://www.chess.com/member/johan023" target="_blank" rel="noopener noreferrer" className="platform-card chess">
            <div className="platform-icon"><FaChess size={24} /></div>
            <div className="platform-info">
              <div className="platform-title">Chess.com</div>
              <div className="platform-desc">
                {chessStats.rapid || chessStats.blitz || chessStats.bullet
                  ? `Rapid: ${chessStats.rapid ?? "-"} | Blitz: ${chessStats.blitz ?? "-"} | Bullet: ${chessStats.bullet ?? "-"}`
                  : "Cargando..."}
              </div>
              <div className="platform-desc">Partidas de ajedrez</div>
            </div>
            <div className="platform-arrow">→</div>
          </a>
        </div>

        {/* Sección "Otros" unificada - Gaming y redes adicionales */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-lg)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--light-card-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--light-nav-border)',
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '500',
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 'var(--space-md)'
          }}>
            Otros
          </h3>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md) var(--space-lg)',
            alignItems: 'center'
          }}>
            {/* Gaming */}
            <a 
              href="https://statsroyale.com/es/profile/J9JVGQJC" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <span style={{ fontSize: '1.1rem' }}>👑</span>
              <span>Clash Royale</span>
            </a>
            
            <a 
              href="https://www.clashofstats.com/players/johan23-L2PLLJLQU/summary" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <span style={{ fontSize: '1.1rem' }}>⚔️</span>
              <span>Clash of Clans</span>
            </a>
            
            <a 
              href="https://brawlify.com/stats/profile/8YYQGL0Q8" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <span style={{ fontSize: '1.1rem' }}>⭐</span>
              <span>Brawl Stars</span>
            </a>

            {/* Separador sutil */}
            <span style={{ 
              width: '1px', 
              height: '20px', 
              background: 'currentColor', 
              opacity: 0.2,
              margin: '0 var(--space-sm)'
            }} />

            {/* Redes adicionales */}
            <a 
              href="https://www.threads.net/@_johan023" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <SiThreads size={16} />
              <span>Threads</span>
            </a>

            <a 
              href="https://www.tiktok.com/@joanamoros23" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <SiTiktok size={16} />
              <span>TikTok</span>
            </a>

            <a 
              href="https://hevy.com/user/joan_amoros" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <SiHevy size={16} />
              <span>Hevy</span>
            </a>

            <a 
              href="https://www.imdb.com/es-es/user/ur184233438/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <SiImdb size={16} />
              <span>IMDb</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
// src/pages/Races.tsx
import { FaStrava } from "react-icons/fa";
import { useMemo } from "react";

interface Race {
  name: string;
  distance: string;
  distance_km: number;
  location: string;
  date: string;
  date_obj: Date;
  dorsal?: number | string;
  finish_time: string;
  official_time?: string;
  pace: string;
  general_position?: string;
  category_position?: string;
  color_bg: string;
  color_text: string;
  split_5k?: string;
  split_4k?: string;
}

// Datos actualizados según tu tabla
const races: Race[] = [
  {
    name: "XXVI Carrera al Amanecer Santa Pola",
    distance: "6 km",
    distance_km: 6,
    location: "Santa Pola",
    date: "2022-08-28",
    date_obj: new Date("2022-08-28"),
    dorsal: 723,
    finish_time: "30:16",
    official_time: "30:42",
    pace: "5'07/km",
    general_position: "444/1411",
    category_position: "393/971",
    color_bg: "#2596be",
    color_text: "white",
  },
  {
    name: "VIII 10k Rotary Elche",
    distance: "10 km",
    distance_km: 10,
    location: "Elche",
    date: "2023-02-12",
    date_obj: new Date("2023-02-12"),
    dorsal: 706,
    finish_time: "52:44",
    official_time: "52:56",
    pace: "5'18/km",
    general_position: "522/784",
    category_position: "201/242",
    color_bg: "#faae3f",
    color_text: "#2e56a3",
  },
  {
    name: "Benidorm Half (10k)",
    distance: "10 km",
    distance_km: 10,
    location: "Benidorm",
    date: "2023-11-25",
    date_obj: new Date("2023-11-25"),
    dorsal: 4396,
    finish_time: "49:09",
    official_time: "49:24",
    pace: "4'56/km",
    general_position: "453/2059",
    category_position: "12/21",
    color_bg: "#ffffff",
    color_text: "#82afcd",
  },
  {
    name: "III Elche Night Race (5k)",
    distance: "5 km",
    distance_km: 5,
    location: "Elche",
    date: "2024-05-11",
    date_obj: new Date("2024-05-11"),
    dorsal: 3061,
    finish_time: "28:27",
    official_time: "29:04",
    pace: "5'49/km",
    general_position: "358/986",
    category_position: "135/226",
    color_bg: "#000000",
    color_text: "#59d14b",
  },
  {
    name: "52 Media Elche (10k Pompadour)",
    distance: "10 km",
    distance_km: 10,
    location: "Elche",
    date: "2025-03-23",
    date_obj: new Date("2025-03-23"),
    dorsal: 10546,
    finish_time: "48:55",
    official_time: "49:49",
    pace: "4'59/km",
    split_5k: "25:14",
    general_position: "317/1292",
    category_position: "115/280",
    color_bg: "#e20909",
    color_text: "#ffffff",
  },
  {
    name: "IV Elche Night Race (5k)",
    distance: "5 km",
    distance_km: 5,
    location: "Elche",
    date: "2025-05-10",
    date_obj: new Date("2025-05-10"),
    dorsal: 3222,
    finish_time: "24:19",
    official_time: "24:39",
    pace: "4'56/km",
    general_position: "221/1265",
    category_position: "42/89",
    color_bg: "#000000",
    color_text: "#59d14b",
  },
  {
    name: "XXIX Carrera al Amanecer Santa Pola",
    distance: "6 km",
    distance_km: 6,
    location: "Santa Pola",
    date: "2025-08-31",
    date_obj: new Date("2025-08-31"),
    dorsal: 1096,
    finish_time: "26:14",
    official_time: "26:22",
    pace: "4'24/km",
    general_position: "140/1806",
    category_position: "126/1073",
    color_bg: "#2596be",
    color_text: "white",
  },
  {
    name: "10k Internacional Santa Pola",
    distance: "10 km",
    distance_km: 10,
    location: "Santa Pola",
    date: "2026-01-18",
    date_obj: new Date("2026-01-18"),
    dorsal: 7262,
    finish_time: "44:17",
    official_time: "44:23",
    pace: "4'26/km",
    color_bg: "#f4b00e",
    color_text: "#000000",
  },
];

// Formatear fecha
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).replace(/ /g, ' ');
};

export default function Races() {
  // Ordenar carreras por fecha (más reciente a más antigua)
  const sortedRaces = useMemo(() => {
    return [...races].sort((a, b) => b.date_obj.getTime() - a.date_obj.getTime());
  }, []);

  // Estadísticas actualizadas
  const stats = useMemo(() => {
    const total = sortedRaces.length;
    const cincoK = sortedRaces.filter(r => r.distance_km === 5).length;
    const seisK = sortedRaces.filter(r => r.distance_km === 6).length;
    const diezK = sortedRaces.filter(r => r.distance_km === 10).length;
    const mediaMaraton = sortedRaces.filter(r => r.distance_km === 21.1).length;

    return { total, cincoK, seisK, diezK, mediaMaraton };
  }, [sortedRaces]);

  // Mejor tiempo en 5k
  const best5k = useMemo(() => {
    const cincoK = races.filter(r => r.distance_km === 5);
    if (cincoK.length === 0) return null;
    return cincoK.reduce((best, current) => {
      if (!best) return current;
      return current.finish_time < best.finish_time ? current : best;
    }, null as Race | null);
  }, []);

  // Mejor tiempo en 10k
  const best10k = useMemo(() => {
    const diezK = races.filter(r => r.distance_km === 10);
    if (diezK.length === 0) return null;
    return diezK.reduce((best, current) => {
      if (!best) return current;
      return current.finish_time < best.finish_time ? current : best;
    }, null as Race | null);
  }, []);

  return (
    <>
      <section id="hero">
        <h1>
          <span className="gradient-text">Carreras</span>
        </h1>
        <p>Un recorrido por mis logros y experiencias en el mundo del running</p>
        <a
          href="https://www.strava.com/athletes/74996691"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#fc4c02',
            color: 'white',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: '600',
            marginTop: '1rem'
          }}
        >
          <FaStrava size={20} />
          Ver perfil en Strava
        </a>
      </section>

      {/* Resumen de estadísticas */}
      <section className="races-container" style={{ paddingTop: 0 }}>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-2xl)'
        }}>
          <div className="stat-card" style={{
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--light-card-bg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--light-nav-border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.total}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total carreras</div>
          </div>
          
          <div className="stat-card" style={{
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.diezK}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>10 km</div>
            {best10k && <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Mejor: {best10k.finish_time}</div>}
          </div>
          
          <div className="stat-card" style={{
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.cincoK}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>5 km</div>
            {best5k && <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Mejor: {best5k.finish_time}</div>}
          </div>
          
          <div className="stat-card" style={{
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.seisK}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>6 km</div>
          </div>
        </div>

        {/* Lista de carreras */}
        <div className="races-timeline">
          {sortedRaces.map((race, index) => (
            <div
              key={`${race.name}-${race.date}`}
              className="race-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-md)',
                padding: 'var(--space-lg)',
                background: 'var(--light-card-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--light-nav-border)',
                borderLeft: `4px solid ${race.color_bg}`,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-lg)',
                alignItems: 'flex-start'
              }}>
                {/* Fecha destacada */}
                <div style={{
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: race.color_bg
                  }}>
                    {new Date(race.date).getFullYear()}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    opacity: 0.7
                  }}>
                    {formatDate(race.date)}
                  </div>
                </div>

                {/* Información principal */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: 'var(--space-xs)',
                    color: 'inherit'
                  }}>
                    {race.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-sm)',
                    fontSize: '0.95rem',
                    fontWeight: '500'
                  }}>
                    <span>{race.location}</span>
                    <span>• {race.distance}</span>
                    {race.dorsal && <span>• #{race.dorsal}</span>}
                  </div>

                  {/* Tiempos y ritmo */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-xl)',
                    marginTop: 'var(--space-sm)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>TIEMPO</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        {race.finish_time}
                      </div>
                      {race.official_time && (
                        <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                          oficial: {race.official_time}
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>RITMO</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        {race.pace}
                      </div>
                    </div>

                    {race.general_position && (
                      <div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>POSICIÓN</div>
                        <div style={{ fontSize: '1rem', fontWeight: '500' }}>
                          {race.general_position}
                        </div>
                        {race.category_position && (
                          <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                            Cat: {race.category_position}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Splits */}
                  {race.split_5k && (
                    <div style={{
                      marginTop: 'var(--space-md)'
                    }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '9999px',
                        fontSize: '0.85rem'
                      }}>
                        Paso 5k: {race.split_5k}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
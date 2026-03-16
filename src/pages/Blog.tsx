const posts = [
  {
    title: "Cómo correr 10K",
    summary: "Guía completa para mejorar tu 10K.",
    tags: ["running","tips"],
    featured_image: "images/post1.png",
  },
  {
    title: "React desde cero",
    summary: "Tutorial de React para principiantes.",
    tags: ["react","javascript"],
    featured_image: "images/post2.png",
  },
];

export default function Blog() {
  return (
    <>
      <section id="hero">
        <h1>Blog</h1>
        <p>Artículos sobre desarrollo, running y tecnología.</p>
      </section>
      <section className="portfolio-grid">
        {posts.map((p) => (
          <div key={p.title} className="portfolio-card">
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className="preview">{p.tags.join(", ")}</div>
            <a href="#">Leer post ➜</a>
          </div>
        ))}
      </section>
    </>
  );
}


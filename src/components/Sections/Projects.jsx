import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { name: "Dhaka Metro Rail", loc: "National Infrastructure", area: "Piping Systems" },
  { name: "Ruppur Power Plant", loc: "Industrial Mega-Project", area: "Industrial Fittings" },
  { name: "Padma Bridge", loc: "Structural Support", area: "uPVC Solutions" },
  { name: "Bashundhara City", loc: "Commercial Landmark", area: "Complete Plumbing" }
];

const Projects = () => {
  return (
    <section id="projects">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <h2 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1rem' }}>LANDMARK ACHIEVEMENTS</h2>
        <h3 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '5rem', lineHeight: 1 }}>Helping Build <br/> The Nation.</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="glass"
              style={{
                height: '400px',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '3rem',
                backgroundImage: `linear-gradient(to top, #050505 0%, transparent 100%), url(https://picsum.photos/seed/${proj.name}/800/600)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{proj.loc}</p>
                <h4 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{proj.name}</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{proj.area}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { 
    name: "Dhaka Metro Rail", 
    loc: "National Infrastructure", 
    area: "Piping Systems",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773161564/Dhaka_metro_rail_passing_platform_453b1ba9a5_n8nq90.mp4"
  },
  { 
    name: "Ruppur Power Plant", 
    loc: "Industrial Mega-Project", 
    area: "Industrial Fittings",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773162820/Ruppur_Power_Plant_x78tga.mp4"
  },
  { 
    name: "Padma Bridge", 
    loc: "Structural Support", 
    area: "uPVC Solutions",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773161793/13848132_3840_2160_60Fps_cppcsw.mp4"
  },
  { 
    name: "Bashundhara City", 
    loc: "Commercial Landmark", 
    area: "Complete Plumbing",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773162782/Cinematic_aerial_drone_shot_f5a38daa7b_pjthtn.mp4"
  }
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
                overflow: 'hidden'
              }}
            >
              {/* Background Video */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <video 
                  src={proj.video}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Dark Gradient Overlay for text readability */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)' 
                }} />
              </div>

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 600, letterSpacing: '1px' }}>{proj.loc}</p>
                <h4 style={{ fontSize: '2rem', margin: '0.5rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{proj.name}</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 800 }}>{proj.area}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

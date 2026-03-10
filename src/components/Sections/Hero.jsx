import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    tag: "A1 POLYMER - ESTD 2006",
    title: "ENGINEERING THE <br/> FLOW OF PROGRESS",
    description: "Bangladesh's leading manufacturer of uPVC solutions, delivering excellence to the subcontinent for nearly two decades.",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773146482/0_Abstract_Geometric_3840X2160_pso30s.mp4"
  },
  {
    tag: "UNCOMPROMISING QUALITY",
    title: "DESIGNED FOR A <br/> <span style='color:var(--primary)'>CENTURY</span> OF USE",
    description: "Our advanced German technology ensures durability that lasts up to 100 years. Guaranteed reliability in every pipe.",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773146482/0_Abstract_Geometric_3840X2160_pso30s.mp4"
  },
  {
    tag: "NATIONAL PRIDE",
    title: "BUILDING THE <br/> NATION'S ARTERIES",
    description: "From Mega-Projects to Household plumbing, A1 Polymer is the backbone of Bangladesh's modern infrastructure.",
    video: "https://res.cloudinary.com/djqsohuls/video/upload/v1773146482/0_Abstract_Geometric_3840X2160_pso30s.mp4"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" style={{ 
      height: '100vh', 
      width: '100vw', 
      padding: 0, 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Video Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            style={{ width: '100%', height: '100%' }}
          >
            <video 
              src={slides[current].video}
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(5,5,5,0.7) 100%), linear-gradient(rgba(5,5,5,0.4), rgba(5,5,5,0.4))' 
            }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '90%', 
        maxWidth: '1400px',
        textAlign: 'center'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p 
              initial={{ letterSpacing: '10px', opacity: 0 }}
              animate={{ letterSpacing: '4px', opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              style={{ 
                color: 'var(--primary)', 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                marginBottom: '2rem' 
              }}
            >
              {slides[current].tag}
            </motion.p>
            
            <img 
              src="/logo.png" 
              alt="A1 Polymer Logo" 
              style={{ height: '60px', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
            />
            
            <h1 
              dangerouslySetInnerHTML={{ __html: slides[current].title }}
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                fontWeight: 900, 
                lineHeight: 1, 
                marginBottom: '2rem',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }} 
            />
            
            <p style={{ 
              maxWidth: '700px', 
              fontSize: '1.2rem', 
              color: 'rgba(255,255,255,0.8)', 
              margin: '0 auto 3rem auto',
              lineHeight: 1.6
            }}>
              {slides[current].description}
            </p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <button style={{ 
                padding: '1.2rem 3rem', 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none', 
                fontSize: '0.9rem',
                fontWeight: 800,
                letterSpacing: '2px',
                cursor: 'pointer',
                clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)'
              }}>
                EXPLORE PRODUCTS
              </button>
              <button className="glass" style={{ 
                padding: '1.2rem 3rem', 
                color: 'white', 
                fontSize: '0.9rem',
                fontWeight: 800,
                letterSpacing: '2px',
                cursor: 'pointer',
                borderRadius: '0'
              }}>
                OUR LEGACY
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: '1rem',
        zIndex: 10
      }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrent(i)}
            style={{ 
              height: '4px', 
              width: i === current ? '80px' : '30px', 
              background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => {
              if (i !== current) e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              if (i !== current) e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div style={{ 
        position: 'absolute', 
        bottom: '5%', 
        right: '5%', 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '4px', opacity: 0.5 }}>JOURNEY</span>
        <motion.div 
          animate={{ height: [0, 60, 0], y: [0, 0, 10] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{ width: '2px', background: 'var(--primary)' }}
        />
      </div>
    </section>
  );
};

export default Hero;

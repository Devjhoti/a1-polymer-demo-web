import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

const newsItems = [
  { id: 1, date: "Feb 2025", title: "Expansion in Chattogram: New Warehouse Launched", tag: "Growth", desc: "A1 Polymer expands its logistics network with a state-of-the-art warehouse facility in Chattogram, ensuring faster delivery across the southern region." },
  { id: 2, date: "Jan 2025", title: "A1 Polymer receives ISO 45001:2018 Certification", tag: "Award", desc: "Recognized for our unwavering commitment to occupational health and safety management systems on an international level." },
  { id: 3, date: "Dec 2024", title: "100-Year Guarantee Milestone Celebrated", tag: "Quality", desc: "Celebrating a decade of our industry-leading 100-year guarantee program covering our premium PVC and UPVC product lines." },
  { id: 4, date: "Nov 2024", title: "Next-Gen CPVC Solutions Unveiled at BuildExpo", tag: "Product", desc: "Showcasing our latest innovations in high-temperature liquid transport formulations that outlast conventional materials by 40%." },
  { id: 5, date: "Oct 2024", title: "Sustainability Drive: Zero Waste Initiative", tag: "Eco", desc: "Our manufacturing facilities hit a new milestone: 98% of waste materials are now recycled back into non-critical product lines." },
  { id: 6, date: "Sep 2024", title: "Partnering with Dhaka Metro Rail Phase 2", tag: "Project", desc: "A1 Polymer selected as the primary supplier for subterranean drainage systems for the new extended metro stations." }
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  
  // Auto-rotation
  useEffect(() => {
    if (selectedNews || isDragging.current) return;
    const interval = setInterval(() => {
      setRotation(prev => prev - 0.2); // Smooth slow spin
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [selectedNews]);

  const handleDragStart = () => { isDragging.current = true; };
  const handleDragEnd = () => { isDragging.current = false; };
  const handleDrag = (event, info) => {
    setRotation(prev => prev + info.delta.x * 0.3);
  };

  const radius = window.innerWidth < 768 ? 250 : 450;

  return (
    <section id="news" style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>News Stream</h2>
            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>LATEST INTELLIGENCE</p>
          </div>
          <button className="glass" style={{ padding: '1rem 2rem', color: 'white', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
            ACCESS ARCHIVE
          </button>
        </div>

        {/* 3D Holographic Cylinder */}
        <div 
          ref={containerRef}
          style={{ 
            height: '400px', 
            perspective: '1200px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Draggable transparent overlay */}
          <motion.div 
            drag="x"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            style={{ position: 'absolute', inset: 0, zIndex: 20, cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          />

          <motion.div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: rotation }}
            transition={{ ease: "linear", duration: 0 }}
          >
            {newsItems.map((item, i) => {
              const theta = (i / newsItems.length) * 360;
              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '320px',
                    height: '200px',
                    marginLeft: '-160px',
                    marginTop: '-100px',
                    transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <motion.div
                    className="glass"
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(227, 30, 36, 0.3)', // Holographic red tint
                      background: 'linear-gradient(135deg, rgba(15,15,15,0.9), rgba(5,5,5,0.95))',
                      boxShadow: '0 0 20px rgba(227, 30, 36, 0.05)',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 30
                    }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(227, 30, 36, 0.8)', boxShadow: '0 0 40px rgba(227, 30, 36, 0.2)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNews(item);
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>{item.tag}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{item.date}</span>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                       <span style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>DECRYPT DATA</span>
                       <ExternalLink size={16} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Full Screen HUD Overlay */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(5, 5, 5, 0.98)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            {/* HUD Scanning Lines */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(rgba(227, 30, 36, 0.05) 50%, rgba(0,0,0,0) 50%)', 
              backgroundSize: '100% 4px', 
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.5
            }} />

            <div className="glass" style={{ width: '100%', maxWidth: '800px', padding: '4rem', position: 'relative', zIndex: 1, border: '1px solid var(--primary)' }}>
              <button 
                onClick={() => setSelectedNews(null)}
                style={{ 
                  position: 'absolute', 
                  top: '2rem', 
                  right: '2rem', 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--text-main)', 
                  cursor: 'pointer',
                  opacity: 0.5,
                  transition: '0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
              >
                <X size={32} />
              </button>

              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(227, 30, 36, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '2rem' }}>
                  {selectedNews.tag} // {selectedNews.date}
                </div>
                
                <h2 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '2rem' }}>
                  {selectedNews.title}
                </h2>
                
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                  {selectedNews.desc}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', letterSpacing: '1px' }}>
                    READ FULL TRANSMISSION
                  </button>
                  <button className="glass" style={{ padding: '1rem 2rem', color: 'white', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontWeight: 800, letterSpacing: '1px' }}>
                    SHARE
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default News;

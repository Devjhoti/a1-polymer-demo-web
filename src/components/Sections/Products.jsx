import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const productData = {
  household: [
    { name: "uPVC Pipes", desc: "Durable and leak-proof infrastructure.", img: "https://picsum.photos/seed/pipe1/400/500" },
    { name: "Bathroom Fittings", desc: "Sleek ABS fittings for modern toilets.", img: "https://picsum.photos/seed/bath1/400/500" },
    { name: "Magic Pipes", desc: "Flexible solutions for tight spaces.", img: "https://picsum.photos/seed/magic/400/500" },
    { name: "Tissue Holders", desc: "Minimalist wall-mounted fixtures.", img: "https://picsum.photos/seed/tissue/400/500" },
    { name: "Bib Cocks", desc: "Precision engineered water flow.", img: "https://picsum.photos/seed/bib/400/500" },
    { name: "Rain Showers", desc: "Cinematic bathing experience.", img: "https://picsum.photos/seed/shower/400/500" },
    { name: "Waste Pipes", desc: "Efficient drainage solutions.", img: "https://picsum.photos/seed/waste/400/500" },
    { name: "CPVC Systems", desc: "High-temp water transport.", img: "https://picsum.photos/seed/cpvc/400/500" },
  ],
  industrial: [
    { name: "HDPE Pipes", desc: "High-density poly for industrial scale.", img: "https://picsum.photos/seed/hdpe/400/500" },
    { name: "Centrifugal Pumps", desc: "Powering industry with efficiency.", img: "https://picsum.photos/seed/pump/400/500" },
    { name: "Teflon Tapes", desc: "Precision sealing for high pressure.", img: "https://picsum.photos/seed/tape/400/500" },
    { name: "Irrigation Pumps", desc: "Large scale agricultural solutions.", img: "https://picsum.photos/seed/agri/400/500" },
    { name: "SWR Systems", desc: "Soil, Waste, and Rain drainage.", img: "https://picsum.photos/seed/swr/400/500" },
    { name: "Industrial Valves", desc: "Heavy duty flow control.", img: "https://picsum.photos/seed/valve/400/500" },
    { name: "Pressure Pipes", desc: "High-load liquid transport.", img: "https://picsum.photos/seed/press/400/500" },
    { name: "Sewage Pipes", desc: "Large diameter infra solutions.", img: "https://picsum.photos/seed/sew/400/500" },
  ]
};

const Products = () => {
  const [category, setCategory] = useState('household');
  const [activeIdx, setActiveIdx] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const products = productData[category];

  const cycle = (step) => {
    setActiveIdx((prev) => (prev + step + products.length) % products.length);
  };

  return (
    <section id="products">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Quality Products</h2>
            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>CATERING TO EVERY SEGMENT</p>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button 
              onClick={() => setShowModal(true)}
              className="glass"
              style={{
                padding: '1rem 2rem',
                color: 'white',
                border: '1px solid var(--primary)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}
            >
              SEE ALL PRODUCTS
            </button>

            <div className="glass" style={{ display: 'flex', padding: '0.5rem', borderRadius: '50px' }}>
              {['household', 'industrial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setActiveIdx(1);
                  }}
                  style={{
                    padding: '1rem 2.5rem',
                    border: 'none',
                    background: category === cat ? 'var(--primary)' : 'transparent',
                    color: 'white',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(5,5,5,0.98)',
                backdropFilter: 'blur(30px)',
                display: 'flex',
                flexDirection: 'column',
                padding: '5%',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>Complete Portfolio</h2>
                  <p style={{ color: 'var(--primary)', letterSpacing: '2px' }}>A1 POLYMER INDUSTRIAL & HOUSEHOLD</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="glass"
                  style={{ 
                    padding: '1.5rem 3rem', 
                    color: 'white', 
                    border: '1px solid var(--primary)',
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}
                >
                  RETURN TO JOURNEY
                </button>
              </div>

              <motion.div 
                style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gridAutoRows: '240px',
                  gap: '1.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '5rem'
                }}
              >
                {[...Array(20)].map((_, i) => {
                  const isLarge = i === 0;
                  const isWide = i === 3 || i === 10;
                  const isTall = i === 6 || i === 14;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                      className="glass"
                      style={{ 
                        padding: '1.2rem', 
                        border: '1px solid rgba(255,255,255,0.05)', 
                        transition: '0.3s border-color',
                        gridColumn: isLarge || isWide ? 'span 2' : 'span 1',
                        gridRow: isLarge || isTall ? 'span 2' : 'span 1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ 
                        width: '100%', 
                        height: isTall || isLarge ? '70%' : '55%', 
                        background: '#111', 
                        marginBottom: '1rem', 
                        overflow: 'hidden',
                        borderRadius: '0.5rem'
                      }}>
                        <img 
                          src={`https://picsum.photos/seed/${i + 200}/600/600`} 
                          alt="Product" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
                        />
                      </div>
                      
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '1px' }}>A1 - PRO SERIES</span>
                          {isLarge && <span style={{ fontSize: '0.5rem', opacity: 0.5 }}>FEATURED</span>}
                        </div>
                        <h4 style={{ fontSize: isLarge ? '1.8rem' : '1.1rem', fontWeight: 700, lineHeight: 1.1 }}>Fitting #{i+1}</h4>
                        {!isWide && !isLarge ? null : (
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '80%' }}>
                            Advanced industrial-grade polymer solution engineered for maximum durability.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ 
          position: 'relative', 
          height: '600px', 
          perspective: '2000px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'visible'
        }}>
          <AnimatePresence mode="popLayout">
            {products.map((product, idx) => {
              const diff = (idx - activeIdx + products.length) % products.length;
              let position = diff;
              if (position > products.length / 2) position -= products.length;

              const isCenter = position === 0;
              const xPos = position * 450;
              const zPos = isCenter ? 0 : -300;
              const rotationY = position * -35;
              const scale = isCenter ? 1 : 0.8;
              const opacity = Math.abs(position) > 1 ? 0 : 1;

              return (
                <motion.div
                  key={category + idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity,
                    x: xPos,
                    z: zPos,
                    rotateY: rotationY,
                    scale,
                    zIndex: isCenter ? 10 : 1
                  }}
                  whileHover={isCenter ? { scale: 1.05, y: -10 } : {}}
                  onClick={() => setActiveIdx(idx)}
                  transition={{ 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.4 }
                  }}
                  className="glass"
                  style={{ 
                    position: 'absolute',
                    width: '400px',
                    height: '500px',
                    overflow: 'hidden', 
                    cursor: 'pointer',
                    boxShadow: isCenter ? '0 50px 100px -20px rgba(227, 30, 36, 0.2)' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div style={{ width: '100%', height: '350px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-card), transparent)' }} />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <motion.h3 
                      animate={{ color: isCenter ? 'var(--primary)' : 'white' }}
                      style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}
                    >
                      {product.name}
                    </motion.h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{product.desc}</p>
                    <div style={{ marginTop: '1.5rem', width: '30px', height: '2px', background: isCenter ? 'var(--primary)' : 'rgba(255,255,255,0.1)' }} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div style={{ position: 'absolute', bottom: '-40px', display: 'flex', gap: '2rem' }}>
            <button 
              onClick={() => cycle(-1)}
              className="glass"
              style={{ padding: '1rem', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              ←
            </button>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {products.map((_, i) => (
                <div 
                  key={i}
                  style={{ 
                    width: i === activeIdx ? '20px' : '6px', 
                    height: '6px', 
                    borderRadius: '10px', 
                    background: i === activeIdx ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                    transition: '0.3s'
                  }} 
                />
              ))}
            </div>
            <button 
              onClick={() => cycle(1)}
              className="glass"
              style={{ padding: '1rem', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

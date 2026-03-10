import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const productData = {
  household: [
    { name: "uPVC Pipes", desc: "Durable and leak-proof infrastructure.", img: "https://picsum.photos/seed/pipe1/400/500" },
    { name: "Bathroom Fittings", desc: "Sleek ABS fittings for modern toilets.", img: "https://picsum.photos/seed/bath1/400/500" },
    { name: "Magic Pipes", desc: "Flexible solutions for tight spaces.", img: "https://picsum.photos/seed/magic/400/500" },
  ],
  industrial: [
    { name: "HDPE Pipes", desc: "High-density poly for industrial scale.", img: "https://picsum.photos/seed/hdpe/400/500" },
    { name: "Centrifugal Pumps", desc: "Powering industry with efficiency.", img: "https://picsum.photos/seed/pump/400/500" },
    { name: "Teflon Tapes", desc: "Precision sealing for high pressure.", img: "https://picsum.photos/seed/tape/400/500" },
  ]
};

const Products = () => {
  const [category, setCategory] = useState('household');

  return (
    <section id="products">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Core Solutions</h2>
            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>CATERING TO EVERY SEGMENT</p>
          </div>
          
          <div className="glass" style={{ display: 'flex', padding: '0.5rem', borderRadius: '50px' }}>
            {['household', 'industrial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="wait">
            {productData[category].map((product, idx) => (
              <motion.div
                key={category + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s transform' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{product.desc}</p>
                  <div style={{ marginTop: '1.5rem', width: '30px', height: '2px', background: 'var(--primary)' }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Products;

import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '1.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.img 
          layoutId="main-logo"
          src="/logo.png" 
          alt="A1 Polymer" 
          style={{ height: '40px' }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '3rem' }}>
        {['Products', 'Projects', 'News', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              const pageIndices = { products: 1, projects: 2, news: 3, contact: 4 };
              const targetPage = pageIndices[item.toLowerCase()];
              if (targetPage !== undefined && window.__a1ScrollEl) {
                window.__a1ScrollEl.scrollTo({ 
                  top: targetPage * window.innerHeight, 
                  behavior: 'smooth' 
                });
              }
            }}
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: '0.8rem', 
              fontWeight: 600, 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              opacity: 0.7,
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.7}
          >
            {item}
          </a>
        ))}
      </div>

      <button className="glass" style={{
        padding: '0.8rem 2rem',
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '1px',
        border: '1px solid var(--primary)',
        cursor: 'pointer',
        background: 'transparent',
        borderRadius: '4px'
      }}>
        ESTIMATE PROJECT
      </button>
    </motion.nav>
  );
};

export default Navbar;

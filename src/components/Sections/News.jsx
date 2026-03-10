import React from 'react';
import { ExternalLink } from 'lucide-react';

const news = [
  { date: "Feb 2025", title: "Expansion in Chattogram: New Warehouse Launched", tag: "Growth" },
  { date: "Jan 2025", title: "A1 Polymer receives ISO 45001:2018 Certification", tag: "Award" },
  { date: "Dec 2024", title: "100-Year Guarantee Milestone Celebrated", tag: "Quality" }
];

const News = () => {
  return (
    <section id="news">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Latest News</h2>
          <button className="glass" style={{ padding: '1rem 2rem', color: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>
            VIEW ALL NEWS
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {news.map((item, i) => (
            <div 
              key={i} 
              className="glass" 
              style={{ 
                padding: '2.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '3rem',
                cursor: 'pointer',
                transition: '0.3s background',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--glass)'}
            >
              <div style={{ width: '100px' }}>
                <p style={{ color: 'var(--primary)', fontWeight: 800 }}>{item.date}</p>
                <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase' }}>{item.tag}</div>
              </div>
              
              <h3 style={{ flex: 1, fontSize: '1.8rem', letterSpacing: 'normal' }}>{item.title}</h3>
              
              <ExternalLink size={24} style={{ opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

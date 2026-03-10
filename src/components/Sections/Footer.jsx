import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#030303', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '6rem 5% 2rem 5%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(227, 30, 36, 0.15), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <img src="/logo.png" alt="A1 Polymer Logo" style={{ height: '60px', width: 'fit-content' }} />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '300px' }}>
            Bangladesh's leading manufacturer of premium uPVC solutions and industrial piping systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  transition: '0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '1px' }}>Quick Details</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['About Anwar Group', 'Our Legacy', 'Quality & Certifications', 'Careers', 'Investor Relations'].map((link) => (
              <li key={link}>
                <a href="#" style={{ 
                  color: 'var(--text-muted)', 
                  textDecoration: 'none', 
                  fontSize: '0.9rem',
                  transition: '0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '1px' }}>Headquarters</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)', marginTop: '4px' }}><MapPin size={20} /></div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Baitul Hossain Building (12th/14th Floor)<br/>
                27 Dilkusha C/A, Dhaka-1000<br/>
                Bangladesh
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary)' }}><Phone size={20} /></div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>+880 2223 384037</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary)' }}><Mail size={20} /></div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>info@a1polymer.com</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} A-One Polymer Limited. A subsidiary of Anwar Group.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float, Preload } from '@react-three/drei';
import Pipe from './Pipe';
import Hero from '../Sections/Hero';
import Products from '../Sections/Products';
import Projects from '../Sections/Projects';
import News from '../Sections/News';

const Scene = () => {
  return (
    <div className="canvas-container">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 0, 15]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
            <Pipe />
            
            <Scroll html>
              <div className="content-layer" style={{ width: '100vw' }}>
                <Hero />
                <Products />
                <Projects />
                <News />
                
                <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Ready for a Century?</h2>
                    <p style={{ color: 'var(--text-muted)' }}>A1 Polymer - Quality No. 1 since 2006</p>
                  </div>
                </section>
              </div>
            </Scroll>
            
            <Preload all />
          </ScrollControls>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;

import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float, Preload } from '@react-three/drei';
import Pipe from './Pipe';
import Hero from '../Sections/Hero';
import Products from '../Sections/Products';
import Projects from '../Sections/Projects';
import News from '../Sections/News';
import Contact from '../Sections/Contact';
import Footer from '../Sections/Footer';
import { useScroll } from '@react-three/drei';

const ScrollManager = () => {
  const scroll = useScroll();
  React.useEffect(() => {
    window.__a1ScrollEl = scroll.el;
  }, [scroll]);
  return null;
};

const DynamicTitle = () => {
  const scroll = useScroll();
  
  useFrame(() => {
    if (!scroll) return;
    const offset = scroll.offset; // 0 to 1
    
    let title = "A1 Polymer | Engineering the Flow of Progress";
    if (offset >= 0.15 && offset < 0.35) title = "A1 Polymer | Quality Products";
    else if (offset >= 0.35 && offset < 0.55) title = "A1 Polymer | Landmark Achievements";
    else if (offset >= 0.55 && offset < 0.75) title = "A1 Polymer | News Stream";
    else if (offset >= 0.75) title = "A1 Polymer | Estd 2006";

    if (document.title !== title) {
      document.title = title;
    }
  });
  
  return null;
};

const Scene = ({ setForceChatOpen }) => {
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
          <ScrollControls pages={5.6} damping={0.2}>
            <ScrollManager />
            <DynamicTitle />
            <Pipe />
            
            <Scroll html>
              <div className="content-layer" style={{ width: '100vw' }}>
                <Hero setForceChatOpen={setForceChatOpen} />
                <Products />
                <Projects />
                <News />
                
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
                  <Contact />
                  <Footer />
                </div>
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

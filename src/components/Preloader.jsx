import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const PipeNetwork = ({ progress }) => {
  const waterRef = useRef();
  const group = useRef();
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-25, 4, -2),
      new THREE.Vector3(-15, 4, -2),
      new THREE.Vector3(-12, -2, 1),
      new THREE.Vector3(-6, -2, 1),
      new THREE.Vector3(-6, 3, -1),
      new THREE.Vector3(0, 3, -1),
      new THREE.Vector3(0, -3, 2),
      new THREE.Vector3(8, -3, 2),
      new THREE.Vector3(12, 2, 0),
      new THREE.Vector3(30, 2, 0),
    ], false, 'catmullrom', 0.1);
  }, []);

  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.05;
    }
    
    // Smoothly interpolate the progress so water flows naturally
    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, progress, delta * 3);
    
    if (waterRef.current && waterRef.current.geometry) {
      const maxIndices = 300 * 32 * 6; // tubular * radial * 6
      const count = Math.floor((smoothedProgress.current / 100) * maxIndices);
      waterRef.current.geometry.setDrawRange(0, count);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Water inside MUST be opaque so the physical transmission material captures it in the buffer */}
        <mesh ref={waterRef}>
          <tubeGeometry args={[curve, 300, 0.44, 32, false]} />
          <meshStandardMaterial 
            color="#00ddff" 
            emissive="#0088ff" 
            emissiveIntensity={1.5} 
            roughness={0.1}
            metalness={0.1}
            transparent={false}
          />
        </mesh>

        {/* Pipe Outer Glass */}
        <mesh>
          <tubeGeometry args={[curve, 300, 0.5, 32, false]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={1} 
            transparent={true}
            opacity={1} 
            roughness={0.05} 
            thickness={2} 
            envMapIntensity={2} 
          />
        </mesh>

        {/* Connectors (Fittings) */}
        {[
          [-15, 4, -2], [-12, -2, 1], [-6, -2, 1], [-6, 3, -1], [0, 3, -1], [0, -3, 2], [8, -3, 2], [12, 2, 0]
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500); // Small delay to enjoy 100%
          return 100;
        }
        return Math.min(p + (Math.random() * 5 + 1), 100);
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050505',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0088ff" />
          <PipeNetwork progress={progress} />
          <Environment preset="city" />
          <ContactShadows position={[0, -6, 0]} opacity={0.6} scale={40} blur={2} />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div>
           <motion.img 
             layoutId="main-logo"
             src="/logo.png" 
             alt="A1 Polymer" 
             style={{ height: '100px', marginBottom: '2rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }} 
           />
        </motion.div>
        
        <motion.div exit={{ opacity: 0, y: 20 }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, color: 'white', textShadow: '0 5px 15px rgba(0,136,255,0.8)', margin: 0, textAlign: 'center' }}>
            {Math.floor(progress)}%
          </h2>
          <p style={{ color: 'var(--primary)', letterSpacing: '6px', fontWeight: 800, marginTop: '1rem' }}>
            FLOW INITIALIZED
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;

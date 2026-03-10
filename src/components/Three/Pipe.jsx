import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

const Pipe = () => {
  const scroll = useScroll();
  const pipeRef = useRef();

  // Create a curve for the journey
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(5, 2, -40),
      new THREE.Vector3(-5, -2, -60),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(0, 0, -100),
    ]);
  }, []);

  useFrame((state) => {
    const offset = scroll.offset;
    // Position camera along the curve
    const point = curve.getPoint(offset);
    const lookAt = curve.getPoint(Math.min(offset + 0.01, 1));
    
    state.camera.position.copy(point);
    state.camera.lookAt(lookAt);
    
    // Subtle rotation for cinematic feel
    state.camera.rotation.z += Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <>
      <mesh ref={pipeRef}>
        <tubeGeometry args={[curve, 200, 3, 32, false]} />
        <meshStandardMaterial 
          color="#080808" 
          side={THREE.BackSide} 
          roughness={0.1}
          metalness={1}
          emissive="#E31E24"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Dynamic flow lights */}
      <group>
        {[...Array(20)].map((_, i) => (
          <pointLight 
            key={i}
            position={curve.getPoint(i / 20)}
            intensity={4}
            color={i % 2 === 0 ? "#E31E24" : "#222222"}
            distance={8}
          />
        ))}
      </group>
    </>
  );
};

export default Pipe;

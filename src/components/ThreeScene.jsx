// src/components/RotatingCube.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';

const Cube = () => {
  const ref = useRef();

  useFrame(() => {
    const scrollY = window.scrollY;
    ref.current.rotation.y = scrollY / 100;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <Canvas className='noise-container' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
        <Cube />
    </Canvas>
  );
};

export default ThreeScene;

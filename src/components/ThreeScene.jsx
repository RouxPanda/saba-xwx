// src/components/RotatingCube.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from '@react-three/fiber';
import * as THREE from "three";

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


const lerp = (start, end, t) => start + (end - start) * t; // Interpolation linéaire

const Perso = () => {
  const ref = useRef();

  // Keyframes définissant les positions et rotations
  const keyframes = [
    { scrollY: 0, position: [0, -0.5, 0], rotation: [0, Math.PI / 2, 0] }, // Départ
    { scrollY: 947, position: [3.5, 0, 0], rotation: [0, Math.PI / 6, 0] }, // Keyframe 1
    { scrollY: 1979, position: [0, 0, 0], rotation: [Math.PI / 4, Math.PI / 2, 0] }, // Keyframe 2
    { scrollY: 2926, position: [0, 0, 1], rotation: [Math.PI / 2, Math.PI, 0] }, // Keyframe 3
  ];

  // Fonction pour trouver les keyframes correspondants à la position de défilement actuelle
  const getKeyframes = (scrollY) => {
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (scrollY >= keyframes[i].scrollY && scrollY <= keyframes[i + 1].scrollY) {
        return [keyframes[i], keyframes[i + 1]];
      }
    }
    return [keyframes[0], keyframes[keyframes.length - 1]]; // Valeurs par défaut
  };

  useFrame(() => {
    const scrollY = window.scrollY;

    const [start, end] = getKeyframes(scrollY);

    const t = THREE.MathUtils.clamp(
      (scrollY - start.scrollY) / (end.scrollY - start.scrollY),
      0,
      1
    );

    // Interpoler la position et la rotation
    const position = start.position.map((startVal, i) =>
      lerp(startVal, end.position[i], t)
    );
    const rotation = start.rotation.map((startVal, i) =>
      lerp(startVal, end.rotation[i], t)
    );

    // Appliquer les valeurs interpolées
    if (ref.current) {
      ref.current.position.set(...position);
      ref.current.rotation.set(...rotation);
    }
  });

  const materials = useLoader(MTLLoader, "./model3d/crash/CETLGSAWRGLGXDA9F9SAYY2UT.mtl");
  const obj = useLoader(OBJLoader, "./model3d/crash/CETLGSAWRGLGXDA9F9SAYY2UT.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <mesh ref={ref}>
      <primitive object={obj} scale={2.5} />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <Canvas className='noise-container z-0' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <ambientLight intensity={5} />
      {/* <Cube /> */}
      <Perso />
    </Canvas>
  );
};

export default ThreeScene;

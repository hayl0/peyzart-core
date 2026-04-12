"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export const GardenScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Stylized Low-Poly Tree (Peyzart Identity)
    const treeGroup = new THREE.Group();

    // Trunk (Gövde)
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 6);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#5D4037', flatShading: true });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    treeGroup.add(trunk);

    // Leaves (Yaprak Katmanları)
    const leafMaterial = new THREE.MeshStandardMaterial({ color: '#2E7D32', flatShading: true });
    
    const layer1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1, 6), leafMaterial);
    layer1.position.y = 0.8;
    treeGroup.add(layer1);

    const layer2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.8, 6), leafMaterial);
    layer2.position.y = 1.3;
    treeGroup.add(layer2);

    const layer3 = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.6, 6), leafMaterial);
    layer3.position.y = 1.7;
    treeGroup.add(layer3);

    scene.add(treeGroup);

    // Ground (Zemin)
    const groundGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 12);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: '#8BC34A', flatShading: true });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.75;
    scene.add(ground);

    // Lights
    const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight('#FFFFFF', 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = 1;

    // GSAP Intro Animation
    gsap.from(treeGroup.scale, {
      x: 0, y: 0, z: 0,
      duration: 1.5,
      ease: 'back.out(1.7)',
      delay: 0.5
    });

    gsap.to(treeGroup.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Interaction (Mouse Move)
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) - 0.5;
      const y = (event.clientY / window.innerHeight) - 0.5;
      gsap.to(treeGroup.rotation, {
        x: y * 0.5,
        z: -x * 0.5,
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
};

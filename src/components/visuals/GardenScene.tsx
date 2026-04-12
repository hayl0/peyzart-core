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

    // Fog for depth
    scene.fog = new THREE.FogExp2('#F1F8E9', 0.05);

    // Tree Group
    const treeGroup = new THREE.Group();

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.25, 2, 8),
      new THREE.MeshStandardMaterial({ color: '#3E2723', roughness: 0.8 })
    );
    treeGroup.add(trunk);

    // Leaves (Procedural Clusters)
    const createLeafLayer = (y: number, size: number, color: string) => {
      const layer = new THREE.Mesh(
        new THREE.IcosahedronGeometry(size, 1),
        new THREE.MeshStandardMaterial({ color, flatShading: true })
      );
      layer.position.y = y;
      return layer;
    };

    treeGroup.add(createLeafLayer(1, 0.8, '#2E7D32'));
    treeGroup.add(createLeafLayer(1.6, 0.6, '#4CAF50'));
    treeGroup.add(createLeafLayer(2.1, 0.4, '#8BC34A'));

    scene.add(treeGroup);

    // Ambient Floating Particles (Pollen/Light)
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: '#8BC34A', size: 0.05, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFF9C4', 1.5);
    sunLight.position.set(5, 10, 5);
    scene.add(sunLight);

    camera.position.set(0, 1.5, 6);

    // GSAP Intro
    gsap.from(treeGroup.scale, { x: 0, y: 0, z: 0, duration: 2, ease: "elastic.out(1, 0.5)", delay: 0.5 });
    gsap.from(treeGroup.position, { y: -5, duration: 1.5, ease: "power4.out", delay: 0.2 });

    // Floating Animation
    gsap.to(treeGroup.position, {
      y: "+=0.3",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(treeGroup.rotation, {
        y: mouse.x * 0.5,
        x: -mouse.y * 0.2,
        duration: 1.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render Loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      particles.rotation.y = elapsedTime * 0.05;
      particles.position.y = Math.sin(elapsedTime) * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

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
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

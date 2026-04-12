"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export const Sam3DViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Dark Grid Floor
    const grid = new THREE.GridHelper(20, 40, '#00FF41', '#111111');
    grid.position.y = -2;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // SAM-3D Object (Abstract Architectural Garden Element)
    const objectGroup = new THREE.Group();
    
    // Create multiple parts to simulate segmentation
    const geometries = [
      new THREE.TorusKnotGeometry(1, 0.3, 128, 16),
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.CylinderGeometry(0.2, 0.2, 3, 32)
    ];

    const meshes: THREE.Mesh[] = [];
    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshStandardMaterial({ 
        color: '#111111', 
        roughness: 0.1, 
        metalness: 0.8,
        emissive: '#00FF41',
        emissiveIntensity: 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (i - 1) * 1.5;
      objectGroup.add(mesh);
      meshes.push(mesh);
    });

    scene.add(objectGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight('#00FF41', 2);
    spotLight.position.set(5, 10, 5);
    scene.add(spotLight);

    camera.position.z = 5;

    // Interaction Logic (Raycasting)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const material = selectedMesh.material as THREE.MeshStandardMaterial;

        // Visual Feedback (Segmentation Simulation)
        gsap.to(material, {
          emissiveIntensity: 2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(material, { emissiveIntensity: 0.5, duration: 1 });
          }
        });

        // Add UI point
        setPoints(prev => [...prev, { x: event.clientX, y: event.clientY }]);
      }
    };

    containerRef.current.addEventListener('mousedown', handleClick);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      objectGroup.rotation.y += 0.005;
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
      containerRef.current?.removeEventListener('mousedown', handleClick);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="liquid-glass-dark px-6 py-3 border border-primary/20 flex items-center gap-3">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">SAM-3D Live Inference</span>
        </div>
      </div>
      
      {/* Simulation Points */}
      {points.map((p, i) => (
        <div 
          key={i} 
          className="sam-3d-point" 
          style={{ left: p.x - 6, top: p.y - 6 }} 
        />
      ))}

      <div className="absolute bottom-6 right-6 z-20 pointer-events-none text-right">
         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Click to Segment 3D Mesh</p>
         <p className="text-xs font-bold text-primary italic">SAM-3D // Research Preview</p>
      </div>
    </div>
  );
};

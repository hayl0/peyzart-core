"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { EffectComposer } from 'three-stdlib';
import { RenderPass } from 'three-stdlib';
import { UnrealBloomPass } from 'three-stdlib';
import { gsap } from 'gsap';

export const Sam3DViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Core Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild(renderer.domElement);

    // --- Post-Processing (The Secret Sauce) ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.2;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // --- Neural Grid & Objects ---
    const grid = new THREE.GridHelper(20, 40, '#00FF41', '#111111');
    grid.position.y = -2;
    grid.material.opacity = 0.1;
    grid.material.transparent = true;
    scene.add(grid);

    const objectGroup = new THREE.Group();
    const geometries = [
      new THREE.TorusKnotGeometry(1, 0.3, 200, 32),
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.IcosahedronGeometry(0.6, 2)
    ];

    const meshes: THREE.Mesh[] = [];
    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshStandardMaterial({ 
        color: '#050505', 
        roughness: 0, 
        metalness: 1,
        emissive: '#00FF41',
        emissiveIntensity: 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (i - 1) * 2;
      mesh.rotation.x = Math.random() * Math.PI;
      objectGroup.add(mesh);
      meshes.push(mesh);
    });
    scene.add(objectGroup);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight('#00FF41', 10);
    pointLight.position.set(2, 5, 5);
    scene.add(pointLight);

    camera.position.set(0, 2, 6);

    // --- Interaction ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const material = selectedMesh.material as THREE.MeshStandardMaterial;

        // Visual Feedback
        gsap.to(material, {
          emissiveIntensity: 5,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(material, { emissiveIntensity: 0.2, duration: 2 });
          }
        });

        setPoints(prev => [...prev, { x: event.clientX, y: event.clientY }]);
      }
    };

    container.addEventListener('mousedown', handleClick);

    // --- Render Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container?.removeEventListener('mousedown', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="liquid-glass-dark px-6 py-3 border border-primary/20 flex items-center gap-3">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Three.js Engine x SAM-3D</span>
        </div>
      </div>
      
      {points.map((p, i) => (
        <div key={i} className="sam-3d-point" style={{ left: p.x - 6, top: p.y - 6 }} />
      ))}

      <div className="absolute bottom-6 right-6 z-20 pointer-events-none text-right">
         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Mesh Rendering</p>
         <p className="text-[10px] font-black text-primary italic">ORBIT ACTIVE // SCROLL TO ZOOM</p>
      </div>
    </div>
  );
};

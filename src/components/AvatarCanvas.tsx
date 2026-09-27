import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const bubbleMessages = [
  "Hello! I'm Keerthi 👋",
  "I build cool stuff ⚡",
  "Shipped 4 real projects 🚀",
  "9.23 CGPA @ Aditya Univ 📚",
  "5 certifications earned 🏆",
  "Let's work together! 💌"
];

export const AvatarCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bubbleText, setBubbleText] = useState(bubbleMessages[0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 400;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.15, 3.6);
    camera.lookAt(0, 0.9, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0x9988ff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7c5cfc, 0.6);
    fillLight.position.set(-3, 2, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00e5c0, 0.5);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const groundLight = new THREE.PointLight(0x7c5cfc, 0.4, 8);
    groundLight.position.set(0, -1, 1);
    scene.add(groundLight);

    // Pedestal floor & glowing ring
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 64),
      new THREE.MeshStandardMaterial({ color: 0x110e1f, roughness: 0.9, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.52;
    floor.receiveShadow = true;
    scene.add(floor);

    const glowRing = new THREE.Mesh(
      new THREE.RingGeometry(0.55, 0.72, 64),
      new THREE.MeshBasicMaterial({ color: 0x7c5cfc, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    glowRing.rotation.x = -Math.PI / 2;
    glowRing.position.y = -1.51;
    scene.add(glowRing);

    // Ambient floating particles
    const pCount = 130;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = Math.random() * 5 - 1;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x7c5cfc, size: 0.03, transparent: true, opacity: 0.65 })
    );
    scene.add(particles);

    // Avatar Group
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    const mat = (col: number, r = 0.6, met = 0.1) =>
      new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: met });

    const skinMat = mat(0xd4956a, 0.7);
    const shirtMat = mat(0xf0f0f0, 0.8);
    const hairMat = mat(0x1a1008, 0.9);
    const pantsMat = mat(0x1e2a4a, 0.7, 0.05);
    const glassMat = mat(0x222222, 0.4, 0.6);
    const lanyardMat = mat(0x1a3a8f, 0.8);
    const badgeMat = mat(0xe8e8e8, 0.5, 0.1);
    const collarMat = mat(0x1a3a8f, 0.8);

    // Legs
    const addLeg = (x: number) => {
      const lm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.7, 16), pantsMat);
      lm.position.set(x, -1.15, 0);
      lm.castShadow = true;
      avatarGroup.add(lm);
      const sm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.28), mat(0x1a1a1a, 0.8));
      sm.position.set(x, -1.54, 0.04);
      sm.castShadow = true;
      avatarGroup.add(sm);
    };
    addLeg(-0.13);
    addLeg(0.13);

    // Torso
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.72, 20), shirtMat);
    torso.position.set(0, -0.44, 0);
    torso.castShadow = true;
    avatarGroup.add(torso);

    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.025, 8, 32, Math.PI * 1.2), collarMat);
    collarMesh.rotation.x = Math.PI * 0.15;
    collarMesh.position.set(0, 0.03, 0.04);
    avatarGroup.add(collarMesh);

    const lanyardCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.06, -0.01),
      new THREE.Vector3(-0.04, -0.12, 0.18),
      new THREE.Vector3(0, -0.28, 0.22)
    ]);
    avatarGroup.add(new THREE.Mesh(new THREE.TubeGeometry(lanyardCurve, 16, 0.008, 6, false), lanyardMat));

    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.13, 0.008), badgeMat);
    badge.position.set(0, -0.35, 0.23);
    avatarGroup.add(badge);

    // Arms
    const armGroup = new THREE.Group();
    avatarGroup.add(armGroup);

    const addArm = (side: number) => {
      const am = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.55, 14), shirtMat);
      am.position.set(side * 0.37, -0.52, 0);
      am.rotation.z = side * 0.18;
      am.castShadow = true;
      armGroup.add(am);

      const fm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.4, 14), skinMat);
      fm.position.set(side * 0.42, -0.86, 0.04);
      fm.rotation.z = side * 0.1;
      fm.rotation.x = 0.15;
      fm.castShadow = true;
      armGroup.add(fm);

      const hm = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), skinMat);
      hm.position.set(side * 0.44, -1.08, 0.12);
      hm.scale.set(1, 0.8, 1);
      hm.castShadow = true;
      armGroup.add(hm);
    };
    addArm(-1);
    addArm(1);

    // Neck & Head
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.16, 16), skinMat);
    neck.position.set(0, 0.11, 0);
    neck.castShadow = true;
    avatarGroup.add(neck);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.55, 0);
    avatarGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.26, 32, 32);
    headGeo.scale(1, 1.12, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    headGroup.add(head);

    // Hair
    const hairTopGeo = new THREE.SphereGeometry(0.265, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    headGroup.add(new THREE.Mesh(hairTopGeo, hairMat));

    [-0.18, 0.18].forEach((x) => {
      const g = new THREE.SphereGeometry(0.195, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
      const hm = new THREE.Mesh(g, hairMat);
      hm.position.set(x, 0, -0.02);
      hm.rotation.z = x > 0 ? 0.25 : -0.25;
      hm.castShadow = true;
      headGroup.add(hm);
    });

    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), hairMat);
    bun.position.set(0, 0.18, -0.22);
    bun.scale.set(1.2, 0.9, 0.8);
    headGroup.add(bun);

    [-0.26, 0.26].forEach((x) => {
      const g = new THREE.SphereGeometry(0.055, 12, 12);
      g.scale(0.6, 1, 0.5);
      const ear = new THREE.Mesh(g, skinMat);
      ear.position.set(x, 0, -0.03);
      headGroup.add(ear);
    });

    // Eyes
    const eyeGroup = new THREE.Group();
    headGroup.add(eyeGroup);
    const ewGeo = new THREE.SphereGeometry(0.052, 16, 16);
    ewGeo.scale(1, 0.85, 0.7);

    const addEye = (x: number) => {
      const ew = new THREE.Mesh(ewGeo.clone(), new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.9 }));
      ew.position.set(x, 0.04, 0.22);
      eyeGroup.add(ew);

      const ir = new THREE.Mesh(
        new THREE.SphereGeometry(0.033, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x3d2810, roughness: 0.5 })
      );
      ir.position.set(x, 0.04, 0.248);
      eyeGroup.add(ir);

      const pu = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.5 })
      );
      pu.position.set(x, 0.04, 0.255);
      eyeGroup.add(pu);

      const gl = new THREE.Mesh(
        new THREE.SphereGeometry(0.008, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
      );
      gl.position.set(x + 0.012, 0.052, 0.262);
      eyeGroup.add(gl);
    };
    addEye(-0.09);
    addEye(0.09);

    // Eyebrows
    [-0.09, 0.09].forEach((x) => {
      const b = new THREE.Mesh(
        new THREE.CylinderGeometry(0.007, 0.007, 0.085, 8),
        new THREE.MeshStandardMaterial({ color: 0x1a1008, roughness: 0.9 })
      );
      b.position.set(x, 0.14, 0.22);
      b.rotation.z = x > 0 ? 0.2 : -0.2;
      b.rotation.x = -0.12;
      headGroup.add(b);
    });

    // Glasses
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.05, 8), glassMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.04, 0.255);
    headGroup.add(bridge);

    const addLens = (x: number) => {
      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.056, 0.007, 8, 32), glassMat);
      frame.position.set(x, 0.04, 0.248);
      frame.rotation.y = x > 0 ? 0.1 : -0.1;
      headGroup.add(frame);

      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(0.052, 32),
        new THREE.MeshStandardMaterial({ color: 0x8899cc, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
      );
      lens.position.set(x, 0.04, 0.248);
      lens.rotation.y = x > 0 ? 0.1 : -0.1;
      headGroup.add(lens);
    };
    addLens(-0.09);
    addLens(0.09);

    // Mouse tracking state
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleMouseLeave = () => {
      tmx = 0;
      tmy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let animationFrameId: number;
    let waving = true;
    let wavePhase = 0;
    let breathPhase = 0;
    let blinkTimer = 0;
    let blinkOpen = 1;
    let frame = 0;

    const stopWavingTimeout = setTimeout(() => {
      waving = false;
    }, 2800);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.016;

      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      // Floating particles
      const pos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        pos[i * 3 + 1] += 0.004;
        if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.0006;

      // Glowing ring pulse
      glowRing.material.opacity = 0.22 + Math.sin(t * 1.8) * 0.18;
      glowRing.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);

      // Breathing motion
      breathPhase += 0.018;
      const breath = Math.sin(breathPhase) * 0.012;
      torso.scale.y = 1 + breath;
      torso.scale.x = 1 - breath * 0.3;

      // Eye blink
      blinkTimer++;
      if (blinkTimer > 180 + Math.random() * 120) {
        blinkOpen = 0;
        blinkTimer = 0;
        setTimeout(() => {
          blinkOpen = 1;
        }, 120);
      }
      eyeGroup.scale.y = blinkOpen === 0 ? 0.1 : 1;

      // Arm wave
      if (waving) {
        wavePhase += 0.08;
        armGroup.rotation.z = Math.sin(wavePhase) * 0.35;
        armGroup.position.y = Math.abs(Math.sin(wavePhase)) * 0.04;
      } else {
        armGroup.rotation.z += (-armGroup.rotation.z) * 0.05;
        armGroup.position.y += (-armGroup.position.y) * 0.05;
      }

      // Head & body mouse tracking
      headGroup.rotation.y += (mx * 0.32 + Math.sin(t * 0.5) * 0.04 - headGroup.rotation.y) * 0.06;
      headGroup.rotation.x += (my * 0.2 - headGroup.rotation.x) * 0.06;
      torso.rotation.y += (mx * 0.08 - torso.rotation.y) * 0.04;
      avatarGroup.position.y = Math.sin(t * 0.6) * 0.018;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 320;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(stopWavingTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Speech bubble cycle on click or hover
  const handleNextMessage = () => {
    setBubbleText((prev) => {
      const idx = bubbleMessages.indexOf(prev);
      return bubbleMessages[(idx + 1) % bubbleMessages.length];
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] rounded-2xl overflow-hidden border border-[#7c5cfc]/30 bg-gradient-to-br from-[#0d0d1a] via-[#13131e] to-[#1a1030] shadow-[0_0_50px_rgba(124,92,252,0.15),0_20px_60px_rgba(0,0,0,0.6)] group transition-all duration-300 hover:border-[#00e5c0]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNextMessage}
    >
      <canvas ref={canvasRef} className="block w-full h-full cursor-pointer" />

      {/* Floating Speech Bubble */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-20 ${
          isHovered ? 'opacity-100 -translate-y-6 scale-100' : 'opacity-85 -translate-y-2 scale-95'
        }`}
      >
        <div className="relative bg-[#7c5cfc] text-white font-mono text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-[#a28aff]">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#7c5cfc] rotate-45 border-r border-b border-[#a28aff]" />
        </div>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#00e5c0]/70 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5c0] animate-pulse" />
        <span>Interactive 3D Avatar</span>
      </div>
    </div>
  );
};

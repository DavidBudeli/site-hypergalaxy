"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function noise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function StarField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 2.8 + noise(index, 1) * 6.5;
      const angle = noise(index, 2) * Math.PI * 2;
      const depth = (noise(index, 3) - 0.5) * 5.8;
      data[index * 3] = Math.cos(angle) * radius;
      data[index * 3 + 1] = (noise(index, 4) - 0.5) * 4.6;
      data[index * 3 + 2] = Math.sin(angle) * radius + depth;
    }
    return data;
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C4B5FD"
        size={0.013}
        transparent
        opacity={0.52}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse, clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.14 + mouse.x * 0.14;
    groupRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.24) * 0.06 + mouse.y * 0.08;
  });

  return (
    <group ref={groupRef} position={[0.2, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.52, 48, 48]} />
        <meshBasicMaterial color="#5B21B6" transparent opacity={0.08} />
      </mesh>
      {[1.05, 1.46, 1.88].map((radius, index) => (
        <mesh
          key={radius}
          rotation={[
            Math.PI / 2.5 + index * 0.3,
            index * 0.35,
            Math.PI / 6 + index * 0.4
          ]}
        >
          <torusGeometry args={[radius, 0.005, 8, 180]} />
          <meshBasicMaterial
            color={index === 0 ? "#8B5CF6" : index === 1 ? "#6366F1" : "#7C3AED"}
            transparent
            opacity={0.36 - index * 0.08}
          />
        </mesh>
      ))}
      <pointLight color="#7C3AED" intensity={0.7} distance={6} />
      <pointLight color="#6366F1" intensity={0.45} distance={7} position={[2, 1, 2]} />
    </group>
  );
}

export function GalaxyCanvas() {
  return (
    <div className="absolute inset-0 cinematic-mask">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.35} />
        <StarField count={1400} />
        <OrbitalCore />
      </Canvas>
    </div>
  );
}

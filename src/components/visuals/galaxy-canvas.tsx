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
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#67E8F9"
        size={0.018}
        transparent
        opacity={0.76}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse, clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.18 + mouse.x * 0.2;
    groupRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.3) * 0.08 + mouse.y * 0.12;
  });

  return (
    <group ref={groupRef} position={[0.2, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.54, 48, 48]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.12} />
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
          <torusGeometry args={[radius, 0.006, 8, 180]} />
          <meshBasicMaterial
            color={index === 1 ? "#8B5CF6" : "#22D3EE"}
            transparent
            opacity={0.58 - index * 0.09}
          />
        </mesh>
      ))}
      <pointLight color="#22D3EE" intensity={1.2} distance={6} />
      <pointLight color="#8B5CF6" intensity={0.8} distance={7} position={[2, 1, 2]} />
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
        <ambientLight intensity={0.45} />
        <StarField count={1600} />
        <OrbitalCore />
      </Canvas>
    </div>
  );
}

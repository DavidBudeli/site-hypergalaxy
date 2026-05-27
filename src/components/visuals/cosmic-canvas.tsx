"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function createRadialTexture(stops: Array<[number, string]>) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.04,
    size * 0.5,
    size * 0.5,
    size * 0.5
  );

  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function StarLayer({
  count,
  spread,
  depth,
  size,
  color,
  speed
}: {
  count: number;
  spread: number;
  depth: number;
  size: number;
  color: string;
  speed: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (seeded(index, 1) - 0.5) * spread;
      data[index * 3 + 1] = (seeded(index, 2) - 0.5) * spread * 0.58;
      data[index * 3 + 2] = -seeded(index, 3) * depth - 0.8;
    }

    return data;
  }, [count, depth, spread]);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.position.z =
      Math.sin(clock.elapsedTime * speed * 4.2) * 0.22;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.82}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DustStream() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 900;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const lane = seeded(index, 8) > 0.5 ? 1 : -1;
      data[index * 3] = (seeded(index, 9) - 0.5) * 12 + lane * 1.8;
      data[index * 3 + 1] = (seeded(index, 10) - 0.5) * 5.5;
      data[index * 3 + 2] = -seeded(index, 11) * 18;
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.position.z = (clock.elapsedTime * 0.18) % 3;
    pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#94A3B8"
        size={0.012}
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

function Nebulae() {
  const groupRef = useRef<THREE.Group>(null);
  const violet = useMemo(
    () =>
      createRadialTexture([
        [0, "rgba(139,92,246,0.42)"],
        [0.34, "rgba(109,40,217,0.20)"],
        [1, "rgba(3,7,18,0)"]
      ]),
    []
  );
  const cyan = useMemo(
    () =>
      createRadialTexture([
        [0, "rgba(34,211,238,0.24)"],
        [0.42, "rgba(37,99,235,0.13)"],
        [1, "rgba(3,7,18,0)"]
      ]),
    []
  );

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.045) * 0.035;
    groupRef.current.position.x = mouse.x * 0.25;
    groupRef.current.position.y = mouse.y * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      <mesh position={[-3.8, 1.5, -1]} rotation={[0, 0, -0.34]}>
        <planeGeometry args={[8.6, 5.4]} />
        <meshBasicMaterial
          map={violet}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[3.4, -0.8, -2]} rotation={[0, 0, 0.24]}>
        <planeGeometry args={[8, 4.8]} />
        <meshBasicMaterial
          map={cyan}
          transparent
          opacity={0.74}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function DistantGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const count = 1900;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const arm = index % 3;
      const radius = seeded(index, 21) * 2.8;
      const angle = radius * 3.1 + arm * ((Math.PI * 2) / 3) + seeded(index, 22) * 0.45;
      data[index * 3] = Math.cos(angle) * radius * 1.48;
      data[index * 3 + 1] = (seeded(index, 23) - 0.5) * 0.26;
      data[index * 3 + 2] = Math.sin(angle) * radius * 0.32;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.018;
  });

  return (
    <group
      ref={groupRef}
      position={[4.6, 1.9, -13]}
      rotation={[0.82, 0.04, -0.28]}
      scale={[1.55, 1.55, 1.55]}
    >
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#A78BFA"
          size={0.024}
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial
          color="#E2E8F0"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Planet({
  position,
  radius,
  color,
  atmosphere,
  rotationSpeed
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  atmosphere: string;
  rotationSpeed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.86}
          metalness={0.02}
          emissive={color}
          emissiveIntensity={0.025}
        />
      </mesh>
      <mesh scale={1.045}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color={atmosphere}
          transparent
          opacity={0.105}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function BlackHole() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[-4.8, -1.65, -7.8]} rotation={[0.9, -0.22, 0.25]}>
      <mesh>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshBasicMaterial color="#01030A" />
      </mesh>
      <mesh>
        <torusGeometry args={[0.82, 0.018, 12, 180]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[0, 0, 0.22]}>
        <torusGeometry args={[1.06, 0.006, 8, 180]} />
        <meshBasicMaterial
          color="#67E8F9"
          transparent
          opacity={0.23}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function UniverseRig() {
  const rigRef = useRef<THREE.Group>(null);
  const targetScroll = useRef(0);

  useFrame(({ clock, mouse }) => {
    if (!rigRef.current) return;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const next = window.scrollY / scrollable;
    targetScroll.current += (next - targetScroll.current) * 0.035;

    rigRef.current.position.z = targetScroll.current * 3.8;
    rigRef.current.position.x = mouse.x * 0.28;
    rigRef.current.position.y =
      Math.sin(clock.elapsedTime * 0.09) * 0.08 + mouse.y * 0.16;
    rigRef.current.rotation.y = targetScroll.current * 0.38 + mouse.x * 0.025;
  });

  return (
    <group ref={rigRef}>
      <Nebulae />
      <DistantGalaxy />
      <BlackHole />
      <Planet
        position={[5.5, -1.7, -8.4]}
        radius={1.72}
        color="#1E3A8A"
        atmosphere="#67E8F9"
        rotationSpeed={0.035}
      />
      <Planet
        position={[-6.1, 2.35, -11.2]}
        radius={1.2}
        color="#4C1D95"
        atmosphere="#A78BFA"
        rotationSpeed={0.026}
      />
    </group>
  );
}

export function CosmicCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]"
      data-space-depth
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 56 }}
        dpr={[1, 1.35]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[-3, 2, 4]} intensity={1.15} color="#E2E8F0" />
        <pointLight position={[4, 0, 2]} intensity={1.2} color="#67E8F9" />
        <pointLight position={[-4, 2, 0]} intensity={0.82} color="#8B5CF6" />
        <StarLayer count={2300} spread={18} depth={20} size={0.012} color="#E2E8F0" speed={0.004} />
        <StarLayer count={1100} spread={12} depth={11} size={0.018} color="#67E8F9" speed={0.009} />
        <DustStream />
        <UniverseRig />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(3,7,18,0.44)_100%),linear-gradient(180deg,rgba(3,7,18,0.18),rgba(3,7,18,0.72))]" />
    </div>
  );
}

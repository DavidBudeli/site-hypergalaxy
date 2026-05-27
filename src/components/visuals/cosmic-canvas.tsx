"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const deepBluePlanet = ["#061322", "#0E3A5E", "#1D76A3", "#67E8F9", "#F0FDFF"];
const violetPlanet = ["#120B22", "#3A2467", "#7C3AED", "#A78BFA", "#F5F3FF"];

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function hash2(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return value - Math.floor(value);
}

function valueNoise(x: number, y: number, seed: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);
  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  const x1 = a + (b - a) * fx;
  const x2 = c + (d - c) * fx;
  return x1 + (x2 - x1) * fy;
}

function fbm(x: number, y: number, seed: number, octaves = 5) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let total = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    value += valueNoise(x * frequency, y * frequency, seed + octave * 19.17) * amplitude;
    total += amplitude;
    amplitude *= 0.52;
    frequency *= 2.03;
  }

  return value / total;
}

function colorToRgb(color: string) {
  const parsed = new THREE.Color(color);
  return {
    r: Math.round(parsed.r * 255),
    g: Math.round(parsed.g * 255),
    b: Math.round(parsed.b * 255)
  };
}

function mixHexColor(a: string, b: string, amount: number) {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  ca.lerp(cb, clamp(amount));
  return ca;
}

function createCanvasTexture(
  width: number,
  height: number,
  draw: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return new THREE.Texture();
  }

  draw(context, canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 2;
  return texture;
}

function createNebulaTexture(seed: number, palette: [string, string, string]) {
  return createCanvasTexture(512, 512, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);
    const colors = palette.map(colorToRgb);

    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const nx = (x / canvas.width - 0.5) * 2;
        const ny = (y / canvas.height - 0.5) * 2;
        const radius = Math.sqrt(nx * nx * 0.9 + ny * ny * 1.55);
        const angle = Math.atan2(ny, nx);
        const swirlX = nx * Math.cos(radius * 2.6) - ny * Math.sin(radius * 1.7);
        const swirlY = nx * Math.sin(angle * 0.28) + ny * Math.cos(radius * 1.5);
        const vapor = fbm(swirlX * 3.8 + radius * 2.4, swirlY * 3.3, seed, 6);
        const filament = fbm(nx * 9.2 + Math.sin(angle) * 1.7, ny * 6.2, seed + 43, 4);
        const fade = clamp(1 - radius * 1.18);
        const alpha = clamp((vapor * 0.72 + filament * 0.36 - 0.42) * fade * fade * 1.6);
        const mix = clamp(vapor * 0.8 + radius * 0.28);
        const c1 = colors[0];
        const c2 = colors[mix > 0.54 ? 2 : 1];
        const colorBlend = clamp((mix - 0.2) / 0.8);
        const index = (y * canvas.width + x) * 4;

        image.data[index] = Math.round(c1.r + (c2.r - c1.r) * colorBlend);
        image.data[index + 1] = Math.round(c1.g + (c2.g - c1.g) * colorBlend);
        image.data[index + 2] = Math.round(c1.b + (c2.b - c1.b) * colorBlend);
        image.data[index + 3] = Math.round(alpha * 205);
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createSoftGalaxyTexture(seed: number) {
  return createCanvasTexture(768, 384, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const nx = (x / canvas.width - 0.5) * 2;
        const ny = (y / canvas.height - 0.5) * 2;
        const radius = Math.sqrt(nx * nx * 0.42 + ny * ny * 2.8);
        const angle = Math.atan2(ny * 2.3, nx);
        const arm = Math.sin(angle * 3 + radius * 11.5 + fbm(nx * 3, ny * 3, seed, 4) * 2.3);
        const core = Math.exp(-radius * 4.2);
        const dust = fbm(nx * 6.5, ny * 8.5, seed + 9, 4);
        const alpha = clamp((0.28 + arm * 0.18 + dust * 0.22) * Math.exp(-radius * 2.15));
        const warm = clamp(core + arm * 0.2);
        const index = (y * canvas.width + x) * 4;

        image.data[index] = Math.round(118 + warm * 92);
        image.data[index + 1] = Math.round(118 + warm * 78);
        image.data[index + 2] = Math.round(190 + dust * 48);
        image.data[index + 3] = Math.round(alpha * 145);
      }
    }

    context.filter = "blur(6px)";
    context.putImageData(image, 0, 0);
  });
}

function createPlanetMaps(seed: number, palette: string[]) {
  const width = 1024;
  const height = 512;
  const texture = createCanvasTexture(width, height, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 1) {
      const v = y / canvas.height;
      const latitude = Math.sin((v - 0.5) * Math.PI);

      for (let x = 0; x < canvas.width; x += 1) {
        const u = x / canvas.width;
        const flow = fbm(u * 5.8 + latitude * 0.9, v * 3.2, seed, 6);
        const ridges = fbm(u * 19 + Math.sin(v * 20) * 0.08, v * 12, seed + 21, 4);
        const bands = Math.sin((v + flow * 0.16) * Math.PI * 16) * 0.5 + 0.5;
        const shade = clamp(flow * 0.58 + ridges * 0.28 + bands * 0.18);
        const colorA = palette[Math.min(palette.length - 1, Math.floor(shade * (palette.length - 1)))];
        const colorB = palette[Math.min(palette.length - 1, Math.floor(shade * (palette.length - 1)) + 1)];
        const color = mixHexColor(colorA, colorB, shade * (palette.length - 1) % 1);
        const polar = clamp(Math.abs(latitude) - 0.72, 0, 1);
        color.lerp(new THREE.Color("#DCEBFF"), polar * 0.24);

        const index = (y * canvas.width + x) * 4;
        image.data[index] = Math.round(color.r * 255);
        image.data[index + 1] = Math.round(color.g * 255);
        image.data[index + 2] = Math.round(color.b * 255);
        image.data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });

  const bump = createCanvasTexture(width, height, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const value = fbm((x / width) * 18, (y / height) * 10, seed + 77, 5);
        const ridge = fbm((x / width) * 42, (y / height) * 22, seed + 101, 3);
        const heightValue = Math.round(clamp(value * 0.68 + ridge * 0.32) * 255);
        const index = (y * canvas.width + x) * 4;
        image.data[index] = heightValue;
        image.data[index + 1] = heightValue;
        image.data[index + 2] = heightValue;
        image.data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });

  const clouds = createCanvasTexture(width, height, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const u = x / width;
        const v = y / height;
        const bands = Math.sin((v + fbm(u * 3, v * 3, seed + 5, 4) * 0.1) * Math.PI * 18);
        const cloudsValue = fbm(u * 18, v * 9, seed + 33, 5);
        const alpha = clamp((cloudsValue * 0.6 + bands * 0.22 - 0.48) * 1.2);
        const index = (y * canvas.width + x) * 4;
        image.data[index] = 215;
        image.data[index + 1] = 232;
        image.data[index + 2] = 255;
        image.data[index + 3] = Math.round(alpha * 76);
      }
    }

    context.putImageData(image, 0, 0);
  });

  return { texture, bump, clouds };
}

function createAccretionTexture(seed: number) {
  return createCanvasTexture(1024, 1024, (context, canvas) => {
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const nx = (x / canvas.width - 0.5) * 2;
        const ny = (y / canvas.height - 0.5) * 2;
        const radius = Math.sqrt(nx * nx + ny * ny);
        const angle = Math.atan2(ny, nx);
        const ringMask = clamp(1 - Math.abs(radius - 0.58) / 0.35);
        const innerShadow = clamp((radius - 0.22) / 0.16);
        const outerFade = clamp((0.98 - radius) / 0.26);
        const turbulence = fbm(Math.cos(angle) * 6 + radius * 11, Math.sin(angle) * 6, seed, 5);
        const streak = Math.sin(angle * 7 + radius * 24 + turbulence * 4) * 0.5 + 0.5;
        const alpha = clamp(ringMask * innerShadow * outerFade * (0.46 + turbulence * 0.48 + streak * 0.28));
        const heat = clamp(turbulence * 0.7 + streak * 0.42);
        const index = (y * canvas.width + x) * 4;

        image.data[index] = Math.round(130 + heat * 92);
        image.data[index + 1] = Math.round(118 + heat * 76);
        image.data[index + 2] = Math.round(205 + heat * 48);
        image.data[index + 3] = Math.round(alpha * 210);
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createLensTexture() {
  return createCanvasTexture(512, 512, (context, canvas) => {
    const gradient = context.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.06,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.5
    );
    gradient.addColorStop(0, "rgba(0,0,0,0.92)");
    gradient.addColorStop(0.2, "rgba(0,0,0,0.84)");
    gradient.addColorStop(0.32, "rgba(167,139,250,0.18)");
    gradient.addColorStop(0.48, "rgba(103,232,249,0.08)");
    gradient.addColorStop(1, "rgba(3,7,18,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  });
}

function CinematicStarLayer({
  count,
  spread,
  depth,
  size,
  opacity,
  speed,
  scrollFactor,
  colorShift
}: {
  count: number;
  spread: number;
  depth: number;
  size: number;
  opacity: number;
  speed: number;
  scrollFactor: number;
  colorShift: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const cold = new THREE.Color("#CFFAFE");
    const warm = new THREE.Color("#F8FAFC");
    const violet = new THREE.Color("#C4B5FD");

    for (let index = 0; index < count; index += 1) {
      const depthBias = Math.pow(seeded(index, 3), 1.8);
      nextPositions[index * 3] = (seeded(index, 1) - 0.5) * spread;
      nextPositions[index * 3 + 1] = (seeded(index, 2) - 0.5) * spread * 0.62;
      nextPositions[index * 3 + 2] = -depthBias * depth - 0.9;

      const color = warm.clone().lerp(cold, seeded(index, 4) * 0.55);
      color.lerp(violet, seeded(index, 5) * colorShift);
      nextColors[index * 3] = color.r;
      nextColors[index * 3 + 1] = color.g;
      nextColors[index * 3 + 2] = color.b;
    }

    return { positions: nextPositions, colors: nextColors };
  }, [colorShift, count, depth, spread]);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const scroll = window.scrollY / scrollable;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.025;
    pointsRef.current.position.z =
      Math.sin(clock.elapsedTime * speed * 8) * 0.38 + scroll * scrollFactor;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={size}
        transparent
        opacity={opacity}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 2400;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const lane = seeded(index, 8) > 0.5 ? 1 : -1;
      data[index * 3] = (seeded(index, 9) - 0.5) * 15 + lane * seeded(index, 12) * 1.8;
      data[index * 3 + 1] = (seeded(index, 10) - 0.5) * 7.2;
      data[index * 3 + 2] = -seeded(index, 11) * 22 - 0.4;
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const scroll = window.scrollY / scrollable;
    pointsRef.current.position.z = (clock.elapsedTime * 0.22 + scroll * 5.5) % 4;
    pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.045) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#AEB8C7"
        size={0.01}
        transparent
        opacity={0.22}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function VolumetricNebulae() {
  const groupRef = useRef<THREE.Group>(null);
  const violet = useMemo(
    () => createNebulaTexture(13, ["#261047", "#6D28D9", "#67E8F9"]),
    []
  );
  const blue = useMemo(
    () => createNebulaTexture(29, ["#061526", "#2563EB", "#22D3EE"]),
    []
  );
  const smoke = useMemo(
    () => createNebulaTexture(47, ["#0B0F17", "#334155", "#A78BFA"]),
    []
  );

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.022) * 0.05;
    groupRef.current.position.x = mouse.x * 0.42;
    groupRef.current.position.y = mouse.y * 0.18;
  });

  return (
    <group ref={groupRef} position={[0, 0, -11]}>
      <mesh position={[-4.6, 1.2, -2.4]} rotation={[0.08, -0.12, -0.32]}>
        <planeGeometry args={[12.8, 7.4]} />
        <meshBasicMaterial
          map={violet}
          transparent
          opacity={0.94}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[3.9, -0.8, -3.6]} rotation={[-0.08, 0.12, 0.22]}>
        <planeGeometry args={[12.4, 6.8]} />
        <meshBasicMaterial
          map={blue}
          transparent
          opacity={0.82}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0.6, 0.1, -5.8]} rotation={[0.12, 0.08, 0.04]}>
        <planeGeometry args={[14.5, 8.2]} />
        <meshBasicMaterial
          map={smoke}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

function DistantGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const galaxyGlow = useMemo(() => createSoftGalaxyTexture(61), []);
  const positions = useMemo(() => {
    const count = 3200;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const arm = index % 4;
      const radius = Math.pow(seeded(index, 21), 1.85) * 3.8;
      const angle =
        radius * 3.35 + arm * ((Math.PI * 2) / 4) + seeded(index, 22) * 0.58;
      data[index * 3] = Math.cos(angle) * radius * 1.7;
      data[index * 3 + 1] = (seeded(index, 23) - 0.5) * 0.34;
      data[index * 3 + 2] = Math.sin(angle) * radius * 0.42;
    }

    return data;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.012;
    groupRef.current.position.y = 2.2 + Math.sin(clock.elapsedTime * 0.025) * 0.16;
  });

  return (
    <group
      ref={groupRef}
      position={[0.8, 2.35, -16.2]}
      rotation={[0.88, 0.02, -0.22]}
      scale={[2.18, 2.18, 2.18]}
    >
      <mesh rotation={[-0.88, 0, 0]}>
        <planeGeometry args={[9.6, 4.6]} />
        <meshBasicMaterial
          map={galaxyGlow}
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#D8B4FE"
          size={0.018}
          transparent
          opacity={0.34}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function AtmosphereMaterial({ color }: { color: string }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(color) }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform vec3 cameraPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float rim = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 2.25);
            float haze = pow(rim, 1.35) * 0.74;
            gl_FragColor = vec4(glowColor, haze);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      }),
    [color]
  );

  return <primitive object={material} attach="material" />;
}

function CinematicPlanet({
  position,
  radius,
  palette,
  atmosphere,
  seed,
  rotationSpeed,
  tilt
}: {
  position: [number, number, number];
  radius: number;
  palette: string[];
  atmosphere: string;
  seed: number;
  rotationSpeed: number;
  tilt: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const maps = useMemo(() => createPlanetMaps(seed, palette), [palette, seed]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * rotationSpeed * 1.34;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={tilt}>
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshBasicMaterial
          map={maps.texture}
        />
      </mesh>
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshBasicMaterial
          map={maps.clouds}
          transparent
          opacity={0.46}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={1.075}>
        <sphereGeometry args={[radius, 96, 96]} />
        <AtmosphereMaterial color={atmosphere} />
      </mesh>
    </group>
  );
}

function BlackHole() {
  const groupRef = useRef<THREE.Group>(null);
  const disk = useMemo(() => createAccretionTexture(93), []);
  const lens = useMemo(() => createLensTexture(), []);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.045;
    groupRef.current.position.y = -1.38 + Math.sin(clock.elapsedTime * 0.04) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      position={[0.42, -0.72, -9.4]}
      rotation={[1.06, -0.16, 0.24]}
      scale={[1.16, 1.16, 1.16]}
    >
      <mesh rotation={[-1.06, 0, 0]} scale={[2.5, 2.5, 1]}>
        <planeGeometry args={[2.9, 2.9]} />
        <meshBasicMaterial
          map={lens}
          transparent
          opacity={0.46}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[0.42, 1.62, 256]} />
        <meshBasicMaterial
          map={disk}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[0.02, 0.08, 0.16]}>
        <torusGeometry args={[1.04, 0.018, 18, 256]} />
        <meshBasicMaterial
          color="#C4B5FD"
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.38, 64, 64]} />
        <meshBasicMaterial color="#000107" />
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

    rigRef.current.position.z = targetScroll.current * 5.8;
    rigRef.current.position.x = mouse.x * 0.36;
    rigRef.current.position.y =
      Math.sin(clock.elapsedTime * 0.045) * 0.16 + mouse.y * 0.2;
    rigRef.current.rotation.y = targetScroll.current * 0.52 + mouse.x * 0.035;
    rigRef.current.rotation.x = -targetScroll.current * 0.11 + mouse.y * 0.015;
  });

  return (
    <group ref={rigRef}>
      <VolumetricNebulae />
      <DistantGalaxy />
      <BlackHole />
      <CinematicPlanet
        position={[7.6, 0.32, -7.1]}
        radius={3.65}
        palette={deepBluePlanet}
        atmosphere="#67E8F9"
        seed={11}
        rotationSpeed={0.026}
        tilt={[0.08, -0.32, -0.14]}
      />
      <CinematicPlanet
        position={[-4.85, 1.14, -8.4]}
        radius={2.42}
        palette={violetPlanet}
        atmosphere="#A78BFA"
        seed={37}
        rotationSpeed={0.018}
        tilt={[-0.14, 0.28, 0.18]}
      />
      <CinematicPlanet
        position={[1.1, -3.25, -14.8]}
        radius={2.35}
        palette={deepBluePlanet}
        atmosphere="#93C5FD"
        seed={71}
        rotationSpeed={0.012}
        tilt={[0.18, 0.18, 0.08]}
      />
    </group>
  );
}

function drawNebula(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  secondary: string,
  alpha: number,
  rotation: number
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.scale(width, height);
  context.globalCompositeOperation = "screen";
  context.globalAlpha = alpha;
  context.filter = "blur(34px)";

  const gradient = context.createRadialGradient(0, 0, 0.02, 0, 0, 0.7);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.42, secondary);
  gradient.addColorStop(1, "rgba(3,7,18,0)");
  context.fillStyle = gradient;
  context.beginPath();
  context.ellipse(0, 0, 1, 0.44, 0, 0, Math.PI * 2);
  context.fill();

  context.filter = "blur(10px)";
  context.globalAlpha = alpha * 0.48;
  for (let index = 0; index < 18; index += 1) {
    const offset = index / 18;
    context.strokeStyle =
      index % 2 === 0 ? "rgba(103,232,249,0.28)" : "rgba(167,139,250,0.22)";
    context.lineWidth = 0.012;
    context.beginPath();
    context.ellipse(
      Math.sin(index * 1.7) * 0.14,
      (offset - 0.5) * 0.68,
      0.88 - offset * 0.3,
      0.08 + offset * 0.18,
      offset * 1.7,
      0,
      Math.PI * 2
    );
    context.stroke();
  }

  context.restore();
}

function drawGalaxy(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  time: number
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.scale(1.9, 0.42);
  context.globalCompositeOperation = "screen";
  context.filter = "blur(7px)";

  const core = context.createRadialGradient(0, 0, radius * 0.03, 0, 0, radius);
  core.addColorStop(0, "rgba(248,250,252,0.28)");
  core.addColorStop(0.18, "rgba(167,139,250,0.22)");
  core.addColorStop(0.58, "rgba(37,99,235,0.08)");
  core.addColorStop(1, "rgba(3,7,18,0)");
  context.fillStyle = core;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  context.filter = "blur(1px)";
  for (let index = 0; index < 360; index += 1) {
    const arm = index % 4;
    const t = index / 360;
    const r = Math.pow(t, 0.78) * radius * 0.92;
    const angle = r * 0.035 + arm * (Math.PI / 2) + time * 0.015;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r * 0.28;
    context.globalAlpha = (1 - t) * 0.34;
    context.fillStyle = index % 3 === 0 ? "#C4B5FD" : "#E0F2FE";
    context.beginPath();
    context.arc(px, py, 0.8 + (1 - t) * 1.4, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function drawPlanet(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  palette: string[],
  atmosphere: string,
  seed: number,
  time: number
) {
  context.save();
  context.translate(x, y);

  context.shadowBlur = radius * 0.22;
  context.shadowColor = atmosphere;
  context.globalCompositeOperation = "screen";
  context.globalAlpha = 0.38;
  const glow = context.createRadialGradient(0, 0, radius * 0.72, 0, 0, radius * 1.22);
  glow.addColorStop(0, "rgba(3,7,18,0)");
  glow.addColorStop(0.74, atmosphere);
  glow.addColorStop(1, "rgba(3,7,18,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(0, 0, radius * 1.22, 0, Math.PI * 2);
  context.fill();

  context.globalAlpha = 0.3;
  context.strokeStyle = atmosphere;
  context.lineWidth = Math.max(2, radius * 0.018);
  context.beginPath();
  context.arc(0, 0, radius * 1.025, 0, Math.PI * 2);
  context.stroke();

  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;
  context.shadowBlur = 0;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.clip();

  const surface = context.createRadialGradient(
    -radius * 0.42,
    -radius * 0.38,
    radius * 0.08,
    0,
    0,
    radius * 1.05
  );
  surface.addColorStop(0, palette[4] ?? palette[3]);
  surface.addColorStop(0.2, palette[3] ?? palette[2]);
  surface.addColorStop(0.42, palette[3] ?? palette[2]);
  surface.addColorStop(0.7, palette[1]);
  surface.addColorStop(1, palette[0]);
  context.fillStyle = surface;
  context.fillRect(-radius, -radius, radius * 2, radius * 2);

  context.globalAlpha = 0.18;
  context.filter = "blur(1.4px)";
  context.lineCap = "round";
  for (let index = 0; index < 54; index += 1) {
    const lane = (seeded(index, seed) - 0.5) * radius * 1.6;
    const wave = Math.sin(index * 1.91 + time * 0.18) * radius * 0.08;
    context.strokeStyle =
      index % 3 === 0 ? "rgba(226,232,240,0.14)" : "rgba(15,23,42,0.16)";
    context.lineWidth = radius * (0.003 + seeded(index, seed + 1) * 0.008);
    context.beginPath();
    context.ellipse(
      wave,
      lane,
      radius * (0.76 + seeded(index, seed + 2) * 0.25),
      radius * (0.035 + seeded(index, seed + 3) * 0.08),
      Math.sin(index + seed) * 0.12,
      0,
      Math.PI * 2
    );
    context.stroke();
  }
  context.filter = "none";

  context.globalAlpha = 1;
  context.globalCompositeOperation = "screen";
  const highlight = context.createRadialGradient(
    -radius * 0.44,
    -radius * 0.42,
    radius * 0.04,
    -radius * 0.22,
    -radius * 0.22,
    radius * 0.86
  );
  highlight.addColorStop(0, "rgba(255,255,255,0.26)");
  highlight.addColorStop(0.46, "rgba(103,232,249,0.08)");
  highlight.addColorStop(1, "rgba(3,7,18,0)");
  context.fillStyle = highlight;
  context.fillRect(-radius, -radius, radius * 2, radius * 2);

  context.globalCompositeOperation = "source-over";
  const shadow = context.createRadialGradient(
    radius * 0.52,
    radius * 0.22,
    radius * 0.1,
    radius * 0.12,
    radius * 0.1,
    radius * 1.25
  );
  shadow.addColorStop(0, "rgba(3,7,18,0)");
  shadow.addColorStop(0.48, "rgba(3,7,18,0.04)");
  shadow.addColorStop(0.86, "rgba(0,0,0,0.22)");
  shadow.addColorStop(1, "rgba(0,0,0,0.34)");
  context.fillStyle = shadow;
  context.fillRect(-radius, -radius, radius * 2, radius * 2);

  context.restore();
}

function drawBlackHole(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.globalCompositeOperation = "screen";

  context.filter = "blur(18px)";
  const lens = context.createRadialGradient(0, 0, radius * 0.4, 0, 0, radius * 3.1);
  lens.addColorStop(0, "rgba(0,0,0,0.95)");
  lens.addColorStop(0.3, "rgba(167,139,250,0.16)");
  lens.addColorStop(0.54, "rgba(103,232,249,0.09)");
  lens.addColorStop(1, "rgba(3,7,18,0)");
  context.fillStyle = lens;
  context.beginPath();
  context.arc(0, 0, radius * 3.1, 0, Math.PI * 2);
  context.fill();

  context.filter = "blur(1px)";
  for (let index = 0; index < 18; index += 1) {
    context.globalAlpha = 0.34 + index * 0.018;
    context.strokeStyle = index % 2 === 0 ? "#C4B5FD" : "#67E8F9";
    context.lineWidth = Math.max(1.4, radius * 0.02);
    context.beginPath();
    context.ellipse(0, 0, radius * (1.75 + index * 0.035), radius * 0.42, 0, 0, Math.PI * 2);
    context.stroke();
  }

  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;
  context.fillStyle = "#000107";
  context.beginPath();
  context.arc(0, 0, radius * 0.74, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function CinematicBitmapSpace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const stars = Array.from({ length: 1550 }, (_, index) => ({
      x: seeded(index, 101),
      y: seeded(index, 102),
      z: seeded(index, 103),
      size: 0.35 + seeded(index, 104) * 1.35,
      alpha: 0.2 + seeded(index, 105) * 0.68
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (timeMs: number) => {
      const time = timeMs / 1000;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scroll = window.scrollY / scrollable;

      context.clearRect(0, 0, width, height);
      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#030712");
      base.addColorStop(0.48, "#050816");
      base.addColorStop(1, "#081120");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      drawNebula(
        context,
        width * 0.24 + scroll * 80,
        height * 0.22 + Math.sin(time * 0.05) * 12,
        width * 0.48,
        height * 0.52,
        "rgba(124,58,237,0.34)",
        "rgba(34,211,238,0.16)",
        0.84,
        -0.38
      );
      drawNebula(
        context,
        width * 0.78 - scroll * 110,
        height * 0.56,
        width * 0.56,
        height * 0.46,
        "rgba(37,99,235,0.24)",
        "rgba(103,232,249,0.12)",
        0.62,
        0.24
      );
      drawGalaxy(context, width * 0.58, height * 0.16 + scroll * 70, width * 0.2, -0.16, time);

      context.globalCompositeOperation = "screen";
      stars.forEach((star) => {
        const depth = 0.35 + star.z * 1.8;
        const px = ((star.x * width + time * depth * 7 + scroll * depth * 210) % (width + 24)) - 12;
        const py = ((star.y * height + scroll * depth * 90) % (height + 24)) - 12;
        context.globalAlpha = star.alpha * (0.38 + star.z * 0.62);
        context.fillStyle = star.z > 0.72 ? "#E0F2FE" : "#F8FAFC";
        context.beginPath();
        context.arc(px, py, star.size * (0.7 + star.z), 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = "source-over";
      drawPlanet(
        context,
        width * 0.17 + scroll * 34,
        height * 0.17 + Math.sin(time * 0.025) * 8,
        Math.min(width, height) * 0.25,
        violetPlanet,
        "rgba(167,139,250,0.8)",
        41,
        time
      );
      drawPlanet(
        context,
        width * 0.96 - scroll * 42,
        height * 0.24 + Math.cos(time * 0.024) * 9,
        Math.min(width, height) * 0.38,
        deepBluePlanet,
        "rgba(103,232,249,0.82)",
        79,
        time
      );
      drawBlackHole(
        context,
        width * 0.48 + scroll * 36,
        height * 0.29,
        Math.min(width, height) * 0.074,
        time * 0.08
      );

      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
      aria-hidden="true"
    />
  );
}

export function CosmicCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]"
      data-space-depth
    >
      <Canvas
        className="relative z-0"
        camera={{ position: [0, 0, 6.4], fov: 57 }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 9, 25]} />
        <ambientLight intensity={0.24} />
        <directionalLight position={[-4.4, 2.7, 5.2]} intensity={2.25} color="#F8FAFC" />
        <directionalLight position={[4.8, -0.8, -2]} intensity={0.92} color="#67E8F9" />
        <pointLight position={[-3.5, 1.5, -1.5]} intensity={1.45} color="#8B5CF6" />
        <CinematicStarLayer
          count={3600}
          spread={26}
          depth={31}
          size={0.01}
          opacity={0.72}
          speed={0.004}
          scrollFactor={2.8}
          colorShift={0.2}
        />
        <CinematicStarLayer
          count={2300}
          spread={17}
          depth={18}
          size={0.017}
          opacity={0.62}
          speed={0.009}
          scrollFactor={5.4}
          colorShift={0.32}
        />
        <CinematicStarLayer
          count={900}
          spread={10}
          depth={9}
          size={0.026}
          opacity={0.5}
          speed={0.014}
          scrollFactor={8.2}
          colorShift={0.12}
        />
        <CosmicDust />
        <UniverseRig />
      </Canvas>
      <CinematicBitmapSpace />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_38%,transparent_30%,rgba(3,7,18,0.18)_74%,rgba(3,7,18,0.62)_100%),linear-gradient(180deg,rgba(3,7,18,0.01),rgba(3,7,18,0.28)_92%)]" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0.35px,transparent_1px)] bg-[length:121px_121px] opacity-[0.08] mix-blend-screen" />
    </div>
  );
}

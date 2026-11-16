import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Stars,
  Sparkles,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Edges,
  Line,
} from "@react-three/drei";
import * as THREE from "three";

import { STATIONS, getStation, type StationId } from "./stations";
import { labState } from "./lab-state";

// "Midnight Amethyst" scene palette — mirrors the tokens in src/styles.css.
// Keys are kept from the first palette; values are what changed.
const C = {
  pearl: "#f4f4fd", // ice white
  iris: "#6e69f3", // sapphire-violet (primary)
  orchid: "#b6b4ff", // lavender glow
  aurora: "#ced4e5", // ice silver
  rose: "#7250ba", // deep indigo-violet
  champagne: "#bfbef0", // frost lavender
  deep: "#1d1058", // midnight indigo
  void: "#05040f", // violet-tinted blue-black
};

const UP = new THREE.Vector3(0, 1, 0);
const pos = (id: StationId) => new THREE.Vector3(...getStation(id).position);
const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

// Polished chrome with only a faint thin-film sheen, so reflections stay
// in the sapphire / violet / silver family instead of turning rainbow.
const IRIDESCENT = {
  metalness: 1,
  roughness: 0.14,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  iridescence: 0.4,
  iridescenceIOR: 1.35,
  iridescenceThicknessMinimum: 260,
  iridescenceThicknessMaximum: 520,
  envMapIntensity: 1.35,
};

/* ---------------------------------------------------------- station lights */

// A small studio rig that glides with the camera to whichever station is active,
// so every page's object gets the same key / rim / fill treatment.
function StationLights({ stationId }: { stationId: StationId }) {
  const rig = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    rig.current?.position.lerp(pos(stationId), 1 - Math.exp(-2 * Math.min(delta, 0.05)));
  });
  return (
    <group ref={rig} position={getStation(stationId).position}>
      {/* Key: cool ice-white from upper front-right */}
      <pointLight position={[5, 6, 7]} intensity={55} color={C.pearl} distance={32} decay={2} />
      {/* Rim: violet from behind-left, outlines silhouettes */}
      <pointLight position={[-5, 3, -5]} intensity={90} color={C.iris} distance={30} decay={2} />
      {/* Under-fill: deep indigo, keeps shadows coloured rather than black */}
      <pointLight position={[0, -5, 3]} intensity={30} color={C.rose} distance={24} decay={2} />
      {/* Accent: ice silver from the right */}
      <pointLight position={[7, -1, -2]} intensity={32} color={C.aurora} distance={26} decay={2} />
    </group>
  );
}

/* ---------------------------------------------------------------- camera */

function CameraRig({ stationId }: { stationId: StationId }) {
  const { camera, size, pointer } = useThree();
  const look = useRef(pos(stationId).clone());
  const scroll = useRef(0);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);
  const prev = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = clock.elapsedTime;
    const p = pos(stationId);
    const wide = size.width / size.height > 1.05;
    const shift = wide ? -2.7 : 0;
    const dist = wide ? 8.6 : 12.5;
    const sc = Math.min(scroll.current, 4);

    // Orbit around the station as the page scrolls, plus a slow idle drift.
    const yaw = sc * 0.32 + Math.sin(t * 0.12) * 0.06;
    offset.set(shift, 0.5 + sc * 0.6 + Math.sin(t * 0.21) * 0.15, dist).applyAxisAngle(UP, yaw);
    desired.copy(p).add(offset);
    desired.x += pointer.x * 0.6;
    desired.y += pointer.y * 0.4;

    lookTarget.set(shift, -sc * 0.25, 0).applyAxisAngle(UP, yaw).add(p);

    prev.copy(camera.position);
    camera.position.lerp(desired, 1 - Math.exp(-1.8 * dt));
    look.current.lerp(lookTarget, 1 - Math.exp(-2.6 * dt));
    camera.lookAt(look.current);

    // Warp: widen the lens and roll slightly while travelling between stations.
    const speed = prev.distanceTo(camera.position) / Math.max(dt, 1e-4);
    const cam = camera as THREE.PerspectiveCamera;
    const fov = 42 + Math.min(speed * 0.9, 28);
    cam.fov += (fov - cam.fov) * (1 - Math.exp(-6 * dt));
    camera.rotateZ(Math.min(speed * 0.004, 0.08) * Math.sin(t * 0.7));
    cam.updateProjectionMatrix();
  });
  return null;
}

/* --------------------------------------------------- living nebula skydome */

const nebulaVert = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const nebulaFrag = /* glsl */ `
uniform float uTime;
uniform vec3 cVoid; uniform vec3 cIris; uniform vec3 cAurora; uniform vec3 cRose; uniform vec3 cGold;
varying vec3 vDir;
float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
void main() {
  vec3 d = normalize(vDir);
  float t = uTime * 0.025;
  float n = fbm(d * 2.2 + vec3(t, t * 0.6, -t));
  float m = fbm(d * 3.6 - vec3(t * 1.4, 0.0, t));
  float r = fbm(d * 3.0 + vec3(0.0, t * 2.0, 0.0));
  vec3 col = cVoid;
  col = mix(col, cIris * 0.15, smoothstep(0.5, 0.9, n) * 0.9);
  col = mix(col, cAurora * 0.07, smoothstep(0.55, 0.9, m) * smoothstep(0.4, 0.8, n) * 0.8);
  col = mix(col, cRose * 0.16, smoothstep(0.6, 0.95, r) * 0.7);
  col += cGold * 0.03 * smoothstep(0.75, 1.0, n * m * 2.0);
  col *= 0.55 + 0.45 * smoothstep(-0.7, 0.6, d.y);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  #include <colorspace_fragment>
}`;

function Nebula() {
  const mesh = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      cVoid: { value: new THREE.Color(C.void) },
      cIris: { value: new THREE.Color(C.iris) },
      cAurora: { value: new THREE.Color(C.aurora) },
      cRose: { value: new THREE.Color(C.rose) },
      cGold: { value: new THREE.Color(C.champagne) },
    }),
    [],
  );
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    mesh.current?.position.copy(camera.position);
  });
  return (
    <mesh ref={mesh} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[160, 48, 32]} />
      <shaderMaterial
        vertexShader={nebulaVert}
        fragmentShader={nebulaFrag}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

/* ---------------------------------------------------- shooting comets */

function Comets() {
  const { camera } = useThree();
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const dir = useMemo(() => new THREE.Vector3(-1, -0.38, 0.1).normalize(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        off: new THREE.Vector3((i - 2.5) * 10, 8 + (i % 3) * 5, -30 - i * 6),
        speed: 0.07 + (i % 3) * 0.025,
        phase: i / 6,
        color: [C.champagne, C.aurora, C.orchid][i % 3] ?? C.champagne,
      })),
    [],
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    seeds.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      const p = (t * s.speed + s.phase) % 1;
      m.position.copy(camera.position).add(s.off).addScaledVector(dir, (p - 0.5) * 90);
      (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.9;
    });
  });
  const rot = Math.atan2(dir.y, dir.x);
  return (
    <>
      {seeds.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} rotation={[0, 0, rot]}>
          <boxGeometry args={[3.2, 0.025, 0.025]} />
          <meshBasicMaterial color={s.color} transparent opacity={0} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

/* ------------------------------------------------------- station 01: orbit */

function Sparkle({ position, size = 1, color = C.pearl }: { position: [number, number, number]; size?: number; color?: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.scale.setScalar(size * (0.75 + Math.sin(t * 2.4 + position[0]) * 0.25));
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.25;
  });
  return (
    <group ref={ref} position={position}>
      <mesh scale={[0.05, 0.6, 0.05]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh scale={[0.6, 0.05, 0.05]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={C.orchid} toneMapped={false} />
      </mesh>
    </group>
  );
}

function OrbitalCore() {
  const group = useRef<THREE.Group>(null);
  const arc = useRef<THREE.Group>(null);
  const bar = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  const ringWrap = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const moon = useRef<THREE.Mesh>(null);
  const moon2 = useRef<THREE.Mesh>(null);
  const born = useRef<number | null>(null);
  const { pointer } = useThree();
  const gap = 0.9;

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (born.current === null) born.current = t;
    const a = t - born.current;
    const k = Math.min(delta * 2, 1);

    // Assembly: the G spins in, the blade slides home, rings unfold.
    const eArc = ease((a - 0.2) / 1.8);
    const eBar = ease((a - 1.0) / 1.2);
    const eRing = ease((a - 1.5) / 1.6);
    if (arc.current) {
      arc.current.rotation.z = gap - (1 - eArc) * Math.PI * 2.2;
      arc.current.scale.setScalar(0.001 + eArc * 0.999);
    }
    if (bar.current) {
      bar.current.position.x = 0.62 + (1 - eBar) * 6;
      bar.current.rotation.x = (1 - eBar) * Math.PI * 3;
    }
    if (ringWrap.current) ringWrap.current.scale.setScalar(0.001 + eRing * 0.999);

    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.55 + Math.sin(t * 0.35) * 0.35 - group.current.rotation.y) * k;
      group.current.rotation.x += (-pointer.y * 0.35 + Math.sin(t * 0.25) * 0.08 - group.current.rotation.x) * k;
    }
    if (ring.current) ring.current.rotation.z = t * 0.3;
    if (halo.current) halo.current.rotation.z = -t * 0.12;
    if (moon.current) moon.current.position.set(Math.cos(t * 0.9) * 2.55, Math.sin(t * 0.9) * 2.55, 0);
    if (moon2.current) moon2.current.position.set(Math.cos(-t * 0.5 + 2) * 3.1, Math.sin(-t * 0.5 + 2) * 3.1, 0);
  });

  return (
    <group position={getStation("home").position}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <group ref={group}>
          <group ref={arc} rotation={[0, 0, gap]}>
            <mesh>
              <torusGeometry args={[1.25, 0.36, 64, 200, Math.PI * 2 - gap]} />
              <meshPhysicalMaterial color={C.pearl} {...IRIDESCENT} />
            </mesh>
          </group>
          <mesh ref={bar} position={[0.62, -0.02, 0]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[1.25, 0.5, 0.62]} />
            <meshPhysicalMaterial color={C.iris} {...IRIDESCENT} metalness={0.65} roughness={0.22} emissive={C.iris} emissiveIntensity={0.35} />
          </mesh>

          <group ref={ringWrap}>
            <group rotation={[1.15, 0.15, -0.35]}>
              <group ref={ring}>
                <mesh>
                  <torusGeometry args={[2.55, 0.035, 16, 260]} />
                  <meshStandardMaterial color={C.orchid} emissive={C.iris} emissiveIntensity={2.4} toneMapped={false} />
                </mesh>
                <mesh ref={moon}>
                  <sphereGeometry args={[0.11, 24, 24]} />
                  <meshBasicMaterial color={C.pearl} toneMapped={false} />
                </mesh>
              </group>
              <group ref={halo} rotation={[0, 0, 0.6]}>
                <mesh>
                  <torusGeometry args={[3.1, 0.014, 8, 260]} />
                  <meshStandardMaterial color={C.aurora} emissive={C.aurora} emissiveIntensity={1.2} toneMapped={false} />
                </mesh>
                <mesh ref={moon2}>
                  <sphereGeometry args={[0.07, 16, 16]} />
                  <meshBasicMaterial color={C.champagne} toneMapped={false} />
                </mesh>
              </group>
            </group>
          </group>

          <Sparkle position={[2.1, 1.75, 0.4]} size={1.1} color={C.champagne} />
          <Sparkle position={[-2.4, -1.4, -0.6]} size={0.45} color={C.aurora} />
        </group>
      </Float>
      <Sparkles count={80} scale={[10, 6, 6]} size={2.4} speed={0.35} color={C.champagne} opacity={0.7} />
      <Sparkles count={50} scale={[8, 5, 5]} size={1.6} speed={0.5} color={C.aurora} opacity={0.6} />
    </group>
  );
}

/* ------------------------------------------------------ station 02: origin */

function OriginSeed() {
  const rings = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const RINGS = 7;
  const tones = [C.orchid, C.aurora, C.champagne, C.rose];
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.14);
    if (shell.current) {
      shell.current.rotation.set(t * 0.2, t * 0.3, 0);
      shell.current.scale.setScalar(1.1 + Math.sin(t * 0.8) * 0.1);
    }
    rings.current?.children.forEach((child, i) => {
      const phase = (((t * 0.2 + i / RINGS) % 1) + 1) % 1;
      const m = child as THREE.Mesh;
      m.scale.setScalar(0.3 + phase * 4.4);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.8;
      m.rotation.x = 1.2 + Math.sin(t * 0.3 + i) * 0.5;
      m.rotation.y = i * 0.5 + t * 0.12;
    });
  });
  return (
    <group position={getStation("about").position}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.32, 3]} />
        <meshStandardMaterial color={C.pearl} emissive={C.orchid} emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial color={C.champagne} wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <group ref={rings}>
        {Array.from({ length: RINGS }).map((_, i) => (
          <mesh key={i}>
            <torusGeometry args={[1, 0.009, 8, 180]} />
            <meshBasicMaterial color={tones[i % tones.length] ?? C.orchid} transparent opacity={0.6} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <Sparkles count={140} scale={[8, 8, 8]} size={2.6} speed={0.5} color={C.champagne} opacity={0.8} />
    </group>
  );
}

/* --------------------------------------------------- station 03: blueprint */

const CAPSULE_TONES = [C.aurora, C.orchid, C.champagne];

function Capsule({ x, kind, delay }: { x: number; kind: 0 | 1 | 2; delay: number }) {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Group>(null);
  const tone = CAPSULE_TONES[kind] ?? C.aurora;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + delay;
    inner.current?.rotation.set(t * 0.45, t * 0.7, 0);
    if (shell.current) shell.current.rotation.y = Math.sin(t * 0.4) * 0.5;
  });
  return (
    <Float speed={1.2 + delay * 0.2} rotationIntensity={0.5} floatIntensity={0.9}>
      <group position={[x, Math.sin(delay) * 0.4, -Math.abs(x) * 0.25]}>
        <group ref={shell}>
          <RoundedBox args={[1.7, 2.4, 1.7]} radius={0.28} smoothness={4}>
            <meshPhysicalMaterial color={tone} metalness={0.2} roughness={0.08} transparent opacity={0.13} clearcoat={1} iridescence={0.35} envMapIntensity={1.6} depthWrite={false} />
            <Edges color={tone} threshold={20} />
          </RoundedBox>
        </group>
        <mesh ref={inner} scale={0.55}>
          {kind === 0 && <icosahedronGeometry args={[1, 0]} />}
          {kind === 1 && <torusKnotGeometry args={[0.7, 0.24, 160, 20]} />}
          {kind === 2 && <octahedronGeometry args={[1.1, 0]} />}
          <meshPhysicalMaterial
            color={kind === 1 ? C.iris : C.pearl}
            {...IRIDESCENT}
            roughness={0.14}
            emissive={kind === 1 ? C.deep : "#000000"}
            emissiveIntensity={0.6}
            flatShading={kind !== 1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Blueprint() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(20, 40, C.aurora, C.deep);
    const m = g.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0.3;
    return g;
  }, []);
  const scan = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (scan.current) scan.current.position.y = -2 + ((clock.elapsedTime * 0.6) % 1) * 4.5;
  });
  return (
    <group position={getStation("products").position}>
      <Capsule x={-2.4} kind={0} delay={0} />
      <Capsule x={0} kind={1} delay={1.3} />
      <Capsule x={2.4} kind={2} delay={2.6} />
      <primitive object={grid} position={[0, -2.2, 0]} />
      {/* Scanning plane sweeping the blueprints */}
      <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 3]} />
        <meshBasicMaterial color={C.aurora} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------- station 04: lab */

function LabBlob() {
  const mat = useRef<React.ComponentRef<typeof MeshDistortMaterial>>(null);
  const halo = useRef<THREE.Points>(null);
  const hover = useRef(0);
  const [over, setOver] = useState(false);
  const [speed, setSpeed] = useState(labState.speed);
  const hsl = useMemo(() => new THREE.Color(), []);

  const haloGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 1100;
    const arr = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const tones = [C.aurora, C.orchid, C.champagne, C.rose].map((h) => new THREE.Color(h));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 * 7;
      const r = 2.6 + Math.sin(i * 12.9898) * 0.4;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(i * 78.233) * 0.3;
      arr[i * 3 + 2] = Math.sin(a) * r;
      const c = tones[i % tones.length]!;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = clock.elapsedTime;
    hover.current += ((over ? 1 : 0) - hover.current) * (1 - Math.exp(-4 * dt));
    if (mat.current) {
      mat.current.distort = Math.min(1, labState.distort + hover.current * 0.25);
      // Slowly drift the base tone between sapphire-violet and indigo.
      hsl.setHSL(0.69 + Math.sin(t * 0.15) * 0.03, 0.62, 0.48 + Math.sin(t * 0.2) * 0.05);
      mat.current.color.copy(hsl);
    }
    if (labState.speed !== speed) setSpeed(labState.speed);
    if (halo.current) {
      halo.current.rotation.y += dt * 0.25 * labState.speed;
      halo.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={getStation("innovation").position}>
      <Float speed={1} floatIntensity={0.6}>
        <mesh onPointerOver={() => setOver(true)} onPointerOut={() => setOver(false)}>
          <icosahedronGeometry args={[1.55, 64]} />
          <MeshDistortMaterial
            ref={mat}
            color={C.iris}
            metalness={0.85}
            roughness={0.12}
            distort={0.45}
            speed={speed}
            emissive={C.deep}
            emissiveIntensity={0.5}
            iridescence={0.45}
            iridescenceIOR={1.4}
            iridescenceThicknessMinimum={260}
            iridescenceThicknessMaximum={560}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>
      <points ref={halo} geometry={haloGeo}>
        <pointsMaterial vertexColors size={0.04} sizeAttenuation transparent opacity={0.9} toneMapped={false} />
      </points>
      <Sparkle position={[2.4, 1.8, 0]} size={0.7} color={C.aurora} />
    </group>
  );
}

/* ------------------------------------------------------ station 06: beacon */

function Beacon() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const pulses = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outer.current) outer.current.rotation.z = t * 0.2;
    if (inner.current) inner.current.rotation.set(Math.sin(t * 0.6) * 0.4, Math.cos(t * 0.5) * 0.4, 0);
    const since = labState.pulseAt > 0 ? (performance.now() - labState.pulseAt) / 1000 : 99;
    const boost = since < 2.5 ? 1 - since / 2.5 : 0;
    pulses.current?.children.forEach((child, i) => {
      const phase = ((t * (0.35 + boost) + i / 4) % 1 + 1) % 1;
      const m = child as THREE.Mesh;
      m.scale.setScalar(0.4 + phase * (2.4 + boost * 2));
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * (0.5 + boost * 0.5);
    });
  });
  return (
    <group position={getStation("contact").position}>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <group rotation={[0, -0.35, 0]}>
          <mesh ref={outer}>
            <torusGeometry args={[2, 0.1, 32, 220]} />
            <meshPhysicalMaterial color={C.pearl} {...IRIDESCENT} />
          </mesh>
          <mesh ref={inner}>
            <torusGeometry args={[1.65, 0.03, 12, 220]} />
            <meshStandardMaterial color={C.aurora} emissive={C.aurora} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh>
            <circleGeometry args={[1.62, 96]} />
            <meshBasicMaterial color={C.iris} transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <group ref={pulses}>
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh key={i}>
                <ringGeometry args={[0.98, 1, 128]} />
                <meshBasicMaterial color={i % 2 ? C.rose : C.aurora} transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
              </mesh>
            ))}
          </group>
          <Sparkle position={[0, 0, 0.2]} size={0.9} color={C.champagne} />
        </group>
      </Float>
    </group>
  );
}

/* --------------------------------------------------- station 05: launchpad */

// Careers: a quiet constellation of seats (no roles open yet) around a softly glowing
// core that stands for the AI services GENZIQ offers today.
function Launchpad() {
  const crew = useRef<THREE.Group>(null);
  const seat = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const plume = useRef<THREE.Points>(null);
  const SEATS = 8;
  const seatPts = useMemo(
    () =>
      Array.from({ length: SEATS }, (_, i) => {
        const a = (i / SEATS) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * 2.4, Math.sin(a) * 1.3, Math.sin(a) * 0.8);
      }),
    [],
  );
  const links = useMemo(() => [...seatPts, seatPts[0]!], [seatPts]);
  const plumeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 260;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = i * 2.399;
      const r = 0.15 + (i % 7) * 0.05;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (i / n) * 6 - 3;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    if (crew.current) crew.current.rotation.y = Math.sin(t * 0.25) * 0.5;
    if (seat.current) seat.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.08);
    if (ring.current) ring.current.rotation.set(Math.PI / 2 + Math.sin(t * 0.6) * 0.3, 0, t * 0.8);
    if (plume.current) {
      // Particles rise through the core like a slow launch.
      const attr = plume.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < attr.count; i++) {
        let y = attr.getY(i) + dt * (0.6 + (i % 5) * 0.12);
        if (y > 3) y = -3;
        attr.setY(i, y);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group position={getStation("careers").position}>
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.6}>
        <group ref={crew}>
          <Line points={links} color={C.aurora} lineWidth={1} transparent opacity={0.35} />
          {seatPts.map((p, i) => (
            <mesh key={i} position={p}>
              <dodecahedronGeometry args={[0.2, 0]} />
              <meshBasicMaterial color={i % 2 ? C.aurora : C.pearl} wireframe transparent opacity={0.45} toneMapped={false} />
            </mesh>
          ))}
          {seatPts.map((p, i) => (
            <Line key={`l${i}`} points={[p, new THREE.Vector3(0, 0, 0)]} color={C.champagne} lineWidth={0.6} transparent opacity={0.18} />
          ))}
          {/* Services core */}
          <mesh ref={seat}>
            <icosahedronGeometry args={[0.55, 2]} />
            <meshPhysicalMaterial color={C.iris} {...IRIDESCENT} roughness={0.18} emissive={C.rose} emissiveIntensity={0.55} />
          </mesh>
          <mesh ref={ring}>
            <torusGeometry args={[0.95, 0.025, 12, 160]} />
            <meshStandardMaterial color={C.champagne} emissive={C.champagne} emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
          <points ref={plume} geometry={plumeGeo}>
            <pointsMaterial color={C.champagne} size={0.05} sizeAttenuation transparent opacity={0.85} toneMapped={false} />
          </points>
          <Sparkle position={[1.6, 1.5, 0.4]} size={0.6} color={C.pearl} />
        </group>
      </Float>
      <Sparkles count={90} scale={[8, 6, 6]} size={2.2} speed={0.45} color={C.aurora} opacity={0.6} />
    </group>
  );
}

/* ------------------------------------------- data stream joining stations */

function DataStream() {
  const curve = useMemo(() => {
    const pts = STATIONS.map((s) => new THREE.Vector3(...s.position));
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
  }, []);
  const linePts = useMemo(() => curve.getPoints(500), [curve]);
  const lineColors = useMemo(() => {
    const stops = [C.iris, C.aurora, C.rose, C.champagne, C.iris].map((h) => new THREE.Color(h));
    return linePts.map((_, i) => {
      const u = (i / (linePts.length - 1)) * (stops.length - 1);
      const k = Math.floor(u);
      return stops[k]!.clone().lerp(stops[Math.min(k + 1, stops.length - 1)]!, u - k);
    });
  }, [linePts]);
  const N = 160;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    return g;
  }, []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      const u = (((i / N + t * 0.012) % 1) + 1) % 1;
      curve.getPointAt(u, tmp);
      attr.setXYZ(i, tmp.x + Math.sin(i * 3.1 + t) * 0.18, tmp.y + Math.cos(i * 1.7 + t) * 0.18, tmp.z);
    }
    attr.needsUpdate = true;
  });

  return (
    <group>
      <Line points={linePts} vertexColors={lineColors} lineWidth={1.2} transparent opacity={0.5} />
      <points geometry={geo}>
        <pointsMaterial color={C.champagne} size={0.08} sizeAttenuation transparent opacity={0.9} toneMapped={false} />
      </points>
    </group>
  );
}

/* ---------------------------------------------------------------- shell */

function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    frames.current += 1;
    if (frames.current > 2) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function Universe({ stationId }: { stationId: StationId }) {
  const [ready, setReady] = useState(false);
  const start = getStation(stationId).position;

  return (
    <div
      className="universe-scene fixed inset-0 -z-10 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-ready={ready ? "true" : undefined}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Start far out in space so the first visit opens with a fly-in.
        camera={{ fov: 60, near: 0.1, far: 400, position: [start[0] + 6, start[1] + 8, start[2] + 46] }}
        fallback={null}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
        }}
      >
        <fog attach="fog" args={[C.void, 14, 46]} />
        <ambientLight intensity={0.12} color={C.orchid} />
        <hemisphereLight args={[C.aurora, C.deep, 0.35]} />
        <directionalLight position={[6, 9, 5]} intensity={1.1} color={C.pearl} />
        <StationLights stationId={stationId} />

        {/* Studio reflections: ice-silver softbox above, sapphire-violet and silver strips
            either side, indigo floor bounce and a lavender ring for the chrome highlights. */}
        <Environment resolution={256} frames={1}>
          <color attach="background" args={[C.void]} />
          <Lightformer intensity={3} color={C.pearl} position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[14, 4, 1]} />
          <Lightformer intensity={2.6} color={C.iris} position={[-7, 1, 0]} rotation-y={Math.PI / 2} scale={[20, 1.2, 1]} />
          <Lightformer intensity={2.2} color={C.aurora} position={[7, 0, -1]} rotation-y={-Math.PI / 2} scale={[20, 1.6, 1]} />
          <Lightformer intensity={1.4} color={C.rose} position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[12, 3, 1]} />
          <Lightformer form="ring" intensity={2} color={C.orchid} position={[0, 0, 9]} scale={4} />
          <Lightformer intensity={1} color={C.champagne} position={[0, 2, -9]} scale={[10, 2, 1]} />
        </Environment>

        <Nebula />
        <Stars radius={120} depth={80} count={4500} factor={3.4} saturation={0} fade speed={0.7} />
        <Comets />
        <DataStream />
        <OrbitalCore />
        <OriginSeed />
        <Blueprint />
        <LabBlob />
        <Launchpad />
        <Beacon />
        <CameraRig stationId={stationId} />
        <ReadySignal onReady={() => setReady(true)} />

      </Canvas>
    </div>
  );
}

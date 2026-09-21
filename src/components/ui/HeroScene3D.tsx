import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { prefersReducedMotion } from "../../lib/utils";
import { heroScrollState, setHeroScrollProgress } from "../../lib/heroScroll";

/* ------------------------------------------------------------------ */
/*  LUXE Hero — real WebGL 3D layer (Three.js / React Three Fiber)     */
/*  A gilded sculpture of rings, orbs and refractive glass, dusted     */
/*  with 3D gold particles, framed by a scroll-driven camera push.     */
/*  Featherweight on purpose: no textures, no post-processing, no      */
/*  shadows — pure geometry + PBR + alpha blending.                    */
/* ------------------------------------------------------------------ */

const GOLD = "#e8c77a";

const scrollState = heroScrollState;

/* ------------------------------- Ring ------------------------------ */

function GildedRings() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b98f45"),
        metalness: 1,
        roughness: 0.24,
        envMapIntensity: 1.6,
      }),
    [],
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#fdf6e8"),
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.92,
        thickness: 1.4,
        ior: 1.45,
        transparent: true,
        opacity: 0.9,
        envMapIntensity: 1.4,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollState.progress;
    if (group.current) {
      group.current.rotation.y = t * 0.12 + p * 0.9;
      group.current.rotation.x = 0.42 + Math.sin(t * 0.4) * 0.06 - p * 0.5;
      group.current.position.y = 0.1 + Math.sin(t * 0.55) * 0.14 - p * 1.1;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.28 + p * 2.2;
    if (ringB.current) ringB.current.rotation.z = -t * 0.2 - p * 1.4;
    if (ringC.current) ringC.current.rotation.x = t * 0.16;
  });

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {/* torus knot — the hero sculpture */}
      <mesh ref={ringA} scale={0.92}>
        <torusKnotGeometry args={[1.05, 0.24, 220, 32]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* gilded halo ring */}
      <mesh ref={ringB} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.85, 0.022, 24, 180]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* refractive glass lens */}
      <mesh ref={ringC}>
        <icosahedronGeometry args={[0.78, 5]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* champagne orbs orbiting the sculpture */}
      {[
        { r: 1.62, s: 0.09, off: 0 },
        { r: 1.48, s: 0.06, off: 2.1 },
        { r: 1.72, s: 0.045, off: 4.2 },
      ].map(({ r, s, off }) => (
        <Orb key={off} radius={r} size={s} offset={off} material={goldMat} />
      ))}
    </group>
  );
}

function Orb({
  radius,
  size,
  offset,
  material,
}: {
  radius: number;
  size: number;
  offset: number;
  material: THREE.Material;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.35 + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.6, Math.sin(t) * radius);
  });
  return (
    <mesh ref={ref} scale={size}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ------------------------------ Dust ------------------------------- */

const DUST_COUNT = 380;

function GoldDust() {
  const ref = useRef<THREE.Points>(null);
  const reduced = prefersReducedMotion();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3);
    const speeds = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.08 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    const d = Math.min(delta, 0.05);
    const attr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < DUST_COUNT; i++) {
      let y = attr.getY(i) + speeds[i] * d;
      if (y > 4) y = -4;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    ref.current.rotation.y += d * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------------- Camera ------------------------------ */

function CameraRig() {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const p = scrollState.progress;
    const targetZ = 5.2 - p * 2.6; // cinematic push-in on scroll
    const targetY = 0.2 - pointer.current.y * 0.35 - p * 0.4;
    const targetX = pointer.current.x * 0.55;
    const k = 1 - Math.pow(0.001, delta); // frame-rate independent damping
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

/* ----------------------------- Canvas ------------------------------ */

function SceneContents() {
  return (
    <>
      <color attach="background" args={["#080706"]} />
      <fog attach="fog" args={["#080706", 6, 14]} />
      {/* Champagne key light + warm rim, mirroring the salon glow */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={2.6} color="#f4e3bc" />
      <directionalLight position={[-6, -2, -4]} intensity={1.4} color="#c9a45c" />
      <pointLight position={[0, -3, 2]} intensity={6} distance={9} color="#8a6f3c" />
      <Suspense fallback={null}>
        <GildedRings />
      </Suspense>
      <GoldDust />
      <CameraRig />
    </>
  );
}

interface HeroScene3DProps {
  /** Reference to the hero section — drives scroll + off-screen pausing. */
  hostRef: RefObject<HTMLElement>;
}

/**
 * Mounts the WebGL layer only when the probe passes, lazily hydrates the
 * scene after first paint, and unmounts the render loop while the hero is
 * off-screen or the tab is hidden.
 */
export function HeroScene3D({ hostRef }: HeroScene3DProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => !cancelled && setEnabled(true), { timeout: 1200 })
      : window.setTimeout(() => !cancelled && setEnabled(true), 350);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(host);
    const onVis = () => setVisible(!document.hidden && document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled, hostRef]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 42, position: [0, 0.2, 5.2], near: 0.1, far: 30 }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}

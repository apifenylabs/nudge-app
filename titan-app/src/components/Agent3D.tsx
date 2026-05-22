"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface Agent3DProps {
  color?: string;
  size?: number;
  emotion?: "happy" | "neutral" | "excited" | "focused";
  breathing?: boolean;
  level?: number;
  /** Evolution tier: 1 = base, 2 = evolved, 3 = god-tier */
  tier?: 1 | 2 | 3;
  /** Normalized pointer offset from parent (x, y) in -1..1 range */
  pointer?: { x: number; y: number };
}

// ─── Inner 3D Scene ────────────────────────────────────────────────────

function CartoonAgent({
  color = "#14B8A6",
  emotion = "happy",
  breathing = true,
  tier = 1,
  pointer = { x: 0, y: 0 },
}: Omit<Agent3DProps, "size" | "level"> & { pointer: { x: number; y: number } }) {
  const headRef = useRef<THREE.Mesh>(null);
  const tealGlowRef = useRef<THREE.Mesh>(null);
  const goldenGlowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Eye references for mouse-follow
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  const leftCatchRef = useRef<THREE.Mesh>(null);
  const rightCatchRef = useRef<THREE.Mesh>(null);

  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  }, []);

  // Evolution tier colors
  const tierColor = useMemo(() => {
    if (tier >= 3) return "#C0A030"; // golden/titanium mixed
    if (tier >= 2) return "#14B8A6";
    return color;
  }, [tier, color]);

  const headColor = useMemo(() => new THREE.Color(tierColor), [tierColor]);
  const warmColor = useMemo(() => {
    const c = new THREE.Color(tierColor);
    if (tier >= 3) {
      c.lerp(new THREE.Color("#FFD700"), 0.3);
    } else {
      c.lerp(new THREE.Color("#F59E0B"), 0.12);
    }
    return c;
  }, [tierColor, tier]);

  const darkColor = useMemo(() => new THREE.Color("#1a1a2e"), []);
  const smileColor = useMemo(() => new THREE.Color("#FCE7C7"), []);

  // Head scale based on tier
  const headScale = useMemo(() => {
    const s = tier >= 3 ? 1.1 : tier >= 2 ? 1.05 : 1;
    return new THREE.Vector3(s, s * 0.92, s);
  }, [tier]);

  const emissiveIntensity = useMemo(() => {
    return tier >= 3 ? 0.5 : tier >= 2 ? 0.35 : 0.2;
  }, [tier]);

  // Breathing + blink + eye follow in one frame loop
  useFrame((state) => {
    if (!headRef.current) return;
    const elapsed = state.clock.elapsedTime;

    // Breathing
    if (breathing) {
      const breathe = Math.sin(elapsed * 1.2) * 0.02 + 1;
      headRef.current.scale.setScalar(breathe);
    }

    // Blink: interval 3.5-6s, duration 0.18s
    const blinkPhase = (elapsed * 0.22) % 1;
    const isBlinking = blinkPhase > 0.955 && blinkPhase < 0.973;
    const blinkY = isBlinking ? 0.08 : 1;

    headRef.current.children.forEach((child) => {
      if (child.name === "eye") {
        child.scale.y = blinkY;
      }
    });

    // Eye follow mouse (desktop only)
    if (isDesktop && leftPupilRef.current && rightPupilRef.current && leftCatchRef.current && rightCatchRef.current) {
      // Limit offset to ±0.05 from center
      const maxOffset = 0.05;
      const ox = Math.max(-maxOffset, Math.min(maxOffset, pointer.x * 0.04));
      const oy = Math.max(-maxOffset, Math.min(maxOffset, pointer.y * 0.035));

      // Pupils follow
      leftPupilRef.current.position.x = -0.42 + ox;
      leftPupilRef.current.position.y = 0.26 + oy;
      rightPupilRef.current.position.x = 0.42 + ox;
      rightPupilRef.current.position.y = 0.26 + oy;

      // Catchlights follow (slightly offset for natural look)
      leftCatchRef.current.position.x = -0.38 + ox * 0.8;
      leftCatchRef.current.position.y = 0.33 + oy * 0.7;
      rightCatchRef.current.position.x = 0.46 + ox * 0.8;
      rightCatchRef.current.position.y = 0.33 + oy * 0.7;
    }
  });

  // Glow pulses
  useFrame((state) => {
    if (tealGlowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.25 + 0.6;
      (tealGlowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
    if (goldenGlowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.75 + 0.5) * 0.2 + 0.4;
      (goldenGlowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  // Compute glow radius based on tier
  const glowRadius = useMemo(() => tier >= 3 ? 2.2 : tier >= 2 ? 2.0 : 1.85, [tier]);
  const innerGlowRadius = useMemo(() => tier >= 3 ? 1.7 : tier >= 2 ? 1.55 : 1.4, [tier]);
  const sparkleCount = useMemo(() => tier >= 3 ? 18 : tier >= 2 ? 12 : 8, [tier]);
  const sparkleColor = useMemo(() => tier >= 3 ? "#FFD700" : tier >= 2 ? "#FCE7C7" : "#FCE7C7", [tier]);

  return (
    <group ref={groupRef}>
      {/* Outer golden halo */}
      <mesh ref={goldenGlowRef}>
        <sphereGeometry args={[glowRadius, 32, 32]} />
        <meshBasicMaterial
          color={tier >= 3 ? "#FFD700" : "#F59E0B"}
          transparent
          opacity={tier >= 3 ? 0.55 : 0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Inner teal rim light */}
      <mesh ref={tealGlowRef}>
        <sphereGeometry args={[innerGlowRadius, 32, 32]} />
        <meshBasicMaterial
          color={tier >= 3 ? "#FFD700" : color}
          transparent
          opacity={tier >= 3 ? 0.8 : 0.6}
          depthWrite={false}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} scale={headScale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={warmColor}
          roughness={0.15}
          metalness={tier >= 3 ? 0.15 : 0.05}
          emissive={warmColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Left eye */}
      <mesh ref={leftEyeRef} name="eye" position={[-0.42, 0.28, 0.85]}>
        <sphereGeometry args={[0.23, 24, 24]} />
        <meshStandardMaterial color="white" roughness={0.02} />
      </mesh>

      {/* Right eye */}
      <mesh ref={rightEyeRef} name="eye" position={[0.42, 0.28, 0.85]}>
        <sphereGeometry args={[0.23, 24, 24]} />
        <meshStandardMaterial color="white" roughness={0.02} />
      </mesh>

      {/* Left pupil – follows pointer */}
      <mesh ref={leftPupilRef} position={[-0.42, 0.26, 1.07]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={darkColor} roughness={0.15} />
      </mesh>

      {/* Right pupil – follows pointer */}
      <mesh ref={rightPupilRef} position={[0.42, 0.26, 1.07]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={darkColor} roughness={0.15} />
      </mesh>

      {/* Left catchlight – follows pointer */}
      <mesh ref={leftCatchRef} position={[-0.38, 0.33, 1.11]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="white" transparent opacity={0.35} />
      </mesh>

      {/* Right catchlight – follows pointer */}
      <mesh ref={rightCatchRef} position={[0.46, 0.33, 1.11]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="white" transparent opacity={0.35} />
      </mesh>

      {/* Gentle smile */}
      <mesh position={[0, -0.08, 0.92]} rotation={[0.25, 0, 0]}>
        <torusGeometry args={[0.22, 0.08, 8, 20, Math.PI * 0.82]} />
        <meshStandardMaterial
          color={smileColor}
          roughness={0.4}
          emissive={smileColor}
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* ── Evolution Tier Decorations ── */}

      {/* Tier 2+: Crown ring at top */}
      {(tier >= 2) && (
        <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.06, 8, 24]} />
          <meshStandardMaterial
            color={tier >= 3 ? "#FFD700" : "#F59E0B"}
            roughness={0.2}
            metalness={0.6}
            emissive={tier >= 3 ? "#FFD700" : "#F59E0B"}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* Tier 3: Shoulder pads (two small spheres) */}
      {(tier >= 3) && (
        <>
          <mesh position={[-0.65, -0.55, 0.5]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial
              color="#FFD700"
              roughness={0.15}
              metalness={0.8}
              emissive="#FFD700"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0.65, -0.55, 0.5]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial
              color="#FFD700"
              roughness={0.15}
              metalness={0.8}
              emissive="#FFD700"
              emissiveIntensity={0.2}
            />
          </mesh>
        </>
      )}

      {/* Sparkles */}
      <Sparkles
        count={sparkleCount}
        scale={3}
        size={0.02}
        speed={0.15}
        color={sparkleColor}
        opacity={tier >= 3 ? 0.4 : 0.2}
      />
    </group>
  );
}

// ─── Main 3D Agent Component ───────────────────────────────────────────

export default function Agent3D({
  color = "#14B8A6",
  size = 120,
  emotion = "happy",
  breathing = true,
  level,
  tier: tierProp,
  pointer: pointerProp,
}: Agent3DProps) {
  // Compute tier from level if not explicitly provided
  const tier = useMemo<1 | 2 | 3>(() => {
    if (tierProp) return tierProp;
    if (level !== undefined) {
      if (level >= 31) return 3;
      if (level >= 11) return 2;
    }
    return 1;
  }, [tierProp, level]);

  // Container ref for pointer tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Map to -1..1 range
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setPointer({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointer({ x: 0, y: 0 });
  }, []);

  // Use injected pointer if provided (falls through from parent)
  const activePointer = pointerProp || pointer;

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        cursor: "pointer",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* HemisphereLight: teal + golden */}
        <hemisphereLight
          args={["#14B8A6", "#F59E0B", 0.65]}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 4]} intensity={0.5} color="#14B8A6" />
        <directionalLight position={[-1, 0.5, 3]} intensity={0.45} color="#F59E0B" />

        {/* Floating with tier-adjusted intensity */}
        <Float speed={0.65} rotationIntensity={0.02} floatIntensity={0.25}>
          <CartoonAgent
            color={color}
            emotion={emotion}
            breathing={breathing}
            tier={tier}
            pointer={activePointer}
          />
        </Float>
      </Canvas>
    </div>
  );
}

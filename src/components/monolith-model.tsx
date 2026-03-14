"use client";

import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useMatcapTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --- Materials ---
// Obsidian Black Composite with polished matte hybrid finish
const monolithMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0f0f11,
    metalness: 0.8,
    roughness: 0.3, // Matte base
    clearcoat: 0.8, // Polished hybrid outer layer
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
});

// Brushed Gold/Platinum Inlay & Energy Channels
const goldEmissiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    emissive: 0xd4af37,
    emissiveIntensity: 0.8,
    metalness: 1.0,
    roughness: 0.2
});

const whiteEmissiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xf5f5f5,
    emissiveIntensity: 1.2,
    metalness: 0.5,
    roughness: 0.5
});

// Geometry Dimensions
const monolithWidth = 1.6;
const monolithHeight = 6.5;
const monolithDepth = 1.6;


function Inlay({ w, h, d, x, y, z, mat }: { w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material }) {
    return (
        <mesh material={mat} position={[x, y, z]}>
            <boxGeometry args={[w, h, d]} />
        </mesh>
    );
}

function MonolithGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const goldMatRef = useRef(goldEmissiveMaterial.clone());
    const whiteMatRef = useRef(whiteEmissiveMaterial.clone());

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const elapsedTime = clock.getElapsedTime();

        // Extremely slow Y-axis rotation
        groupRef.current.rotation.y = elapsedTime * 0.05;
        // Stable hover (gentle periodic)
        groupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

        // Energy Pulse simulation (animating emissive intensity)
        goldMatRef.current.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 2) * 0.3;
        whiteMatRef.current.emissiveIntensity = 1.0 + Math.sin(elapsedTime * 1.5) * 0.4;
    });

    return (
        <group ref={groupRef}>
            {/* 1. Primary Shape: Tall Rectangular Monolith */}
            <mesh
                material={monolithMaterial}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[monolithWidth, monolithHeight, monolithDepth]} />
            </mesh>

            {/* 2. Surface Details: Engravings & Energy Channels */}
            {/* Front Face Accents */}
            <Inlay w={0.05} h={4.0} d={0.05} x={-0.4} y={0} z={monolithDepth / 2} mat={goldMatRef.current} />
            <Inlay w={0.05} h={2.0} d={0.05} x={0.4} y={1.0} z={monolithDepth / 2} mat={goldMatRef.current} />
            <Inlay w={0.6} h={0.05} d={0.05} x={-0.1} y={2.0} z={monolithDepth / 2} mat={goldMatRef.current} />

            {/* Center "Core" subtle inset */}
            <Inlay w={0.4} h={0.4} d={0.1} x={0} y={0} z={monolithDepth / 2} mat={whiteMatRef.current} />

            {/* Side Accents */}
            <Inlay w={0.05} h={5.0} d={0.05} x={monolithWidth / 2} y={0} z={0} mat={goldMatRef.current} />
            <Inlay w={0.05} h={5.0} d={0.05} x={-monolithWidth / 2} y={0} z={0} mat={goldMatRef.current} />
        </group>
    );
}


function FloatingFragments() {
    const fragmentCount = 6;

    const fragmentsData = useMemo(() => {
        const data = [];
        for (let i = 0; i < fragmentCount; i++) {
            const size = Math.random() * 0.3 + 0.1;
            const angle = (i / fragmentCount) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 1.5;
            const heightOffset = (Math.random() - 0.5) * 5;

            data.push({
                size,
                angle,
                radius,
                heightOffset,
                initialRotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
                speed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
                rotSpeedX: Math.random() * 0.02,
                rotSpeedY: Math.random() * 0.02,
            });
        }
        return data;
    }, []);

    const groupRef = useRef<THREE.Group>(null);
    const meshesRef = useRef<THREE.Mesh[]>([]);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const elapsedTime = clock.getElapsedTime();

        meshesRef.current.forEach((mesh, index) => {
            if (!mesh) return;
            const data = fragmentsData[index];
            data.angle += data.speed;

            mesh.position.x = Math.cos(data.angle) * data.radius;
            mesh.position.z = Math.sin(data.angle) * data.radius;
            // Add monolith hover offset to fragments so they float together
            mesh.position.y = data.heightOffset + Math.sin(elapsedTime * 0.8) * 0.005;

            mesh.rotation.x += data.rotSpeedX;
            mesh.rotation.y += data.rotSpeedY;
        });
    });

    return (
        <group ref={groupRef}>
            {fragmentsData.map((data, index) => (
                <mesh
                    key={index}
                    ref={(el) => { if (el) meshesRef.current[index] = el; }}
                    position={[
                        Math.cos(data.angle) * data.radius,
                        data.heightOffset,
                        Math.sin(data.angle) * data.radius
                    ]}
                    rotation={data.initialRotation}
                    material={monolithMaterial}
                    castShadow
                >
                    <boxGeometry args={[data.size, data.size, data.size]} />
                </mesh>
            ))}
        </group>
    );
}

function ParticleField() {
    const particleCount = 150;

    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const speeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;     // x
            positions[i + 1] = (Math.random() - 0.5) * 10;   // y
            positions[i + 2] = (Math.random() - 0.5) * 10;   // z
            speeds[i / 3] = Math.random() * 0.01 + 0.005;    // Y speed
        }
        return { positions, speeds };
    }, []);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const elapsedTime = clock.getElapsedTime();

        const positionAttribute = pointsRef.current.geometry.attributes.position;
        const posArray = positionAttribute.array as Float32Array;

        for (let i = 1; i < particleCount * 3; i += 3) { // i=1 is Y
            posArray[i] += speeds[(i - 1) / 3];
            if (posArray[i] > 6) {
                posArray[i] = -6;
            }
        }
        positionAttribute.needsUpdate = true;
        pointsRef.current.rotation.y = elapsedTime * 0.02; // slow global rotation
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={0xd4af37}
                size={0.05}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}

function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.1} />
        </mesh>
    );
}

export const MonolithCanvas = () => {
    return (
        <div className="w-full h-full min-h-[500px] mb-2 cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [0, -1, 14], fov: 45 }}
                shadows // Enable shadows on the canvas
                dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                {/* Lighting setup based on new-model.html */}
                <ambientLight intensity={0.4} color={0xffffff} />

                {/* Key Light */}
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={2.5}
                    color={0xfff5e6}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.001}
                />

                {/* Rim Light */}
                <spotLight
                    position={[-5, 5, -8]}
                    intensity={5.0}
                    color={0xe6f0ff}
                    angle={Math.PI / 4}
                    penumbra={0.5}
                />

                {/* Internal Base Glow */}
                <pointLight position={[0, -2, 0]} intensity={1.5} distance={8} color={0xd4af37} />

                <group position={[0, -0.5, 0]}> {/* Shift down slightly to center the composition */}
                    <MonolithGroup />
                    <FloatingFragments />
                    <ParticleField />
                </group>

                <Floor />

                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    enablePan={false}
                    minDistance={8}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
};

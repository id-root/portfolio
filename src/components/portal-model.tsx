"use client";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Center } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Asset({ name }: { name: string }) {
  const mtlPath = `/models/neo_slavery/${name}.mtl`;
  const objPath = `/models/neo_slavery/${name}.obj`;

  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // FIXED: Traverse the model to correct texture color space
  const clone = useMemo(() => {
    const clonedObj = obj.clone();
    clonedObj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Handle both single materials and arrays of materials
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        materials.forEach((mat) => {
          // FIXED: Cast to 'any' to avoid "Property 'map' does not exist on type 'Material'" error
          const m = mat as any;

          // Force textures to use SRGBColorSpace to fix "washed out" colors
          if (m.map) {
            m.map.colorSpace = THREE.SRGBColorSpace;
            m.map.needsUpdate = true;
          }
          if (m.emissiveMap) {
            m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            m.emissiveMap.needsUpdate = true;
          }
          // Ensure the material updates with new settings
          m.needsUpdate = true;
        });
      }
    });
    return clonedObj;
  }, [obj]);

  return <primitive object={clone} />;
}

function NeoSlaveryOne() {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <Center>
        <Asset name="NeoSlavery-1" />
      </Center>
    </group>
  );
}

function ScreenLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 5 + Math.sin(clock.elapsedTime * 10) * 0.5 + Math.random() * 0.5;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0.79, 1.2, 0.1]}
      color="#ff0000"
      distance={3}
      decay={2}
    />
  );
}

export const PortalCanvas = () => {
  return (
    <div className="w-full h-full min-h-[500px] mb-2 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
        <Suspense fallback={<Html center className="text-terminal-red font-mono text-sm">LOADING...</Html>}>

          {/* Ambient light */}
          <ambientLight intensity={1.5} />

          {/* Directional lights */}
          <directionalLight position={[5, 10, 5]} intensity={4.0} color="#ffffff" />
          <directionalLight position={[-5, 5, -5]} intensity={4.0} color="#dbeafe" />

          <ScreenLight />

          <group scale={1.2} position={[0, -0.2, 0]}>
            <NeoSlaveryOne />
          </group>

          <OrbitControls
            autoRotate
            autoRotateSpeed={1.0}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Stage,
  PresentationControls,
} from "@react-three/drei";
import React from "react";

interface Props {}

const Model = (props: any) => {
  const { scene, nodes, materials } = useGLTF("/lambo.glb");
  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === "Mesh" && (obj.receiveShadow = obj.castShadow = true)
    );
    Object.assign((nodes.wheel003_020_2_Chrome_0 as any).material, {
      metalness: 0.9,
      roughness: 0.4,
      color: new THREE.Color("#020202"),
    });
    Object.assign(materials.WhiteCar, {
      roughness: 0.0,
      metalness: 0.1,
      emissive: new THREE.Color("#500000"),
      envMapIntensity: 0.5,
    });
  }, [scene, nodes, materials]);
  return <primitive object={scene} {...props} />;
};

const ThreeJS: any = () => {
  const [rotation, setRotation] = useState(0.9999);
  const modelRef = useRef();

  useEffect(() => {
    const handleScroll = (event: any) => {
      const delta = event.deltaY;
      setRotation((r) => r + delta * 0.002);
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#101010"]} />
        <fog attach="fog" args={["#101010", 10, 20]} />
        <Suspense fallback={null}>
          <Environment path="/cube" />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null} intensity={0.5} shadows={false}>
              <Model ref={modelRef} scale={0.01} rotation={[0, rotation, 0]} />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </>
  );
};

export default ThreeJS;

import { Color, Object3D } from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Stage,
  PresentationControls,
} from "@react-three/drei";
import React from "react";

const AnyCanvas = Canvas as any;
const AnySuspense = Suspense as any;

interface Props {}

const Model = (props: any): any => {
  const { scene, nodes, materials } = useGLTF("/lambo.glb");
  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === "Mesh" && (obj.receiveShadow = obj.castShadow = true)
    );
    Object.assign((nodes.wheel003_020_2_Chrome_0 as any).material, {
      metalness: 0.9,
      roughness: 0.4,
      color: new Color("#020202"),
    });
    Object.assign(materials.WhiteCar, {
      roughness: 0.0,
      metalness: 0.1,
      emissive: new Color("#500000"),
      envMapIntensity: 0.5,
    });
  }, [scene, nodes, materials]);
  return <primitive object={scene} {...props} />;
};

const ThreeJS: React.FC<Props> = () => {
  const [rotation, setRotation] = useState(0.9999);
  const modelRef = useRef<Object3D>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
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
      <AnyCanvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#101010"]} />
        <fog attach="fog" args={["#101010", 10, 20]} />
        <AnySuspense fallback={null}>
          <Environment path="/cube" />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null} intensity={0.5} shadows={false}>
              <Model
                ref={modelRef}
                scale={0.01}
                rotation={[0.2, rotation, 0]}
              />
            </Stage>
          </PresentationControls>
        </AnySuspense>
      </AnyCanvas>
    </>
  );
};

export default ThreeJS;

import { Color, Object3D } from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Stage,
  PresentationControls,
} from "@react-three/drei";
import React from "react";
import { handleGLB } from "../../ThreeJS/handleGLB";
import { ThreeProps } from "../../ThreeJS";

const AnyCanvas = Canvas as any;
const AnySuspense = Suspense as any;

export interface ThreeModelProps {
  objectKey: string;
  offset?: number;
}
const Model = React.forwardRef((props: ThreeProps, ref): any => {
  return handleGLB(props, ref);
});

const ThreeModel: React.FC<ThreeModelProps> = ({ objectKey, offset = 0 }) => {
  const [rotation, setRotation] = useState(0.9999);
  const modelRef = useRef<Object3D>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation((r) => scrollY * 0.002); // Adjust the multiplier as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <AnyCanvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <AnySuspense fallback={null}>
          <Environment
            path={`https://pub-201533c97c3b4e169c75945e8e2f95fc.r2.dev/cube`}
          />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null} intensity={0.5} shadows={false}>
              <Model
                objectKey={objectKey}
                ref={modelRef}
                scale={0.01}
                rotation={[0, rotation + offset, 0]}
                selectedColor=""
              />
            </Stage>
          </PresentationControls>
        </AnySuspense>
      </AnyCanvas>
    </>
  );
};

export default ThreeModel;

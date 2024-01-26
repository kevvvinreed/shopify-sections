import { Object3D } from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stage, PresentationControls } from "@react-three/drei";
import React from "react";
import config from "../core/config";
import { handle3dModel } from "../core/handle3dModel";

const AnyCanvas = Canvas as any;
const AnySuspense = Suspense as any;

export interface ThreeModelProps {
  objectUrl: string;
  offset?: number;
  scale?: number;
  rotation?: number[];
}
const Model = React.forwardRef((props: ThreeModelProps, ref): any => {
  return handle3dModel(props, ref);
});

const ThreeModel: React.FC<ThreeModelProps> = ({ objectUrl, offset = 0 }) => {
  const [rotation, setRotation] = useState(0.9999);
  const modelRef = useRef<Object3D>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation((r) => scrollY * 0.002);
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
          <Environment path={`${config.assetBaseUrl}/cube`} />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null} intensity={0.5} shadows={false}>
              <Model
                objectUrl={objectUrl}
                ref={modelRef}
                scale={0.01}
                rotation={[0, rotation + offset, 0]}
              />
            </Stage>
          </PresentationControls>
        </AnySuspense>
      </AnyCanvas>
    </>
  );
};

export default ThreeModel;

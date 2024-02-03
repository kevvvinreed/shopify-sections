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
  posY: number;
  posX: number;
  scrollIndex: number;
  objectUrl: string;
  offset?: number;
  scale?: number;
  rotation?: number[];
}
const Model = React.forwardRef((props: ThreeModelProps, ref): any => {
  return handle3dModel(props, ref);
});

const ThreeModel: React.FC<ThreeModelProps> = ({
  scrollIndex,
  posX,
  posY,
  objectUrl,
  offset = 0,
}) => {
  const [rotationAccumulator, setRotationAccumulator] = useState<number>(0.99);
  const [rotation, setRotation] = useState<number>(rotationAccumulator);
  const modelRef = useRef<Object3D>(null);

  const [prevPos, setPrevPos] = useState([0, 0]);

  const [lock, setLock] = useState<boolean>(true);

  useEffect(() => {
    if (scrollIndex === 0) {
      setLock(true);
      return;
    }
    if (scrollIndex === 1) {
      setTimeout(() => {
        setLock(false);
      }, config.scrollAnimationTimingMs);

      return;
    }
  }, [scrollIndex]);

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

  useEffect(() => {
    if (lock) {
      return;
    }
    if (posY && posX) {
      const distance = Math.sqrt(
        (posX - prevPos[0]) ** 2 + (posY - prevPos[1]) ** 2
      );
      setRotationAccumulator((r) => r + distance * 0.0015);
      setPrevPos([posX, posY]);
    }
  }, [posY, posX]);

  useEffect(() => {
    setRotation(rotationAccumulator);
  }, [rotationAccumulator]);

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
                scrollIndex={scrollIndex}
                posX={posX}
                posY={posY}
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

import { Color, Object3D } from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Stage,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import React from "react";
import config from "../core/config";

const AnyCanvas = Canvas as any;
const AnySuspense = Suspense as any;

export interface ThreeModelProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  posY: number;
  posX: number;
  scrollIndex: number;
  objectUrl: string;
  index: number;
  isMobile: boolean;
  offset?: number;
  rotation?: number[];
}

const ThreeModel: React.FC<ThreeModelProps> = ({
  scrollIndex,
  posX,
  posY,
  objectUrl,
  offset = 0,
  index,
  isMobile,
}) => {
  const [rotationAccumulator, setRotationAccumulator] = useState<number>(0.99);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<number>(rotationAccumulator);
  const modelRef = useRef<Object3D>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 0.01);
    }, 20);

    return () => clearInterval(intervalId);
  }, [isMobile]);

  useEffect(() => {
    setRotation(rotationAccumulator);
  }, [rotationAccumulator]);

  const { scene } = useGLTF(objectUrl);

  const setPos = (index: number) => {
    const p = getPos(index);
    setPosition(p);
  };

  const getPos = (index: number): [number, number, number] => {
    switch (index) {
      case 0:
        console.log("index", index);
        return [0, 0, -0.003];
      case 1:
        console.log("index", index);
        return [0, 0, -0.003];
      case 2:
        console.log("index", index);
        return [0, 0, -0.001];
      default:
        console.log("Invalid GLB index", index);
        return [0, 0, 0];
    }
  };

  // TODO: setPos(index); needs to be fired over the last few frames of the
  // loading animation to prevent the 3D models from being pushed to overflow
  // and then the last frame needs to set the final position of the 3D model.
  // Create some sort of "overrideAnimationPosition" function, ideally hook
  // into a 3js event where the model loads and calculate the number of frames
  // or at the very least average time duration of the animation so we can
  // override the position every tick for that duration and more to account for
  // margin of error.
  useEffect(() => {
    if (scrollIndex !== 0) {
      console.log("here");
      setTimeout(() => {
        if (scene) {
          scene.traverse((obj: any) => {
            if (obj.type === "Mesh") {
              obj.material.roughness = 0.5;
              if (index === 2) {
                obj.material.roughness = 1;
                obj.material.color = new Color(0x000000);
                obj.material.metalness = 0;
              } else {
                // obj.material.metalness = 1;
                // obj.material.needsUpdate = true;
                // obj.material.emissive = new Color(0x333333);
                // obj.material.emissiveIntensity = 0.1;
                // obj.material.envMapIntensity = 5;
                // obj.material.toneMapped = true;
              }
            }
          });
        }
        setPos(index);
      }, 2500);
    }
  }, [index, scene, isMobile, scrollIndex]);

  return (
    <>
      <AnyCanvas dpr={[1, 2]} shadows camera={{ fov: 45, near: 0.1, far: 900 }}>
        <AnySuspense fallback={null}>
          <Environment path={`${config.assetBaseUrl}/cube`} />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null} intensity={0.05} shadows={false}>
              <primitive
                ref={modelRef}
                object={scene}
                position={position}
                rotation={[0, rotation + offset, 0]}
                scale={isMobile ? 0.04 : 0.05}
              />
            </Stage>
          </PresentationControls>
        </AnySuspense>
      </AnyCanvas>
    </>
  );
};

export default ThreeModel;

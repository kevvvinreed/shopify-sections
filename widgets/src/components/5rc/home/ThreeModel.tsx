import { Box3, Color, Object3D } from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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

const BASE_SCALAR = 0.85;

const ThreeModel: React.FC<ThreeModelProps> = ({
  scrollIndex,
  objectUrl,
  offset = 0,
  index,
  isMobile,
}) => {
  const [rotationAccumulator, setRotationAccumulator] = useState<number>(0.99);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<number>(rotationAccumulator);
  const modelRef = useRef<Object3D>(null);

  const [currentScene, setCurrentScene] = useState<any>(null);
  const [prevIndex, setPrevIndex] = useState<number>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(0);
  const [scaleAccumulator, setScaleAccumulator] = useState<number>(BASE_SCALAR);

  const [prevWindowY, setPrevWindowY] = useState<number>(-1);

  const needsUpdate = useRef(false);

  useEffect(() => {
    if (index === 0) {
      setScaleFactor(0.04940697590113064);
    } else if (index === 1) {
      setScaleFactor(0.050566103187266245);
    } else if (index === 2) {
      setScaleFactor(0.05336917361230629);
    }
  }, []);

  const setNewScene = () => {
    const { scene: newScene } = useGLTF(objectUrl);
    setCurrentScene(newScene);
  };

  useMemo(() => {
    setNewScene();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 0.01);
    }, 20);

    return () => clearInterval(intervalId);
  }, [isMobile]);

  useEffect(() => {
    setRotation(rotationAccumulator);
  }, [rotationAccumulator]);

  const setPos = async (index: number, scale: number = 1) => {
    const p1 = getPos(index, scale);
    setPosition(p1);
  };

  const getPos = (index: number, scale: number): [number, number, number] => {
    switch (index) {
      case 0:
        return [0, 0.001 * scale, -0.003 * scale];
      case 1:
        return [0, 0.001 * scale, -0.003 * scale];
      case 2:
        return [0, 0.001 * scale, -0.001 * scale];
      default:
        console.log("Invalid GLB index", index);
        return [0, 0, 0];
    }
  };
  const asyncRescale = async () => {
    for (let i = 0; i < 100; i++) {
      await sleep(10);
      adjustModel();
    }
  };

  useEffect(() => {
    if (
      scrollIndex === 1 &&
      prevIndex === 0 &&
      window.scrollY === prevWindowY
    ) {
      setPrevIndex(scrollIndex);
      needsUpdate.current = true;
      setTimeout(() => {
        asyncRescale();
      }, config.scrollAnimationTimingMs);
    } else {
      setPrevIndex(scrollIndex);
    }
    setPrevWindowY(window.scrollY);
  }, [scrollIndex, prevWindowY, window.scrollY]);

  const adjustModel = () => {
    if (currentScene && modelRef.current) {
      if (needsUpdate.current) {
        needsUpdate.current = false;
        setScaleFactor((p) => p * BASE_SCALAR);
        setScaleAccumulator((p) => p * 1 + (1 - BASE_SCALAR));
      }

      setPos(index, scaleAccumulator);
      modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  };

  useEffect(() => {
    if (currentScene) {
      currentScene.traverse((obj: any) => {
        if (obj.type === "Mesh") {
          obj.material.roughness = 0.5;
          if (index === 2) {
            obj.material.roughness = 1;
            obj.material.color = new Color(0x000000);
            obj.material.metalness = 0;
          }
        }
      });
    }
  }, [currentScene]);

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
              {currentScene && (
                <primitive
                  ref={modelRef}
                  object={currentScene}
                  position={position}
                  rotation={[0, rotation + offset, 0]}
                  scale={isMobile ? 0.04 : 0.05}
                />
              )}
            </Stage>
          </PresentationControls>
        </AnySuspense>
      </AnyCanvas>
    </>
  );
};

export default ThreeModel;

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
import { handleGLB } from "./handleGLB";

const AnyCanvas = Canvas as any;
const AnySuspense = Suspense as any;

const baseUrl = import.meta.env.VITE_BASE_ASSET_URL || "";
type ObjectKey = "crown-of-thorns" | "lambo" | "lambo-suede" | "trucker-hat";
export interface ThreeProps {
  selectedColor: string;
  objectKey: ObjectKey;
  scale?: number;
  rotation?: number[];
}

const Model = React.forwardRef((props: ThreeProps, ref): any => {
  return handleGLB(props, ref);
});

const ThreeJS: React.FC = () => {
  const [rotation, setRotation] = useState(0.9999);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const modelRef = useRef<Object3D>(null);

  // const colors = ["#ddf", "#f92", "#1b1", "#f765af"];
  const colors = [
    { label: "no.1", value: "#b6b5ac" },
    { label: "no.2", value: "#8b6245" },
    { label: "no.3", value: "#3d2019" },
    { label: "no.5", value: "#966b22" },
    { label: "no.6", value: "#6f797e" },
  ];

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
      <style>
        {`
          .Three-js__container {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              background-color: #101010;
          }

          .Three-js__sceneContainer { 
              border: 1px solid #fff;
              width: 100%;
              height: 100%;
          }

          .Three-js__editorContainer {

              height: 100%;
              width: 400px;
              min-width: 400px;
              
              border-top: 1px solid #fff;
              border-right: 1px solid #fff;
              border-bottom: 1px solid #fff;
          }

          .Three-js__colorSelectorLabel {
              font-size: large;
              font-family: "Serif";
              font-weight: bold;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 12px;
              padding-bottom: 0px;
              color: #fff;
          }

          .Three-js__colorSelectorRow {
              display: flex;
              gap: 10px;
              align-items: center;
              justify-content: flex-start;
              padding: 12px;
              border-bottom: 1px solid #fff;
          }

          .Three-js__selectorOption {
              width: 24px;
              height: 24px;
              min-width: 24px;
              min-height: 24px;

              border-radius: 100%;
              border: 1px solid #fff;

              cursor: pointer;
          }
        `}
      </style>
      <div className={`Three-js__container`}>
        <div className={`Three-js__sceneContainer`}>
          <AnyCanvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
            <color attach="background" args={["#101010"]} />
            <fog attach="fog" args={["#101010", 10, 20]} />
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
                    objectKey="trucker-hat"
                    ref={modelRef}
                    scale={0.01}
                    rotation={[0, rotation, 0]}
                    selectedColor={colors[selectedOption].value}
                  />
                </Stage>
              </PresentationControls>
            </AnySuspense>
          </AnyCanvas>
        </div>
        <div className={`Three-js__editorContainer`}>
          <div className={`Three-js__colorSelectorLabel`}>Color</div>
          <div className={`Three-js__colorSelectorRow`}>
            {colors.map(
              (opt: { value: string; label: string }, index: number) => {
                return (
                  <div
                    key={`${opt.value}-${index}`}
                    className={`Three-js__selectorOption`}
                    style={{ backgroundColor: opt.value }}
                    onClick={() => {
                      setSelectedOption(index);
                    }}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeJS;

import { Color } from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
export interface ModelProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  posY: number;
  posX: number;
  scrollIndex: number;
  scale: number;
  scaleMultiplier: number;
  objectUrl: string;
  index: number;
  isMobile: boolean;
  offset?: number;
  rotation?: number[];
}
export const handle3dModel = (
  props: ModelProps,
  ref: React.ForwardedRef<unknown>
) => {
  const obj = useGLTF(`${props.objectUrl}`);

  const { scene } = obj;

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.type === "Mesh") {
        obj.material.roughness = 1.0;
        if (props.index === 2) {
          obj.material.color = new Color(0x000000);
          obj.material.metalness = 0;
        }
      }
    });
  }, [scene]);
  if (props.scaleMultiplier) {
    scene.scale.setScalar(props.scaleMultiplier);
  }
  return <primitive object={scene} {...props} />;
};

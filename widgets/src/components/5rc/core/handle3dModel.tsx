import { Color } from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeModelProps } from "../home/ThreeModel";

export const handle3dModel = (
  props: ThreeModelProps,
  ref: React.ForwardedRef<unknown>
) => {
  const obj = useGLTF(`${props.objectUrl}`);

  const { scene } = obj;

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.type === "Mesh") {
        obj.material.roughness = 1.0;
        if (props.index !== 0) {
          obj.material.color = new Color(0x000000);
          obj.material.metalness = 0;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

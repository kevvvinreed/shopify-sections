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
    scene.traverse(
      (obj: any) =>
        obj.type === "Mesh" && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

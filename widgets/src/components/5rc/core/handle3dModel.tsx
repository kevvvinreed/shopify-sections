import { Color, Box3, Vector3 } from "three";
import { useEffect, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";

export interface ModelProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  posY: number;
  posX: number;
  scrollIndex: number;
  scale?: number;
  scaleMultiplier: number;
  objectUrl: string;
  index: number;
  isMobile: boolean;
  offset?: number;
  rotation?: number[];
}
export const handle3dModel = (
  props: ModelProps,
  ref: React.ForwardedRef<unknown>,
  tick: number
) => {
  const obj = useGLTF(`${props.objectUrl}`);

  const { scene } = obj;

  useImperativeHandle(ref, () => scene, [scene]);

  useEffect(() => {
    if (scene) {
      scene.traverse((obj: any) => {
        if (obj.type === "Mesh") {
          if (props.index === 2) {
            obj.material.color = new Color(0x000000);
            obj.material.metalness = 0;
          } else {
            obj.material.roughness = 1.0;
            obj.material.metalness = 1;
            obj.material.needsUpdate = true;
            obj.material.emissive = new Color(0x333333);
            obj.material.emissiveIntensity = 0.1;
            obj.material.envMapIntensity = 5;

            obj.material.toneMapped = true;
          }
        }
      });
      if (tick === 0) {
        // const boundingBox = new Box3().setFromObject(scene);
        // console.log(`${props.index}:${size.x},${size.y},${size.z}`);
        switch (props.index) {
          case 0:
            // 0.4688794655463794,0.39450315856933593,0.3624162763610568
            scene.scale.setScalar(0.05333278847017943);
            break;
          case 1:
            // 0.4348352648773517,0.3919487190246582,0.23452221517101135
            scene.scale.setScalar(0.05797039210876394);
            break;
          case 2:
            // 0.3331500081931031,0.37220148468017644,0.6010686625975392
            scene.scale.setScalar(0.041473522575378556);
            break;
          default:
            break;
        }
      }
    }
  }, [props.scaleMultiplier, scene, tick]);

  return <primitive ref={ref} object={scene} rotation={props.rotation} />;
};

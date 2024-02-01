// import { Color } from "three";
// import { useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import { ThreeProps } from ".";

// const baseUrl = "https://pub-201533c97c3b4e169c75945e8e2f95fc.r2.dev";

// export const handleGLB = (
//   props: ThreeProps,
//   ref: React.ForwardedRef<unknown>
// ) => {
//   const obj = useGLTF(`${baseUrl}/${props.objectKey}.glb`);

//   const { scene, nodes, materials } = obj;
//   const { selectedColor } = props;

//   let keyArray: string[] = [];

//   useEffect(() => {
//     switch (props.objectKey) {
//       case "crown-of-thorns":
//         keyArray[0] = "Цилиндр018_Цилиндр094";
//         keyArray[1] = "";
//         Object.assign((nodes[keyArray[0]] as any).material, {
//           color: new Color("#020202"),
//         });
//         Object.assign(materials[keyArray[1]], {
//           emissive: new Color(selectedColor),
//         });
//         break;
//       case "lambo":
//         keyArray[0] = "wheel003_020_2_Chrome_0";
//         keyArray[1] = "WhiteCar";
//         Object.assign((nodes[keyArray[0]] as any).material, {
//           color: new Color("#020202"),
//         });
//         Object.assign(materials[keyArray[1]], {
//           emissive: new Color(selectedColor),
//         });
//         break;
//       case "lambo-suede":
//         keyArray[0] = "wheel003_020_2_Chrome_0";
//         keyArray[1] = "Sage Blue Miracle soft Fabric";
//         Object.assign((nodes[keyArray[0]] as any).material, {
//           color: new Color("#020202"),
//         });
//         Object.assign(materials[keyArray[1]], {
//           emissive: new Color(selectedColor),
//         });
//         break;
//       case "trucker-hat":
//         Object.assign(materials["Sage_Blue_Miracle_soft_Fabric"], {
//           color: new Color(selectedColor),
//         });
//         // Object.assign(materials["Mesh_drill"], {
//         //   opacity: 0.5,
//         // });

//         Object.assign((nodes["NetFabric_pivot003"] as any).material, {
//           opacity: 0.1,
//         });
//         Object.assign((nodes["lables_pivot003"] as any).material, {
//           color: new Color("#ff9999"),
//         });
//         Object.assign((nodes["ClaspL_pivot003"] as any).material, {
//           color: new Color(selectedColor),
//         });
//         Object.assign((nodes["ClaspR_pivot003"] as any).material, {
//           color: new Color(selectedColor),
//         });
//         Object.assign((nodes["Visor_pivot003"] as any).material, {
//           ...materials["Sage_Blue_Miracle_soft_Fabric"],
//         });
//         Object.assign((nodes["CapStripes_pivot003"] as any).material, {
//           ...materials["Sage_Blue_Miracle_soft_Fabric"],
//         });

//         break;
//       default:
//         break;
//     }

//     scene.traverse(
//       (obj: any) =>
//         obj.type === "Mesh" && (obj.receiveShadow = obj.castShadow = true)
//     );
//   }, [scene, nodes, materials, selectedColor]);
//   return <primitive object={scene} {...props} />;
// };

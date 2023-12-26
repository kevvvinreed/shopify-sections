import { useRouter } from "next/router";
import ThreeJS from "../src/components/ThreeJS";

const SectionPage = () => {
  const router = useRouter();
  const { section_id } = router.query;

  let component;

  switch (section_id) {
    case "three-js":
      component = <ThreeJS></ThreeJS>;
      break;
    default:
      component = <></>;
      break;
  }

  return <>{component}</>;
};

export default SectionPage;

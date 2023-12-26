import { useRouter } from "next/router";
import ThreeJS from "../src/components/ThreeJS";
import { useEffect } from "react";
import ReactDOM from "react-dom";

const SectionPage = () => {
  const router = useRouter();
  const { section_id, shop_id } = router.query;

  useEffect(() => {
    const root = document.getElementById(`${section_id}-${shop_id}`);

    let Section;
    switch (section_id) {
      case "three-js":
        Section = ThreeJS;
        break;
      default:
        Section = () => <div></div>;
        break;
    }

    if (shop_id && section_id && root) {
      ReactDOM.render(<Section />, root);
    }

    return () => {
      if (root) {
        ReactDOM.unmountComponentAtNode(root);
      }
    };
  }, [shop_id, section_id]);
};

export default SectionPage;

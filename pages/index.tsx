import { NextPage } from "next";
import { IPageProps } from "./_app";
import { useLayoutEffect } from "react";

const Home: NextPage<IPageProps> = ({}) => {
  useLayoutEffect(() => {
    // Create a new script element
    const script = document.createElement("script");
    script.src = "https://shopify-sections-yeqggr54rq-uk.a.run.app/api/widget";
    script.id = "widget-script";

    // Attach the load event listener to the script
    script.addEventListener("load", function () {
      if ((window as any).initReactComponent) {
        (window as any).initReactComponent({
          section_id: "three-js",
          shop_id: "root",
        });
        console.log("initReactComponent called");
      } else {
        console.error("initReactComponent function not defined.");
      }
    });

    // Append the script to the document
    document.body.appendChild(script);

    // Optional: Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <div id="root" style={{ height: "100%", width: "100%" }}></div>
    </>
  );
};

export default Home;

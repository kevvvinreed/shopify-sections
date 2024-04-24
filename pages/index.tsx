import { NextPage } from "next";
import { IPageProps } from "./_app";
import { useLayoutEffect } from "react";

const Home: NextPage<IPageProps> = ({}) => {
  // useLayoutEffect(() => {
  //   // Create a new script element
  //   const script = document.createElement("script");
  //   script.src = "/api/widget";
  //   script.id = "widget-script";

  //   // Attach the load event listener to the script
  //   script.addEventListener("load", function () {
  //     if ((window as any).initReactComponent) {
  //       (window as any).initReactComponent({
  //         section_id: "5rc-hero",
  //         shop_id: "root",
  //         config: JSON.stringify({ sku: 0 }),
  //       });
  //       console.log("initReactComponent called");
  //     } else {
  //       console.error("initReactComponent function not defined.");
  //     }
  //   });

  //   // Append the script to the document
  //   document.body.appendChild(script);

  //   // Optional: Clean up the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <>
      {/* <div id="root" style={{ height: "100vh", width: "100vw" }}></div> */}
      <div></div>
    </>
  );
};

export default Home;

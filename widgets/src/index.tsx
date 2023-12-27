import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import ThreeJS from "./components/ThreeJS";

interface IConfig {
  section_id: string;
  shop_id: string;
}

const App: React.FC<IConfig> = ({ section_id, shop_id }) => {
  let Section;
  switch (section_id) {
    case "three-js":
      Section = ThreeJS;
      break;
    default:
      Section = () => <div></div>;
      break;
  }
  return <Section />;
};

window.initReactComponent = ({ section_id, shop_id }: IConfig) => {
  ReactDOM.render(
    <App section_id={section_id} shop_id={shop_id} />,
    document.getElementById(`${section_id}-${shop_id}`)
  );
};

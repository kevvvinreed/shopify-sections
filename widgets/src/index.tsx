import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import ThreeJS from "./components/ThreeJS";
import FrcHero from "./components/5rc/hero";
import FrcCheckout from "./components/5rc/checkout";
interface IConfig {
  section_id: string;
  shop_id: string;
  config: string;
}

const App: React.FC<IConfig> = ({ section_id, shop_id, config }) => {
  let Section;
  switch (section_id) {
    case "5rc-hero":
      Section = FrcHero;
      break;
    case "5rc-checkout":
      Section = FrcCheckout;
      break;
    case "three-js":
      Section = ThreeJS;
      break;
    default:
      Section = () => <div></div>;
      break;
  }
  return <Section config={config} />;
};

window.initReactComponent = ({ section_id, shop_id, config }: IConfig) => {
  ReactDOM.render(
    <App section_id={section_id} shop_id={shop_id} config={config} />,
    document.getElementById(`${shop_id}`)
  );
};

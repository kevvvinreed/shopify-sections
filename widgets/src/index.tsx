import ReactDOM from "react-dom";
import React from "react";
import "./styles/index.css";
import ThreeJS from "./components/ThreeJS";
import FrcHero from "./components/5rc/home";
import { BrowserRouter } from "react-router-dom";
import FrcProduct from "./components/5rc/products";
import Client from "shopify-buy";

interface IInitConfig {
  section_id: string;
  shop_id: string;
}
export interface IAppConfig {
  section_id?: string;
  shopifyClient: Client;
}

const App: React.FC<IAppConfig> = ({ section_id, shopifyClient }) => {
  let Section;

  switch (section_id) {
    case "5rc-hero":
      Section = FrcHero;
      break;
    case "5rc-product":
      Section = FrcProduct;
      break;
    case "three-js":
      Section = ThreeJS;
      break;
    default:
      Section = () => <div></div>;
      break;
  }
  return <Section shopifyClient={shopifyClient} />;
};

window.initReactComponent = ({ section_id, shop_id }: IInitConfig) => {
  const shopifyClient = Client.buildClient({
    storefrontAccessToken: "9c93da58e86d7071b6656a318ccd1d8f",
    domain: "266823-3.myshopify.com",
  });
  ReactDOM.render(
    <BrowserRouter>
      <App section_id={section_id} shopifyClient={shopifyClient} />
    </BrowserRouter>,
    document.getElementById(`${shop_id}`)
  );
};

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import ThreeJS from "./components/ThreeJS";
import FrcHero from "./components/5rc/home";
import { BrowserRouter } from "react-router-dom";
import FrcProduct from "./components/5rc/products";
import Client from "shopify-buy";
import ShopifyBuy from "shopify-buy";
import updateCheckoutState from "./components/5rc/core/shopify/updateCheckoutState";

interface IInitConfig {
  section_id: string;
  shop_id: string;
}
export interface IAppConfig {
  section_id: string;
}

export interface IAppStore {
  checkout: ShopifyBuy.Checkout | null;
  shopifyClient: Client;
  checkoutId: string | null;
  cartQuantity: number | null;
  checkoutUrl: string | null;
  initialized: boolean;
  loading: boolean;
}

export interface ISectionProps {
  store: IAppStore;
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>;
}

const App: React.FC<IAppConfig> = ({ section_id }) => {
  let Section: React.FC<ISectionProps>;

  const shopifyClient = Client.buildClient({
    storefrontAccessToken: "9c93da58e86d7071b6656a318ccd1d8f",
    domain: "266823-3.myshopify.com",
  });

  const defaultState = {
    checkout: null,
    checkoutId: null,
    checkoutUrl: null,
    cartQuantity: null,
    initialized: false,
    loading: true,
  };

  const [store, setStore] = useState<IAppStore>({
    shopifyClient: shopifyClient,
    ...defaultState,
  });

  useEffect(() => {
    console.log(store.cartQuantity);
  }, [store]);

  useEffect(() => {
    updateCheckoutState(store, setStore);
  }, []);

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
  return <Section store={store} setStore={setStore} />;
};

window.initReactComponent = ({ section_id, shop_id }: IInitConfig) => {
  ReactDOM.render(
    <BrowserRouter>
      <App section_id={section_id} />
    </BrowserRouter>,
    document.getElementById(`${shop_id}`)
  );
};

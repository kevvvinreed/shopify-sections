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
import useCursor from "./components/5rc/core/useCursor";

interface IInitConfig {
  section_id: string;
  shop_id: string;
}
export interface IAppConfig {
  section_id: string;
}

export interface IAppStore {
  shopifyClient: Client;
  checkout: ShopifyBuy.Checkout | null;
  checkoutId: string | null;
  cartQuantity: number | null;
  checkoutUrl: string | null;
  initialized: boolean;
  loading: boolean;
}

export interface ISectionProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  store: IAppStore;
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>;
  posY?: number;
  posX?: number;
}

const App: React.FC<IAppConfig> = ({ section_id }) => {
  let Section: React.FC<ISectionProps>;

  const shopifyClient = Client.buildClient({
    storefrontAccessToken: "9c93da58e86d7071b6656a318ccd1d8f",
    domain: "266823-3.myshopify.com",
    apiVersion: "",
  });

  const defaultState: IAppStore = {
    shopifyClient: shopifyClient,
    checkout: null,
    checkoutId: null,
    checkoutUrl: null,
    cartQuantity: null,
    initialized: false,
    loading: true,
  };

  const [store, setStore] = useState<IAppStore>(defaultState);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const { posX, posY } = useCursor();

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
  return (
    <Section
      store={store}
      setStore={setStore}
      posY={posY}
      posX={posX}
      modalActive={modalActive}
      setModalActive={setModalActive}
    />
  );
};

window.initReactComponent = ({ section_id, shop_id }: IInitConfig) => {
  ReactDOM.render(
    <BrowserRouter>
      <App section_id={section_id} />
    </BrowserRouter>,
    document.getElementById(`${shop_id}`)
  );
};

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import FrcCheckout from "./components/5rc/checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrcLanding from "./components/5rc/home";
interface IConfig {
  section_id: string;
  mount_id: string;
  config: string;
}

const App: React.FC<IConfig> = ({ section_id, config }) => {
  const routeConfig = [
    { path: "/", component: FrcLanding },
    { path: "/pages/product/:sku", component: FrcCheckout },
  ];
  return (
    <Routes>
      {routeConfig.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component config={config} />} />
      ))}
    </Routes>
  );
};

window.initReactComponent = ({ section_id, mount_id, config }: IConfig) => {
  ReactDOM.render(
    <BrowserRouter>
      <App section_id={section_id} mount_id={mount_id} config={config} />
    </BrowserRouter>,
    document.getElementById(`${mount_id}`)
  );
};

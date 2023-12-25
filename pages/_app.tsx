import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import "../src/styles/globals.css";

export interface IPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IRootProps extends AppProps {
  Component: NextPage<any, IPageProps>;
}

const CHAIN_ID = `0x${process.env.CHAIN_ID}`;
const NETWORK_NAME = process.env.IS_DEV === "true" ? "sepolia" : "mainnet";

export default function App(props: IRootProps) {
  const { Component } = props;

  const [darkMode, setDarkMode] = useState<boolean>();

  useEffect(() => {
    if (darkMode !== undefined) {
      if (darkMode) {
        // Set value of  darkmode to dark
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        // Set value of  darkmode to light
        document.documentElement.setAttribute("data-theme", "light");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    // Set initial darkmode to light
    setDarkMode(initialColorValue === "dark");
  }, []);

  return (
    <>
      <Component darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}

import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import "../src/styles/globals.css";

export interface IPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function App({ Component }: AppProps<IPageProps>): JSX.Element {
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
      <Component pageProps={{ darkMode, setDarkMode }} />
    </>
  );
}

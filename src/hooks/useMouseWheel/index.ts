import { useEffect, useState } from "react";
const useMouseWheel = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const preventScroll = (e: globalThis.WheelEvent) => {
      if (disabled) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", (e) => preventScroll(e));
    return () => {
      window.removeEventListener("wheel", (e) => preventScroll(e));
    };
  }, []);

  return { disabled, setDisabled };
};

export default useMouseWheel;

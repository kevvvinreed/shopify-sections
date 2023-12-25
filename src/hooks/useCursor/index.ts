import { useEffect, useState } from "react";
const useCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mouseTouchUp, setMouseTouchUp] = useState<boolean>(false);

  useEffect(() => {
    const updateMousePos = (e: globalThis.MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const updateTouchPos = (e: globalThis.TouchEvent) => {
      setCursorPos({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    };
    window.addEventListener("mousemove", (e) => updateMousePos(e));
    window.addEventListener("touchmove", (e) => updateTouchPos(e));
    window.addEventListener("mouseup", () => setMouseTouchUp(true));
    window.addEventListener("mousedown", () => setMouseTouchUp(false));
    window.addEventListener("touchend", () => setMouseTouchUp(true));
    window.addEventListener("touchstart", () => setMouseTouchUp(false));
    return () => {
      window.removeEventListener("mousemove", (e) => updateMousePos(e));
      window.removeEventListener("touchmove", (e) => updateTouchPos(e));
      window.removeEventListener("mouseup", () => setMouseTouchUp(true));
      window.removeEventListener("mousedown", () => setMouseTouchUp(false));
      window.removeEventListener("touchend", () => setMouseTouchUp(true));
      window.removeEventListener("touchstart", () => setMouseTouchUp(false));
    };
  }, []);

  return { mouseX: cursorPos.x, mouseY: cursorPos.y, mouseTouchUp };
};

export default useCursor;

import React, { useEffect, useRef, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";
import Header from "../layout/Header";
import config from "../core/config";
import smoothScrollTo from "../util/smoothScrollTo";
import Hero from "./Hero";
import theme from "../core/theme";
import { ISectionProps } from "@/src/index";

const FrcLanding: React.FC<ISectionProps> = ({
  posX,
  posY,
  store,
  setStore,
}) => {
  const featuredProductRef = useRef<HTMLDivElement>(null);
  const sectionIndexRef = useRef<number>(0);
  const lastIndexSwitchTime = useRef<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const debouncedSetScrollIndex = (index: number) => {
    const now = Date.now();
    if (now - lastIndexSwitchTime.current > config.scrollAnimationTimingMs) {
      setScrollIndex(index);
      lastIndexSwitchTime.current = now;
    }
  };

  const shiftSection = (direction: "increment" | "decrement") => {
    const max = 1;
    const min = 0;
    if (direction === "increment") {
      return sectionIndexRef.current < max ? sectionIndexRef.current + 1 : max;
    } else {
      return sectionIndexRef.current > min ? sectionIndexRef.current - 1 : min;
    }
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      sectionIndexRef.current = shiftSection("decrement");
    } else if (event.deltaY > 0) {
      sectionIndexRef.current = shiftSection("increment");
    }
    debouncedSetScrollIndex(sectionIndexRef.current);
  };

  useEffect(() => {
    if (!window) {
      return;
    }

    switch (scrollIndex) {
      case 0:
        smoothScrollTo(0, 1250);
        break;
      case 1:
        smoothScrollTo(window.innerHeight + config.headerHeight, 1250);
        break;
    }
  }, [scrollIndex]);

  /**
   * Start untested mobile code
   */
  const touchStartRef = useRef<number>(0);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartRef.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const touchEnd = event.changedTouches[0].clientY;
    if (touchStartRef.current > touchEnd) {
      sectionIndexRef.current = shiftSection("increment");
    } else {
      sectionIndexRef.current = shiftSection("decrement");
    }
    debouncedSetScrollIndex(sectionIndexRef.current);
  };
  /**
   * End untested mobile code
   */

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
         
          .footer-placeholder {
            width: 100%;
            height: 200px;
            background-color: ${theme.primary};
          }
          .frc-landing__container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
    
        `}
      </style>
      <div className={`frc-landing__container`}>
        <Header store={store} setStore={setStore} />
        <Hero
          scrollIndex={scrollIndex}
          setScrollIndex={debouncedSetScrollIndex}
        />
        <FeaturedProducts
          ref={featuredProductRef}
          scrollIndex={scrollIndex}
          posY={posY}
          posX={posX}
        />

        <div className="footer-placeholder"></div>
      </div>
    </>
  );
};

export default FrcLanding;

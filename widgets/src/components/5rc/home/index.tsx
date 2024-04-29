import React, { useEffect, useRef, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";
import Header from "../layout/Header";
import config from "../core/config";
import smoothScrollTo from "../util/smoothScrollTo";
import Hero from "./Hero";
import theme from "../core/theme";
import { ISectionProps } from "@/src/index";
import useWindow from "../util/useWindow";
import Modal from "../layout/Modal";

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [debug, setDebug] = useState<string>("init");

  const { windowWidth } = useWindow();

  useEffect(() => {
    if (windowWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

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

  const touchStartRefX = useRef<number>(0);
  const touchStartRefY = useRef<number>(0);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartRefY.current = event.touches[0].clientY;
    touchStartRefX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;

    const distanceX = touchEndX - touchStartRefX.current;
    const distanceY = touchEndY - touchStartRefY.current;

    if (Math.abs(distanceY) < 10 && Math.abs(distanceX) < 10) {
      // It's a tap, do nothing or handle tap specifically.
      return;
    }

    // Detect swipe for scroll animation triggering
    if (touchStartRefY.current > touchEndY) {
      sectionIndexRef.current = shiftSection("increment");
    } else {
      sectionIndexRef.current = shiftSection("decrement");
    }
    debouncedSetScrollIndex(sectionIndexRef.current);
  };

  const preventMobileScrolling = (event: TouchEvent) => {
    setDebug("prevent");
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("touchmove", preventMobileScrolling, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", preventMobileScrolling);
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
        {/* <div
          style={{
            position: "fixed",
            zIndex: 999,
            color: "#f00",
            top: 0,
            left: 0,
            width: "100%",
            height: 20,
            backgroundColor: "#000",
          }}
        >
          {debug}
        </div> */}
        <Header store={store} setStore={setStore} scrollIndex={scrollIndex} />
        <Hero
          scrollIndex={scrollIndex}
          setScrollIndex={debouncedSetScrollIndex}
          isMobile={isMobile}
        />
        <FeaturedProducts
          ref={featuredProductRef}
          scrollIndex={scrollIndex}
          posY={posY}
          posX={posX}
          windowWidth={windowWidth}
          isMobile={isMobile}
        />

        <div className="footer-placeholder"></div>
      </div>
    </>
  );
};

export default FrcLanding;

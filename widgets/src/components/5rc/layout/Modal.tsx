import { useEffect, useRef, useState } from "react";
import theme from "../core/theme";
import config from "../core/config";
import { isSafari } from "react-device-detect";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  content: {
    productName: string;
    productCost: number;
    productDescription: string[];
  } | null;
  isMobile: boolean;
}
const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  content,
  isMobile,
}) => {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const sectionIndexRef = useRef<number>(0);
  const lastIndexSwitchTime = useRef<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const touchStartRefX = useRef<number>(0);
  const touchStartRefY = useRef<number>(0);

  const shiftSection = (direction: "increment" | "decrement") => {
    const max = 1;
    const min = 0;
    if (direction === "increment") {
      return sectionIndexRef.current < max ? sectionIndexRef.current + 1 : max;
    } else {
      return sectionIndexRef.current > min ? sectionIndexRef.current - 1 : min;
    }
  };

  useEffect(() => {
    if (active) {
      setIsFirstRender(false);
    }
  }, [active]);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      sectionIndexRef.current = shiftSection("decrement");
    } else if (event.deltaY > 0) {
      sectionIndexRef.current = shiftSection("increment");
    }
    debouncedSetScrollIndex(sectionIndexRef.current);
  };

  const debouncedSetScrollIndex = (index: number) => {
    const now = Date.now();
    if (
      now - lastIndexSwitchTime.current >
      config.scrollAnimationProductTimingMs
    ) {
      setScrollIndex(index);
      if (index > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
      lastIndexSwitchTime.current = now;
    }
  };

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
    isMobile && (
      <>
        <style>
          {`
            .frc-layout__modal-container {
              text-transform: uppercase;
              color: ${theme.textColor};
              background-color: ${theme.primary};
              font-family: 'Oswald', sans-serif;
              border-top: 1px solid ${theme.textColor};
              border-left: 1px solid ${theme.textColor};
              border-right: 1px solid ${theme.textColor};
              width: 90vw;
              height: 100%;
              border-radius: 4px 4px 0 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
            }
            .frc-layout__modal-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              padding-left: 10px;
              padding-right: 10px;
              
              width: 100%;
              height: 40px;
              min-height: 40px;
            }
            .frc-layout__modal-price-display {
              font-size: 14px;
            }
            .frc-layout__modal-view-cta {
              font-size: 14px;
            }
            
            .frc-layout__modal-root-backdrop {
              z-index: 999999998;
              position: absolute;
              width: 100vw;
              height: 100vh;
              top: 0px;
              left: 0px;
              transition: background-color ${
                config.scrollAnimationProductTimingMs
              }ms linear;
            }
            .frc-layout__modal-root-backdrop-active {
              background-color: rgb(0, 0, 0, 0.5);
            }

            @keyframes hide {
              0% {

              }
              100% {
                z-index: -1;
              }
            }
            .frc-layout__modal-root-backdrop-delayed-hide {
              animation-name: hide;
              animation-duration: 0ms;
              animation-delay: ${config.scrollAnimationProductTimingMs + 1}ms;
              animation-fill-mode: forwards;
            }
            .frc-layout__modal-root-backdrop-initial-hide {
              z-index: -1;
            }

            .frc-layout__modal-root-inactive {
              position: absolute;
              z-index: 999999999;
              top: calc(100vh - 40px);
              left: 0px;
              height: 40px;
              transition: top ${
                config.scrollAnimationProductTimingMs
              }ms linear, 
                height ${config.scrollAnimationProductTimingMs}ms linear,
                padding ${config.scrollAnimationProductTimingMs}ms linear;
            }
            .frc-layout__modal-root-inactive-safari {
              top: calc(100vh - 120px);
            }
            .frc-layout__modal-root-active {
              position: absolute;
              z-index: 999999999;
              top: 0px;
              left: 0px;
              height: 100vh;
              padding-top: 30vh;
              transition: top ${
                config.scrollAnimationProductTimingMs
              }ms linear, 
                height ${config.scrollAnimationProductTimingMs}ms linear,
                padding ${config.scrollAnimationProductTimingMs}ms linear;
            }
            .frc-layout__modal-root {
              width: 100vw;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .frc-layout__modal-view-cta-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5px;
              height: 100%;
              user-select: none;
              
              cursor: pointer;
            }
            .frc-layout__modal-caret {
              font-size: 12px;
            }
            .frc-layout__modal-description-container {
              text-transform: initial;
              padding: 20px;
              
              font-family: 'Oswald', sans-serif;
              font-weight: 400;
              color: ${theme.textColor};
            }
        `}
        </style>
        <div
          className={`frc-layout__modal-root-backdrop ${
            active
              ? "frc-layout__modal-root-backdrop-active"
              : "frc-layout__modal-root-backdrop-delayed-hide"
          } ${isFirstRender && "frc-layout__modal-root-backdrop-initial-hide"}`}
        />
        <div
          className={`frc-layout__modal-root ${
            active
              ? "frc-layout__modal-root-active"
              : "frc-layout__modal-root-inactive"
          } ${!active && isSafari && "frc-layout__modal-root-inactive-safari"}`}
        >
          <div className={`frc-layout__modal-container`}>
            <div className={`frc-layout__modal-header`}>
              {content && (
                <span className={`frc-layout__modal-price-display`}>
                  $: {content.productCost}
                </span>
              )}
              <div
                className={`frc-layout__modal-view-cta-wrapper`}
                onClick={() => {
                  setActive((p) => !p);
                }}
              >
                <div className={`frc-layout__modal-view-cta`}>description</div>
                <span className={`frc-layout__modal-caret`}>
                  {active ? "▼" : "▲"}
                </span>
              </div>
            </div>
            <div className="frc-layout__modal-description-container">
              {content &&
                content.productDescription.map((descItem, index) => {
                  if (index > 0) {
                    return (
                      <>
                        <div
                          key={`${descItem}-${index}`}
                          className="frc-product__product-description-break"
                        />
                        <span>{descItem}</span>
                      </>
                    );
                  }
                  return <span>{descItem}</span>;
                })}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;

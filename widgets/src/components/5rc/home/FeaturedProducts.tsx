import ThreeModel from "./ThreeModel";
import React, { forwardRef, useEffect, useState } from "react";
import theme from "../core/theme";
import assets from "../core/assets";
import useWindow from "../util/useWindow";

export interface FeaturedProductsProps {
  scrollIndex: number;
  posY: number;
  posX: number;
}

const FeaturedProducts = forwardRef<HTMLDivElement, FeaturedProductsProps>(
  ({ scrollIndex, posX, posY }, ref) => {
    const { windowWidth } = useWindow();

    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const [buttonHover, setButtonHover] = useState<boolean[]>([
      false,
      false,
      false,
    ]);

    const updateButtonHover = (index: number) => {
      setButtonHover((prev) =>
        prev.map((item, i) => (i === index ? !item : item))
      );
    };

    useEffect(() => {
      if (windowWidth < 1200) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    }, [windowWidth]);
    return (
      <>
        <style>
          {`
            @keyframes productsFadeInAnimation {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .productsFadeIn { 
              animation: productsFadeInAnimation 1s ease-in forwards;
            }
            
            .frc-landing__featured-product-section {
                margin-top: calc(100vh + 92px);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 30px;
                padding-top: 122px;
                gap: 30px;
                width: 100%;
                z-index: 1;
                height: 100vh;
                max-height: 100vh;
            }
            .frc-landing__featured-row {
                position: relative;
                display: flex;
                height: 25vh;
                width: calc(100% - 40vw);
                padding-top: 15px;
                padding-bottom: 15px;
            }
            .frc-landing__product-display {
                position: relative;
                height: 28vh;
                width: 28vh;
                min-width: 28vh;
                min-height: 28vh;
            }
            .frc-landing__product-description {
              font-family: 'Oswald', sans-serif;
              font-weight: 400;
              color: ${theme.textColor};
            }
            .frc-landing__product-button-wrapper {
              bottom: 0px;
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
            }
            .no-animate {
              animation: none !important;
            }
            .frc-landing__product-cta-button {
              user-select: none;
              font-family: 'Oswald', sans-serif;
              font-weight: 400;
              color: ${theme.textColor};
              letter-spacing: 0.7px;
              font-size: 18px;
              padding-top: 2px;

              padding-bottom: 1px;
              background-image: linear-gradient(#fff 0 0);
              background-position: 0 100%;
              background-size: 0% 1px;
              background-repeat: no-repeat;
              transition: background-size 0.3s, background-position 0s 0.3s;
              
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 100;
            }
            .frc-landing__product-cta-button-wrapper:hover .frc-landing__product-cta-button {
                background-position: 100% 100%;
                background-size: 100% 1px;
            }
            .frc-landing__product-cta-button-wrapper {
                margin-top: 12px;
                width: 180px;
                height: 60px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                text-shadow: 
                -1px -1px 0 #000,
                1px -1px 0 #000,  
                -1px  1px 0 #000,  
                1px  1px 0 #000;  
            }
            .frc-landing__product-cta-button-wrapper-disabled {
              cursor: not-allowed;
            }
            .frc-landing__product-cta-button-disabled {
              text-shadow: 
              -1px -1px 0 #000,
              1px -1px 0 #000,  
              -1px  1px 0 #000,  
              1px  1px 0 #000;  
            }
            @media only screen and (max-width: 1200px) {
              .frc-landing__product-button-wrapper {
                flex-direction: column;
              }
            }
        `}
        </style>
        <div
          className={`frc-landing__featured-product-section ${
            scrollIndex === 1 ? "productsFadeIn" : ""
          }`}
          ref={ref}
        >
          {assets.products.map((product, index) => {
            return (
              <div
                className="frc-landing__featured-row"
                key={`${product.name}-${index}`}
              >
                <div
                  className="frc-landing__product-button-wrapper"
                  style={{
                    flexDirection:
                      index % 2 !== 0 && isDesktop ? "row-reverse" : "unset",
                  }}
                >
                  <div
                    className="frc-landing__product-display"
                    style={{ marginTop: "-3vh" }}
                  >
                    <ThreeModel
                      onMouseEnter={() => updateButtonHover(index)}
                      onMouseLeave={() => {
                        updateButtonHover(index);
                      }}
                      scrollIndex={scrollIndex}
                      posX={posX}
                      posY={posY}
                      index={index}
                      objectUrl={product.glbUrl}
                      offset={60 * index}
                      scale={0.006}
                    />
                  </div>
                  <button
                    className={`frc-landing__product-cta-button-wrapper ${
                      index !== 2
                        ? ""
                        : "frc-landing__product-cta-button-wrapper-disabled"
                    }`}
                    onClick={() => {
                      if (index !== 2) {
                        window.open(`/products/${index}`, "_self");
                      }
                    }}
                  >
                    <span
                      className={`frc-landing__product-cta-button ${
                        index !== 2
                          ? ""
                          : "frc-landing__product-cta-button-disabled"
                      } ${
                        buttonHover[index] &&
                        "frc-landing__product-cta-button-hovered"
                      }`}
                    >
                      {index !== 2 ? `View Product` : `Coming Soon`}
                    </span>
                  </button>
                </div>
              </div>
            );
            // : (
            //   <div
            //     className="frc-landing__featured-row"
            //     key={`${product.name}-${index}`}
            //   >
            //     <div className="frc-landing__product-button-wrapper">
            //       <div
            //         className="frc-landing__product-display"
            //         style={{ marginTop: "-3vh" }}
            //       >
            //         <ThreeModel
            //           onMouseEnter={() => {
            //             setMobileObjScale(0.005);
            //           }}
            //           onMouseLeave={() => {
            //             setMobileObjScale(0.004);
            //           }}
            //           scrollIndex={scrollIndex}
            //           posX={posX}
            //           posY={posY}
            //           index={index}
            //           objectUrl={product.glbUrl}
            //           offset={60 * index}
            //           scale={}
            //         />
            //       </div>
            //       <button
            //         className={`frc-landing__product-cta-button-wrapper ${
            //           index !== 0
            //             ? "frc-landing__product-cta-button-wrapper-disabled"
            //             : ""
            //         }`}
            //         onClick={() => {
            //           if (index === 0) {
            //             window.open(`/products/${index}`, "_self");
            //           }
            //         }}
            //       >
            //         <span
            //           className={`frc-landing__product-cta-button ${
            //             index !== 0
            //               ? "frc-landing__product-cta-button-disabled"
            //               : ""
            //           }`}
            //         >
            //           {index === 0 ? `View Product` : `Coming Soon`}
            //         </span>
            //       </button>
            //     </div>
            //   </div>
            // );
          })}
        </div>
      </>
    );
  }
);

export default FeaturedProducts;

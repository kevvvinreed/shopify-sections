import ThreeModel from "./ThreeModel";
import React, { forwardRef } from "react";
import hexToRgba from "./util/hexToRGBA";
import theme from "../core/theme";

export interface FeaturedProductsProps {}

const FeaturedProducts = forwardRef<HTMLDivElement, FeaturedProductsProps>(
  ({}, ref) => {
    return (
      <>
        <style>
          {`
            .frc-landing__featured-product-section {
                margin-top: calc(100vh + 92px);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 30px;
                gap: 30px;
                width: 100%;
                background-color: ${theme.primary};
            }
            .frc-landing__featured-product-card {
                position: relative;
                z-index: 2px;
                display: flex;
                justify-content: flex-start;
                height: 270px;
                width: calc(100% - 40px);
                background-color: ${hexToRgba(theme.secondary, 0.8)};
                border: 2px solid ${hexToRgba(theme.accent, 0.8)};
                border-radius: 20px 0px 20px 0px;
                padding-left: 50px;
                padding-top: 15px;
                padding-bottom: 15px;
            }
            .frc-landing__product-display {
                width: 300px;
                height: 100%;
            }
            .frc-landing__product-description {
              font-family: 'Oswald', sans-serif;
              font-weight: 400;
              color: ${theme.textColor};
            }
        `}
        </style>
        <div className="frc-landing__featured-product-section" ref={ref}>
          <div className="frc-landing__featured-product-card">
            <div className="frc-landing__product-display">
              <ThreeModel objectKey="treadmill" />
            </div>
            <p className="frc-landing__product-description">
              Lorem ipsum dolor sit amet. Ad quia impedit et maxime dignissimos
              id tenetur illo nam eveniet internos qui vitae labore. Et quia
              perspiciatis et officia aspernatur eos enim voluptatum!
            </p>
          </div>
          <div className="frc-landing__featured-product-card">
            <div className="frc-landing__product-display">
              <ThreeModel objectKey="treadmill-2" offset={180} />
            </div>
            <p className="frc-landing__product-description">
              Lorem ipsum dolor sit amet. Ad quia impedit et maxime dignissimos
              id tenetur illo nam eveniet internos qui vitae labore. Et quia
              perspiciatis et officia aspernatur eos enim voluptatum!
            </p>
          </div>
          <div className="frc-landing__featured-product-card">
            <div className="frc-landing__product-display">
              {/* <ThreeModel /> */}
            </div>
            <p className="frc-landing__product-description">
              Lorem ipsum dolor sit amet. Ad quia impedit et maxime dignissimos
              id tenetur illo nam eveniet internos qui vitae labore. Et quia
              perspiciatis et officia aspernatur eos enim voluptatum!
            </p>
          </div>
        </div>
      </>
    );
  }
);

export default FeaturedProducts;

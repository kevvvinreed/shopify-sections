import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import assets from "../core/assets";
import { useLocation } from "react-router-dom";
import addToCart from "../core/shopify/addToCart";
import { ISectionProps } from "@/src/index";
import theme from "../core/theme";
import QuantityInput from "./quantityInput";
import useWindow from "../util/useWindow";

const FrcProduct: React.FC<ISectionProps> = ({ store, setStore }) => {
  let location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [sku, setSku] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [productImages, setProductImages] = useState<
    Record<"src", string>[] | undefined
  >(undefined);
  const [productName, setProductName] = useState<string>("");
  const [productCost, setProductCost] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string[]>([""]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (location && location.pathname.includes("/products/")) {
      setSku(location.pathname.replace("/products/", "").split("/")[0]);
    }
  }, [location]);

  useEffect(() => {
    if (sku && sku !== "") {
      setProductImages((assets.products as any)[sku].images);
      setProductName((assets.products as any)[sku].name);
      setProductCost((assets.products as any)[sku].cost);
      setProductDescription((assets.products as any)[sku].description);
    }
  }, [sku]);

  const { windowWidth } = useWindow();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
         
          .frc-product__container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .frc-product__content-container {
            position: relative;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            background: ${theme.gradientBg};
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        
            display: flex;
            flex-direction: row;
            padding-left: 2rem;
            padding-right: 2rem;
            justify-content: center;
            align-items: center;

            border-top: 1px solid ${theme.secondary};
            border-bottom: 1px solid ${theme.secondary};
            padding-top: 92px;
            padding-bottom: 92px;
          }

          .frc-product__selected-image {
            width: 700px;
            height: 700px;
            border-radius: 25px;
          }

          .frc-product__image-preview-col {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .frc-product__image-preview {
            width: 94px;
            height: 94px;
            border-radius: 25px;

            cursor: pointer;
          }
          .frc-product__image-preview-selected {
            width: 100px;
            height: 100px;
            box-sizing: border-box;
            border: 3px solid ${theme.accent};
            margin-top: -3px;
            margin-bottom: -3px;
          }
          .frc-product__carousel-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 15px;
          }
          .frc-product__product-specs {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 4rem;
            padding-right: 4rem;
            gap: 15px;

            max-width: 600px;
          }
          .frc-product__product-title {
            font-family: 'Oswald', sans-serif;
            color: ${theme.textColor};
            text-transform: uppercase;
            text-align: right;
            font-size: 3rem;
            margin: 0;
            line-height: 4rem;

            text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,  
            -1px  1px 0 #000,  
            1px  1px 0 #000;  

            user-select: none;
          }
          .frc-product__product-cost {
            font-family: 'Oswald', sans-serif;
            font-weight: 400;
            color: ${theme.textColor};
            text-transform: uppercase;
            font-size: 1.2rem;
            margin: 0;

            text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000;

            user-select: none;
          }
          .frc-product__product-description {
            font-family: 'Oswald', sans-serif;
            font-weight: 400;
            margin-top: 20px;
            color: ${theme.textColor};
            border-top: 1px solid ${theme.textColor};
            border-bottom: 1px solid ${theme.textColor};
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .frc-product__cta-button-wrapper {
              margin-top: 12px;
              width: 150px;
              height: 60px;
              background-color: ${theme.accent};
              border: none;
              cursor: pointer;
          }
          .frc-product__cta-button {
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
          }
          .frc-product__cta-button-wrapper:hover .frc-product__cta-button {
              background-position: 100% 100%;
              background-size: 100% 1px;
          }
          .frc-product__product-description-break {
            height: 20px;
            width: 100%;
          }

          @media only screen and (max-width: 1550px) {
            .frc-product__selected-image {
              width: 500px;
              height: 500px;
            }
            .frc-product__image-preview {
              width: 81px;
              height: 81px;
            }
          }

          @media only screen and (max-width: 1320px) {
            .frc-product__selected-image {
              width: 500px;
              height: 500px;
            }
            .frc-product__image-preview {
              width: 81px;
              height: 81px;
            }
          }

          @media only screen and (max-width: 1275px) {
            .frc-product__product-specs {
              width: 500px;
            }
          }

          @media only screen and (max-width: 1200px) {
            .frc-product__product-title {
              text-align: center;
            }
            .frc-product__product-specs {
              align-items: center;
            }
            .frc-product__selected-image {
              width: 600px;
              height: 600px;
            }
            .frc-product__image-preview {
              width: 96px;
              height: 96px;
            }

            .frc-product__content-container {
              flex-direction: column;
            }

            .frc-product__image-preview-col {
              flex-direction: row;
            }
            .frc-product__content-container {
              gap: 20px;
              height: auto;
            }
          }
          
          @media only screen and (max-width: 800px) {
            .frc-product__content-container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            .frc-product__selected-image {
              width: 400px;
              height: 400px;
            }
            .frc-product__image-preview {
              width: 74px;
              height: 74px;
            }
          
          }
          @media only screen and (max-width: 550px) {
            .frc-product__content-container {
              padding-left: 0px;
              padding-right: 0px;
            }
          }
          @media only screen and (max-width: 500px) {
            .frc-product__product-description {
              max-width: 300px;
            }
            .frc-product__product-title {
              font-size: 2.5rem;
              line-height: 2.5rem;
            }
            .frc-product__content-container {
              height: 100%;
            }
            .frc-product__selected-image {
              width: 300px;
              height: 300px;
            }
            .frc-product__image-preview {
              width: 61px;
              height: 61px;
            }
          }
        `}
      </style>
      <div className={`frc-product__container`}>
        <Header store={store} setStore={setStore} top={true} />
        <div
          className="frc-product__content-container"
          style={windowWidth < 500 ? { maxWidth: windowWidth } : {}}
        >
          {windowWidth <= 1200 && (
            <div className="frc-product__product-title">{productName}</div>
          )}
          <div className="frc-product__carousel-container">
            <img
              className="frc-product__selected-image"
              src={productImages && productImages[selectedImage].src}
            />
            <div className="frc-product__image-preview-col">
              {productImages &&
                productImages.map(({ src }, index) => {
                  return (
                    <img
                      className={`frc-product__image-preview ${
                        index === selectedImage
                          ? "frc-product__image-preview-selected"
                          : ""
                      }`}
                      key={`frc-product__image-preview-selected-${index}`}
                      src={src}
                      onClick={() => {
                        setSelectedImage(index);
                      }}
                    />
                  );
                })}
            </div>
          </div>

          <div className="frc-product__product-specs">
            {windowWidth > 1200 && (
              <div className="frc-product__product-title">{productName}</div>
            )}

            <button
              ref={buttonRef}
              className={`frc-product__cta-button-wrapper`}
              // style={{ backgroundColor: theme.secondary }}
              onClick={() => {
                addToCart(store, setStore, sku, quantity);
              }}
            >
              <span className="frc-product__cta-button">Add to Cart</span>
            </button>

            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <div className="frc-product__product-cost">{`$${productCost}`}</div>
            <div className="frc-product__product-description">
              {productDescription.map((descItem, index) => {
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
            {/* <button
                ref={buttonRef}
                className={`frc-product__cta-button-wrapper`}
              >
                <span className="frc-product__cta-button">Buy Now</span>
              </button> */}
          </div>
        </div>

        <div className="footer-placeholder"></div>
      </div>
    </>
  );
};

export default FrcProduct;

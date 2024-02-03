import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import assets from "../core/assets";
import { useLocation } from "react-router-dom";
import addToCart from "../core/shopify/addToCart";
import { ISectionProps } from "@/src/index";
import getCheckoutUrl from "../core/shopify/getCheckoutUrl";

const theme = {
  primary: "#121212",
  secondary: "#271d23",
  accent: "#df2935",
  textColor: "#fff",
};

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
  const [productDescription, setProductDescription] = useState<string>("");
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
            position: fixed;
            left: 0px;
            top: 0px;
            display: flex;
            width: 100%;
            height: 100%;
            background: linear-gradient(225deg, rgba(36,36,36,1) 0%, rgba(0,0,0,1) 80%);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        
            display: flex;
            flex-direction: column;
            padding-left: 2rem;
            justify-content: center;
            align-items: center;

            border-top: 1px solid ${theme.secondary};
            border-bottom: 1px solid ${theme.secondary};
          }

          .frc-product__selected-image {
            width: 700px;
            height: 700px;
            border-radius: 25px;
          }

          .frc-product__image-preview-col {
            display: flex;
            flex-direction: column;
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
            gap: 15px;
          }
          .frc-product__product-specs {
            display: flex;
            flex-direction: column;
            padding-left: 60px;
            gap: 15px;

            max-width: 600px;
          }
          .frc-product__product-title {
            font-family: 'Oswald', sans-serif;
            color: ${theme.textColor};
            text-transform: uppercase;
            font-size: 3rem;
            margin: 0;
            line-height: 3rem;
            margin-bottom: 1rem;

            // text-shadow: 
            // -1px -1px 0 #000,
            // 1px -1px 0 #000,  
            // -1px  1px 0 #000,  
            // 1px  1px 0 #000;  

            user-select: none;
          }
          .frc-product__product-cost {
            font-family: 'Oswald', sans-serif;
            font-weight: 400;
            color: ${theme.textColor};
            text-transform: uppercase;
            font-size: 1.2rem;
            margin: 0;

            // text-shadow: 
            // -1px -1px 0 #000,
            // 1px -1px 0 #000,
            // -1px  1px 0 #000,
            // 1px  1px 0 #000;

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
              width: 180px;
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
        `}
      </style>
      <div className={`frc-product__container`}>
        <Header store={store} setStore={setStore} />
        <div className="frc-product__content-container">
          <div className="frc-product__carousel-container">
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

            <img
              className="frc-product__selected-image"
              src={productImages && productImages[selectedImage].src}
            />
            <div className="frc-product__product-specs">
              <div className="frc-product__product-title">{productName}</div>
              <div className="frc-product__product-cost">{`$${productCost}`}</div>
              <div className="frc-product__product-description">
                {productDescription}
              </div>

              <button
                ref={buttonRef}
                className={`frc-product__cta-button-wrapper`}
                style={{ backgroundColor: theme.secondary }}
                onClick={() => {
                  addToCart(store, setStore, sku, quantity);
                }}
              >
                <span className="frc-product__cta-button">Add to Cart</span>
              </button>

              <button
                ref={buttonRef}
                className={`frc-product__cta-button-wrapper`}
              >
                <span className="frc-product__cta-button">Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-placeholder"></div>
      </div>
    </>
  );
};

export default FrcProduct;

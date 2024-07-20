import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import assets from "../core/assets";
import { useLocation } from "react-router-dom";
import addToCart from "../core/shopify/addToCart";
import { ISectionProps } from "@/src/index";
import theme from "../core/theme";
import QuantityInput from "./quantityInput";
import useWindow from "../util/useWindow";
import hexToRgba from "../util/hexToRGBA";
import Info from "../assets/Info";
import Modal from "../layout/Modal";
import { isSafari } from "react-device-detect";

const FrcProduct: React.FC<ISectionProps> = ({
  store,
  setStore,
  modalActive,
  setModalActive,
}) => {
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

  const [modalContent, setModalContent] = useState<{
    productName: string;
    productCost: number;
    productDescription: string[];
  } | null>(null);

  useEffect(() => {
    if (location && location.pathname.includes("/products/")) {
      setSku(location.pathname.replace("/products/", "").split("/")[0]);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < document.documentElement.clientHeight) {
        document.body.style.height = `${window.innerHeight}px`;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "";
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sku && sku !== "") {
      setProductImages((assets.products as any)[sku].images);
      setProductName((assets.products as any)[sku].name);
      setProductCost((assets.products as any)[sku].cost);
      setProductDescription((assets.products as any)[sku].description);
      setModalContent({
        productDescription: (assets.products as any)[sku].description,
        productName: (assets.products as any)[sku].name,
        productCost: (assets.products as any)[sku].cost,
      });
    }
  }, [sku]);

  const { windowWidth } = useWindow();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth && windowWidth > 1200) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowWidth]);

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
            overflow-x: hidden;
          }
          
          .frc-product__content-container {
            position: relative;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            background: ${theme.primary};
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        
            display: flex;
            flex-direction: row;
            padding-left: 2rem;
            padding-right: 2rem;
            align-items: center;
            justify-content: center;

            border-top: 1px solid ${theme.secondary};
            border-bottom: 1px solid ${theme.secondary};
            padding-top: 92px;
            padding-bottom: 92px;
          }

          .frc-product__selected-image {
            border: 1px solid ${theme.textColor};
            width: 700px;
            height: 700px;
            border-radius: 0px;
          }

          .frc-product__image-preview-col {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .frc-product__image-preview {
            width: 94px;
            height: 94px;
            box-sizing: border-box;
            border: 1px solid ${theme.textColor};
            border-radius: 0px;

            cursor: pointer;
          }
          .frc-product__image-preview-selected {
            width: 94px;
            height: 94px;
            box-sizing: border-box;
            border: 2px solid ${theme.accent};
            margin-top: -1px;
            margin-bottom: -1px;
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
            margin-top: 10px;
            color: ${theme.textColor};
            border-top: 1px solid ${theme.textColor};
            border-bottom: 1px solid ${theme.textColor};
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .frc-product__cta-button-wrapper {
            width: 150px;
            height: 50px;
            background-color: ${hexToRgba(theme.accent, 1)};
            border: none;
            cursor: pointer;
            animation: fadeInLeft 0.5s ease-out forwards;
            border: 2px solid ${hexToRgba(theme.secondary, 0.3)};

            user-select: none;
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

              text-shadow: 
              -1px -1px 0 #000,
              1px -1px 0 #000,
              -1px  1px 0 #000,
              1px  1px 0 #000;
          }
          .frc-product__button-price-row {
            gap: 20px;
            display: flex;
            align-items: center;
          }
          .frc-product__button-col {
            display: flex;
            gap: 10px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .frc-product__cta-button-wrapper:hover .frc-product__cta-button {
              background-position: 100% 100%;
              background-size: 100% 1px;
          }
          .frc-product__product-description-break {
            height: 20px;
            width: 100%;
          }
          .frc-product__product-header-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;
          }
          .frc-product__container-mobile {
            overflow: hidden;
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
            .frc-product__product-header-row {
              width: 414px;
            }
            .frc-product__button-price-row {
              width: 414px;
              justify-content: center;
            }
            .frc-product__product-title {
              text-align: center;
            }
            .frc-product__product-specs {
              align-items: center;
            }
            .frc-product__selected-image {
              width: 500px;
              height: 500px;
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
              gap: 10px;
              height: auto;
            }
          }
          
          @media only screen and (max-width: 800px) {
            .frc-product__product-header-row {
              width: 326px;
            }
            .frc-product__product-title {
              font-size: 2.2rem;
              line-height: 2.2rem;
            }
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
            .frc-product__selected-image {
              border-radius: 5px;
            }
  
            .frc-product__image-preview {
              border-radius: 5px;
            }
            .frc-product__content-container {
              padding-left: 0px;
              padding-right: 0px;
            }
          }
          @media only screen and (max-width: 500px) {
            .frc-product__cta-button-wrapper {
              width: 130px;
              height: 40px;
            }
            .frc-product__cta-button {
              font-size: 16px;
            }
            .frc-product__product-header-row {
              width: 274px;
            }
            .frc-product__product-title {
              font-size: 1.8rem;
              line-height: 1.8rem;
            }
            .frc-product__product-info-btn {
              color: ${theme.textColor};
              font-family: 'Oswald', sans-serif;
              font-size: 1rem;
              border: 2px solid ${theme.textColor};
              border-radius: 25px;
              width: 25px;
              height: 25px;
            }
            .frc-product__content-container {
              height: 100%;
            }
            .frc-product__selected-image {
              width: 270px;
              height: 270px;
            }
            .frc-product__image-preview {
              width: 61px;
              height: 61px;
            }
          }
          @media only screen and (max-width: 500px) and (max-height: 800px) {
            .frc-product__content-container {
              justify-content: flex-start;
              padding-top: 75px;
            }
            .frc-product__content-container-safari {
              padding-top: 120px;
            }
          }
        `}
      </style>
      <div className={`frc-product__container`}>
        <Header store={store} setStore={setStore} top={true} scrollIndex={0} />
        <Modal
          active={modalActive}
          setActive={setModalActive}
          content={modalContent}
          isMobile={isMobile}
        />
        <div
          className={`frc-product__content-container ${
            isSafari && "frc-product__content-container-safari"
          }`}
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
            {windowWidth <= 1200 && (
              <div className={`frc-product__product-header-row`}>
                {/* <div className="frc-product__product-info-btn">i</div> */}
                {/* <Info
                  width={"28px"}
                  height={"28px"}
                  onClick={() => {
                    setModalActive((p) => !p);
                  }}
                /> */}
              </div>
            )}
            <div className={`frc-product__button-price-row`}>
              {/* <div className={`frc-product__button-col`}> */}
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
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
              {/* </div> */}
              {windowWidth > 1200 && (
                <div className="frc-product__product-cost">{`$${productCost}`}</div>
              )}
            </div>

            {windowWidth > 1200 && (
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
            )}
          </div>
        </div>

        <div className="footer-placeholder"></div>
      </div>
    </>
  );
};

export default FrcProduct;

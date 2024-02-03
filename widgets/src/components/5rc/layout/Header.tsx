import { ISectionProps } from "@/src/index";
import assets from "../core/assets";
import config from "../core/config";
import getCheckoutUrl from "../core/shopify/getCheckoutUrl";
import { useEffect, useState } from "react";

const Header: React.FC<ISectionProps> = ({ store, setStore }) => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  useEffect(() => {
    console.log({ store });
    if (store.cartQuantity !== null && cartQuantity !== store.cartQuantity) {
      setCartQuantity(store.cartQuantity);
    }
  }, [store]);
  return (
    <>
      <style>
        {`
            .frc-landing__header-container {
                position: fixed;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 40px;
                top: 0px;
                left: 0px;
                width: 100%;
                height: ${config.headerHeight}px;
            }
            .frc-landing__header-home-icon {
                width: 80px;
                cursor: pointer;
            }
            .frc-landing__header-home-icon:hover {
                filter: brightness(90%);
            }
            .frc-landing__header-right-tray {
                padding-right: 40px;
                display: flex;
            }
            .frc-landing__header-cart-icon {
                width: 35px;
                height: 35px;
                color: #fff;
                cursor: pointer;
            }
            .frc-landing__header-cart-icon:hover {
                filter: brightness(90%);
            }
        `}
      </style>
      <div className="frc-landing__header-container">
        <img
          className="frc-landing__header-home-icon"
          src={assets.nav.transparentLogoWhite}
          onClick={() => {
            window.open("/", "_self");
          }}
        />
        <div className="frc-landing__header-right-tray">
          <img
            className="frc-landing__header-cart-icon"
            src={assets.nav.cart}
            onClick={async () => {
              const checkoutUrl = await getCheckoutUrl(store);
              window.open(checkoutUrl, "_self");
            }}
          />

          {cartQuantity > 0 && (
            <div
              style={{
                color: "white",
                background: "rgba(255, 0, 0, 0.6)",
                borderRadius: 50,
                width: 23,
                height: 23,
                lineHeight: 23,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 22,
                marginLeft: 15,
                fontFamily: "Oswald",
                fontSize: 15,
              }}
            >
              {cartQuantity}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

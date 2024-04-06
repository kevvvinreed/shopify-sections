import { IAppStore, ISectionProps } from "@/src/index";
import assets from "../core/assets";
import config from "../core/config";
import getCheckoutUrl from "../core/shopify/getCheckoutUrl";
import { useEffect, useState } from "react";

export interface HeaderProps {
  store: IAppStore;
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>;
  scrollIndex: number;
  top?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  store,
  setStore,
  top,
  scrollIndex,
}) => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const navItemStyle = {
    filter: scrollIndex > 0 ? "brightness(0%)" : "brightness(100%)",
    transition: `filter ${config.scrollAnimationTimingMs}ms ease-in`,
  };

  useEffect(() => {
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
            }
            .frc-header__cart-button:hover .frc-landing__header-cart-icon {
                filter: brightness(90%);
            }
            .frc-header__cart-quantity {
              color: white;
              background: rgba(255, 0, 0, 0.6);
              border-radius: 50px;
              width: 23px;
              height: 23px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 22px;
              margin-left: 15px;
              font-family: 'Oswald', sans-serif;
              font-size: 15px;
              line-height: 23px;
            }
            .frc-header__cart-button {
              user-select: none;
              cursor: pointer;
            }
        `}
      </style>
      <div
        className="frc-landing__header-container"
        style={top ? { position: "absolute" } : {}}
      >
        <img
          className={`frc-landing__header-home-icon`}
          // style={navItemStyle}
          src={assets.nav.transparentLogoWhite}
          onClick={() => {
            window.open("/", "_self");
          }}
        />
        <div
          className="frc-landing__header-right-tray"
          onClick={async () => {
            let checkoutUrl = await getCheckoutUrl(store);
            checkoutUrl = window.location.origin.includes("127.0.0.1")
              ? checkoutUrl
              : checkoutUrl.replace(
                  "https://266823-3.myshopify.com",
                  window.location.origin
                );
            window.open(checkoutUrl, "_self");
          }}
        >
          <div
            className={`frc-header__cart-button`}
            // style={navItemStyle}
          >
            <img
              className="frc-landing__header-cart-icon"
              src={assets.nav.cart}
            />

            {cartQuantity > 0 && (
              <div className="frc-header__cart-quantity">{cartQuantity}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

import { useNavigate } from "react-router-dom";
import assets from "../core/assets";
import config from "../core/config";

const Header = () => {
  let nav = useNavigate();
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
          onClick={() => nav("/")}
        />
        <div className="frc-landing__header-right-tray">
          <img
            className="frc-landing__header-cart-icon"
            src={assets.nav.cart}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

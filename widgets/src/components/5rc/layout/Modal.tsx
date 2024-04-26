import { useEffect } from "react";
import theme from "../core/theme";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  content: {
    productName: string;
    productCost: number;
    productDescription: string[];
  } | null;
}
const Modal: React.FC<ModalProps> = ({ active, setActive, content }) => {
  return (
    <>
      {active && (
        <>
          <style>
            {`
            .frc-layout__modal-root {
                position: absolute;
                z-index: 999999999;
                top: 0px;
                left: 0px;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
            }
            .frc-layout__modal-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                
                background-color: ${theme.primary};
                border: 1px solid ${theme.textColor};
                padding-top: 40px;
                padding: 20px;
                border-radius: 5px;

                display: flex;
                flex-direction: column;
                overflow-y: auto;
                align-items: center;
                justify-content: center;
                height: 75%;
                width: 75%;
            }
        `}
          </style>
          <div
            className="frc-layout__modal-root"
            onClick={() => {
              setActive(false);
            }}
          >
            <div
              className="frc-layout__modal-container"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {content && (
                <>
                  <div className="frc-product__product-title">
                    {content.productName}
                  </div>

                  <div className="frc-product__product-description">
                    {content.productDescription.map((descItem, index) => {
                      if (index > 0) {
                        return (
                          <>
                            <div
                              key={`${descItem}-${index}-break`}
                              className="frc-product__product-description-break"
                            />
                            <span key={`${descItem}-${index}`}>{descItem}</span>
                          </>
                        );
                      }
                      return (
                        <span key={`${descItem}-${index}`}>{descItem}</span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

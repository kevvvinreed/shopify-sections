import { useEffect } from "react";
import theme from "../../core/theme";
import { isMobile } from "react-device-detect";
interface IQuanityInput {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput: React.FC<IQuanityInput> = ({ quantity, setQuantity }) => {
  const handleChange = (input: number, keypress: boolean) => {
    let max = 99;
    let min = 1;

    if (input > max) {
      if (keypress) {
        const stringInput = input.toString();
        input = parseInt(stringInput[stringInput.length - 1]);
      } else {
        input = max;
      }
    } else if (input < min) {
      input = min;
    }

    setQuantity(input);
  };

  useEffect(() => {
    if (isMobile) {
      const buttons = document.querySelectorAll(
        ".frc-product__button-up, .frc-product__button-down"
      );
      buttons.forEach((button) => {
        button.classList.add("frc-product__button-mobile");
      });
    }
  }, []);

  return (
    <>
      <style>
        {`
            .frc-product__amountContainer {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .frc-product__button-down {
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
            
                width: 50px;
                height: 50px;
                border: 1px solid ${theme.textColor};
                border-right: none;
            
                color: ${theme.textColor};
                font-style: bold;
                font-size: 20px;
                font-family: 'Oswald', sans-serif;
            
                cursor: pointer;
                user-select: none;
            }
            .frc-product__button-up {
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;

                width: 50px;
                height: 50px;
                
                border: 1px solid ${theme.textColor};
                border-left: none;

                color: ${theme.textColor};
                font-style: bold;
                font-size: 20px;
                font-family: 'Oswald', sans-serif;

                cursor: pointer;
                user-select: none;
                pointer-events: auto;
            }
                
            .frc-product__button-down:hover,
            .frc-product__button-up:hover {
                background-color: ${theme.accent};
            }

            .frc-product__button-mobile:hover {
              background-color: unset;
            }
                
            .frc-product__button-down:active,
            .frc-product__button-up:active {
                background-color: ${theme.accent};
            }

            
            .frc-product__amountInput[type="number"] {
                border-radius: 0;
                -moz-appearance: textfield;
            }
            .frc-product__amountInput::-webkit-outer-spin-button,
            .frc-product__amountInput::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            .frc-product__amountInput {
                outline: none;
                background-color: rgb(0, 0, 0, 0);
                border-top: 1px solid ${theme.textColor};
                border-bottom: 1px solid ${theme.textColor};
                border-left: none;
                border-right: none;
                text-align: center;
                font-size: 20px;
                font-family: 'Oswald', sans-serif;
            
                color: ${theme.textColor};
            
                width: 50px;
                height: 50px;
                user-select: none;
            }

            @media only screen and (max-width: 500px) {
              .frc-product__amountContainer {
                width: 130px;
                height: 40px;
              }
              .frc-product__button-up {
                width: 40px;
                height: 40px;
              }
              .frc-product__button-down {
                width: 40px;
                height: 40px;
              }
              .frc-product__amountInput {
                width: 40px;
                height: 40px;
              }
            }
        `}
      </style>
      <div className="frc-product__amountContainer">
        <span
          className="frc-product__button-down"
          onClick={() => {
            handleChange(quantity - 1, false);
          }}
        >
          {`-`}
        </span>
        <input
          className="frc-product__amountInput"
          value={quantity}
          type="number"
          onChange={(e) => handleChange(parseInt(e.target.value), true)}
        />
        <span
          className="frc-product__button-up"
          onClick={() => {
            handleChange(quantity + 1, false);
          }}
        >
          {`+`}
        </span>
      </div>
    </>
  );
};

export default QuantityInput;

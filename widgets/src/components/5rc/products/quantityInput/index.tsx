import theme from "../../core/theme";
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
            }
            .frc-product__button-up:hover {
                background-color: ${theme.accent};
                // color: ${theme.accent};
                // border-color: ${theme.accent};
            }
            
            .frc-product__button-down:hover {
                background-color: ${theme.accent};
                // color: ${theme.accent};
                // border-color: ${theme.accent};
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

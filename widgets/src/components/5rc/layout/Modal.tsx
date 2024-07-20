import React, { useEffect, useState, useRef } from "react";
import theme from "../core/theme";
import { getCookie, setCookie } from "../core/manageCookies";
import assets from "../core/assets";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  requireCheckbox?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  children,
  requireCheckbox = false,
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [highlight, setHighlight] = useState<boolean>(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    return new Promise<void>((resolve) => {
      if (modalContentRef.current) {
        const element = modalContentRef.current;
        const checkIfScrolledToBottom = () => {
          if (
            element.scrollTop + element.clientHeight >=
            element.scrollHeight
          ) {
            element.removeEventListener("scroll", checkIfScrolledToBottom);
            resolve();
          }
        };
        element.addEventListener("scroll", checkIfScrolledToBottom);
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });

        // Fallback in case the scroll event doesn't fire as expected
        setTimeout(() => {
          element.removeEventListener("scroll", checkIfScrolledToBottom);
          resolve();
        }, 1000);

        // Initial check
        checkIfScrolledToBottom();
      } else {
        resolve();
      }
    });
  };

  useEffect(() => {
    const handleOutsideClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("modal-overlay")) {
        if (requireCheckbox && !isCheckboxChecked) {
          setShake(true);
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for shake to complete
          setShake(false);
          await scrollToBottom();
          setHighlight(true);
          setTimeout(() => setHighlight(false), 500);
        } else {
          closeAndAccept();
        }
      }
    };

    if (active) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [active, setActive, requireCheckbox, isCheckboxChecked]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleCloseClick = async () => {
    if (requireCheckbox && !isCheckboxChecked) {
      setShake(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for shake to complete
      setShake(false);
      await scrollToBottom();
      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);
    } else {
      closeAndAccept();
    }
  };

  const closeAndAccept = () => {
    setAcceptedTerms(true);
    setActive(false);
    setCookie("accepted_terms", assets.terms.version, 365);
  };

  useEffect(() => {
    const accepted_terms = getCookie("accepted_terms");
    if (accepted_terms === assets.terms.version) {
      console.log("terms already accepted");
      setAcceptedTerms(true);
    }
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999999999;
          }
          .modal-content {
            position: relative;
            background-color: ${theme.primary};
            color: ${theme.textColor};
            font-family: 'Oswald', sans-serif;
            border: 1px solid ${theme.textColor};
            width: 100%;
            height: 100%;
            max-width: 50vw;
            max-height: 65vh;
            z-index: 10000000000;
            overflow-y: auto;
            padding: 0 20px 20px 20px;
            ${shake ? "animation: shake 0.5s;" : ""}
          }
          .modal-header {
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: ${theme.primary};
            color: ${theme.textColor};
            display: flex;
            align-items: center;
            justify-content: flex-end;
            z-index: 1001;
          }
          .close-button {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: ${theme.textColor};
            cursor: pointer;
          }
          .close-button:disabled {
            cursor: not-allowed;
            color: ${theme.textColor};
          }
          .tos-checkbox label {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${highlight ? `${theme.accent}` : `${theme.textColor}`};
            cursor: pointer;
          }
          .tos-checkbox input[type="checkbox"] {
            cursor: pointer;
          }
          .line-padding {
            width: 100%;
            height: 10px;
          }
          @media only screen and (max-width: 1200px) {
            .modal-content {
                max-width: 70vw;
            }
          }
          @media only screen and (max-width: 800px) {
            .modal-content {
                max-width: 80vw;
            }
          }
        `}
      </style>
      {active && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalContentRef}>
            <div className="modal-header">
              <button className="close-button" onClick={handleCloseClick}>
                &times;
              </button>
            </div>
            <h1 style={{ textAlign: "center" }}>Terms and Conditions</h1>
            {children}
            <div className="line-padding" />
            {requireCheckbox && (
              <div className="tos-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  />
                  I agree to the terms and conditions
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

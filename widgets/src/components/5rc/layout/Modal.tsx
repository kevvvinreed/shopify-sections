import React, { useEffect } from "react";
import theme from "../core/theme";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("modal-overlay")) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [active, setActive]);

  return (
    <>
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
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
            padding: 20px;
            width: 100%;
            height: 100%;
            max-width: 80vw;
            max-height: 60vh;
            z-index: 10000000000;
            overflow-y: auto;
          }
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: ${theme.textColor};
            cursor: pointer;
          }
        `}
      </style>
      {active && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setActive(false)}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

import { useEffect } from "react";
import CloseIcon from "../../images/close.svg";

function InfoTooltip({ isOpen, onClose, message, linkText, onLinkClick }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__content" role="dialog" aria-modal="true">
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="" className="popup__close-icon" />
        </button>
        <h2 className="popup__title popup__title_type_info">{message}</h2>
        <p className="popup__alt">
          <button
            className="popup__alt-button"
            type="button"
            onClick={onLinkClick}
          >
            {linkText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
import { useEffect } from "react";
import CloseIcon from "../../images/close.svg";

function PopupWithForm({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  altText,
  onAltClick,
}) {
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
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="" className="popup__close-icon" />{" "}
          
        </button>

        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
        </form>
        <p className="popup__alt">
          or{" "}
          <button
            className="popup__alt-button"
            type="button"
            onClick={onAltClick}
          >
            {altText}
          </button>
        </p>
      </div>
    </div>
  );
}
export default PopupWithForm;

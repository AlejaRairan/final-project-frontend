import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register({ onRegister, isOpen, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister?.(email, password);
  };

return (
    <PopupWithForm                    
      isOpen={isOpen}
      title="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      altText="Sign in"
      onAltClick={onSwitch}
    >
      <div className="register__field">
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="register__field">
        <input
          type="password"
          className="register__input"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="register__button">
        Sign up
      </button>
    </PopupWithForm>
  );
};
export default Register;

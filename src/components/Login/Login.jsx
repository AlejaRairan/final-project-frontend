import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";   // NUEVO: faltaba el import

function Login({ isOpen, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // la llamada a la API irá aquí en la siguiente etapa
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}          
      altText="Sign up"
      onAltClick={onSwitch}
    >
      <div className="login__field">
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login__field">
        <input
          type="password"
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="login__button">
        Sign in
      </button>
    </PopupWithForm>
  );
}

export default Login;
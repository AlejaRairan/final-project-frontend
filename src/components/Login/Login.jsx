import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import "./login.css";

function Login({ isOpen, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
          name="email"
          autoComplete="email"
          aria-label="Email"
          className="login__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__field">
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          aria-label="Password"
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login__button">
        Sign in
      </button>
    </PopupWithForm>
  );
}

export default Login;

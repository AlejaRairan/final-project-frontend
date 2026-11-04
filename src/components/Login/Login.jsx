import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormValidation } from "../../hooks/useFormValidation"; 
import "./login.css";

function Login({ isOpen, onClose, onSwitch, onLogin, submitError }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({ email: "", password: "" });

  const handleClose = () => { 
    resetForm();
    onClose();
  };

  const handleSwitch = () => { 
    resetForm();
    onSwitch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password); 
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Sign in"
      onClose={handleClose} 
      onSubmit={handleSubmit}
      altText="Sign up"
      onAltClick={handleSwitch} 
    >
      <div className="login__field">
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email"
          className="login__input"
          placeholder="Email"
          value={values.email || ""} 
          onChange={handleChange} 
          required
        />
        <span className="login__error">{errors.email}</span> 
      </div>
      <div className="login__field">
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          aria-label="Password"
          className="login__input"
          placeholder="Password"
          value={values.password || ""} 
          onChange={handleChange} 
          minLength={8} 
          required
        />
        <span className="login__error">{errors.password}</span> 
      </div>
      {submitError && <span className="login__error">{submitError}</span>} 
      <button type="submit" className="login__button" disabled={!isValid}> 
        Sign in
      </button>
    </PopupWithForm>
  );
}

export default Login;
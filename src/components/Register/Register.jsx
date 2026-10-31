import { useFormValidation } from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import "./register.css";

function Register({ onRegister, isOpen, onClose, onSwitch, submitError }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({ email: "", password: "", name: "" });

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
    onRegister(values.email, values.password, values.name).then((ok) => {
      if (ok) resetForm();
    });
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Sign up"
      onClose={handleClose}
      onSubmit={handleSubmit}
      altText="Sign in"
      onAltClick={handleSwitch}
    >
      <div className="register__field">
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email"
          className="register__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="register__error">{errors.email}</span>
      </div>
      <div className="register__field">
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          aria-label="Create password"
          className="register__input"
          placeholder="Create Password"
          value={values.password || ""}
          onChange={handleChange}
          minLength={8}
          required
        />
        <span className="register__error">{errors.password}</span>
      </div>

      <div className="register__field">
        <input
          type="text"
          name="name"
          autoComplete="name"
          aria-label="Create name"
          className="register__input"
          placeholder="Create Name"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
        <span className="register__error">{errors.name}</span>
      </div>

      {submitError && <span className="register__error">{submitError}</span>}
      <button type="submit" className="register__button" disabled={!isValid}>
        Sign up
      </button>
    </PopupWithForm>
  );
}

export default Register;

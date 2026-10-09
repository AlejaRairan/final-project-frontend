import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import SavedCountries from "../SavedCountries/SavedCountries.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const closeModal = () => setActiveModal(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="page">
       <Header
      theme="light"
      isLoggedIn={isLoggedIn}
      userName="Aleja"
      onSignInClick={() => setActiveModal("signin")}
      onLogout={() => setIsLoggedIn(false)}
    />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-countries" element={<SavedCountries />} />
      </Routes>
      <Footer />
      <Login
        isOpen={activeModal === "signin"}
        onClose={closeModal}
        onSwitch={() => setActiveModal("signup")}
      />
      <Register
        isOpen={activeModal === "signup"}
        onClose={closeModal}
        onSwitch={() => setActiveModal("signin")}
      />
    </div>
  );
}

export default App;

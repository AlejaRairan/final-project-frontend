import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Header from "../Header/Header.jsx";
import SavedCountries from "../SavedCountries/SavedCountries.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import CountryPage from "../CountryPage/CountryPage.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const closeModal = () => setActiveModal(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [savedCountries, setSavedCountries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedCountries")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
    } catch {
      
    }
  }, [savedCountries]);

  const handleToggleSave = (country) => {
    if (!isLoggedIn) {
      setActiveModal("signin");
      return;
    }
    setSavedCountries((prev) =>
      prev.some((c) => c.name === country.name)
        ? prev.filter((c) => c.name !== country.name)
        : [...prev, country],
    );
  };

  const handleRemoveSaved = (name) =>
    setSavedCountries((prev) => prev.filter((c) => c.name !== name));

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
        <Route
          path="/search"
          element={
            <SearchResults
              savedCountries={savedCountries}
              onToggleSave={handleToggleSave}
            />
          }
        />
        <Route path="/country/:name" element={<CountryPage />} />
        <Route
          path="/saved-countries"
          element={
            <SavedCountries
              savedCountries={savedCountries}
              onRemove={handleRemoveSaved}
            />
          }
        />
      </Routes>
      <Footer />
      <ScrollToTop />
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

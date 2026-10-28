import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";                    
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Header from "../Header/Header.jsx";
import SavedCountries from "../SavedCountries/SavedCountries.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import CountryPage from "../CountryPage/CountryPage.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import { searchCountries } from "../../utils/countriesApi";            
import { ERROR_MESSAGE } from "../../utils/constants";                 
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const closeModal = () => setActiveModal(null);

  const [searchData, setSearchData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("searchData"));
      return saved && Array.isArray(saved.results)
        ? saved
        : { query: "", results: [] };
    } catch {
      return { query: "", results: [] };
    }
  });
  const [isLoading, setIsLoading] = useState(false);                   
  const [searchError, setSearchError] = useState(null);                 
  const requestRef = useRef(null);                                     

  useEffect(() => {
    try {
      localStorage.setItem("searchData", JSON.stringify(searchData));
    } catch {
      // sin almacenamiento disponible: se ignora
    }
  }, [searchData]);

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
      // sin almacenamiento disponible: se ignora
    }
  }, [savedCountries]);

  function handleSearch(query) {                                        
    if (requestRef.current === query) return;
    if (searchData.query === query) return;
    requestRef.current = query;
    setIsLoading(true);
    setSearchError(null);
    searchCountries(query)
      .then((results) => {
        if (requestRef.current === query) setSearchData({ query, results });
      })
      .catch(() => {
        if (requestRef.current === query) setSearchError(ERROR_MESSAGE);
      })
      .finally(() => {
        if (requestRef.current === query) {
          requestRef.current = null;
          setIsLoading(false);
        }
      });
  }

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
        <Route path="/" element={<Main onSearch={handleSearch} />} />   
        <Route
          path="/search"
          element={
            <SearchResults
              savedCountries={savedCountries}
              onToggleSave={handleToggleSave}
              isLoggedIn={isLoggedIn}
              searchData={searchData}
              isLoading={isLoading}                                  
              error={searchError}                                       
              onSearch={handleSearch}                                   
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
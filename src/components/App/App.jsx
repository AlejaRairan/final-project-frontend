import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as mainApi from "../../utils/MainApi";
import { searchCountries } from "../../utils/countriesApi";
import { ERROR_MESSAGE } from "../../utils/constants";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [authError, setAuthError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedToLogin = location.state?.openSignin === true;

  const clearRedirectState = () => {
    if (redirectedToLogin) {
      navigate(location.pathname, { replace: true, state: null });
    }
  };
  const openModal = (name) => {
    clearRedirectState();
    setActiveModal(name);
  };

  const closeModal = () => {
    clearRedirectState();
    setActiveModal(null);
    setAuthError("");
  };

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

  
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    Promise.all([
      mainApi.getCurrentUser(token),
      mainApi.getSavedCountries(token),
    ])
      .then(([user, countries]) => {
        setCurrentUser(user);
        setSavedCountries(countries);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

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
      openModal("signin");
      return;
    }
    const token = localStorage.getItem("jwt");
    const alreadySaved = savedCountries.find((c) => c.name === country.name);

    if (alreadySaved) {
      mainApi
        .deleteCountry(alreadySaved._id, token)
        .then(() =>
          setSavedCountries((prev) =>
            prev.filter((c) => c._id !== alreadySaved._id),
          ),
        )
        .catch((err) => console.error(err));
      return;
    }

    
    const { name, capital, region, flag, landscape, description } = country;
    mainApi
      .saveCountry(
        { name, capital, region, flag, landscape, description },
        token,
      )
      .then((newCountry) => setSavedCountries((prev) => [...prev, newCountry]))
      .catch((err) => console.error(err));
  };

  const handleRegister = (email, password, name) => {
    setAuthError("");
    return mainApi
      .register(email, password, name)
      .then(() => {
        setActiveModal("success");
        return true;
      })
      .catch((err) => {
        setAuthError(err.message);
        return false;
      });
  };

  // CAMBIO: al iniciar sesión también carga los países guardados
  const handleLogin = (email, password) => {
    setAuthError("");
    return mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        return Promise.all([
          mainApi.getCurrentUser(token),
          mainApi.getSavedCountries(token),
        ]);
      })
      .then(([user, countries]) => {
        setCurrentUser(user);
        setSavedCountries(countries);
        setIsLoggedIn(true);
        closeModal();
        return true;
      })
      .catch((err) => {
        setAuthError(err.message);
        return false;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", email: "" });
    setSavedCountries([]); 
    navigate("/");
  };

  
  const handleRemoveSaved = (name) => {
    const country = savedCountries.find((c) => c.name === name);
    if (!country) return;
    mainApi
      .deleteCountry(country._id, localStorage.getItem("jwt"))
      .then(() =>
        setSavedCountries((prev) => prev.filter((c) => c._id !== country._id)),
      )
      .catch((err) => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          theme="light"
          isLoggedIn={isLoggedIn}
          onSignInClick={() => openModal("signin")}
          onLogout={handleLogout}
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
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isCheckingAuth={isCheckingAuth}
              >
                <SavedCountries
                  savedCountries={savedCountries}
                  onRemove={handleRemoveSaved}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <ScrollToTop />

        <Login
          isOpen={activeModal === "signin" || redirectedToLogin}
          onClose={closeModal}
          onSwitch={() => {
            setAuthError("");
            openModal("signup");
          }}
          onLogin={handleLogin}
          submitError={authError}
        />
        <Register
          isOpen={activeModal === "signup"}
          onClose={closeModal}
          onSwitch={() => {
            setAuthError("");
            openModal("signin");
          }}
          onRegister={handleRegister}
          submitError={authError}
        />
        <InfoTooltip
          isOpen={activeModal === "success"}
          onClose={closeModal}
          message="Registration successfully completed!"
          linkText="Sign in"
          onLinkClick={() => openModal("signin")}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
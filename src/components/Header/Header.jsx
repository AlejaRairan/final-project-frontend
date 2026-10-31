import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./header.css";
function Header({ isLoggedIn, onSignInClick, onLogout, theme = "light", ...navProps }) {
  return (
    <header className={`header header_theme_${theme}`}>
      <Link className="header__logo" to="/">
        CountriesExplorer
      </Link>
      <Navigation
        theme={theme}
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
        {...navProps}
      />
    </header>
  );
}
export default Header;

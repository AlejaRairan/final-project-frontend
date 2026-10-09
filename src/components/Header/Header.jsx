import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, userName, onSignInClick, onLogout, theme = "light", ...navProps }) {
  return (
    <header className={`header header_theme_${theme}`}>
      <Link className="header__logo" to="/">
        CountriesExplorer
      </Link>
      <Navigation
        theme={theme}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
        {...navProps}
      />
    </header>
  );
}
export default Header;

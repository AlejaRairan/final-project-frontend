import { NavLink } from "react-router-dom";
import logout from "../../images/logout.svg";
import "./navigation.css";

function Navigation({ theme = "light", isLoggedIn, userName, onSignInClick, onLogout }) {
  const linkClass = ({ isActive }) =>
    `navigation__link navigation__link_theme_${theme} ${
      isActive ? "navigation__link_active" : ""
    }`;

  return (
    <nav className="navigation">
      <NavLink className={linkClass} to="/" end>
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink className={linkClass} to="/saved-countries">
            Saved Countries
          </NavLink>
          <button className="navigation__button" type="button" onClick={onLogout}>
            {userName}
            <img src={logout} alt="Logout" className="navigation__icon" />
          </button>
        </>
      ) : (
        <button className="navigation__button" type="button" onClick={onSignInClick}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
import { NavLink } from "react-router-dom";
import logout from "../../images/logout.svg";

function Navigation({ isLoggedIn, userName, onSignInClick, onLogout }) {
  return (
    <nav className="navigation">
      <NavLink className="navigation__link" to="/">Home</NavLink>

      {isLoggedIn ? (
        <>
          <NavLink className="navigation__link" to="/saved-news">Saved places</NavLink>
          <button className="navigation__button" type="button" onClick={onLogout}>
            {userName}
            <img src={logout} alt="Logout" />
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
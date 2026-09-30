import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ theme = "dark", ...navProps }) {
  return (
    <header className={`header header_theme_${theme}`}>
      <Link className="header__logo" to="/">NewsExplorer</Link>
      <Navigation {...navProps} />
    </header>
  );
}
export default Header;

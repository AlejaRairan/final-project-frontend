import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ ...navProps }) {
  return (
    <header className="header">
      <Link className="header__link" to="/">CountriesExplorer</Link>
      <Navigation {...navProps} />
    </header>
  );
}
export default Header;

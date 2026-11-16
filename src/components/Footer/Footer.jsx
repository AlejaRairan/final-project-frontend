import Github from "../../images/github.svg";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by CountriesExplorer</p>
      <ul className="footer__links">
        <li>
          <Link className="footer__link" to="/" onClick={scrollToTop}>
            Home
          </Link>
        </li>
        <li className="footer__link-github">
          <a
            href="https://github.com/AlejaRairan"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} alt="GitHub" className="footer__link-icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

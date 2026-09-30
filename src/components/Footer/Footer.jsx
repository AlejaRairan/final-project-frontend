import Github from "../../images/github.svg";

function Footer() {
  return <footer className="footer">
    <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
    <ul className="footer__links">
      <li><Link className="footer__link" to="/">Home</Link></li>
      <li className="footer__link-github">
        <a href="https://github.com/AlejaRairan" target="_blank" rel="noreferrer">
        <img src={Github} alt="GitHub" className="footer__link-icon" />
        </a>
      </li>
    </ul>
  </footer>;
}

export default Footer;
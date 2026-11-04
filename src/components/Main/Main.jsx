import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import "./Main.css";

function Main({ onSearch }) {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__subtitle">
            Find the most interesting countries and their information.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </section>
      <About />
    </main>
  );
}

export default Main;
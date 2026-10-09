import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import "../../blocks/main.css";

function Main() {
  return (
    <main className="main">
      <div className="hero">
        <section className="hero__content">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__subtitle">
            Find the most interesting countries and their information.
          </p>
          <SearchForm />
        </section>
      </div>
      <About />
    </main>
  );
}

export default Main;
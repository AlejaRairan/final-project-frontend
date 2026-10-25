import CountryCard from "../CountryCard/CountryCard.jsx";
import "./savedCountries.css";

function SavedCountries({ savedCountries, onRemove }) {
  return (
    <section className="countries">
      <section className="countries__intro">
        <p className="countries__label">Saved countries</p>
        <h1 className="countries__title">
          You have {savedCountries.length} saved{" "}
          {savedCountries.length === 1 ? "country" : "countries"}
        </h1>
      </section>

      {savedCountries.length > 0 ? (
        <ul className="countries__grid">
          {savedCountries.map((country) => (
            <li key={country.name} className="countries__item">
              <CountryCard country={country} onRemove={onRemove} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="countries__empty">
          Nothing here yet. Search for a country and save the ones you want to
          visit.
        </p>
      )}
    </section>
  );
}

export default SavedCountries;

import { useContext } from "react"; // CAMBIO
import CountryCard from "../CountryCard/CountryCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./savedCountries.css";

function getRegionsText(countries) {
  const counts = {};
  countries.forEach((c) => {
    counts[c.region] = (counts[c.region] || 0) + 1;
  });
  const regions = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  if (regions.length <= 3) return regions.join(", ");
  return `${regions.slice(0, 2).join(", ")}, and ${regions.length - 2} more`;
}

function SavedCountries({ savedCountries, onRemove }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="countries">
      <section className="countries__intro">
        <p className="countries__label">Saved countries</p>

        <h1 className="countries__title countries__title_type_saved">
          {currentUser.name}, you have {savedCountries.length} saved{" "}
          {savedCountries.length === 1 ? "country" : "countries"}
        </h1>

        {savedCountries.length > 0 && (
          <p className="countries__regions">
            By regions:{" "}
            <strong className="countries__regions-list">
              {getRegionsText(savedCountries)}
            </strong>
          </p>
        )}
      </section>

      {savedCountries.length > 0 ? (
        <ul className="countries__grid">
          {savedCountries.map((country) => (
            <li key={country._id || country.name} className="countries__item">
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

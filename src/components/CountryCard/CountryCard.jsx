import React from "react";
import CloseIcon from "../../images/close.svg";
function CountryCard({ country, onRemove }) {
  return (
    <article className="country__card">
      <img
        className="country__card-image"
        src={country.landscape}
        alt={`Image of ${country.name}`}
      />
      <div className="country__card-info">
        <h3 className="country__card-name">{country.name}</h3>
        <p className="country__card-text">Capital: {country.capital}</p>
        <p className="country__card-text">Region: {country.region}</p>
        <img
          className="country__card-flag"
          src={country.flag}
          alt={`Flag of ${country.name}`}
        />
      </div>
      <button
        className="country__card-remove"
        type="button"
        aria-label={`Remove ${country.name} from saved`}
        onClick={() => onRemove(country.name)}
      >
        <img src={CloseIcon} alt="" className="popup__close-icon" />{" "}
      </button>
    </article>
  );
}

export default CountryCard;
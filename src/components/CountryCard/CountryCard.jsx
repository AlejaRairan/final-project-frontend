import { Link } from "react-router-dom";
import deleteIcon from "../../images/deleteIcon.svg";
import "./countryCard.css";

function CountryCard({
  country,
  onRemove,
  onSave,
  isSaved = false,
  isLoggedIn = true,
}) {
  const saveLabel = !isLoggedIn
    ? "Sign in to save countries"
    : isSaved
      ? "Remove from saved"
      : "Save country";

  return (
    <article className="country__card">
      {country.landscape ? (
        <img
          className="country__card-image"
          src={country.landscape}
          alt={`Image of ${country.name}`}
        />
      ) : (
        <div className="country__card-image country__card-image_empty" />
      )}

      <div className="country__card-info">
        <div className="country__card-details">
          <h3 className="country__card-name">
            <Link to={`/country/${encodeURIComponent(country.name)}`}>
              {country.name}
            </Link>
          </h3>
          <p className="country__card-text">{country.capital}</p>
        </div>

        {country.flag && ( 
          <img
            className="country__card-flag"
            src={country.flag}
            alt={`Flag of ${country.name}`}
          />
        )}
      </div>

      <span className="country__card-tag">{country.region}</span>

      {onSave && (
        <button
          className={`country__card-save ${isSaved ? "country__card-save_active" : ""} ${!isLoggedIn ? "country__card-save_inactive" : ""}`}
          type="button"
          aria-label={saveLabel}
          aria-pressed={isSaved}
          onClick={() => onSave(country)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="country__card-tooltip" aria-hidden="true">
            {saveLabel}
          </span>
        </button>
      )}

      {onRemove && (
        <button
          className="country__card-remove"
          type="button"
          aria-label={`Remove ${country.name} from saved`}
          onClick={() => onRemove(country.name)}
        >
          <img src={deleteIcon} alt="" className="country__card-remove-icon" />
          <span className="country__card-tooltip" aria-hidden="true">
            Remove from saved
          </span>
        </button>
      )}
    </article>
  );
}

export default CountryCard;

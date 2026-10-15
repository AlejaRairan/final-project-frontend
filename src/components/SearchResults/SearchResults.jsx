import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import CountryCard from "../CountryCard/CountryCard.jsx";
import "../SavedCountries/savedCountries.css";
import { searchCountries } from "../../utils/countriesApi";

function SearchResults({ savedCountries, onToggleSave }) {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setError("");
    searchCountries(query)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) {
          setResults([]);
          setError("Something went wrong. Please try again later.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (isLoading)
    return (
      <main className="search-results">
        <Preloader />
      </main>
    );

  if (error) {
    return (
      <main className="search-results">
        <NothingFound title="Error" text={error} />
      </main>
    );
  }

  if (results.length === 0)
    return (
      <main className="search-results">
        <NothingFound />
      </main>
    );

  return (
    <main className="search-results">
      <section className="countries">
        <h2 className="countries__title">Results for "{query}"</h2>
        <section className="countries__grid">
          {results.map((country) => (
            <CountryCard
              key={country.name}
              country={country}
              isSaved={savedCountries.some((c) => c.name === country.name)}
              onSave={onToggleSave}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default SearchResults;

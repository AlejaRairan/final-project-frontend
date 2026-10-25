import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import CountryCard from "../CountryCard/CountryCard.jsx";
import "../SavedCountries/savedCountries.css";
import { searchCountries } from "../../utils/countriesApi";

const ERROR_MESSAGE =
  "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.";

function SearchResults({
  savedCountries,
  onToggleSave,
  searchData,
  onSearchData,
  isLoggedIn,
}) {
  const [params] = useSearchParams();
  const { key } = useLocation();
  const query = params.get("q") || "";
  const [failedKey, setFailedKey] = useState(null);
  const [visible, setVisible] = useState({ query, count: 3 });

  const hasData = searchData.query === query;
  const results = hasData ? searchData.results : [];
  const hasFailed = failedKey === key;
  const isLoading = Boolean(query) && !hasData && !hasFailed;
  const error = hasFailed ? ERROR_MESSAGE : null;
  const visibleCount = visible.query === query ? visible.count : 3;

  useEffect(() => {
    if (!query || searchData.query === query) return;
    let cancelled = false;
    searchCountries(query)
      .then((data) => {
        if (!cancelled) onSearchData({ query, results: data });
      })
      .catch(() => {
        if (!cancelled) setFailedKey(key);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, key]);

  if (isLoading)
    return (
      <main className="search__results">
        <Preloader />
      </main>
    );

  if (error) {
    return (
      <main className="search__results">
        <NothingFound title="Error" text={error} />
      </main>
    );
  }

  if (results.length === 0)
    return (
      <main className="search__results">
        <NothingFound />
      </main>
    );

  return (
    <main className="search__results">
      <section className="countries">
        <h2 className="countries__title">Results for "{query}"</h2>
        <section className="countries__grid">
          {results.slice(0, visibleCount).map((country) => (
            <CountryCard
              key={country.name}
              country={country}
              isSaved={savedCountries.some((c) => c.name === country.name)}
              onSave={onToggleSave}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </section>
        {results.length > visibleCount && (
          <button
            className="countries__results-more"
            type="button"
            onClick={() => setVisible({ query, count: visibleCount + 3 })}
          >
            Show More
          </button>
        )}
      </section>
    </main>
  );
}

export default SearchResults;
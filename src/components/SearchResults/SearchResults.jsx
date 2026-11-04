import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import CountryCard from "../CountryCard/CountryCard.jsx";
import "../SavedCountries/savedCountries.css";
import { CARDS_PER_PAGE } from "../../utils/constants";

function SearchResults({
  savedCountries,
  onToggleSave,
  isLoggedIn,
  searchData,
  isLoading,
  error,
  onSearch,
}) {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [visible, setVisible] = useState({ query, count: CARDS_PER_PAGE });

  const hasData = searchData.query === query;
  const results = hasData ? searchData.results : [];
  const isWaiting = Boolean(query) && !hasData && !error;
  const visibleCount = visible.query === query ? visible.count : CARDS_PER_PAGE;

  useEffect(() => {
    if (query) onSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (isLoading || isWaiting)
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
        <h1 className="countries__title">Results for "{query}"</h1>
        <ul className="countries__grid">
          {results.slice(0, visibleCount).map((country) => (
            <li key={country.name} className="countries__item">
              <CountryCard
                country={country}
                isSaved={savedCountries.some((c) => c.name === country.name)}
                onSave={onToggleSave}
                isLoggedIn={isLoggedIn}
              />
            </li>
          ))}
        </ul>
        {results.length > visibleCount && (
          <button
            className="countries__results-more"
            type="button"
            onClick={() =>
              setVisible({ query, count: visibleCount + CARDS_PER_PAGE })
            }
          >
            Show More
          </button>
        )}
      </section>
    </main>
  );
}

export default SearchResults;
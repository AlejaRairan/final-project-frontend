import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchForm.css";

function SearchForm({ onSearch }) {                                     
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setError("Please enter a search term.");
      return;
    }
    setError(null);
    onSearch(q);                                                        
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__form-input"
          type="text"
          placeholder="Search for country..."
          aria-label="Search for a country"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          required
        />
        <button className="search__form-button" type="submit">
          Search
        </button>
      </form>
      {error && (
        <p className="search__form-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

export default SearchForm;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }
  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        className="search__form-input"
        type="text"
        placeholder="Search for country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button className="search__form-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;

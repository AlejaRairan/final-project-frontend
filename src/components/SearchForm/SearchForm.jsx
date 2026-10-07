function SearchForm({ onSearch }) {
    return (
        <form className="search__form" onSubmit={onSearch}>
            <input className="search__form-input" type="text" placeholder="Search for country..." required />
            <button className="search__form-button" type="submit">Search</button>
        </form>
    );
}

export default SearchForm;
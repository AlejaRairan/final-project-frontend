import { useState } from "react";
import CountryCard from "../CountryCard/CountryCard.jsx";


const mockSaved = [
  { name: "Japan", capital: "Tokyo", region: "Asia", flag: "https://flagcdn.com/w320/jp.png", landscape: "https://images.pexels.com/photos/31369843/pexels-photo-31369843.jpeg" },
  { name: "Bhutan", capital: "Thimphu", region: "Asia", flag: "https://flagcdn.com/w320/bt.png", landscape: "https://images.pexels.com/photos/37747857/pexels-photo-37747857.jpeg" },
  { name: "Iceland", capital: "Reykjavik", region: "Europe", flag: "https://flagcdn.com/w320/is.png", landscape: "https://images.pexels.com/photos/27182326/pexels-photo-27182326.jpeg" },
];

function SavedCountries() {
  const [savedCountries, setSavedCountries] = useState(mockSaved);

  const handleRemoveCountry = (countryName) => {
    setSavedCountries(savedCountries.filter((country) => country.name !== countryName));
  };

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
        <section className="countries__grid">
          {savedCountries.map((country) => (
            <CountryCard
              key={country.name}
              country={country}
              onRemove={handleRemoveCountry}
            />
          ))}
        </section>
      ) : (
        <p className="countries__empty">
          Nothing here yet. Search for a country and save the ones you want to visit.
        </p>
      )}
    </section>
  );
}

export default SavedCountries;
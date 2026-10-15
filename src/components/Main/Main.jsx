import { useState } from "react";                                   
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";                     
import NothingFound from "../NothingFound/NothingFound";           
import { searchCountries } from "../../utils/countriesApi";        
import "./Main.css";

function Main() {
  const [isLoading, setIsLoading] = useState(false);               
  const [results, setResults] = useState([]);                      
  const [hasSearched, setHasSearched] = useState(false);           

  function handleSearch(query) {                             
    setIsLoading(true);
    setHasSearched(true);
    searchCountries(query)
      .then(setResults)
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className="main">
      <div className="hero">
        <section className="hero__content">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__subtitle">
            Find the most interesting countries and their information.
          </p>
          <SearchForm onSearch={handleSearch} />                  
        </section>
      </div>
      {isLoading && <Preloader />}                                  
      {!isLoading && hasSearched && results.length === 0 && (       
        <NothingFound />
      )}
      <About />
    </main>
  );
}
export default Main;
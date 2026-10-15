import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import { getTravelGuide, getLandscape } from "../../utils/countriesApi";  
import "./countryPage.css";

function renderText(text) {
  return text
    .split("\n")
    .filter(Boolean)
    .map((line, i) => {
      const sub = line.match(/^===\s*(.+?)\s*===$/);
      return sub ? (
        <h3 key={i} className="country-page__subtitle">{sub[1]}</h3>
      ) : (
        <p key={i} className="country-page__text">{line}</p>
      );
    });
}

function handleJump(id) {                                                 
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CountryPage() {
  const { name } = useParams();
  const [guide, setGuide] = useState(null);
  const [photo, setPhoto] = useState(null);                                
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(false);
    Promise.all([getTravelGuide(name), getLandscape(name, 1400)])          
      .then(([data, img]) => {
        if (!cancelled) {
          setGuide(data);
          setPhoto(img);                                                   
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (isLoading) return <main className="country-page"><Preloader /></main>;

  if (error) {
    return (
      <main className="country-page">
        <NothingFound title="Error" text="Something went wrong. Please try again later." />
      </main>
    );
  }

  if (!guide) {
    return (
      <main className="country-page">
        <NothingFound text={`We couldn't find a travel guide for ${name}.`} />
      </main>
    );
  }

  return (
    <main className="country-page">
      <header                                                              
        className={`country-page__hero ${photo ? "" : "country-page__hero_no-photo"}`}
        style={photo ? { backgroundImage: `url(${photo})` } : undefined}
        role="img"
        aria-label={`Landscape of ${guide.title}`}
      >
        <h1 className="country-page__title">{guide.title}</h1>
      </header>

      <div className="country-page__body">                                
        <nav className="country-page__index" aria-label="Guide sections">  
          <p className="country-page__index-title">In this guide</p>
          <ul className="country-page__index-list">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  className="country-page__index-link"
                  href={`#section-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleJump(`section-${i}`);
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="country-page__article">
          {renderText(guide.intro)}
          {guide.sections.map((section, i) => (
            <section
              key={i}
              id={`section-${i}`}                                         
              className="country-page__section"
            >
              <h2 className="country-page__section-title">{section.title}</h2>
              {renderText(section.text)}
            </section>
          ))}
          <p className="country-page__credit">
            Source:{" "}
            <a
              href={`https://en.wikivoyage.org/wiki/${encodeURIComponent(guide.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikivoyage
            </a>{" "}
            (CC BY-SA){photo && " · Photo: Wikimedia Commons"}            {/* CAMBIO */}
          </p>
        </article>
      </div>
    </main>
  );
}

export default CountryPage;
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
        <h3 key={i} className="country-page__subtitle">
          {sub[1]}
        </h3>
      ) : (
        <p key={i} className="country-page__text">
          {line}
        </p>
      );
    });
}

function handleJump(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CountryPage() {
  const { name } = useParams();
  const [result, setResult] = useState({
    name: null,
    guide: null,
    photo: null,
    failed: false,
  });
  const { guide, photo, failed: error } = result;
  const isLoading = result.name !== name;

  useEffect(() => {
    let cancelled = false;
    Promise.all([getTravelGuide(name), getLandscape(name, 1400)])
      .then(([guideData, photoData]) => {
        if (!cancelled) {
          setResult({
            name,
            guide: guideData,
            photo: photoData,
            failed: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ name, guide: null, photo: null, failed: true });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (isLoading)
    return (
      <main className="country-page">
        <Preloader />
      </main>
    );

  if (error) {
    return (
      <main className="country-page">
        <NothingFound
          title="Error"
          text="Something went wrong. Please try again later."
        />
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
    <main className="country__page">
      <header
        className={`country__page-hero ${photo ? "" : "country__page-hero_no-photo"}`}
        style={photo ? { backgroundImage: `url(${photo})` } : undefined}
        role="img"
        aria-label={`Landscape of ${guide.title}`}
      >
        <h1 className="country__page-title">{guide.title}</h1>
      </header>

      <div className="country__page-body">
        <nav className="country__page-index" aria-label="Guide sections">
          <p className="country__page-index-title">In this guide</p>
          <ul className="country__page-index-list">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  className="country__page-index-link"
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

        <article className="country__page-article">
          {renderText(guide.intro)}
          {guide.sections.map((section, i) => (
            <section
              key={i}
              id={`section-${i}`}
              className="country__page-section"
            >
              <h2 className="country__page-section-title">{section.title}</h2>
              {renderText(section.text)}
            </section>
          ))}
          <p className="country__page-credit">
            Source:{" "}
            <a
              href={`https://en.wikivoyage.org/wiki/${encodeURIComponent(guide.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikivoyage
            </a>{" "}
            (CC BY-SA){photo && " · Photo: Wikimedia Commons"} {/* CAMBIO */}
          </p>
        </article>
      </div>
    </main>
  );
}

export default CountryPage;

const BASE_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;
const FIELDS = "names.common,capitals,region,flag.url_png,codes.alpha_2";
const COMMONS_URL = "https://commons.wikimedia.org/w/api.php";

const mapCountry = (c) => ({
  name: c.names.common,
  capital: c.capitals?.[0]?.name ?? "N/A",
  region: c.region,
  flag:
    c.flag?.url_png ??
    `https://flags.restcountries.com/v5/w320/${c.codes.alpha_2.toLowerCase()}.png`,
  landscape: null,
});

async function getDescription(name) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
    );
    if (!res.ok) return "";
    const data = await res.json();
    return data.extract ?? "";
  } catch {
    return "";
  }
}

export async function getLandscape(name, width = 600) {
  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${name} landscape`,
      gsrnamespace: "6",
      gsrlimit: "10",
      prop: "imageinfo",
      iiprop: "url|mime",
      iiurlwidth: String(width),
      format: "json",
      origin: "*",
    });
    const res = await fetch(`${COMMONS_URL}?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages ?? {}).sort(
      (a, b) => a.index - b.index
    );
    const photo = pages.find(
      (p) =>
        p.imageinfo?.[0]?.mime === "image/jpeg" &&
        !/flag|map|coat|logo|stamp|seal/i.test(p.title)
    );
    return photo?.imageinfo[0].thumburl ?? null;
  } catch {
    return null;
  }
}

export async function searchCountries(query) {
  const res = await fetch(
    `${BASE_URL}/name?q=${encodeURIComponent(query)}&limit=6&response_fields=${FIELDS}`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );
  if (res.status === 404) return [];
 if (!res.ok) {                                                     
  const body = await res.json().catch(() => null);
  throw new Error(`Error: ${res.status}`);
}
  const json = await res.json();
  const countries = (json.data?.objects ?? []).map(mapCountry);
  return Promise.all(
    countries.map(async (c) => {
      const [description, landscape] = await Promise.all([
        getDescription(c.name),
        getLandscape(c.name),
      ]);
      return { ...c, description, landscape };
    })
  );
}

export async function getTravelGuide(name) {
  const params = new URLSearchParams({
    action: "query",
    prop: "extracts",
    explaintext: "1",
    exsectionformat: "wiki",
    titles: name,
    redirects: "1",
    format: "json",
    origin: "*",
  });
  const res = await fetch(`https://en.wikivoyage.org/w/api.php?${params}`);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined || !page.extract) return null;

  const [intro, ...rest] = page.extract.split(/^==\s*([^=].*?)\s*==\s*$/m);
  const sections = [];
  for (let i = 0; i < rest.length; i += 2) {
    sections.push({ title: rest[i], text: (rest[i + 1] ?? "").trim() });
  }
  return {
    title: page.title,
    intro: intro.trim(),
    sections: sections.filter((s) => s.text),
  };
}
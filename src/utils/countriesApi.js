import {
  COUNTRIES_API_URL,
  COUNTRIES_API_KEY,
  COUNTRY_FIELDS,
  FLAG_CDN_URL,
  COMMONS_API_URL,
  WIKIPEDIA_SUMMARY_URL,
  WIKIVOYAGE_API_URL,
  SEARCH_LIMIT,
  CARD_PHOTO_WIDTH,
} from "./constants";

const mapCountry = (c) => ({
  name: c.names.common,
  capital: c.capitals?.[0]?.name ?? "N/A",
  region: c.region,
  flag:
    c.flag?.url_png || `${FLAG_CDN_URL}/${c.codes.alpha_2.toLowerCase()}.png`,
  landscape: null,
});

async function getDescription(name) {
  try {
    const res = await fetch(
      `${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(name)}`,
    );
    if (!res.ok) return "";
    const data = await res.json();
    return data.extract ?? "";
  } catch {
    return "";
  }
}

export async function getLandscape(name, width = CARD_PHOTO_WIDTH) {
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
    const res = await fetch(`${COMMONS_API_URL}?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages ?? {}).sort(
      (a, b) => a.index - b.index,
    );
    const photo = pages.find(
      (p) =>
        p.imageinfo?.[0]?.mime === "image/jpeg" &&
        !/flag|map|coat|logo|stamp|seal/i.test(p.title),
    );
    return photo?.imageinfo[0].thumburl ?? null;
  } catch {
    return null;
  }
}

const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export async function searchCountries(query) {
  const res = await fetch(
    `${COUNTRIES_API_URL}/name?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}&response_fields=${COUNTRY_FIELDS}`,
    { headers: { Authorization: `Bearer ${COUNTRIES_API_KEY}` } },
  );
  if (res.status === 404) return [];
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const json = await res.json();
  const countries = (json.data?.objects ?? []).map(mapCountry);

  const q = normalizeText(query.trim());
  const matches = countries.filter((c) => normalizeText(c.name).includes(q));
  const filtered = matches.length > 0 ? matches : countries;

  return Promise.all(
    filtered.map(async (c) => {
      const [description, landscape] = await Promise.all([
        getDescription(c.name),
        getLandscape(c.name),
      ]);
      return { ...c, description, landscape };
    }),
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
  const res = await fetch(`${WIKIVOYAGE_API_URL}?${params}`);
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

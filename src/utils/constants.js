export const COUNTRIES_API_URL = "https://api.restcountries.com/countries/v5";
export const COUNTRIES_API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;
export const COUNTRY_FIELDS =
  "names.common,capitals,region,flag.url_png,codes.alpha_2";
export const FLAG_CDN_URL = "https://flags.restcountries.com/v5/w320";

export const COMMONS_API_URL = "https://commons.wikimedia.org/w/api.php";
export const WIKIPEDIA_SUMMARY_URL =
  "https://en.wikipedia.org/api/rest_v1/page/summary";
export const WIKIVOYAGE_API_URL = "https://en.wikivoyage.org/w/api.php";

export const SEARCH_LIMIT = 12;
export const CARDS_PER_PAGE = 3;
export const CARD_PHOTO_WIDTH = 600;

export const ERROR_MESSAGE =
  "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.";
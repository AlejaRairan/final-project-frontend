# CountriesExplorer (frontend)

CountriesExplorer is a React web app to discover countries. You can search for a country, see its flag, capital, region, a short description and a landscape photo, read a travel guide, and save your favorite countries.

**Backend:** [final-project-backend](https://github.com/AlejaRairan/final-project-backend) (Express + MongoDB REST API with user registration, login and saved countries).

> Current status: the search and the country pages work with public APIs. Saved countries are stored in the browser (`localStorage`). Connecting the login, registration and saved countries to the backend API is the next stage.

## Features

- Search countries by name, with validation of the search field.
- Loading indicator while searching and a "nothing found" message when there are no results.
- Error message when the request fails.
- Country cards with flag, name, capital, region, short description and landscape photo.
- "Show more" button: results are shown in groups of 3.
- Country page with a travel guide (sections from Wikivoyage), reached from each card.
- Save and remove countries; the Saved Countries page lists them.
- Saved countries and the last search are kept in `localStorage`.
- Sign in and sign up popups with form validation.
- Floating button to scroll back to the top.
- Responsive layout for screens from 320px to 1280px.

## Technologies

- React 19 and React Router 7
- Vite
- CSS with the BEM methodology, Flexbox and Grid
- ESLint
- `normalize.css`

## Data sources

| Data | Source |
| --- | --- |
| Name, capital, region and flag | [REST Countries API v5](https://restcountries.com) |
| Short description | Wikipedia REST API |
| Landscape photos | Wikimedia Commons API |
| Travel guide | Wikivoyage API |

## Run it locally

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root (next to `package.json`) with your REST Countries API key:

   ```
   VITE_COUNTRIES_API_KEY=your_api_key
   ```

   The key must allow the origin you run the app from (for example, `localhost`). The `.env` file is listed in `.gitignore` and is never committed.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates the production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Project structure

```
src/
  components/   React components, each one with its own folder and CSS
  images/       icons and images
  utils/        API requests (countriesApi.js) and constants
  vendor/       fonts and font declarations
  index.css     global styles
  main.jsx      app entry point
```

## Next steps

- Connect registration and login to the backend API.
- Replace `localStorage` with the backend's `/countries` routes for saved countries.
- Deploy the frontend.

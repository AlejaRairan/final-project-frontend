import { MAIN_API_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((error) => Promise.reject(new Error(error.message)));
};

export const register = (email, password, name) =>
  fetch(`${MAIN_API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);

export const login = (email, password) =>
  fetch(`${MAIN_API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export const getCurrentUser = (token) =>
  fetch(`${MAIN_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const getSavedCountries = (token) =>
  fetch(`${MAIN_API_URL}/countries`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const saveCountry = (country, token) =>
  fetch(`${MAIN_API_URL}/countries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(country),
  }).then(checkResponse);

export const deleteCountry = (countryId, token) =>
  fetch(`${MAIN_API_URL}/countries/${countryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

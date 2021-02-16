import { apiFetch, BASE_URL } from "./api_fetch.js";

export const createUser = ( username, email, first_name, last_name, password) =>
  apiFetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, first_name, last_name, password })
  });

  export const showUser = (userId) =>
      apiFetch(`${BASE_URL}/users/${userId}`,{
        method: "GET",
        headers: {
          "Authorization": `Token token=${sessionStorage.getItem("token")}`
      },
    });

  export const updateUser = (userId, username, email, first_name, last_name ) =>
      apiFetch(`${BASE_URL}/users/${userId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token token=${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({ username, email, first_name, last_name })
    });

  export const deleteUser = (userId) =>
    apiFetch(`${BASE_URL}/users/${userId}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Token token=${sessionStorage.getItem("token")}`
    },
  });

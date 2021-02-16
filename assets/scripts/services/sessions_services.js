import { apiFetch, BASE_URL } from "./api_fetch.js";

export function login(username, password) {
  return apiFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ username, password })
  })
}

export function logout() {
  return apiFetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization:`Token token=${sessionStorage.getItem('token')}`
    }
  })
}

// function SessionsService() {
//   if (!SessionsService.instance) {
//     SessionsService.instance = this;
//   }
//   return SessionsService.instance;
// }

// SessionsService.prototype.login = (username, password) =>
//   apiFetch(`${BASE_URL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });

// SessionsService.prototype.logout = () =>
//   apiFetch(`${BASE_URL}/logout`, {
//     method: "POST",
//     headers: {
//       Authorization: `Token token=${sessionStorage.getItem("token")}`,
//     },
//   });

// export default SessionsService;

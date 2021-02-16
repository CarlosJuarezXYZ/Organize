import { apiFetch, BASE_URL } from "./api_fetch.js";

// CREATE LABEL
export function createCard(card_id) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/cards_labels`, {
    method: 'POST',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}


// DELETE LABEL
export function destroyCard(card_id) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/cards_labels`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}
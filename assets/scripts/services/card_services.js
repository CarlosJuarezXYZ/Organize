import { apiFetch, BASE_URL } from "./api_fetch.js";


// CREATE CARD
export function CreateCard(list_id, name, desc, closed) {
  return apiFetch(`${BASE_URL}/lists/${list_id}/cards`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, desc, closed })
  })
}

//SHOW CARD
export function showCards(list_id, card_id) {
  return apiFetch(`${BASE_URL}/lists/${list_id}/cards/${card_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}

//UPDATE CARD
export function updateCard(list_id, card_id, name, pos) {
  return apiFetch(`${BASE_URL}/lists/${idList}/cards/${card_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, list_id, pos })
  })
}

// DELETE CARD
export function destroyCard(list_id, card_id) {
  return apiFetch(`${BASE_URL}/lists/${list_id}/cards/${card_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}
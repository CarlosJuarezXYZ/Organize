import { apiFetch, BASE_URL } from "./api_fetch.js";


// CREATE LABEL
export function createCard(card_id, name) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name })
  })
}


//UPDATE LABEL
export function updateCard(card_id, checklist_id, name) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists/${checklist_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name})
  })
}

// DELETE LABEL
export function destroyCard(card_id, checklist_id) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists/${checklist_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}
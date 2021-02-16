import { apiFetch, BASE_URL } from "./api_fetch.js";



export function createCheckList(card_id, name) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name })
  })
}

export function updateCheckList(card_id, checklist_id, name) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists/${checklist_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({name})
  })
}

export function destroyCheckList(card_id, checklist_id) {
  return apiFetch(`${BASE_URL}/cards/${card_id}/checklists/${checklist_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}

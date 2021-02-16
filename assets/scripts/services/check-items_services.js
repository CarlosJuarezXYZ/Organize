import { apiFetch, BASE_URL } from "./api_fetch.js";


// CREATE LABEL
export function createCard(checklist_id, name, pos, completed) {
  return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, pos, completed })
  })
}


//UPDATE LABEL
export function updateCard(checklist_id, checklist_id, name, pos, completed ) {
  return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items/${check_item_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, pos, completed })
  })
}

// DELETE LABEL
export function destroyCard(checklist_id, check_item_id) {
  return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items/${check_item_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}

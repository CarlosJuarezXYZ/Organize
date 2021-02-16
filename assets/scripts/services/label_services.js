import { apiFetch, BASE_URL } from "./api_fetch.js";


// CREATE LABEL
export function createCard(board_id, name, color) {
  return apiFetch(`${BASE_URL}/boards/${board_id}/labels`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, color })
  })
}

//UPDATE LABEL
export function updateCard(board_id, label_id, color) {
  return apiFetch(`${BASE_URL}/boards/${board_id}/labels/${label_id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ color })
  })
}

// DELETE LABEL
export function destroyCard(board_id, label_id) {
  return apiFetch(`${BASE_URL}/boards/${board_id}/labels/${label_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}
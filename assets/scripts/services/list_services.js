import { apiFetch, BASE_URL } from "./api_fetch.js";


// CREATE A NEW LIST
export function createList(idBoard, name, closed) {
  return apiFetch(`${BASE_URL}/boards/${idBoard}/lists`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, closed })
  })
}

//UPDATE LIST'S TITLE
export function updateList(idBoard, idList, name) {
  return apiFetch(`${BASE_URL}/boards/${idBoard}/lists/${idList}`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name })
  })
}

// DELETE LIST
export function destroyList(idBoard, idList) {
  return apiFetch(`${BASE_URL}/boards/${idBoard}/lists/${idList}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}
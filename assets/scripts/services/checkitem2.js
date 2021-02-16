import { apiFetch, BASE_URL } from "./api_fetch.js";

export function createItem(checklist_id, name) {
  return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ name,post:"4",completed:false })
  })
}


// export function updateItem(checklist_id, checklist_id, name, pos, completed ) {
//   return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items/${check_item_id}`, {
//     method: 'PATCH',
//     headers: {
//       "Content-Type":"application/json",
//       Authorization: `Token token=${sessionStorage.getItem("token")}`
//     },
//     body: JSON.stringify({ name, pos, completed })
//   })
// }


export function destroyItem(checklist_id, check_item_id) {
  return apiFetch(`${BASE_URL}/checklists/${checklist_id}/check_items/${check_item_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`
    }
  })
}

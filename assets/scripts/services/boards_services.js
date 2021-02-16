import { apiFetch, BASE_URL } from "./api_fetch.js";

export const indexBoards = () =>{
    return apiFetch(`${BASE_URL}/boards`,{
        method: "GET",
        headers: {
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        },
    })
};

export const showBoards = (boardId) => {
    return apiFetch(`${BASE_URL}/boards/${boardId}`,{
        method: "GET",
        headers: {
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        },
    })
};

export const createBoards = (name,closed,color,starred) => {
  return apiFetch(`${BASE_URL}/boards`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({name,closed,color,starred}),
  })
};

export const updateBoard = (boardId,name,closed,color,starred) => {
    return apiFetch(`${BASE_URL}/boards/${boardId}`,{
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({name,closed,color,starred})
    })
};

export const updateClosedBoard = (boardId,closed) => {
  return apiFetch(`${BASE_URL}/boards/${boardId}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({closed})
  })
};

export const updateFavorite = (boardId,starred) =>{
  return apiFetch(`${BASE_URL}/boards/${boardId}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({starred})
  })
}


export const deleteBoards = (boardId) => {
    return apiFetch(`${BASE_URL}/boards/${boardId}`,{
        method: "DELETE",
        headers: {
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        }
    })
}

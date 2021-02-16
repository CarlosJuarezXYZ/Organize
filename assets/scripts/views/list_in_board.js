import cardInList from './card_in_list.js';
import { STORE } from "../store.js";

export default function listInBoard() {
  const listsRender = [];
  STORE.board.lists.forEach( (list) => {
    let html = `
    <div class="cards">
      <div class="cards__header">
        <h3>${list.name}</h3>
        <button>${ list.name ? "x" : null }</button>
      </div>
      ${ cardInList(list, list.listId) }
    <button class="card__new">
      <span class="">+</span>Add another card
    </button>
    <div class="list__title--edit">
      <input type="text" data-id="" class="newCard" placeholder="Enter a title for this card ...">
      <div>
        <button class="submit__title" data-listid="${list.listId}">Add Card</button>
        <button class="cancel__title">X</button>
      </div>
    </div>
  </div>
    `
    listsRender.push(html)
  });
  return listsRender.join("");
}
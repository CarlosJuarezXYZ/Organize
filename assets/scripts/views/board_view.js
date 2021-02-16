import listInBoard from './list_in_board.js';
import { STORE } from "../store.js";

export default function viewBoard() {
  return `
  <section class="board" style="background: ${STORE.board.color}">
    <section class="board__header">
      <a class="board__title">${STORE.board.name}</a>
      <button class="board__icon"><img src="./assets/img/star-yelow.png" alt="start"></button>
      <button class="board__icon back-index-board"><img src="./assets/img/board-close.png" alt="x for close board"></button>
    </section>
    <section class="board__container">
      ${ listInBoard() }
    </section>
  </section>
  `
}
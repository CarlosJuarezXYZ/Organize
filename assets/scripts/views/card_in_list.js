import labelInCard from './label_in_card.js';
import { STORE } from "../store.js";

export default function cardInList(list, list_id) {
  const cardsRender = [];
  console.log(list)
  list.cards.forEach( (card) => {
    let html = `
    <div class="card" draggable="true" data-cardid="${card.cardId}" data-listid="${list_id}">
      <div class="card__label" >
        ${ labelInCard(card) }
      </div>
      <p class="card__title">${card.name}</p>
    </div>
    `
    cardsRender.push(html)
  });
  return cardsRender.join("");
}

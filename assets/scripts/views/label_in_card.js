import { STORE } from "../store.js";

export default function labelInCard(card) {
  const labelRender = [];
  console.log(card)
  card.labels.forEach( (label) => {
    let html = `
      <div class="label" data-id="${label.labelId}" style="background:${label.color}"></div>
    `
    labelRender.push(html)
  });
  return labelRender.join("");
};
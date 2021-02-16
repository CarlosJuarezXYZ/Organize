import viewCard from "./views/card_view.js";
import { showCards, destroyCard } from "./services/card_services.js"
import showBoard from './board.js';
import { STORE } from "./store.js"
import { createCheckList } from "./services/checklist2.js";
import { createItem } from "./services/checkitem2.js";

export default function showCard(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function() {
      this.parent.innerHTML = viewCard(parentElement);
      this.deleteCardListener();
      this.createCheckList();
      this.createItem();
    },
    viewCardListener: function (){
      const container = document.querySelector(".js-content");
      container.addEventListener("click",(e)=>{
        const target = container.querySelectorAll(".card");
        console.log(e.target)
        target.forEach(async(card)=>{
          if(card==e.target){
            try {
              const listId = card.dataset.listid;
              sessionStorage.setItem("list",listId);
              const cardId = card.dataset.cardid;
              sessionStorage.setItem("card1",cardId);
              console.log ( listId , cardId )
              const selectedCard = await showCards(listId, cardId );
              sessionStorage.setItem("card", selectedCard);
              STORE.card = selectedCard; //aqui guardamos el card
              this.render()
              console.log(STORE.card.id);
              const check = STORE.card.checklists
              console.log(check);
            } catch (e) {
              alert(e.message);
            }
          }
        })
      }
    )},
    deleteCardListener: function() {
      const deletebutton = document.querySelector(".button__delete-card");
      console.log(deletebutton)
      deletebutton.addEventListener("click",async (e)=>{
        const temp = STORE.card
        console.log(temp, "estoy en el temp")
        await destroyCard(temp.listId, temp.id)
        const temp2 = sessionStorage.getItem("currentboard")
        const selectedBoard = await showBoards(temp2);
        STORE.board = selectedBoard;
        const board2 = new showBoard(".js-content");
        board2.render();
      })
    },
    createCheckList: function(){
      const form = document.querySelector(".form-checklist");
      console.log(form);
      form.addEventListener("submit",async(e)=>{
      e.preventDefault();
      console.log("llegue al evento");
      const name = form.querySelector(".input-list");
      try{
        const cardId = STORE.card.id;
        const list = await createCheckList(cardId,name.value);
        console.log(list);
        const listId = sessionStorage.getItem("list");
        const selectedCard = await showCards(listId,cardId);
        console.log(selectedCard);
        STORE.card = selectedCard;
        this.render();
      }catch(e){
        alert(e.message)
      }
      })
    },
    /* wences aca oculto el delete porque se cruzan los eventos y el create deja de funcionar :(*/
  //   deleteCheckList: function(){
  //     const container = document.querySelector(".js-content");
  //     container.addEventListener("click",(e)=>{
  //     e.preventDefault();
  //     const btn = container.querySelectorAll(".delete-task");
  //     btn.forEach( async (dlt) =>{
  //     if(dlt==e.target){
  //     console.log(e.target.dataset);
  //     const cardId = STORE.card.id;
  //     console.log(cardId);
  //     const listId = e.target.dataset.id
  //     const list = await destroyCheckList(cardId,listId);
  //     console.log(list);
  //     }
  //     })
  //     })
  //   }
  createItem: function(){
    const forms = document.querySelectorAll(".create-add");
    forms.forEach((form)=>{
    form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      console.log(e.target);
      console.log("llegue aqui");
      const idForm = e.target.dataset.id;
      const { title } = form;
      const data = await createItem(idForm,title.value);
      const cardId = STORE.card.id;
      const listId = sessionStorage.getItem("list");
      const selectedCard = await showCards(listId,cardId);
      console.log(selectedCard);
      STORE.card = selectedCard;
      this.render();
    })
    })
  }
  }
}

// createBoard: function(){
//   const container = document.querySelector(".js-form");
//   container.addEventListener("submit",async (e)=>{
//       e.preventDefault();
//     const closed = false;
//     const starred = false;
//     const name = document.querySelector(".form_name");
//     const colorbody = document.querySelector(".create__boards")
//     const color = colorbody.style.backgroundColor;
//     try{
//         const data = await createBoards(name.value,closed,color,starred)
//         STORE.boards = await indexBoards()
//         const main = new Main(".js-content")
//         main.render();
//     }catch(e){
//         alert(e.message);
//     }
//   })
//   }

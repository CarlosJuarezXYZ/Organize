import viewBoard from "./views/board_view.js";
import { showBoards } from "./services/boards_services.js";
import { CreateCard } from "./services/card_services.js";
import  Main  from "./main.js";
import { STORE } from "./store.js";


export default function showBoard(parentElement) {
  console.log("estoy a punto de mostrar un board")
  return {
    parent: document.querySelector(parentElement),
    render: function() {
      this.parent.innerHTML = viewBoard();
      this.newFormCardListener();
      this.hideFormCardListener();
      this.backToIndexBoard();
      this.createNewCardListener();
    },
    viewListsListener: function (){
      const container = document.querySelector(".js-content");
      container.addEventListener("click",(e)=>{
        const target = container.querySelectorAll(".favorite");
        target.forEach(async(board)=>{
          if(board==e.target){
            try {
              const boardId = board.dataset.id;
              const selectedBoard = await showBoards(boardId);
              sessionStorage.setItem("board", selectedBoard);
              sessionStorage.setItem("currentboard", boardId);
              console.log(selectedBoard);
              STORE.board = selectedBoard; //aqui guardamos el board seleccionado en el Store
              this.render()
            } catch (e) {
              alert(e.message);
            }
          }
        })
      }
    )},
    newFormCardListener: function () {

      const addFormCard = document.querySelectorAll('.card__new')
      addFormCard.forEach( (button) => {
        button.addEventListener("click",(e)=>{
        button.style.display = "none"
        button.nextElementSibling.style.display = 'flex'
        })
      })
    },
    hideFormCardListener: function () {

      const addFormCard = document.querySelectorAll('.cancel__title')
      addFormCard.forEach( (button) => {
        button.addEventListener("click",(e)=>{
        button.closest('.list__title--edit').style.display = "none";
        button.closest('.list__title--edit').previousElementSibling.style.display = 'flex'
        })
      })
    },
    createNewCardListener: function () {

      const createCard = document.querySelectorAll('.submit__title')
      createCard.forEach( (button) => {
        console.log(STORE.board)
        button.addEventListener("click", async (e)=>{
          const content = button.parentElement.previousElementSibling.value
          const idlist = e.target.dataset.listid
          console.log( content, idlist)
          if (content !== ""){

            const temp = sessionStorage.getItem("currentboard")

            const answer = await CreateCard(idlist, content, null, false )
            const selectedBoard = await showBoards(temp);
            sessionStorage.setItem("board", selectedBoard);

            STORE.board = selectedBoard; //aqui guardamos el board seleccionado en el Store
            this.render()

          }

        })
      })
    },
    backToIndexBoard: function () {
      const backIndex = document.querySelector('.back-index-board')
      backIndex.addEventListener("click",(e)=>{
        const main = new Main(".js-content");
        main.render();
      })
    }
  }
};
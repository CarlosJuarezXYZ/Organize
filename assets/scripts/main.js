import { indexBoards, updateClosedBoard, updateFavorite, showBoards } from "./services/boards_services.js";
import { STORE } from "./store.js";
import Login from "./login.js";
import { logout } from "./services/sessions_services.js";


export default function Main(parentElement){
  return {
      parent: document.querySelector(parentElement),

      render: function () {
          let html = `
    <div class="container-boards">

          <div class="container__navs">

              <div class = "nav__myBoards active">
                  <p><a href="#" class="js-redirect-main">My boards</a></p>
              </div>

              <div class = "nav__closedBoards">
                <p><a href="#" class="js-redirect-closedboards">Closed boards</a></p>
              </div>

              <div class = "nav__myProfile">
                  <p><a href="#" class="js-redirect-showuser">My Profile</a></p>
              </div>

              <div class = "nav__logout">
                  <p><a href="#" class="js-logout">Log out</a></p>
              </div>
          </div>

              <div class="container__boards">

                  <div class="icon__favorite">
                      <icon class="ri-star-line js-star"></icon><p>Your Starred Boards</p>
                  </div>

                  <div class="boards__favorite">

                          ${STORE.boards.filter(board => board.starred == true && board.closed==false).map((board)=> this.addFavoriteBoard(board)).join(" ") }
                  </div>

                  <div class="icon__favorite">
                      <img src="/assets/components/icons/vector.svg"><p>Your Boards</p>
                  </div>

                  <div class="boards__cards">
                      ${STORE.boards.filter(board => board.starred == false && board.closed == false).map((board)=> this.addNormalBoard(board)).join(" ") }

                  </div>

                  <button class="btn__board">Create a new Board</button>

            </div>
    </div>
          `;
          
          this.parent.innerHTML = html;
          this.viewMain();
          this.toggle();
          this.addLogoutListener();
          this.toggleFavorite();
      },
      addFavoriteBoard: function(board){
        return `
        <div class="favorite ${board.color}" data-id="${board.id}" draggable="true">
            <p>${board.name}</p> <div class="start"><img data-id="${board.id}" data-closed ="${board.closed}"class="js-toggle" src="/assets/components/icons/toggle.svg"><icon class="ri-star-line js-star favorite-yellow" data-id="${board.id}"></icon></div>
        </div>
        `
      },

      addNormalBoard: function(board){
        return `
        <div class="favorite ${board.color}" data-id="${board.id}" draggable="true">
            <p>${board.name}</p> <div class="start"><img data-id="${board.id}" data-closed ="${board.closed}"class="js-toggle" src="/assets/components/icons/toggle.svg"><icon class="ri-star-line js-star" data-id="${board.id}"></icon></div>
        </div>
        `
      },

      viewMain: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
            const main = container.querySelector(".js-redirect-main");
            if(main==e.target){
                this.render();
            }
          })
      },

      toggle: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
              const toggle = container.querySelectorAll(".js-toggle");
              toggle.forEach(async (target)=>{
                if(target == e.target){
                    console.log(target.dataset.closed);
                    let findBoard = STORE.boards.find((board)=>{
                        return board.id == e.target.dataset.id
                    })
                    console.log(findBoard);
                    try{
                        const update = await updateClosedBoard(target.dataset.id,!findBoard.closed);
                        console.log(update);
                        STORE.boards = await indexBoards();
                        this.render();
                        return
                    }catch(e){
                        alert(e.message);
                    }
                }
              })
          })
      },
      addLogoutListener() {
        const trigger = this.parent.querySelector(".js-logout");
        trigger.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            await logout();
            sessionStorage.setItem("token", "null");
            // sessionStorage.removeItem("token");
            sessionStorage.removeItem("userid");
            const login = Login(parentElement);
            login.render();
          } catch (e) {
            alert(e.message);
          }
        })
      },

      toggleFavorite: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
          const toggle = container.querySelectorAll(".js-star");
          toggle.forEach(async(target)=>{
            if(target==e.target){
                let findFavorite = STORE.boards.find((board)=>{
                  return board.id == e.target.dataset.id;
                });
                try{
                    await updateFavorite(e.target.dataset.id,!findFavorite.starred)
                    STORE.boards = await indexBoards();
                    console.log(target);
                    this.render();
                    return
                }catch(e){
                    alert(e.message);
                }
            }
          })
          })
      },
      addDragListener: function(){
        const container = document.querySelector(".js-content");
        container.addEventListener("dragstart",e=>{
        const board = e.target;
        
        })
      },
      showBoard: function(){
        const container = document.querySelector(".js-content");
        container.addEventListener("click",(e)=>{
          const target = container.querySelectorAll(".favorite");
          target.forEach(async(board)=>{
            if(board==e.target){
              try {
                const boardId = board.dataset.id;
                const selectedBoard = await showBoards(boardId);
                const detail =  ShowBoard(parentElement, selectedBoard);
                detail.render();
              } catch (e) {
                alert(e.message);
              }
            }
          })
        })
      }
      // listenDragEvents: function(){
      // const container = document.querySelector(".js-content");
      // container.addEventListener("click",(e)=>{
      // const cards = document.querySelector(".cards");
      // })
      // // const card = document.querySelector(".cards");
      // // card.addEventListener("dragstart",(e)=>{
      // //   console.log("drag");
      // // })
      // }
  }
}

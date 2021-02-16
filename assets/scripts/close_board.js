import { deleteBoards, indexBoards, updateClosedBoard } from "./services/boards_services.js";
import { STORE } from "./store.js";
import { logout } from "./services/sessions_services.js";
import Login from "./login.js";

export default function Close(parentElement){
  return {
      parent: document.querySelector(parentElement),

      render: function () {
          let html = `
             <div class="container-boards">
                <div class="container__navs">
                <div class = "nav__myBoards">
                  <p><a href="#" class="js-redirect-main">My boards</a></p>
                </div>
                <div class = "nav__closedBoards active">
                  <p><a href="#" class="js-redirect-closedboards">Closed boards</a></p>
                </div>
                <div class = "nav__myProfile">
                  <p><a href="#" class="js-redirect-showuser">My Profile</a></p>
                </div>
                <div class = "nav__logout">
                  <p><a href="#" class="js-logout">Log out</a></p>
                </div>
              </div>
              <div class="closed-board">

                <div class="icon__favorite">
                    <img src = "/assets/components/icons/toggle.svg"class="js-closed"></icon><p>Closed Boards</p>
                </div>

                <div class="boards__favorite">

                  ${STORE.boards.filter(board => board.closed == true).map((board)=> this.addClosedBoard(board)).join(" ") }

                </div>
          </div>
    </div>
          `;
          this.parent.innerHTML = html;
          this.addLogoutListener();
          this.viewClosedBoard;
          this.toggle();
          this.deleteBoard();
      },
      addClosedBoard: function(board){
        return `
        <div class="favorite ${board.color}">
            <p>${board.name}</p> <div class="start"><icon data-id="${board.id}" class ="ri-delete-bin-line js-delete"></icon><img class="js-return" data-id="${board.id}" src="/assets/components/icons/return.svg"></div>
        </div>
        `
      },viewClosedBoard: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
              const btn = container.querySelector(".js-redirect-closedboards");
              if(btn == e.target){
                  this.render();
              }
          })
      },
      toggle: function(){
      const container = document.querySelector(".js-content");
      container.addEventListener("click",(e)=>{
          const toggle = container.querySelectorAll(".js-return");
          toggle.forEach(async (target)=>{
            if(target == e.target){
                const status = e.target.dataset.closed
                let findBoard = STORE.boards.find((board)=>{
                    return board.id == e.target.dataset.id
                })
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
      deleteBoard(){
        const container = document.querySelector(".js-content");
        container.addEventListener("click",(e)=>{
          const deleteBoard = container.querySelectorAll(".js-delete");
          deleteBoard.forEach(async(dlt)=>{
            if(dlt==e.target){
              let findBoard = STORE.boards.find((board)=>{
                  return board.id == e.target.dataset.id
              })
              console.log(findBoard);
              try{
                await deleteBoards(dlt.dataset.id);
                STORE.boards = await indexBoards();
                this.render();
              }catch(e){
                alert(e.message);
              }
            }
          })
        })},
  }
}

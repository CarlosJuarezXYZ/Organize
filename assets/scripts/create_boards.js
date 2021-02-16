import Main from "./main.js";
import { createBoards, indexBoards } from "./services/boards_services.js";
import { STORE } from "./store.js";

export default function CreateBoard(parentElement){
  return  {
      parent: document.querySelector(parentElement),

      render: function () {
          let html = ` 
          <div class="container-create-board">
           
                <div class="container__navs">
        
                    <div class = "nav__myBoards">
                        <p><a href="#" class="js-redirect-main">My boards</a></p>
                    </div>
        
                    <div class = "nav__closedBoards">
                      <p><a href="#" class="js-redirect-closedboards">Closed boards</a></p>
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
          
    <div class="container-create">

            <div class="create__boards">
            <form class="js-form">
                    <div class="board__body"><input class="form_name" type="text" placeholder="Board title"><icon class="ri-close-line js-close"></icon></div>
                    <button type = "submit" class="button__create">Create Board</button>
                        <div class="boards__color">
                            <div data-color = "blue" class="blue js-color"></div>
                            <div data-color = "orange" class="orange js-color"></div>
                            <div data-color = "green" class="green js-color"></div>
                            <div data-color = "red" class="red js-color"></div>
                            <div data-color = "purple" class="purple js-color"></div>
                            <div data-color = "pink" class="pink js-color"></div>
                            <div data-color = "lime" class="lime js-color"></div>
                            <div data-color = "lightblue" class="sky js-color"></div>
                            <div data-color = "grey" class="grey js-color"></div>
                        </div>
            </form>
            </div>
    </div>
        `;
        this.parent.innerHTML = html;
        this.createBoard();
        this.colorBoards();
        this.viewCreateBoard();
        this.closeCreateBoard();
      },
      addFavoriteBoard: function(board){
        return `
        <div class="favorite ${board.color}">
            <p>${board.name}</p> <div class="start"><img data-id="${board.id}" data-closed ="${board.closed}"class="js-toggle" src="/assets/components/icons/toggle.svg"><icon class="ri-star-line js-star favorite-yellow" data-id="${board.id}"></icon></div>
        </div>
        `
      },

      addNormalBoard: function(board){
        return `
        <div class="favorite ${board.color}">
            <p>${board.name}</p> <div class="start"><img data-id="${board.id}" data-closed ="${board.closed}"class="js-toggle" src="/assets/components/icons/toggle.svg"><icon class="ri-star-line js-star" data-id="${board.id}"></icon></div>
        </div>
        `
      },

      viewCreateBoard: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
          const btn = container.querySelector(".btn__board");
          if(btn==e.target){
              console.log(e.target);
              this.render();
          }
          })
      },
      
      closeCreateBoard: function(){
          const container = document.querySelector(".js-content");
          container.addEventListener("click",(e)=>{
          const btn = container.querySelector(".js-close")
          if(btn==e.target){
              console.log(e.target);
              const main = new Main(".js-content");
              main.render();
          }
          })
      },
      createBoard: function(){
      const container = document.querySelector(".js-form");
      container.addEventListener("submit",async (e)=>{
          e.preventDefault();
        const closed = false;
        const starred = false;
        const name = document.querySelector(".form_name");
        const colorbody = document.querySelector(".create__boards")
        const color = colorbody.style.backgroundColor;
        try{
            const data = await createBoards(name.value,closed,color,starred)
            STORE.boards = await indexBoards()
            const main = new Main(".js-content")
            main.render();
        }catch(e){
            alert(e.message);
        }
      })
      },
     colorBoards: function () {
     const colors = document.querySelectorAll(".js-color");
     colors.forEach((color)=>{
         color.addEventListener("click",(e)=>{
             console.log(color.dataset.color);
             console.log(e.target);
         const colorbody = document.querySelector(".create__boards")
         colorbody.style.backgroundColor = color.dataset.color
         })
     })
     }
  }
}

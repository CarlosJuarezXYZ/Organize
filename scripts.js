import { STORE } from "./assets/scripts/store.js";
import Login from "./assets/scripts/login.js";
import Main from "./assets/scripts/main.js";
import { indexBoards } from "./assets/scripts/services/boards_services.js";
import Close from "./assets/scripts/close_board.js";
import ShowUser from "./assets/scripts/myProfile.js";
import CreateBoard from "./assets/scripts/create_boards.js";
import showBoard from "./assets/scripts/board.js";
import showCard from "./assets/scripts/card.js"


async function init() {
  // login
  const login = new Login(".js-content");
  login.render();

  if(sessionStorage.getItem("token") && sessionStorage.getItem("token") !== null){
    
    STORE.user.id = sessionStorage.getItem("userid");
    STORE.boards = await indexBoards();
    
    const main = new Main(".js-content");
    main.render();
    
    const user = new ShowUser(".js-content");
    user.viewUser();

    const close = new Close(".js-content");
    close.viewClosedBoard();

    const create = new CreateBoard(".js-content");
    create.viewCreateBoard();

    const board = new showBoard(".js-content");
    board.viewListsListener();

    const card = new showCard(".js-content");
    card.viewCardListener();

  }else {
    login.render();
  }
}

init();

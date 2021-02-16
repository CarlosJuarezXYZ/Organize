// import SessionsService from "./services/sessions_service.js";
import Main from "./main.js";
import { indexBoards } from "./services/boards_services.js";
import { login } from "./services/sessions_services.js";
import { CreateUser } from "./signup.js";
import { STORE } from "./store.js";
import Close from "./close_board.js";
import ShowUser from "./myProfile.js";
import CreateBoard from "./create_boards.js";
import showBoard from "./board.js";
import showCard from "./card.js"

export default function Login(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      const html = `
      <div class="form-container">
      <section class="container">
      <form class="js-login-form login-form">
        <div class="fields">
          <label>Username</label>
          <input type="text" name="username">
        </div>
        <div class="fields">
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <div>
          <button type="submit" class="submit--button">Login</button>
      </div>
        <a class="js-redirect-signup" href="#">Create an Account</a>
      </form>
    </section>
    </div>
      `;
      this.parent.innerHTML = html;
      this.redirectCreateUserView();
      this.addFormSubmitListener();
    },
    addFormSubmitListener: function () {
      // para renderizar los boards
      const form = this.parent.querySelector(".js-login-form");
      form.addEventListener("submit", async (e) => {
        if (form === e.target) {
          e.preventDefault();
          const { username, password } = form;
          try{
            const data = await login( username.value, password.value);
            sessionStorage.setItem("token", data.token);
            if(data.token){
              sessionStorage.setItem("userid", data.id);
              // console.log(STORE.user);
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
            }
          }catch (e) {
            console.log(e);
        }
        }
      });
    },
    redirectCreateUserView() {
      const trigger = this.parent.querySelector('.js-redirect-signup');
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const createuser = CreateUser(parentElement)
        createuser.render();
      })
    }
  };
}

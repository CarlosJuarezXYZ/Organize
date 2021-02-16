import { indexBoards } from "./services/boards_services.js";
import Main from "./main.js";
import Login from './login.js';
import { createUser } from "./services/users_services.js";
import { STORE } from "./store.js"
import Close from "./close_board.js";
import ShowUser from "./myProfile.js";
import CreateBoard from "./create_boards.js";
import showBoard from "./board.js";
import showCard from "./card.js"

export function CreateUser(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render() {
      const html = `
      <div class="form-container">
      <section class="container">
      <form class="js-signup-form signup-form">
        <div class="fields">
          <label>Username</label>
          <input type="text" name="username">
        </div>
        <div class="fields">
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <div class="fields">
          <label>Email</label>
          <input type="email" name="email">
        </div>
        <div class="fields">
          <label>Firstname</label>
          <input type="text" name="firstname">
        </div>
        <div class="fields">
          <label>Lastname</label>
          <input type="text" name="lastname">
        </div>

        <div>
          <button type="submit" class="submit--button">Create!</button>
      </div>
        <a class="js-redirect-login" href="#">or login with existing user</a>
      </form>
    </section>
    </div>
      `
      this.parent.innerHTML = html;
      this.addFormSubmitListener();
      this.redirectLoginView();
    },
    addFormSubmitListener() {
      //crear un nuevo usuario
      const form = this.parent.querySelector('.js-signup-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { username, password, email, firstname, lastname } = form
        try{
          const data = await createUser(username.value, email.value, firstname.value, lastname.value, password.value)
          sessionStorage.setItem('token', data.token);
          console.log(data.token);
          if (data.token){
            sessionStorage.setItem("userid", data.id);
            // STORE.user.id = sessionStorage.getItem("userid");
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
          }}
          catch(e) {
            alert(e)}
      })
    },
    redirectLoginView() {

      //back to user
      const trigger = this.parent.querySelector('.js-redirect-login');
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const login = Login(parentElement)
        login.render();
      })
    }
  }
}
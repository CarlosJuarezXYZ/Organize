import { updateUser } from "./services/users_services.js";
import ShowUser from "./myProfile.js";
import {showUser} from "./services/users_services.js";
import { STORE } from "./store.js";

export default function EditProfile(parentElement, data){
  return {
    parent: document.querySelector(parentElement),
    render: function(){
      const html = `
      <div class="form-container">
      <div class="container-boards">
        <div class="container__navs">
        <div class = "nav__myBoards">
          <p><a href="#" class="js-redirect-main">My boards</a></p>
        </div>
        <div class = "nav__closedBoards">
          <p><a href="#" class="js-redirect-closedboards">Closed boards</a></p>
        </div>
        <div class = "nav__myProfile active">
          <p><a href="#" class="js-redirect-showuser">My Profile</a></p>
        </div>
        <div class = "nav__logout">
          <p><a href="#" class="js-logout">Log out</a></p>
        </div>
        </div>
        <section class="container user-profile-form">
        <form class="js-edit-profile-form edit-profile-form">
          <div class="fields">
            <label>Username</label>
            <input type="text" name="username" value="${data.username}">
          </div>
          <div class="fields">
            <label>Email</label>
            <input type="email" name="email" value="${data.email}">
          </div>
          <div class="fields">
            <label>Firstname</label>
            <input type="text" name="firstname" value="${data.firstName}">
          </div>
          <div class="fields">
            <label>Lastname</label>
            <input type="text" name="lastname" value="${data.lastName}">
          </div>

          <div class="buttons">
            <button type="submit" class="submit--button">Save</button>
            <button type="submit" class="cancel--button">Cancel</button>
        </div>
        </form>
      </section>
      </div>
      `;
      this.parent.innerHTML = html;
      this.addReturnMyProfileListener();
      this.addSaveEditUserListener();
      this.addLogoutListener();
    },
    addReturnMyProfileListener() {
      const backItem = document.querySelector(".cancel--button");
      backItem.addEventListener("click", async (e) => {
        e.preventDefault();
        const myprofile = ShowUser(parentElement);
        STORE.user.id = sessionStorage.getItem("userid");
        const userId = STORE.user.id;
        let data = await showUser(userId);
        // console.log(data);
        myprofile.render(data);
      });
    },
    addSaveEditUserListener() {
      const form = this.parent.querySelector(".js-edit-profile-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          // console.log("editando .. ")
          const userId = sessionStorage.getItem("userid");
          const { username, email, firstname, lastname } = form;
          console.log(username.value, email.value, firstname.value, lastname.value);
          const new_data = await updateUser(userId, username.value, email.value, firstname.value, lastname.value);
          const data = await showUser(userId);
          const myprofile = ShowUser(parentElement);
          myprofile.render(data);
        }catch(e) {
          alert(e)
        }
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
    }
  }
}
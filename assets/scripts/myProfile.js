import { showUser } from "./services/users_services.js";
import { logout } from "./services/sessions_services.js";
import Login from "./login.js";
import { deleteUser } from "./services/users_services.js";
import EditProfile from "./editProfile.js"; 
import { STORE } from "./store.js";

export default function ShowUser(parentElement){

  return {
    parent: document.querySelector(parentElement),
    render: function(data){
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
        <form class="js-profile-form profile-form">
          <div class="fields">
            <label>Username</label>
            <input type="text" name="username" value="${data.username}" readonly class="myprofile_field">
          </div>
          <div class="fields">
            <label>Email</label>
            <input type="email" name="email" value="${data.email}" readonly class="myprofile_field">
          </div>
          <div class="fields">
            <label>Firstname</label>
            <input type="text" name="firstname" value="${data.firstName}" readonly class="myprofile_field">
          </div>
          <div class="fields">
            <label>Lastname</label>
            <input type="text" name="lastname" value="${data.lastName}" readonly class="myprofile_field">
          </div>

          <div class="buttons">
            <button type="submit" class="edit--button">Edit</button>
            <button type="submit" class="delete--button">Delete</button>
        </div>
        </form>
      </section>
      </div>`;
      this.viewUser();
      this.parent.innerHTML = html;
      this.addLogoutListener();
      this.redirecteditUserView();
      this.addDeleteUserListener();
    },
    viewUser: function(){
      const container = document.querySelector(".js-content");
      container.addEventListener("click", async (e)=>{
        const viewuser = container.querySelector(".js-redirect-showuser");
          STORE.user.id = sessionStorage.getItem("userid");
          // console.log(STORE.user.id);
          // console.log(STORE.user.token);
          const userId = STORE.user.id;
          let data = await showUser(userId);
          // console.log(data);
          // console.log(user_id);
          // const data = showUser( user_id );
        if(viewuser==e.target){
            this.render(data);
        }
      })
    },
    redirecteditUserView(){
      const trigger = this.parent.querySelector('.edit--button');
      trigger.addEventListener('click', async (e) => {
        e.preventDefault();
        STORE.user.id = sessionStorage.getItem("userid");
        const userId = STORE.user.id;
        let data = await showUser(userId);
        const editProfile = EditProfile(parentElement, data)
        editProfile.render();
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
    addDeleteUserListener() {
      const deleteuser= document.querySelector('.delete--button');
      deleteuser.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          console.log("Borrando");
          STORE.user.id = sessionStorage.getItem("userid");
          const userId= STORE.user.id;
          console.log("Borrando", userId);
          await deleteUser(userId);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userid");
          const login = Login(parentElement);
          login.render();
        }catch(e) {
          alert(e)
        }
      })
    },
  }
}
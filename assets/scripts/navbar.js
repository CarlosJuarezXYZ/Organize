
export function Navbar(parentElement){
  return {
    parent: document.querySelector(parentElement),
    render() {
      html = `
      <div class="container-boards">
      <div class="container__navs">
        <div class = "nav__myBoards">
          <p>My boards</p>
        </div>
        <div class = "nav__closedBoards">
          <p>Closed boards</p>
        </div>
        <div class = "nav__myProfile">
          <p>My Profile</p>
        </div>
        <div class = "nav__logout">
          <p>log out</p>
        </div>
      </div>`;
      this.document.innerHTML = html;
    },
    
  }

}
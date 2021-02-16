
import { STORE } from "../store.js";

export default function viewCard() {
  return `
  <div class="modal-container">
  <section class="modal">
        <div><h2 class="modal__header">${STORE.card.name}</h2></div>
        <div class="modal__left">
          <div class="modal__left--labels">
            <div class="modal__title">LABELS</div>
          </div>
            <h2 class="modal__title">DESCRIPTION</h2>
            <p class="modal__description">This is the description of the card. It could be long or short.</p>
            <button class="modal__description--button">Edit</button>
           
                  <div class="checklist" style="overflow:scroll;height:350px">
                      
                       
                        ${STORE.card.checklists.map((check)=>builCheckList(check)).join("")}
                       
                         
                          <div class="create-checklist">
                              <form class="form-checklist">
                                <input type="text" class="input-list" placeholder="Checklist..."/>
                                <button type = "submit" class="add-list">Add</button>
                              </form>                    
                          </div>

                  </div>




          <div>
            
          </div>

         
          
        </div>
        <div class="modal__right">
          <div class="modal__right--labels">
            <div class="">LABELS</div>
            <div class="list-labels">
              <!--ITERAR MI LIST DE LABELS-->
              <div class="label_list">
                <div class="label__modal label__modal-1"></div>
                <img src="./assets/img/edit.png" alt="edit icon">
              </div>
              <div class="label_list">
                <div class="label__modal label__modal-2"></div>
                <img src="./assets/img/edit.png" alt="edit icon">
              </div>
              <button class="label-new">Create a new label</button>
            </div>
          </div>
          <button class="button__delete-card">Delete Card</button>
        </div>
      </section>
      </div>
  `
}

const builCheckList = function(check){
  console.log(check);
  return `
  <!--iterar-->
  <div class="checktask">

      <h3>${check.name}</h3>
        <div class="task">
          <p>Login task</p><button data-id="${check.checklistId}" class="delete-task">delete</button>
        </div>
        <!--iterar-->
        ${check.checkItems.map((item)=>buildItem(item)).join("")}
  <!------------------------------->
    <form data-id = "${check.checklistId}" class="create-add">
      <input name = "title" type="text" placeholder=new item">
      <button data-id = "${check.checklistId}" class="item-create" type = "submit">Add</button>
    </form>
  </div>
<!--------------------->
  `
}

const buildItem = function(item){
  return `
  <div class="items">
  <input type="checkbox"><p>${item.name}</p>
</div>

  `
}

// from the DOM
let body = document.querySelector('body')
let card = document.querySelector('#card')
let inputForm = document.querySelector('#input')
let taskInput = document.querySelector('.task-input')
let taskSubmit = document.querySelector('.submit')
let taskList = document.querySelector('#task-list')
let filter = document.querySelector('.filter-tasks')
let clearFilter = document.querySelector('.clear-filter')
let sort = document.querySelector('#sort > select')
let sortAndFilter = document.querySelector('#card > section')

// create elements
let newTask = document.createElement('div')
let taskHeading = document.createElement('h3')
let deleteAll = document.createElement("button")

// set attributes
newTask.id = "allTasks"
deleteAll.className = "deleteAll"
deleteAll.textContent = "Delete All"

// css styling tweak
taskInput.style.height = 0
filter.style.height = 0
sortAndFilter.style.display = "none"
clearFilter.style.display = "none"


// create a pop-up card, to confirm delete
// create pop-up element
let popUp = document.createElement('section')
popUp.classList.add('popup')

//pop-up main div
let popUpMain = document.createElement('div') 
popUpMain.classList.add('main-popUp')

// cancel button
popUpMain.innerHTML = "<span>×</span>"

// pop-up card heading 
let popUpHeading = document.createElement('p')

// pop-up card buttons div
let popUpConfirm = document.createElement('div')
popUpConfirm.innerHTML = `
   <button class="popUpCancel">Cancel</button>
   <button class="popUpDelete">Delete</button>
`

// apppend heading and buttons div to pop-up main div
popUpMain.appendChild(popUpHeading)
popUpMain.appendChild(popUpConfirm)

// append pop-up main div to pop-up element
popUp.appendChild(popUpMain)

// append pop-up element to body tag
document.body.appendChild(popUp)
popUp.style.display = "none"

// pop-up buttons
let popUpDelete = document.querySelector('.popUpDelete')
let popUpCancel = document.querySelector('.popUpCancel')
let popUpExit = document.querySelector('.main-popUp > span')


// focus on the task input & set height
taskInput.addEventListener('mouseenter', () => {
   taskInput.style.height = '30px'
   taskInput.style.color = 'inherit'
   
   // focus on the task input
   taskInput.focus();

})

// focus on the filter input & set height
filter.addEventListener('mouseenter', () => {
   filter.style.height = '20px'
   filter.style.paddingTop = '5px'
   filter.style.color = 'inherit'
   
   // focus on the filter input
   filter.focus();
   
   // close the task input & hide its value
   taskInput.style.height = 0
   taskInput.style.color = 'transparent'
});

// creates new task on submit
inputForm.addEventListener('submit', (e) => {

   // creating new task function 
   if (taskInput.value.length > 0) {

      // set attributes on event
      newTask.innerHTML = `
      <div class="listDiv uncompleted">
         <p>
         ${taskInput.value}
         <span class= "task-complete">✔</span>
         <span class="delete-task">×</span>
         </p>
      </div> 
      ${newTask.innerHTML}
      `
      taskHeading.innerHTML = "Tasks"

      // attach elements to the DOM
      taskList.appendChild(taskHeading);
      taskList.appendChild(newTask);

      // reset task input value 
      taskInput.value = "";
   }
   
   // append "delete all" button
   if (newTask.children.length >= 1) {
      taskHeading.appendChild(deleteAll)

      deleteAll.style.display = "none"
      
   }
   
   // display "delete all" button
   if (newTask.children.length > 1) {
      deleteAll.style.display = "block"
      sortAndFilter.style.display = ""
   }

   // prevent default form behaviour
   e.preventDefault()
});

// deletes all tasks
document.body.addEventListener("click", (e) => {
   if(e.target.classList.contains('deleteAll')) {

      // // delete the all tasks
      // for(i = e.target.previousSibling.children.length; i > 0; i-- ){
         
      //    e.target.previousSibling.children[0].remove();
      // }

      // // remove the tasks heading
      // e.target.previousSibling.previousSibling.remove();

      // // remove the div containing all the tasks
      // e.target.previousSibling.remove()

      
      // // delete the "delete all" button
      // e.target.remove();

      // (faster) (best practice)
      popUp.style.display = "block"
      popUpHeading.textContent = "are you sure you want to delete all tasks?"
      body.style.overflowY = "hidden"
      
      // remove pop-up and delete all tasks
      popUpDelete.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"

         while(newTask.firstChild){
            // remove the tasks heading
            taskHeading.remove()
            // delete the "delete all" button
            deleteAll.remove()
            // delete all the tasks
            newTask.removeChild(newTask.firstChild)
            // hide filter
            sortAndFilter.style.display = "none"
            // clear filter value
            filter.value = '';
            // hide clear filter button
            clearFilter.style.display = "none"
            
         }
      })

      // remove pop-up
      popUpCancel.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"
      })

      // remove pop-up
      popUpExit.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"
      })

   }
});

// delete selected task
document.body.addEventListener("click", (e) => {
   if(e.target.classList.contains('delete-task') && newTask.children.length == 1) {
      // e.target.parentElement.parentElement.parentElement.previousSibling.remove()
      // e.target.parentElement.parentElement.parentElement.nextSibling.remove()

      // (best practice) instead of targeting parent-parent elements
      deleteAll.remove()
      taskHeading.remove()
      sortAndFilter.style.display = "none"
      e.target.parentElement.parentElement.remove()
      clearFilter.style.display = "none"   
      filter.value = ''

      
   }

   if(e.target.classList.contains('delete-task')) {
      popUp.style.display = "block"
      popUpHeading.textContent = "are you sure you want to delete task?"
      body.style.overflowY = "hidden"

      // remove pop-up and delete selected task
      popUpDelete.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"

         e.target.parentElement.parentElement.remove()
      })

      // remove pop-up
      popUpCancel.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"
      })

      // remove pop-up
      popUpExit.addEventListener('click', () => {
         popUp.style.display = "none"
         body.style.overflowY = "auto"
      })
   }
});


// filter through task 
filter.addEventListener("keyup", (e) => {

   // convert all text inputed in the filter input to lowercase
   let filterText = e.target.value.toLowerCase()

   // show and hide clear filter button
   if (e.target.value.length >= 1) {
      clearFilter.style.display = "block"
   } else {
      clearFilter.style.display = "none"   
   }

   // filter through tasks with the filter input value
   document.querySelectorAll('.listDiv').forEach(function(text){
      if(text.textContent.toLowerCase().indexOf(filterText) != -1){
         text.style.display = "block"
         taskHeading.style.display = "flex"
         deleteAll.style.display = "initial"
      } else {
         text.style.display = "none"
         deleteAll.style.display = "none"
         taskHeading.style.display = "none"
      }
      
      // clear filter
      clearFilter.addEventListener("click", () => {
         text.style.display = "block"
         filter.value = '';
         clearFilter.style.display = "none"
         
         deleteAll.style.display = "initial"
         taskHeading.style.display = "flex"
      })

      // clear filter when a new task input is submitted
      inputForm.addEventListener('submit', () => {
         filter.value = '';
         clearFilter.style.display = "none"
         filter.style.height = 0
         text.style.display = "block"
         deleteAll.style.display = "initial"
         taskHeading.style.display = "flex"
      })
   })
   
})

// mark tasks
document.body.addEventListener('click', (e) => {

   // if task is marked as complete
   if (e.target.classList.contains('task-complete') && e.target.style.color == "green") {
      e.target.style.color = "rgb(190, 216, 189)";
      e.target.parentElement.style.textDecoration = "none"
      e.target.parentElement.style.color = "inherit"

      e.target.parentElement.parentElement.classList.remove('completed')
      e.target.parentElement.parentElement.classList.add('uncompleted')
   }
   // if task hasn't been marked as complete
   else if (e.target.classList.contains('task-complete')) {
      e.target.style.color = "green" 
      e.target.parentElement.style.textDecoration = "line-through"
      e.target.parentElement.style.color = "rgb(104, 104, 104)"

      e.target.parentElement.parentElement.classList.add('completed')
      e.target.parentElement.parentElement.classList.remove('uncompleted')


   }
});

// sort tasks
sort.addEventListener('change', (e) => {
   
   let sortValue = e.target.value;

   document.querySelectorAll('.listDiv').forEach((item) => {

      item.style.display = "none"
      
      // display all task list items 
      if (sortValue == 'all' && item.classList.contains('listDiv')) {
         item.style.display = "block"
      }

      // display "not completed" list items
      if (sortValue == 'uncompleted' && item.classList.contains('uncompleted')) {
         item.style.display = "block"
      }

      // display "completed" list items
      if (sortValue == 'completed' && item.classList.contains('completed')) {
         item.style.display = "block"
      }
   
   })

   // for (let i = 0; newTask.children.length > i; i++) {

   //    console.log(newTask.children[i])
   //    if (newTask.children[i].classList.contains('completed')) {
         
   //    }
   // }

});
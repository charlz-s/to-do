// from the DOM
let card = document.querySelector('#card')
let inputForm = document.querySelector('#input')
let taskInput = document.querySelector('.task-input')
let taskSubmit = document.querySelector('.submit')
let taskList = document.querySelector('#task-list')
let filter = document.querySelector('.filter-tasks')
let clearFilter = document.querySelector('.clear-filter')

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
filter.parentElement.parentElement.style.display = "none"
clearFilter.style.display = "none"

// focus on the task input & set height
taskInput.addEventListener('mouseenter', function(){
   taskInput.style.height = '30px'
   taskInput.style.color = 'inherit'
   
   // focus on the task input
   taskInput.focus();

})

// focus on the filter input & set height
filter.addEventListener('mouseenter', () => {
   filter.style.height = '30px'
   filter.style.color = 'inherit'
   
   // focus on the filter input
   filter.focus();
   
   // close the task input & hide its value
   taskInput.style.height = 0
   taskInput.style.color = 'transparent'
})

// creates new task on submit
inputForm.addEventListener('submit', createNewTask)

//creating new task function
function createNewTask(e){
   
   if (taskInput.value.length > 0) {
      // set attributes on event
      newTask.innerHTML = `
      <div class="listDiv">
         <p>
         ${taskInput.value} 
         <span class="delete-task">×</span>
         </p>
      </div>
      `
      taskHeading.innerHTML = "Tasks"

      // attach elements to the DOM
      taskList.appendChild(taskHeading);
      taskList.appendChild(newTask);

      // reset task input value 
      taskInput.value = "";
   }
   
   // display "delete all tasks" button
   if (newTask.children.length >= 1) {
      taskHeading.appendChild(deleteAll)

      deleteAll.style.display = "none"
      
   }
   
   if (newTask.children.length > 1) {
      deleteAll.style.display = "block"
      filter.parentElement.parentElement.style.display = "block"
   }
   
   // prevent default form behaviour
   e.preventDefault()
}



// deletes all tasks
document.body.addEventListener("click", function(e){
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
      while(newTask.firstChild){
         // remove the tasks heading
         taskHeading.remove()
         // delete the "delete all" button
         deleteAll.remove()
         // delete all the tasks
         newTask.removeChild(newTask.firstChild)
         // hide filter
         filter.parentElement.parentElement.style.display = "none"
         // clear filter value
         filter.value = '';
         // hide clear filter button
         clearFilter.style.display = "none"   
         
      }

   }
});

// delete selected task
document.body.addEventListener("click", function(e){
   if(e.target.classList.contains('delete-task') && newTask.children.length == 1) {
      // e.target.parentElement.parentElement.parentElement.previousSibling.remove()
      // e.target.parentElement.parentElement.parentElement.nextSibling.remove()

      // (best practice) instead of targeting parent-parent elements
      deleteAll.remove()
      taskHeading.remove()
      filter.parentElement.parentElement.style.display = "none"
      e.target.parentElement.parentElement.remove()
      clearFilter.style.display = "none"   
      filter.value = '';

      
   }

   if(e.target.classList.contains('delete-task')) {
      e.target.parentElement.parentElement.remove()
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

   })
   
})


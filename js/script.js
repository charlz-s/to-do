// from the DOM
let card = document.querySelector('#card')
let inputForm = document.querySelector('#input')
let taskInput = document.querySelector('.task-input')
let taskSubmit = document.querySelector('.submit')
let taskList = document.querySelector('#task-list')

// create elements
let newTask = document.createElement('div')
let taskHeading = document.createElement('h3')
let deleteAll = document.createElement("button")

// set attributes
newTask.id = "allTasks"
deleteAll.className = "deleteAll"
deleteAll.textContent = "Delete All Tasks"


taskInput.style.height = 0
taskInput.addEventListener('mouseover', function(e){
   taskInput.style.height = '30px'

   taskInput.focus();


})

// new creating task function
function createNewTask(e){
   
   if (taskInput.value.length > 0) {
      // set attributes on event
      newTask.innerHTML += `
      <div class="listDiv">
         <p>
         ${taskInput.value} 
         <span class="delete-task">×</span>
         </p>
      </div>
      `
      taskHeading.innerHTML = "Tasks"

      // attcch elements to the DOM
      taskList.appendChild(taskHeading);
      taskList.appendChild(newTask);

      // reset task input value 
      taskInput.value = "";
   }
   
   // display "delete all tasks" button
   if (newTask.children.length >= 1) {
      taskList.appendChild(deleteAll)
   }

   // prevent default form behaviour
   e.preventDefault()
}

// creates new task on submit
inputForm.addEventListener('submit', createNewTask)

// deletes all tasks
// deleteAll.addEventListener("click", function(e){
// })

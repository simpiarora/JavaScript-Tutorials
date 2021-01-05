//Define UI Vars
const form = document.querySelector('#task-form');  //# means ID
const taskList = document.querySelector('.collection'); //. means Class
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM Load event - to get any already available tasks in localStorage
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove a specific task
    taskList.addEventListener('click',removeTask);
    //Clear all tasks
    clearbtn.addEventListener('click',clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup',filterTasks);
    console.log(form);
}

//Get Tasks from LocalStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li item 
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content' //If you want to place it in right side than use secondary-content
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }else{
        console.log('hi');
        //Create new Task
        //Create li item 
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content' //If you want to place it in right side than use secondary-content
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        
        //Append li to ul
        taskList.appendChild(li);

        //Store in LocalStorage of browser using JS
        storeTaskInLocalStorage(taskInput.value);

        //Clear the input
        taskInput.value = '';
    }
    e.preventDefault();
}

//Remove Task
function removeTask(e){
    console.log('Hi'+e);
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    //e.preventDefault();
}

//REmove from Local Storage on click of X
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear Tasks
function clearTasks(e){
    //InnerHtml-slow
    //taskList.innerHTML = '';

    //removeChild - faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear Tasks from LocalStorage
    clearTasksFromLocalStorage();
}

//Clear Tasks from LocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

//Store Tasks
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const  todoList=document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter =document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // tüm event listenerlar

form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearaAllTodos);

}
function clearaAllTodos(e){
    //arayüzden todoları temizleme
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //todoList.innerHTML= ""; Yavaş
        while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);

        }   
        localStorage.removeItem("todos");     
    }
}

function filterTodos(e){
  
    const filtervalue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text= listItem.textContent.toLowerCase();
        if(text.indexOf(filtervalue)===-1){
            //bulamadı
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}


function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo kaldırıldı.");
    }
}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}
function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo===deleteTodo){
            todos.splice(index,1); // arrayden değeri silebiliriz.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}
function addTodo(e){

    const newTodo=todoInput.value.trim();

    if(newTodo===""){
        /*<div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div>*/ 
        showAlert("danger","Lütfen bir ToDo giriniz..");

    }


    else{
          addTodoToUI(newTodo);
          addTodoToStorage(newTodo);
          showAlert("success","Todo başarıyla eklendi");
        
        }
   
    e.preventDefault();

}
function getTodosFromStorage(){ // storageden todoları alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo){ 
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}












function showAlert(type,message){
    const alert = document.createElement("div");
    
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    //setTimeOut

    setTimeout(function(){
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo){ // string değerini list item olarak UI 'ya ekleyecek

    // <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>


    //list item oluşturm
    const listItem = document.createElement("li");
    // link oluşturma
    const link=document.createElement("a");
    link.href="#",
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    // Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // todo liste list item ekleme

    todoList.appendChild(listItem);

    todoInput.value="";


}
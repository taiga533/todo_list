let completedTodo = document.querySelector(".completed")
let check = document.querySelector(".toggle")
console.log(check)
check.onclick = function(){
    if(check.checked === false){
        completedTodo.classList.remove("completed")
    }else{
        completedTodo.classList.add("completed")
    }
}

class TodoList {
    constructor() {
        this.storageKey = "todo-list"
        this.todoArray = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        this.todoArray.map(todo => {
            document.querySelector(".todo-list")
                    .appendChild(createTodo(todo.label, todo.isCompleted, todo.id))
        })
        recalcIncompleteCount()
    }

    addTodo(label, isCompleted, id) {
        this.todoArray.push({
            label,
            isCompleted,
            id
        })
        this.saveTodos()
    }

    deleteTodo(deleteTargetId) {
        this.todoArray = this.todoArray.filter(todo => todo.id != deleteTargetId)
        this.saveTodos()
    }

    updateTodoLabel(updateTargetId, label) {
        this.todoArray = this.todoArray.map(todo => {
            if (todo.id == updateTargetId) {
                todo.label = label
            }
            return todo
        })
        this.saveTodos()
    }

    updateTodoStatus(updateTargetId, isCompleted) {
        this.todoArray = this.todoArray.map(todo => {
            if (todo.id == updateTargetId) {
                todo.isCompleted = isCompleted
            }
            return todo
        })
        this.saveTodos()
    }

    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todoArray))
    }
}

const todoList = new TodoList()

function deleteCompletedTodo() {
    const deleteCompletedTodoButton = document.querySelector('.clear-completed');
    
    deleteCompletedTodoButton.addEventListener('click',()=>{
        const toggleCheckboxes = document.querySelectorAll(".toggle")
        const todoWrapper = document.querySelector("#todoList")
        const views = document.querySelectorAll('.view');
        views.forEach(view =>{
            if(view.parentNode.classList.contains("completed") === true){
                todoWrapper.removeChild(view.parentNode);
                todoList.deleteTodo(view.parentNode.getAttribute("data-todo-id"))
            }
        })
    })
}

function toggleAllTodoStatus() {
    const completeAllCheckbox = document.querySelector('#toggle-all');
    
    completeAllCheckbox.addEventListener('change', () => {
        const toggleCheckboxes = document.querySelectorAll(".toggle");
        const views = document.querySelectorAll('.view');
        views.forEach(view =>{
            view.parentNode.classList.toggle("completed")
        })
        toggleCheckboxes.forEach(toggleCheckbox =>{
            toggleCheckbox.checked = !toggleCheckbox.checked
            todoList.updateTodoStatus(toggleCheckbox.parentNode.parentNode.getAttribute("data-todo-id"), toggleCheckbox.checked)
        })
        recalcIncompleteCount()
    })
}

const addTodoButton = document.querySelector('.new-todo')

function addTodo() {
    const todoInput = document.querySelector(".new-todo")
    
    todoInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            const todoObj = {
                label: todoInput.value,
                isCompleted: false,
                id: Date.now()
            }
            const todo = createTodo(todoObj.label, todoObj.isCompleted, todoObj.id)
            todoList.addTodo(todoObj.label, todoObj.isCompleted, todoObj.id)
            document.querySelector(".todo-list").appendChild(todo)
            todoInput.value = ""
            recalcIncompleteCount()
        }
        
    })
}

function createTodo(labelText, isCompleted, id) {
    const todoWrapper = document.createElement("li")
    const todoView = document.createElement("div")
    todoView.classList.add("view")
    
    const toggleStatusCheckbox = createToggleStatusCheckbox(isCompleted)
    if (isCompleted) {
        todoWrapper.classList.add('completed')
    }
    todoWrapper.setAttribute("data-todo-id", id)

    const todoLabel = createTodoLabel(labelText)
    const todoDestroyButton = createTodoDestroyButton()
    const todoEditElement = createTodoEditElement()
    
    todoView.appendChild(toggleStatusCheckbox)
    todoView.appendChild(todoLabel)
    todoView.appendChild(todoDestroyButton)
    todoWrapper.appendChild(todoView)
    todoWrapper.appendChild(todoEditElement)
    
    grantEditMode(todoWrapper)
    return todoWrapper
}

function createToggleStatusCheckbox(isCompleted) {
    const toggleStatusCheckbox = document.createElement("input")
    toggleStatusCheckbox.type = "checkbox"
    toggleStatusCheckbox.classList.add("toggle")
    toggleStatusCheckbox.checked = isCompleted
    
    toggleStatusCheckbox.addEventListener('click',()=>{
        todoList.updateTodoStatus(
                toggleStatusCheckbox.parentNode.parentNode.getAttribute("data-todo-id"), toggleStatusCheckbox.checked)
        if(toggleStatusCheckbox.checked === true){
            toggleStatusCheckbox.parentNode.parentNode.classList.add("completed")
        }else{
            toggleStatusCheckbox.parentNode.parentNode.classList.remove("completed")
        }
        recalcIncompleteCount()
    })
    
    return toggleStatusCheckbox
}

function createTodoLabel(labelText) {
    const todoLabel = document.createElement("label")
    todoLabel.classList.add("content")
    todoLabel.innerText = labelText
    return todoLabel
}

function createTodoDestroyButton() {
    const todoDestroyButton = document.createElement("button")
    todoDestroyButton.classList.add("destroy")
    
    todoDestroyButton.addEventListener('click',() => {
        const todoWrapper = document.querySelector("#todoList")
        todoWrapper.removeChild(todoDestroyButton.parentNode.parentNode)
        todoList.deleteTodo(todoDestroyButton.parentNode.parentNode.getAttribute("data-todo-id"))
        recalcIncompleteCount()
    })
    
    return todoDestroyButton
}

function createTodoEditElement() {
    const todoEditElement = document.createElement("input")
    todoEditElement.classList.add("edit")
    return todoEditElement
}

function incrementIncompleteCount() {
    
    const imcompleteNum = document.querySelector(".imcompleteNum")

    imcompleteCount++;
    imcompleteNum.innerHTML = imcompleteCount;
}

function decrementIncompleteCount() {
    const imcompleteNum = document.querySelector(".imcompleteNum")

    imcompleteCount--;
    imcompleteNum.innerHTML = imcompleteCount;
}

function recalcIncompleteCount() {
    const imcompleteNum = document.querySelector(".imcompleteNum")

    const todoWrapper = document.querySelector("#todoList");
    const imcompleteCount = Array.from(todoWrapper.children).filter(element => {
        return !element.classList.contains("completed")
    }).length

    imcompleteNum.innerHTML = imcompleteCount;
}

function grantEditMode(element){
    const editElement = element.querySelector('.edit')
    const contentElememt = element.querySelector('.content')
    element.addEventListener('dblclick',function(e){
        element.classList.add('editing')
        editElement.focus()

    })
    editElement.addEventListener('blur',()=>{
        element.classList.remove('editing')
        contentElememt.innerText = editElement.value;
        todoList.updateTodoLabel(element.getAttribute("data-todo-id"), editElement.value)
    })
    editElement.addEventListener("keyup", (event) => {
        if (event.keyCode === 13){
            element.classList.remove('editing')
            contentElememt.innerText = editElement.value;
            todoList.updateTodoLabel(element.getAttribute("data-todo-id"), editElement.value)
        }
    })
}

class TodoDisplayFilter {
    constructor() {
        this.todoWrapperAllElements = document.querySelector("#todoList").children
    }
    resetTodoDisplayFilter() {
        Array.from(this.todoWrapperAllElements).map(element => {
            element.style.display = 'none'
        })
    }

    showCompletedTodos() {
        this.showFilteredTodos(element => element.classList.contains('completed'))
    }

    showImcompletedTodos() {
        this.showFilteredTodos(element => !element.classList.contains('completed'))
    }

    showAllTodos() {
        this.showFilteredTodos(element => true)
    }

    showFilteredTodos(conditionFunc) {
        this.resetTodoDisplayFilter()
        const filteredTodos = Array.from(this.todoWrapperAllElements).filter(element =>{
            return conditionFunc(element);
        })
        filteredTodos.forEach(element =>{
            element.style.display = 'block';
        })
    }
}

// 初期化処理
deleteCompletedTodo()
toggleAllTodoStatus()
addTodo()
const todoDisplayFilter = new TodoDisplayFilter()
document.querySelector('#showAllButton').addEventListener('click', () => {
    todoDisplayFilter.showAllTodos()
})
document.querySelector('#showImcompletedButton').addEventListener('click', () => {
    todoDisplayFilter.showImcompletedTodos()
})
document.querySelector('#showCompletedButton').addEventListener('click', () => {
    todoDisplayFilter.showCompletedTodos()
})



const json = `{
    "date": "2020/04/22",
    "temperature": "16",
    "members": [
        "takashi",
        "tarou",
        "hanako"
    ]
}`

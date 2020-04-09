//4月8日からやり始めた範囲↓

const initalizeToggleCheckboxes = () => {
    const toggleCheckboxes = document.querySelectorAll(".toggle")

    toggleCheckboxes.forEach(toggleCheckbox =>{
        toggleCheckbox.addEventListener('click',()=>{
            if(toggleCheckbox.checked === true){
                toggleCheckbox.parentNode.parentNode.classList.add("completed")
            }else{
                toggleCheckbox.parentNode.parentNode.classList.remove("completed")
            }
        })
    })
}

const initalizeDestroyButton = () => {
    const todoWrapper = document.querySelector("#todoList")
    const destroyButtons = document.querySelectorAll(".destroy")

    destroyButtons.forEach(destroyButton => {
        destroyButton.addEventListener('click',() => {
            todoWrapper.removeChild(destroyButton.parentNode.parentNode)
        })
    });
}

// 初期化処理
initalizeDestroyButton()
initalizeToggleCheckboxes()











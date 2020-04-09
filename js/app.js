const completedTodo = document.querySelector(".completed")
const check = document.querySelector(".toggle")

console.log(check)
check.onclick = function(){
    if(check.checked === false){
        completedTodo.classList.remove("completed")
        
    }else{
        completedTodo.classList.add("completed")
        
    }
}
//4月8日からやり始めた範囲↓
const comp = document.querySelector("#comp")
const okashi = document.querySelector("#okashi")

okashi.addEventListener('click',()=>{
    if(okashi.checked === true){
        comp.classList.add("completed");
    }else{
        comp.classList.remove("completed");
    }
})
//お菓子にチェックを付けられるようにした↑

const okashiDel = document.querySelector("#okashiDel");
okashiDel.addEventListener('click',()=>{
    comp.remove();
})
//バツボタンでお菓子欄削除↑

const ramenDel = document.querySelector("#ramenDel");
ramenDel.addEventListener('click',()=>{
    completedTodo.remove();
})











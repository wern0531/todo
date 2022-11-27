const inp = document.querySelector('.inp')
const addBtn = document.querySelector('.addBtn')
const todoList = document.querySelector('.todoList')
const allTodo = document.querySelector('.numL')
const finishTodo = document.querySelector('.numR')
const checkboxTodo = document.querySelector('.checkbox')

let todoItem = []
let checkedItem = []
let finishNum = 0

//新增功能
addBtn.addEventListener('click', function () {
    if (inp.value == '') {
        alert('請輸入內容')
        return
    }
    todoItem.push(inp.value)
    checkedItem.push(false)
    render()
    allTodo.textContent = todoItem.length
    let str = 0;
    checkedItem.forEach(function (item) {
        if (item == true) {
            str += 1
        }
    })
    finishTodo.textContent = `${str}-${todoItem.length}`
    inp.value = ''

})

const render = () => {
    if (todoItem.length == 0) {
        todoList.innerHTML = ''
    } else {
        let str = '';
        todoItem.forEach(function (item, index) {
            if (checkedItem[index] == true) {
                str += `<div class="todoListItem">
         
    <span><input checked type="checkbox" name="" id="${index}" class="checkbox"> ${item}</span>    
    <div class="todoBtn">
        <button class="Revise" type="button" data-id="${index}" value="修改">修改</button>
        <button class="delBtn" type="button" data-id="${index}" value="刪除">刪除</button>
    </div>
    </div>`
                todoList.innerHTML = str
            } else {
                str += `<div class="todoListItem">
         
    <span><input type="checkbox" name="" id="${index}" class="checkbox"> ${item}</span>    
    <div class="todoBtn">
        <button class="Revise" type="button" data-id="${index}" value="修改">修改</button>
        <button class="delBtn" type="button" data-id="${index}" value="刪除">刪除</button>
    </div>
    </div>`
                todoList.innerHTML = str
            }


        })
    }
}

//todoList操作
todoList.addEventListener('click', function (e) {
    if (e.target.value == '刪除') {
        deleteOneTodo(e.target.getAttribute('data-id'))
    } else if (e.target.value == '修改') {
        reviseOneTodo(e.target.getAttribute('data-id'))
    } else if (e.target.value == '確定') {
        const num = e.target.getAttribute('data-id')
        const newText = document.getElementsByClassName('todoListItem')[num].querySelector('.inp').value;
        todoItem[num] = newText;
        render();
    } else if (e.target.value == '取消') {
        render();
    } else if (e.target.checked == true) {
        checkedItem[e.target.id] = true
        let str = 0;
        checkedItem.forEach(function (item) {
            if (item == true) {
                str += 1
            }
        })
        finishTodo.textContent = `${str}-${todoItem.length}`
    } else if (e.target.checked == false) {
        checkedItem[e.target.id] = false
        let str = 0;
        checkedItem.forEach(function (item) {
            if (item == true) {
                str += 1
            }
        })
        finishTodo.textContent = `${str}-${todoItem.length}`
    }
})

//刪除功能
const deleteOneTodo = (item) => {
    todoItem.splice(item, 1);
    checkedItem.splice(item, 1);
    render()
    allTodo.textContent = todoItem.length
    let str = 0;
    checkedItem.forEach(function (item) {
        if (item == true) {
            str += 1
        }
    })
    finishTodo.textContent = `${str}-${todoItem.length}`
}

//修改功能
const reviseOneTodo = (item) => {
    const aa = document.getElementsByClassName('todoListItem')[item];
    const bb = document.getElementsByClassName('todoListItem')[item].querySelector('span').textContent;
    aa.innerHTML = `
    <input class="inp" type="text" value="${bb}">
    <div class="todoBtn">
        <button class="yes" type="button" data-id="${item}" value="確定">確定</button>
        <button class="no" type="button" data-id="${item}" value="取消">取消</button>
    </div>
    `
}



let input = document.querySelector('.todo__list-input'),
    btn = document.querySelector('.todo__list-btn'),
    items = document.querySelector('.todo__list-items');
//let inp_checkbox = document.querySelectorAll('.todo__check');

let do_list = [];

document.addEventListener('DOMContentLoaded', (event)=> {
    event.preventDefault();
    if(localStorage.getItem('tasks')) {
        //console.log(JSON.parse(localStorage.getItem('tasks')));
        do_list = JSON.parse(localStorage.getItem('tasks'));
        renderListToHTML ();
    }
})
class Todo_list {
    constructor(id, item, state) {
        this.id = id;
        this.task = item;
        this.status = state;
    }
    addTolist() {
        do_list.push(this);
    }
}

btn.addEventListener('click', event => {
    if(!input.value) {
        alert('Заполни поле задачи!')
        return;
    }
    let inp = input.value;

    uppend_task(inp); //добавляем задачу на страницу
    input.value = ''; // очистка поле ввода
});

items.addEventListener('click', (event) => {
    if(event.target.dataset.action === 'delete') delete_task(event.target);
    if(event.target.dataset.action === 'done') done(event.target);
})

function uppend_task(text_task) {
    let id_task = Date.now();// генератор ID
    let template = `<li id = "${id_task}" class="todo__list-item">${text_task}<i class="fa fa2 fa-check" data-action="done" aria-hidden="true"></i><i class="fa fa-trash" data-action="delete" aria-hidden="true"></i></li>`;

    items.insertAdjacentHTML('beforeend', template);

    let todo = new Todo_list(id_task, text_task, 0);
    todo.addTolist();    
    //console.log(do_list);
    saveToLocalSt();
}
function delete_task(target) {    
    do_list.forEach((el,i) => {//поиск задачи в массиве
        //let newDoc = new DOMParser().parseFromString(el.element, "text/html").getElementsByTagName("li")[0];
        //if(newDoc.innerText === target.closest('.todo__list-item').innerText) do_list.splice(i, 1);//удаление задачи из объекта
        if(el.id === parseInt(target.closest('.todo__list-item').id)) {
            do_list.splice(i, 1);
            target.closest('.todo__list-item').remove();
            saveToLocalSt();
        }                        
    })
}
function done(target) {    
    for(let key of do_list) {//меняем состояние задачи в объекте                
        if(key.id === parseInt(target.closest('.todo__list-item').id)) {//сравниваем по id задачи
            key.status = key.status ^ 1;
            // console.log(key);
        };        
    };
    target.closest('.todo__list-item').classList.toggle('done__list-item');
    saveToLocalSt();    
}

function saveToLocalSt() {
    localStorage.setItem('tasks', JSON.stringify(do_list));}

function renderListToHTML () {
    do_list.forEach(el => {
        if(el.status) {
            template = `<li id = "${el.id}" class="todo__list-item done__list-item">${el.task}<i class="fa fa2 fa-check" data-action="done" aria-hidden="true"></i><i class="fa fa-trash" data-action="delete" aria-hidden="true"></i></li>`;
        } else {
            template = `<li id = "${el.id}" class="todo__list-item">${el.task}<i class="fa fa2 fa-check" data-action="done" aria-hidden="true"></i><i class="fa fa-trash" data-action="delete" aria-hidden="true"></i></li>`;

        }       
        items.insertAdjacentHTML('beforeend', template);
    })
}

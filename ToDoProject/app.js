const todoList = document.querySelectorAll('.card-body')[1].children[2];
const firstCardBody = document.querySelectorAll('.card-body')[0];
const addButton = document.querySelector('#todoAddButton');
const toDoTitle = document.querySelector('#toDoTitle');
const toDoDesc = document.querySelector('#toDoDesc');

let toDoHeader = [];
let toDoBody = [];
let toDoFooter = [];

run();

function addButtonAlert(message, type) {
    const hr = document.querySelector('hr');
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.role = 'alert';
    div.textContent = message;
    
    firstCardBody.appendChild(div);
    firstCardBody.appendChild(hr);
    let opacity = 1;
    setTimeout(() => {
        let fadeEffect = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(fadeEffect);
                div.style.display = "none";
            } else {
                opacity -= 0.05;
                div.style.opacity = opacity;
            }
        }, 50); 
    }, 1000); 
}


function run() {
    addButton.addEventListener('click', addTodo);
    document.addEventListener('DOMContentLoaded', pageLoad);
}

function addTodo(e) {
    let title = toDoTitle.value.trim();
    let desc = toDoDesc.value.trim();
    if (title == '') {
        addButtonAlert('Başlık boş olamaz!', 'danger');
        return;
    }
    else if (desc == '') {
        addButtonAlert('Açıklama boş olamaz!', 'danger');
        return;
    }
    let date = new Date();
    addNewToDoUI(title, desc, date.toLocaleDateString());
    addButtonAlert('Başarıyla eklendi!', 'success');
    addNewToDoStorage(title, desc, date.toLocaleDateString());

    e.preventDefault(); // Formun sayfayı yenilemesini engeller.
}

function addNewToDoUI(title, desc, day) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between font-weight-bold';

    const div = document.createElement('div');
    div.className = 'card text-bg-primary mb-3 w-100';

    const divHeader = document.createElement('div');
    divHeader.className = 'card-header';
    divHeader.textContent = title.toUpperCase();

    const a = document.createElement('a');
    a.className = 'delete-item';
    a.href = '#';
    a.innerHTML = '<i class="fa fa-remove"></i>';

    divHeader.appendChild(a);

    const divBody = document.createElement('div');
    divBody.className = 'card-body bg-light';

    const p = document.createElement('p');
    p.className = 'card-text text-dark';
    p.textContent = desc;

    divBody.appendChild(p);

    const divFooter = document.createElement('div');
    divFooter.className = 'card-footer text-light text-center font-weight-light';
    divFooter.textContent = 'Eklenme Tarihi: ' + day;

    div.appendChild(divHeader);
    div.appendChild(divBody);
    div.appendChild(divFooter);
    li.appendChild(div);
    todoList.appendChild(li);

    toDoTitle.value = "";
    toDoDesc.value = "";
}

function addNewToDoStorage(title, desc, day) {
    setLocalStorage();
    toDoHeader.push(title);
    toDoBody.push(desc);
    toDoFooter.push(day);
    localStorage.setItem("toDoHeader", JSON.stringify(toDoHeader));
    localStorage.setItem("toDoBody", JSON.stringify(toDoBody));
    localStorage.setItem("toDoFooter", JSON.stringify(toDoFooter));

}

function setLocalStorage() {
    if (localStorage.getItem("toDoHeader") === null) {
        localStorage.setItem("toDoHeader", JSON.stringify([]));
        localStorage.setItem("toDoBody", JSON.stringify([]));
        localStorage.setItem("toDoFooter", JSON.stringify([]));

    }
    else {
        toDoHeader = JSON.parse(localStorage.getItem("toDoHeader"));
        toDoBody = JSON.parse(localStorage.getItem("toDoBody"));
        toDoFooter = JSON.parse(localStorage.getItem("toDoFooter"));
    }
}

function pageLoad() {
    setLocalStorage();
    toDoHeader.forEach((header, index) => {
        addNewToDoUI(index+1+" - "+header, toDoBody[index], toDoFooter[index]);
    });
}


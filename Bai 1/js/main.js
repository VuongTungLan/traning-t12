var win = window;
var doc = win.document;

const ERR_NAME = "Ten khong duoc de trong va phai dung dinh dang";
const ERR_EMAIL = "Email khong duoc de trong va phai dung dinh dang";
const ERR_AGE = "Tuoi khong duoc de trong va phai dung dinh dang";

function el_by_id(id) {
    return doc.getElementById(id);
}

function val_by_id(id) {
    var el = el_by_id(id);
    return el && el.value;
}

var peoples = [
    { id: "0", name: "Tung Lan", email: "tunglan@gmail.com", age: "18" },
    { id: "1", name: "Doan Hoang", email: "tienhoang@gmail.com", age: "30" },
];

function deletePeople(btn) {
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
}

function generateId() {
    var date = new Date();
    return date.getTime();
}

function generateTableHead(table, data) {
    let row = table.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let people of data) {
        let row = table.insertRow();
        for (let key in people) {
            let cell = row.insertCell();
            let text = document.createTextNode(people[key]);
            cell.appendChild(text);
            generateId();
        }
        let cell = row.insertCell();
        cell.innerHTML = "<input type='button' value='delete' name='btnEdit' onclick='deletePeople(this)'  />"
    }
}

function searchName() {
    let input = val_by_id("search").toLowerCase();
    let tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        let value = td.innerText;
        if (value.toLowerCase().indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function addPeople() {
    let form = el_by_id("formAdd")
    form.style.display = "block";
}

function addPeopleToTable() {
    let form = el_by_id("formAdd");
    let newPeople = [
        { id: generateId(), name: form["name"].value, email: form["email"].value, age: form["age"].value },
    ];

    if (validate(newPeople)) {
        for (let people of newPeople) {
            let row = table.insertRow();
            for (let key in people) {
                let cell = row.insertCell();
                let text = document.createTextNode(people[key]);
                cell.appendChild(text);
            }
            let cell = row.insertCell();
            cell.innerHTML = "<input type='button' value='delete' name='btnEdit' onclick='deletePeople(this)'  />"
        }
        form.style.display = "none";
    }
}

function checkPt(pattern, value, location, mess) {
    if (!pattern.test(value)) {
        location.innerText = mess;
        return false;
    }
    location.innerText = "";
    return true;
}

function validate(people) {
    let name = people.map(a => a.name);
    let email = people.map(a => a.email);
    let age = people.map(a => a.age);
    let errName = el_by_id("errName");
    let errEmail = el_by_id("errEmail");
    let errAge = el_by_id("errAge");
    const ptName = new RegExp("^(Lan dep trai)|(anh Hoang xau trai)$");
    const ptEmail = new RegExp("^.+@[a-zA-Z]+[\.]com$");
    const ptAge = new RegExp("^[0-9]+$");
    if (!checkPt(ptName, name[0], errName, ERR_NAME) | !checkPt(ptEmail, email[0], errEmail, ERR_EMAIL) | !checkPt(ptAge, age[0], errAge, ERR_AGE)) {
        return false;
    }
    return true;
}



var table = document.querySelector("table");
table.setAttribute('border', 1);
let thead = Object.keys(peoples[0]);
generateTableHead(table, thead);
generateTable(table, peoples);




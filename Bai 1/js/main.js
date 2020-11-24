const ERR_NAME = "Ten khong duoc de trong va phai dung dinh dang";
const ERR_EMAIL = "Email khong duoc de trong va phai dung dinh dang";
const ERR_AGE = "Tuoi khong duoc de trong va phai dung dinh dang";

var peoples = [
    { id: "0", name: "Tung Lan", email: "tunglan@gmail.com", age: "18" },
    { id: "1", name: "Doan Hoang", email: "tienhoang@gmail.com", age: "30" },
];

function generateId() {
    var date = new Date();
    return date.getTime();
}

function generateTable(peoples) {
    $("table tbody tr").remove();
    for (let people of peoples) {
        let id = people.id;
        let name = people.name;
        let email = people.email;
        let age = people.age;
        let markup = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + email + "</td><td>" + age + "</td><td> <input type='button' class='delete-row' value='Delete'></td></tr> ";
        $("table tbody").append(markup);
    }
}


function searchName(name) {
    let result = [];
    for(let people of peoples) {
        if(people.name.toLowerCase().indexOf(name) > -1) {
            result.push(people);
        }
    }
    return result;
}

function checkPt(pattern, value, location, mess) {
    if (!pattern.test(value)) {
        $(location).text(mess);
        return false;

    }
    $(location).text("");
    return true;
}

function validate(name, email, age) {
    let errName = $("#errName");
    let errEmail = $("#errEmail");
    let errAge = $("#errAge");
    const ptName = new RegExp("^(Lan dep trai)|(anh Hoang xau trai)$");
    const ptEmail = new RegExp("^.+@[a-zA-Z]+[\.]com$");
    const ptAge = new RegExp("^[0-9]+$");
    if (!checkPt(ptName, name, errName, ERR_NAME) | !checkPt(ptEmail, email, errEmail, ERR_EMAIL) | !checkPt(ptAge, age, errAge, ERR_AGE)) {
        return false;
    }
    return true;
}

generateTable(peoples);

$(document).ready(function () {
    $(".show-form").click(function () {
        $("#formAdd").toggle();
    });

    $(".add-row").click(function (e) {
        e.preventDefault();
        let id = generateId();
        let name = $("#name").val();
        let email = $("#email").val();
        let age = $("#age").val();
        if (validate(name, email, age)) {
            let markup = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + email + "</td><td>" + age + "</td><td> <input type='button' class='delete-row' value='Delete'></td></tr> ";
            $("table tbody").append(markup);
            $(".delete-row").click(function () {
                $(this).parents("tr").remove();
            });
            let people = [id, name, email, age];
            peoples.push(people);
        }
    });

    $(".delete-row").click(function () {
        $(this).parents("tr").remove();
    });

    $("#search").keyup(function () {
        let input = $(this).val().toLowerCase();
        generateTable(searchName(input));
    });
})






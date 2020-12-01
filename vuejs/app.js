
function getPeoples(page) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "https://reqres.in/api/users",
            data: { page: page },
            success: function (response) {
                resolve(response)

            },
            error: function () {
                reject("WTF")
            }
        });

    })
}

function generateId() {
    var date = new Date();
    return date.getTime();
}

async function getPeople(id) {
    try {
        let result = await $.ajax({
            url: "https://reqres.in/api/users/",
            data: { id: id },
            type: "GET",
        });
        return result;
    } catch {
        alert("ops");
    }
}

var app = new Vue({
    el: '#app',
    data: {
        filter: "",
        peoples: [],
    },
    created() {
        this.getData()
    },
    methods: {
        getData: function () {
            getPeoples(1)
                .then(function (list) {
                    return list
                })
                .then((list) => {
                    this.peoples = list.data;
                })
                .catch(function (param) {
                    alert(param)
                })
        },
        deletePeople: function (id) {
            this.peoples = this.peoples.filter(function (el) {  
                return el.id != id;
            })
        },
        addPeople: function () {  
            let id = generateId();
            let name = $("#name").val();
            let email = $("#email").val();
            let age = $("#age").val();
            let people = { id: id, first_name: name, email: email, age: age, avatar: "https://ca.slack-edge.com/T4ZUMF18U-UD71D6Q5D-7a534d2dfcbc-512"};
            this.peoples.push(people);
        } 
    },
    computed: {
        filteredPeoples() {
            return this.peoples.filter(people => {
                let name = people.first_name.toLowerCase();
                let searchTerm = this.filter.toLowerCase();
                return name.includes(searchTerm)
            })
        }
    },
})




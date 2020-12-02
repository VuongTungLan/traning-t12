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


var table = {
    data: function () {
        return {
            filter: "",
            peoples: [],
            titles: {},
        }
    },
    created: function () {
        getPeoples(1)
            .then((list) => {
                this.peoples = list.data;
                this.titles = list.data[0];
            })   //// ?????
            .catch(function (param) {
                alert(param)
            })
    },
    methods: {
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
            let people = { id: id, first_name: name, email: email, age: age, avatar: "https://ca.slack-edge.com/T4ZUMF18U-UD71D6Q5D-7a534d2dfcbc-512" };
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
    template: '<div><input type="text" v-model="filter"> <table><thead> <tr> <th v-for="(value,key) in titles">{{key}}</th> </tr> </thead> <tbody> <tr v-for="people in filteredPeoples"> <td>{{people.id}}</td> <td>{{people.email}}</td> <td>{{people.first_name}}</td> <td>{{people.last_name}}</td> <td><img v-bind:src="people.avatar" alt=""></td> <td><button v-on:click="deletePeople(people.id)">delete</button></td> </tr> </tbody> </table> <form onsubmit="return false" id="formAdd"> Name: <input type="text" name="name" id="name"> <!-- <p class="err" id="errName"></p> --> Email: <input type="text" name="email" id="email"> <!-- <p class="err" id="errEmail"></p> --> Age: <input type="number" name="age" id="age"> <!-- <p class="err" id="errAge"></p> --> <input type="button" value="Add" v-on:click="addPeople()"> </form></div>'
}



var app = new Vue({
    el: '#app',
    components: {
        'table-people': table
    }
})

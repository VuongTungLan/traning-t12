export {generateId}
function generateId() {
    var date = new Date();
    return date.getTime();
}


var forms = {
    props: {
        people: {
            type: Object,
            default: () => { }
        },
        type: {
            type: String,
        }
    },
    data() {
        if (this.people != null) {
            return {
                title: this.type,
                id: this.people.id,
                name: this.people.first_name + " " + this.people.last_name,
                email: this.people.email,
                avatar: this.people.avatar,
            }
        } else {
            return {
                title: "ADD",
                id: generateId(),
                name: "",
                email: "",
                avatar: "",
            }
        }

    },
    methods: {
        confirm() {
            let id = this.id
            let first_name = this.name
            let last_name = this.name
            let email = this.email
            let avatar = this.avatar
            let item = { id: id, first_name: first_name, last_name: last_name, email: email, avatar: avatar };
            this.$emit('confirm', item)
        },
        getUrl() {
            let url = this.avatar
            console.log(url);
            return url
        }
    },
    template: '<div class="form--custom"><div class="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins"> <div class="wrapper wrapper--w780"> <div class="card card-3"> <div ><img width="150px" height="150px" v-bind:src="this.getUrl()"/> </div> <div class="card-body">' +
        '<h2 class="title">{{title}}</h2> <form v-on:submit.prevent>' +
        '<div>' +
        '<div class="input-group"> <span class="title">Mật danh</span> <input class="input--style-3" type="text" name="id" v-model="id"> </div>' +
        '<div class="input-group"> <span class="title">Họ và tên</span> <input class="input--style-3" type="text" name="name" v-model="name"> </div>' +
        '<div class="input-group"> <span class="title">Email</span> <input class="input--style-3" type="email" name="email" v-model="email"> </div>' +
        '<div class="input-group"> <span class="title">Avatar</span> <input class="input--style-3" type="text" name="phone" v-model="avatar"> </div>' +
        '</div>' +
        '<div class="p-t-10"> <button class="btn btn--pill btn--green" v-on:click="confirm">OK</button>' +
        '<button class="btn btn--pill btn--green" v-on:click="$emit(\'close\')">CANCEL</button> </div> </form> </div> </div> </div> </div> </div>'
}

var table = {
    data() {
        return {
            filter: "",
            peoples: [],
            titles: {},
            people: "",
            type: "",
        }
    },
    created() {
        this.getPeoples(1)
            .then((list) => {
                this.peoples = list.data;
                this.titles = list.data[0];
            })
            .catch(function (param) {
                console.log(param)
            })
    },
    methods: {
        getPeoples(page) {
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
        },
        deletePeople(id) {
            this.peoples = this.peoples.filter(function (el) {
                return el.id != id;
            })
            this.type = ""
            alert("this enemy has been slain");
        },
        showDialog(people, type) {
            this.people = people
            this.type = type
        },
        addPeople(item) {
            let id = item.id;
            let first_name = item.first_name;
            let last_name = item.last_name;
            let email = item.email;
            let avatar = item.avatar;
            let people = { id: id, first_name: first_name, last_name: last_name, email: email, avatar: avatar };
            this.peoples.push(people);
            this.type = ""
        },
        editPeople(item) {
            for (let people in this.peoples) {
                if (this.peoples[people].id == item.id) {
                    this.peoples[people].first_name = item.first_name;
                    this.peoples[people].last_name = item.last_name;
                    this.peoples[people].email = item.email;
                    this.peoples[people].avatar = item.avatar;
                    break;
                }
            }
            this.type = ""
        },
        confirm(item) {
            if (this.type === "DELETE") {
                this.deletePeople(item.id)
            } else if (this.type === "ADD") {
                this.addPeople(item)
            } else if (this.type === "EDIT") {
                this.editPeople(item)
            } else {
                alert("ops")
            }
        }
    },
    computed: {
        filteredPeoples() {
            return this.peoples.filter(item => {
                let name = item.first_name.toLowerCase();
                let searchTerm = this.filter.toLowerCase();
                return name.includes(searchTerm)
            })
        }
    },
    template: '<div><button class="btn btn--green" v-on:click="showDialog(null, \'ADD\')">ADD</button><form-people @close ="showDialog()" @confirm="confirm" v-if="this.type" :people="this.people" :type="this.type"></form-people> <input type="text" v-model="filter">' +
        '<table><thead> <tr> <th v-for="(value,key) in titles">{{key}}</th> </tr>' +
        '</thead> <tbody> <tr v-for="people in filteredPeoples">' +
        '<td>{{people.id}}</td> <td>{{people.email}}</td> <td>{{people.first_name}}</td> <td>{{people.last_name}}</td>' +
        '<td><img v-bind:src="people.avatar" alt=""></td> <td><button class="btn btn--green" v-on:click="showDialog(people, \'DELETE\')">delete</button><button class="btn btn--green" v-on:click="showDialog(people, \'EDIT\')">edit</button></td>' +
        '</tr> </tbody> </table> </div>',
    components: {
        'form-people': forms
    },
}


var app = new Vue({
    el: '#app',
    components: {
        'table-people': table
    }
})

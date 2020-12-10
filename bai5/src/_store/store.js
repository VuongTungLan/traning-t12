import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const userStore = new Vuex.Store({
    state: {
        users: [
            {
                id: 1,
                username: "lan 1"
            },
            {
                id: 2,
                username: "lan 2"
            },
            {
                id: 3,
                username: "lan 3"
            },
        ],
        user: {}
    },
    mutations: {
        addUser(state, user) {
            state.users.push(user)
        },
        editUser(state, newUser) {
            for(let user in state.users) {
                if(state.users[user].id === newUser.id) {
                    state.users[user].username = newUser.username
                }
            }
        },
        getUser(state, user) {
            state.user = user
        }
    },
    actions: {
        addUser({commit}, user) {
            commit('addUser',user)
        },
        editUser({ commit }, user) {
            commit('editUser', user)
        },
        getUserById({commit}, id) {
            let user = this.state.users.find(user => user.id === id)
            commit('getUser', user)
        }
    },
    getters: {
        getAll: state => {
            return  state.users
        },
        getById: (state) => (id) => {
            return state.users.find(user => user.id === id)
        } 
    }
})

export default userStore

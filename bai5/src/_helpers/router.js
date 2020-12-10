import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '../components/CreateUser'
import EditUser from '../components/EditUser'
import Home from '../components/Home'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/user/new',
            component: CreateUser,
            name:'user.new'
        },
        {
            path: '/user/:id/edit',
            component: EditUser,
            name: 'user.edit'
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
export default router



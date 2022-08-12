import {createRouter, createWebHistory} from "vue-router";
import index from '../views/index.vue'
import login from "../components/login.vue";
import reg from '../views/reg.vue'
import home from '../views/home.vue'

let routes = [
    {
        name: 'index',
        path: '/',
        component: index
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'reg',
        path: '/reg',
        component: reg
    },
    {
        name: 'home',
        path: '/home',
        component: home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
import {createRouter, createWebHistory} from "vue-router";
import index from '../views/index.vue'
import login from "../components/login.vue";
import reg from '../views/reg.vue'
import home from '../views/home.vue'
import userCenter from '../components/UserCenter.vue'
import showBill from '../components/user/ShowBill.vue'

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
        component: home,
        children: [
            {
                name: 'userCenter',
                path: '/userCenter',
                component: userCenter
            },
            {
                name: 'showBill',
                path: '/user/sb',
                component: showBill
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
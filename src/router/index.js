import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashbord from '../components/home/dashbord.vue';
import Editoras from '../components/editoras/editora.vue';
import Livros from '../components/livros/livros.vue';
import Clientes from '../components/clientes/clientes.vue';
import Alugueis from '../components/alugueis/alugueis.vue';
import Login from '../components/login/login.vue';
import Conta from '../components/conta/conta.vue';
import store from '@/store/index.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/logout',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/conta',
        name: 'conta',
        component: Conta,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Dashbord,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/editoras',
        name: 'editoras',
        component: Editoras,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/livros',
        name: 'livros',
        component: Livros,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/clientes',
        name: 'clientes',
        component: Clientes,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/alugueis',
        name: 'alugueis',
        component: Alugueis,
        beforeEnter: (to, from, next) => {
            if (store.state.authenticated == false) {
                next('login');
            } else {
                next();
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;

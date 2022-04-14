import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: '',
            nome: '',
            email: '',
            ativo: false,
            cargo: ''
        },
        userDefault: {
            username: '',
            nome: '',
            email: '',
            ativo: false,
            cargo: ''
        },
        authenticated: false
    },
    mutations: {
        setAuthenticate(state, status) {
            state.authenticated = status;
        },

        setUsername(state, status) {
            state.user.username = status;
        },
        setUser(state, status) {
            state.user = status;
        },
        setNome(state, status) {
            state.user.nome = status;
        },
        setEmail(state, status) {
            state.user.email = status;
        },
        setAtivo(state, status) {
            state.user.ativo = status;
        },
        setCargo(state, status) {
            state.user.cargo = status;
        }
    },
    actions: {
        ActionSignOut: ({ dispatch, state }) => {
            dispatch('setAuthenticate', false);
            dispatch('setUSer', state.userDefault);
        }
    },
    modules: {}
});

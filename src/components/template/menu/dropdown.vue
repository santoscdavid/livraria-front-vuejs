<template>
    <div class="text-center">
        <v-menu open-on-hover down offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="deep-purple" dark v-bind="attrs" v-on="on">
                    <v-avatar color="purple" size="30" class="mr-3 mt-auto">
                        <span class="white--text" style="font-size: 10px;">WDA</span>
                    </v-avatar>
                    {{ name }} <i class="fas fa-angle-down ml-1"></i>
                </v-btn>
            </template>

            <v-list>
                <v-list-item class="hover" disabled>
                    <v-list-item-title> <i class="fas fa-cogs"></i> Configurações </v-list-item-title>
                </v-list-item>
                <Router-link to="logout">
                    <v-list-item class="hover">
                        <v-list-item-title> <i class="fas fa-sign-out-alt"></i> Sair </v-list-item-title>
                    </v-list-item>
                </Router-link>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => {
        return {
            items: [
                { title: 'Configuração', route: 'config' },
                { title: 'Sair', route: 'logout' }
            ]
        };
    },
    methods: {
        ...mapState('logout', ['ActionSignOut']),
        logout() {
            localStorage.removeItem('token');
            this.$store.commit('setAuthenticate', false);
            this.$router.push({ name: 'login' });
        }
    },
    computed: {
        ...mapState({
            name: state => state.user.nome.split(' ')[0].toLowerCase(),
            default: state => state.userDefault
        })
    }
};
</script>

<style>
.dropDown {
    right: 0;
    padding: 5px;
}
.dropDown:hover {
    background: rgba(0, 0, 0, 0.2);
    transition: 700ms;
}
.dropdown-content {
    position: absolute;
    right: 0px;
    background: #f9f9f9;
    min-width: 170px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 20;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}
.dropDown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
}

.hover:hover {
    background: rgba(0, 0, 0, 0.2);
    transition: 700ms;
    cursor: pointer;
}
</style>

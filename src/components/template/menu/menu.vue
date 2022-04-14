<template>
    <div>
        <v-app-bar color="deep-purple" dark>
            <div v-if="$store.state.authenticated == true">
                <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>Menu
            </div>

            <v-spacer></v-spacer>

            <Router-link to="/home">
                <v-toolbar-title class="HomeBtn">
                    <h3><i class="fas fa-bookmark"></i> WDA Livraria</h3>
                </v-toolbar-title>
            </Router-link>

            <v-spacer></v-spacer>

            <useDropdown class="float-end" v-if="$store.state.authenticated == true" />
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group active-class="deep-purple--text text--accent-4" class="text--accent-4">
                    <Router-link to="/home">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Início</v-list-item-title>
                        </v-list-item>
                    </Router-link>
                    <Router-link to="/conta">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Conta</v-list-item-title>
                        </v-list-item>
                    </Router-link>
                    <Router-link to="editoras">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-bookshelf</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Editoras</v-list-item-title>
                        </v-list-item>
                    </Router-link>
                    <router-link to="livros">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-book</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Livros</v-list-item-title>
                        </v-list-item>
                    </router-link>
                    <router-link to="clientes">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-account-group</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Clientes</v-list-item-title>
                        </v-list-item>
                    </router-link>
                    <router-link to="alugueis">
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-calendar-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Alugueis</v-list-item-title>
                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import useDropdown from './dropdown.vue';
export default {
    name: 'menuBar',
    data: () => {
        return {
            drawer: false
        };
    },
    components: { useDropdown }
};
</script>

<style>
.HomeBtn,
a {
    cursor: pointer;
    color: #fff;
    text-decoration: none;
}
</style>

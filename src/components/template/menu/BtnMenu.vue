<template>
    <v-container>
        <router-link to="editoras">
            <v-btn>
                editoras
            </v-btn>
        </router-link>
        <router-link to="livros">
            <v-btn>
                livros
            </v-btn>
        </router-link>
        <router-link to="clientes">
            <v-btn>
                clientes
            </v-btn>
        </router-link>
        <router-link to="alugueis">
            <v-btn>
                alugueis
            </v-btn>
        </router-link>
        <router-link to="login">
            <v-btn>
                Login
            </v-btn>
        </router-link>
    </v-container>
</template>

<script>
export default {
    name: 'btnMenu'
};
</script>

<style></style>

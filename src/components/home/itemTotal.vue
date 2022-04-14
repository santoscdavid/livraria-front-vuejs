<template>
    <v-row>
        <v-col cols="3">
            <v-card elevation="12" color="deep-purple" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-bookshelf</v-icon>
                    Total de Editoras
                    <v-spacer></v-spacer>
                    <v-btn text dark @click="editoraRoute">
                        <v-icon>mdi-arrow-right-circle-outline</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ editoraTotal }}</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="3">
            <v-card elevation="12" color="deep-purple" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-book-multiple</v-icon>
                    Total de Livros
                    <v-spacer></v-spacer>
                    <v-btn text dark @click="livroRoute">
                        <v-icon>mdi-arrow-right-circle-outline</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ livroTotal }}</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="3">
            <v-card elevation="12" color="deep-purple" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-account-multiple</v-icon>
                    Total de Clientes
                    <v-spacer></v-spacer>
                    <v-btn text dark @click="clienteRoute">
                        <v-icon>mdi-arrow-right-circle-outline</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ clienteTotal }}</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="3">
            <v-card elevation="12" color="deep-purple" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-calendar-blank-multiple</v-icon>
                    Total de Alugueis
                    <v-spacer></v-spacer>
                    <v-btn text dark @click="aluguelRoute">
                        <v-icon>mdi-arrow-right-circle-outline</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ aluguelTotal }}</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Aluguel from '@/services/aluguel';
import Livro from '@/services/livro';
import Cliente from '@/services/cliente';
import Editora from '@/services/editora';
export default {
    name: 'itemTotal',
    data: () => {
        return {
            aluguelTotal: 0,
            livroTotal: 0,
            clienteTotal: 0,
            editoraTotal: 0
        };
    },
    methods: {
        getAluguel() {
            Aluguel.listar().then(res => {
                var array = JSON.parse(res.headers.pagination);
                this.aluguelTotal = array.pageSize;
            });
        },
        getLivro() {
            Livro.listar().then(res => {
                var array = JSON.parse(res.headers.pagination);
                this.livroTotal = array.pageSize;
            });
        },
        getCliente() {
            Cliente.listar().then(res => {
                var array = JSON.parse(res.headers.pagination);
                this.clienteTotal = array.pageSize;
            });
        },
        getEditora() {
            Editora.listar().then(res => {
                var array = JSON.parse(res.headers.pagination);
                this.editoraTotal = array.pageSize;
            });
        },
        aluguelRoute() {
            this.$router.push({ name: 'alugueis' });
        },
        editoraRoute() {
            this.$router.push({ name: 'editoras' });
        },
        livroRoute() {
            this.$router.push({ name: 'livros' });
        },
        clienteRoute() {
            this.$router.push({ name: 'clientes' });
        }
    },
    mounted() {
        this.getAluguel();
        this.getLivro();
        this.getCliente();
        this.getEditora();
    }
};
</script>

<style></style>

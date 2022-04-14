<template>
    <v-data-table
        :headers="headers"
        :items="livros"
        :search="search"
        :sort-by="['id']"
        :sort-desc="[true]"
        :items-per-page="5"
        :footer-props="{
            itemsPerPageOptions: [5, 10, 25, 50]
        }"
        :loading="loading"
        multi-sort
        class="elevation-2 mt-5"
    >
        <template v-slot:top>
            <v-toolbar flat color="deep-purple" dark>
                <v-toolbar-title>
                    <v-icon>mdi-book-open-page-variant</v-icon>
                    Livros
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    size="1"
                    single-line
                    hide-details
                    class="mr-2"
                ></v-text-field>
                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="purple darken-4" dark class="my-auto" v-bind="attrs" v-on="on">
                            <v-icon class="mr-1">mdi-book-plus</v-icon>Novo Livro
                        </v-btn>
                    </template>
                    <v-card color="purple darken-4" dark>
                        <v-form ref="form" lazy-validation v-model="valid">
                            <v-card-title>
                                <v-icon class="mr-1">mdi-book-plus</v-icon>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                prepend-icon="mdi-format-letter-case"
                                                v-model="editedItem.nome"
                                                label="Digite o nome do Livro"
                                                :counter="50"
                                                :rules="nomeRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                prepend-icon="mdi-account-edit"
                                                v-model="editedItem.autor"
                                                label="Digite o nome do Autor"
                                                :counter="50"
                                                :rules="autorRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                prepend-icon="mdi-bookshelf"
                                                v-model="editedItem.editora"
                                                :items="editoras"
                                                item-text="nome"
                                                item-value="id"
                                                label="Escolha uma editora"
                                                return-object
                                                :rules="editoraRules"
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                prepend-icon="mdi-chart-bar"
                                                v-model="editedItem.quantidade"
                                                label="Informe a quantidade"
                                                :rules="quantidadeRules"
                                                required
                                            />
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                prepend-icon="mdi-calendar"
                                                v-model="editedItem.lancamento"
                                                label="Informe o lançamento"
                                                :rules="lancamentoRules"
                                                required
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="white" text @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn :disabled="!valid" color="white" text @click="save">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="450px">
                    <v-card color="deep-purple" dark>
                        <v-card-title class="text-h6"><b>Tem certeza que quer deletar essa Livro?</b></v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="red darken-4" @click="deleteItemConfirm">Deletar</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.estoque`]="{ item }">
            <v-btn elevation="2" icon small>
                <v-icon color="green" @click="aumentar(item)">
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn elevation="2" icon small>
                <v-icon color="red darken-4" @click="diminuir(item)">
                    mdi-minus
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" color="amber darken-4" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon color="red darken-4" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <div class="text-center my-8">
                <p white>Sem dados ou o banco de dados não está conectado</p>
                <v-btn
                    class="white--text"
                    :loading="loading"
                    :disabled="loading"
                    color="deep-purple"
                    @click="loader = 'loading'"
                >
                    Reiniciar
                </v-btn>
            </div>
        </template>
    </v-data-table>
</template>

<script>
import Livro from '@/services/livro';
import Editora from '@/services/editora';

export default {
    name: 'Livros',
    data: () => {
        return {
            dialog: false,
            dialogDelete: false,
            valid: true,
            search: '',
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: true,
                    value: 'id'
                },
                { text: 'Nome do Livro', align: 'start', value: 'nome' },
                { text: 'Autor', align: 'start', value: 'autor' },
                { text: 'Lançamento', align: 'start', value: 'lancamento' },
                { text: 'Editora', align: 'start', value: 'editora.nome' },
                { text: 'Quantidade', align: 'start', value: 'quantidade' },
                { text: 'Estoque', align: 'center', value: 'estoque', sortable: false },
                { text: 'Ações', align: 'center', value: 'actions', sortable: false }
            ],
            nomeRules: [
                n => !!n || 'Informe o nome do livro',
                n => (n && n.length > 3) || 'O nome do livro tem que ter mais de 3 letras'
            ],
            autorRules: [
                n => !!n || 'Informe o nome do autor',
                n => (n && n.length > 3) || 'O nome do autor tem que ter mais de 3 letras'
            ],
            lancamentoRules: [
                n => !!n || 'Digite o ano de lançamento',
                n => (n && n.length > 3) || 'Digite o ano de lançamento',
                n => (n && n > 1899) || 'Informe uma data igual ou acima de 1900',
                n => (n && !isNaN(n)) || 'Informe um valor válido'
            ],
            quantidadeRules: [
                n => !!n || 'Informe a quantidade de livros',
                n => (n && n >= 1) || 'Informe um valor válido',
                n => (n && !isNaN(n)) || 'Informe um valor válido'
            ],
            editoraRules: [n => !!n || 'Escolha uma editora'],
            livros: [],
            editoras: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                nome: '',
                autor: '',
                lancamento: '',
                quantidade: '',
                editora: ''
            },
            defaultItem: {
                id: '',
                nome: '',
                autor: '',
                lancamento: '',
                quantidade: '',
                editora: ''
            },
            loader: null,
            loading: false
        };
    },
    methods: {
        validate() {
            this.$refs.form.validate();
        },
        initialize() {
            this.loading = true;
            Livro.listar().then(res => {
                this.loading = false;
                this.livros = res.data;
            });
        },
        getEditora() {
            this.loading = true;
            Editora.listar().then(res => {
                this.loading = false;
                this.editoras = res.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.resetValidation();
        },

        deleteItem(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
            this.initialize();
        },

        deleteItemConfirm() {
            var del = { id: this.editedItem.id };

            Livro.deletar(del)
                .then(() => {
                    this.initialize();
                })

                .catch(err => {
                    var erro = err.response.data.error;
                    console.log(erro);
                    this.$swal('Oops...', erro, 'error');
                });
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.resetValidation();
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.resetValidation();
            });
        },
        aumentar(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);

            var edit = {
                id: this.editedItem.id,
                nome: this.editedItem.nome,
                autor: this.editedItem.autor,
                lancamento: this.editedItem.lancamento,
                quantidade: this.editedItem.quantidade + 1,
                editoraId: this.editedItem.editora.id
            };
            Livro.atualizar(edit)
                .then(() => {
                    this.initialize();
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
                .catch(err => {
                    var erro = err.response.data.error;
                    this.$swal('Oops', erro, 'error');
                });
        },
        diminuir(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);

            var edit = {
                id: this.editedItem.id,
                nome: this.editedItem.nome,
                autor: this.editedItem.autor,
                lancamento: this.editedItem.lancamento,
                quantidade: this.editedItem.quantidade - 1,
                editoraId: this.editedItem.editora.id
            };

            if (edit.quantidade < 0) {
                this.$swal('Oops', 'A quantidade não pode ser menor que 0', 'error');
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            } else {
                Livro.atualizar(edit)
                    .then(() => {
                        this.initialize();
                        this.editedItem = Object.assign({}, this.defaultItem);
                        this.editedIndex = -1;
                    })
                    .catch(err => {
                        var erro = err.response.data.errors.Quantidade;
                        console.log(erro);
                        this.$swal('Oops', erro, 'error');
                    });
            }
        },

        save() {
            this.$refs.form.validate();
            if (this.editedIndex > -1) {
                var edit = {
                    id: this.editedItem.id,
                    nome: this.editedItem.nome,
                    autor: this.editedItem.autor,
                    lancamento: this.editedItem.lancamento,
                    quantidade: this.editedItem.quantidade,
                    editoraId: this.editedItem.editora.id
                };
                console.log(edit);
                Livro.atualizar(edit)
                    .then(res => {
                        if (res != null) {
                            this.initialize();
                            this.close();
                            console.log('Ok');
                        }
                    })
                    .catch(err => {
                        var erro = err.response.data.error;
                        this.$swal('Oops', erro, 'error');
                    });
            } else {
                var save = {
                    nome: this.editedItem.nome,
                    autor: this.editedItem.autor,
                    lancamento: this.editedItem.lancamento,
                    quantidade: this.editedItem.quantidade,
                    editoraId: this.editedItem.editora.id
                };

                Livro.salvar(save)
                    .then(res => {
                        if (res != null) {
                            this.initialize();
                            this.close();
                        }
                    })
                    .catch(err => {
                        var erro = err.response.data.error;
                        this.$swal('Oops', erro, 'error');
                    });
            }
        },

        resetValidation() {
            this.$refs.form.resetValidation();
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Livro' : 'Editar Livro';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        loader() {
            this.initialize();
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        }
    },

    created() {
        this.initialize();
        this.getEditora();
    }
};
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

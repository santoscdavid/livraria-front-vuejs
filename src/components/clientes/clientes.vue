<template>
    <v-data-table
        :headers="headers"
        :items="clientes"
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
                    <v-icon>mdi-account-group</v-icon>
                    Clientes
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
                            <v-icon class="mr-1">mdi-account-plus</v-icon>Novo Cliente
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
                                                prepend-icon="mdi-alphabetical"
                                                v-model="editedItem.nome"
                                                label="Digite o nome completo do Cliente"
                                                :counter="50"
                                                :rules="nomeRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                prepend-icon="mdi-city"
                                                v-model="editedItem.cidade"
                                                label="Digite a cidade do Cliente"
                                                :counter="50"
                                                :rules="cidadeRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                prepend-icon="mdi-map-marker-outline"
                                                v-model="editedItem.endereco"
                                                label="Digite a endereço do Cliente"
                                                :counter="50"
                                                :rules="enderecoRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                prepend-icon="mdi-email"
                                                v-model="editedItem.email"
                                                label="Digite o e-mail do Cliente"
                                                :counter="50"
                                                :rules="emailRules"
                                                required
                                            ></v-text-field>
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
                <v-dialog v-model="dialogDelete" max-width="470px">
                    <v-card color="deep-purple" dark>
                        <v-card-title class="text-h6"><b>Tem certeza que quer deletar essa Cliente?</b></v-card-title>
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
import Cliente from '@/services/cliente';

export default {
    name: 'Clientes',
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
                { text: 'Nome do Cliente', value: 'nome' },
                { text: 'Email', value: 'email' },
                { text: 'Cidade', value: 'cidade' },
                { text: 'Endereço', value: 'endereco' },
                { text: 'Ações', value: 'actions', sortable: false }
            ],
            nomeRules: [
                n => !!n || 'Informe o nome do Cliente',
                n => (n && n.length >= 3) || 'O nome do Cliente tem que ter mais de 3 letras'
            ],
            sobrenomeRules: [
                n => !!n || 'Informe o sobrenome do Cliente',
                n => (n && n.length >= 3) || 'O sobrenome do Cliente tem que ter mais de 3 letras'
            ],
            cidadeRules: [
                n => !!n || 'Informe a cidade do Cliente',
                n => (n && n.length > 3) || 'A cidade do Cliente tem que ter mais de 3 letras'
            ],
            enderecoRules: [
                n => !!n || 'Informe o endereço do Cliente',
                n => (n && n.length > 4) || 'O endereço do Cliente tem que ter mais de 4 letras'
            ],
            emailRules: [n => !!n || 'Informe o E-mail', n => /.+@.+\..+/.test(n) || 'Informe um e-mail válido'],
            clientes: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                nome: '',
                sobrenome: '',
                email: '',
                cidade: '',
                endereco: ''
            },
            defaultItem: {
                id: '',
                nome: '',
                sobrenome: '',
                email: '',
                cidade: '',
                endereco: ''
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
            Cliente.listar().then(res => {
                this.loading = false;
                this.clientes = res.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.clientes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.clientes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
            this.initialize();
        },

        deleteItemConfirm() {
            var del = { id: this.editedItem.id };

            Cliente.deletar(del)

                .then(() => {
                    this.clientes.splice(this.editedIndex, 1);
                    this.initialize();
                })

                .catch(() => {
                    this.$swal(
                        'Não foi possivel realizar essa ação',
                        'Há Alugueis cadastrados com esse cliente',
                        'error'
                    );
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

        save() {
            if (this.editedIndex > -1) {
                var edit = {
                    id: this.editedItem.id,
                    nome: this.editedItem.nome,
                    cidade: this.editedItem.cidade,
                    endereco: this.editedItem.endereco,
                    email: this.editedItem.email
                };
                Cliente.atualizar(edit)
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
            } else {
                var save = {
                    nome: this.editedItem.nome,
                    sobrenome: this.editedItem.sobrenome,
                    cidade: this.editedItem.cidade,
                    endereco: this.editedItem.endereco,
                    email: this.editedItem.email
                };

                Cliente.salvar(save)
                    .then(res => {
                        if (res != null) {
                            this.initialize();
                            this.close();
                        }
                    })
                    .catch(err => {
                        console.log(save);
                        console.dir = err;
                    });
            }
            this.$refs.form.validate();
        },

        resetValidation() {
            this.$refs.form.resetValidation();
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Cliente' : 'Editar Cliente';
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

<template>
    <v-data-table
        :headers="headers"
        :items="alugueis"
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
                    <v-icon>mdi-calendar-blank-multiple</v-icon>
                    Alugueis
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
                            <v-icon class="mr-1">mdi-calendar-plus</v-icon>Novo Aluguel
                        </v-btn>
                    </template>
                    <v-card color="purple darken-4" dark>
                        <v-form ref="form" lazy-validation v-model="valid">
                            <v-card-title>
                                <v-icon class="mr-1">mdi-calendar-plus</v-icon>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select
                                                prepend-icon="mdi-account-group"
                                                v-model="editedItem.usuario"
                                                :items="usuarios"
                                                item-text="nome"
                                                item-value="id"
                                                :rules="usuarioRules"
                                                label="Escolha uma cliente"
                                                return-object
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                prepend-icon="mdi-bookshelf"
                                                v-model="editedItem.livro"
                                                :items="livros"
                                                item-text="nome"
                                                :rules="livroRules"
                                                item-value="id"
                                                label="Escolha um livro"
                                                return-object
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-menu
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="editedItem.previsaoEntrega"
                                                        label="Previsão de entrega"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        persistent-hint
                                                        hint="Padrão de data (YYYY/MM/DD)"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        :rules="previsaoRules"
                                                        clearable
                                                        @click:clear="editedItem.previsaoEntrega = null"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    :min="nowDate"
                                                    v-model="editedItem.previsaoEntrega"
                                                    locale="pt-br"
                                                    no-title
                                                    @input="menu = false"
                                                ></v-date-picker>
                                            </v-menu>
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
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card color="deep-purple" dark>
                        <v-card-title class="text-h6"><b>Tem certeza que quer deletar esse ALUGUEL?</b></v-card-title>
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
        <template v-slot:[`item.aluguelFeito`]="{ item }">
            <v-chip>
                {{ item.aluguelFeito | FormatarData }}
            </v-chip>
        </template>
        <template v-slot:[`item.previsaoEntrega`]="{ item }">
            <v-chip>
                {{ item.previsaoEntrega | FormatarData }}
            </v-chip>
        </template>

        <template v-slot:[`item.devolucao`]="{ item }">
            <div class="mx-auto">
                <v-chip v-if="item.devolucao == null" color="orange">
                    Não entregue
                </v-chip>
                <v-chip v-else color="primary">
                    {{ item.devolucao | FormatarData }}
                </v-chip>
            </div>
        </template>

        <template v-slot:[`item.concluir`]="{ item }">
            <div class="mx-auto">
                <v-chip v-if="item.devolucao == null" color="yellow">
                    {{ (item.concluir = 'Não devolvido') }}
                </v-chip>
                <v-chip v-else-if="item.devolucao.valueOf() > item.previsaoEntrega.valueOf()" color="red" dark>
                    {{ (item.concluir = 'Com atraso') }}
                </v-chip>
                <v-chip v-else color="green" dark>
                    {{ (item.concluir = 'Sem atraso') }}
                </v-chip>
            </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <div class="mx-auto">
                <v-tooltip color="green darken-3" bottom v-if="item.devolucao == null">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" @click="finalizarAluguel(item)" color="green darken-3">
                            mdi-check-outline
                        </v-icon>
                    </template>
                    <span>Finalizar</span>
                </v-tooltip>
                <v-tooltip color="amber darken-4" bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="amber darken-4" v-bind="attrs" disabled v-on="on" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip color="red darken-4" bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon color="red darken-4" v-bind="attrs" disabled v-on="on" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <span>Deletar</span>
                </v-tooltip>
            </div>
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
import Aluguel from '@/services/aluguel';
import Livro from '@/services/livro';
import cliente from '@/services/cliente';
var moment = require('moment');

export default {
    name: 'Clientes',
    data: () => {
        return {
            nowDate: new Date().toISOString().slice(0, 10),
            dataHoje: '',
            menu: false,
            menu2: false,
            menu3: false,
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
                { text: 'Nome do Cliente', align: 'start', value: 'usuario.nome' },
                { text: 'Livro Aluguado', align: 'start', value: 'livro.nome' },
                { text: 'Aluguel Feito', align: 'start', value: 'aluguelFeito' },
                { text: 'Previsão de entrega', align: 'start', value: 'previsaoEntrega' },
                { text: 'Data de devolução', align: 'center', value: 'devolucao' },
                { text: 'Status', align: 'center', value: 'concluir', sortable: true },
                { text: 'Ações', align: 'center', value: 'actions', sortable: false, class: 'text-center' }
            ],
            usuarioRules: [n => !!n || 'Escolha um cliente'],
            livroRules: [n => !!n || 'Escolha uma editora'],
            previsaoRules: [v => !!v || 'Previsão de entrega é obrigatório!'],
            alugueis: [],
            livros: [],
            usuarios: [],
            teste: '0001-01-01T00:00:00',
            editedIndex: -1,
            editedItem: {
                id: '',
                livroId: '',
                usuarioId: '',
                aluguelFeito: '',
                previsaoEntrega: '',
                devolucao: ''
            },
            defaultItem: {
                id: '',
                livroId: '',
                usuarioId: '',
                aluguelFeito: '',
                previsaoEntrega: '',
                devolucao: ''
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
            Aluguel.listar().then(res => {
                this.loading = false;
                this.alugueis = res.data;
            });
        },
        getCliente() {
            cliente.listar().then(res => {
                this.loading = false;
                this.usuarios = res.data;
            });
        },
        getLivros() {
            Livro.forAluguel().then(res => {
                this.loading = false;
                this.livros = res.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.alugueis.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        finalizarAluguel(item) {
            this.editedIndex = this.alugueis.indexOf(item);
            this.editedItem = Object.assign({}, item);

            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            var dataAtual = ano + '-' + mes + '-' + dia;

            // devolucao.valueOf() > item.previsaoEntrega.valueOf()
            let array = {
                id: this.editedItem.id,
                livroId: this.editedItem.livro.id,
                usuarioId: this.editedItem.usuario.id,
                estado: '',
                aluguelFeito: this.editedItem.aluguelFeito,
                previsaoEntrega: this.editedItem.previsaoEntrega,
                devolucao: dataAtual
            };

            if (array.devolucao.valueOf() > array.previsaoEntrega.valueOf()) {
                array.estado = 'Com atraso';
            } else {
                array.estado = 'Sem atraso';
            }

            console.log('array', array);
            Aluguel.atualizar(array)
                .then(res => {
                    if (res != null) {
                        Livro.findId(array.livroId)
                            .then(res => {
                                let a = res.data;
                                var quant = {
                                    id: a.id,
                                    nome: a.nome,
                                    autor: a.autor,
                                    lancamento: a.lancamento,
                                    quantidade: a.quantidade + 1,
                                    editoraId: a.editora.id
                                };
                                console.log('quant', quant);
                                Livro.atualizar(quant)
                                    .then(() => {
                                        this.initialize();
                                        this.getLivros();
                                        this.close();
                                    })
                                    .catch(err => {
                                        var erro = err.response.data.error;
                                        this.$swal('Oops', erro, 'error');
                                    });
                            })
                            .catch(err => {
                                var erro = err.response.data.error;
                                this.$swal('Oops', erro, 'error');
                            });
                    }
                })
                .catch(err => {
                    var erro = err.response.data.error;
                    console.log(err.response.data.errors);
                    this.$swal('Oops', erro, 'error');
                });
        },

        deleteItem(item) {
            this.editedIndex = this.alugueis.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
            this.initialize();
        },

        deleteItemConfirm() {
            this.alugueis.splice(this.editedIndex, 1);

            var del = { id: this.editedItem.id };

            Aluguel.deletar(del).catch(err => {
                var erro = err.response.data.error;
                this.$swal('Oops', erro, 'error');
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
            this.$refs.form.validate();
            if (this.editedIndex > -1) {
                var edit = {
                    id: this.editedItem.id,
                    livroId: this.editedItem.livro.id,
                    usuarioId: this.editedItem.usuario.id,
                    aluguelFeito: this.editedItem.aluguelFeito,
                    previsaoEntrega: this.editedItem.previsaoEntrega,
                    devolucao: this.editedItem.devolucao
                };
                Aluguel.atualizar(edit)
                    .then(res => {
                        if (res != null) {
                            this.initialize();
                            this.close();
                            this.getLivros();
                            console.log('Ok');
                        }
                    })
                    .catch(err => {
                        var erro = err.response.data.error;
                        this.$swal('Oops', erro, 'error');
                    });
            } else {
                var data = new Date();
                var dia = String(data.getDate()).padStart(2, '0');
                var mes = String(data.getMonth() + 1).padStart(2, '0');
                var ano = data.getFullYear();
                var dataAtual = ano + '-' + mes + '-' + dia;

                var dt = moment(dataAtual).format('YYYY-MM-DD');

                var save = {
                    livroId: this.editedItem.livro.id,
                    usuarioId: this.editedItem.usuario.id,
                    aluguelFeito: dt,
                    previsaoEntrega: this.editedItem.previsaoEntrega
                };

                if (save.previsaoEntrega.valueOf() <= save.aluguelFeito.valueOf()) {
                    this.$swal(
                        'Não foi possivel realizar essa ação',
                        'A data de previsão de entrega não pode ser menor que a data de hoje',
                        'error'
                    );
                } else {
                    Aluguel.salvar(save)
                        .then(() => {
                            Livro.findId(save.livroId).then(res => {
                                let array = res.data;
                                var quant = {
                                    id: array.id,
                                    nome: array.nome,
                                    autor: array.autor,
                                    lancamento: array.lancamento,
                                    quantidade: array.quantidade - 1,
                                    editoraId: array.editora.id
                                };
                                Livro.atualizar(quant).then(() => {
                                    this.initialize();
                                    this.getLivros();
                                    this.close();
                                });
                            });
                        })
                        .catch(err => {
                            var erro = err.response.data.error;
                            this.$swal('Oops', erro, 'error');
                        });
                }
            }
        },

        resetValidation() {
            this.$refs.form.resetValidation();
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Aluguel' : 'Editar Aluguel';
        },
        hoje() {
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            var dataAtual = ano + '-' + mes + '-' + dia;

            return moment(dataAtual).format('YYYY/MM/DD');
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        date() {
            this.dateFormatted = this.formatDate(this.date);
        },
        loader() {
            this.initialize();
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        }
    },

    filters: {
        FormatarData: date => {
            return moment(date).format('DD/MM/YYYY');
        }
    },

    created() {
        this.initialize();
        this.getLivros();
        this.getCliente();
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

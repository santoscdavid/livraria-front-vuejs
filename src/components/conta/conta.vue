<template>
    <v-container class="mt-10">
        <v-row>
            <v-col cols="2">
                <v-avatar color="purple" size="100" class="d-flex mx-auto">
                    <span class="white--text text-h4">WDA</span>
                </v-avatar>
            </v-col>
            <v-col cols="10">
                <div class="mt-5">
                    <h1>{{ name }}</h1>
                    <h3 class="caption text-capitalize">Cargo: {{ cargo }}</h3>
                </div>
            </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <v-row>
            <v-col cols="2">
                <v-row justify="center" class="mt-4">
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="green darken-1" text dark v-bind="attrs" v-on="on">
                                <v-icon>mdi-account-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card color="deep-purple" dark>
                            <v-card-title>
                                <span class="text-h5"><v-icon>mdi-account-plus</v-icon> Criar usuário</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="admin.username"
                                                label="Usuario"
                                                persistent-hint
                                                hint="Obrigatório"
                                                :rules="nomeRules"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="admin.password"
                                                label="Senha"
                                                persistent-hint
                                                hint="Obrigatório"
                                                :rules="nomeRules"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="admin.email"
                                                label="Email"
                                                persistent-hint
                                                hint="Obrigatório"
                                                :rules="emailRules"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="admin.nome"
                                                label="Nome completo"
                                                persistent-hint
                                                hint="Obrigatório"
                                                :rules="nomeRules"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="white" text @click="dialog = false">
                                    Fechar
                                </v-btn>
                                <v-btn color="green darken-1" raised @click="save">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-col>
            <v-col cols="1">
                <v-divider class="ml-3" vertical></v-divider>
            </v-col>
            <v-col cols="9">
                <div class="mt-4">
                    <h4 class="mb-2">Email: {{ email }}</h4>
                    <h4 class="mb-2">Usuário: {{ username }}</h4>
                    <div class="d-flex">
                        <h4 class="mb-1 mr-3">Status:</h4>
                        <v-chip color="green" v-if="ativo != false" dark>Ativo</v-chip>
                        <v-chip color="red" v-else dark>Inativo</v-chip>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Auth from '@/services/login';

export default {
    data() {
        return {
            emailRules: [n => !!n || 'Informe o E-mail', n => /.+@.+\..+/.test(n) || 'Informe um e-mail válido'],
            nomeRules: [
                n => !!n || 'Informe o nome do Cliente',
                n => (n && n.length >= 3) || 'O nome do Usuário deve ter mais de 3 caracteres'
            ],
            userRules: [
                n => !!n || 'Informe o nome do Cliente',
                n => (n && n.length >= 3) || 'O username do Usuário deve ter mais de 3 caracteres'
            ],
            passwordRules: [
                n => !!n || 'Informe o nome do Cliente',
                n => (n && n.length >= 3) || 'A senha deve ter mais de 5 caracteres'
            ],
            dialog: false,
            admin: {
                username: '',
                email: '',
                nome: '',
                password: '',
                cargo: 'admin',
                ativo: 1
            },
            default: {
                username: '',
                email: '',
                nome: '',
                password: '',
                cargo: 'admin',
                ativo: 1
            }
        };
    },
    methods: {
        close() {
            this.dialog = false;
            this.admin = this.default;
        },
        save() {
            console.log(this.admin);
            Auth.cadastrar(this.admin)
                .then(() => {
                    this.$swal('Salvo com sucesso', '', 'sucess');
                    this.close();
                })
                .catch(err => {
                    var erro = err.response.data.error;
                    this.$swal('Não foi possivel realizar essa ação', erro, 'error');
                });
        }
    },
    
};
</script>

<style></style>

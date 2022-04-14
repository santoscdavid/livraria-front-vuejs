<template>
    <v-main>
        <v-row class="mt-5 mx-4">
            <v-col cols="8" color="red" class="d-block text-center my-auto">
                <h1>Olá seja bem vindo!</h1>
                <h4>Faça o login para continuar</h4>
            </v-col>
            <v-col cols="4">
                <v-form ref="form" lazy-validation v-model="valid">
                    <v-card elevation="10" class="mb-5">
                        <v-card-title fixed class="deep-purple white--text">
                            <v-icon dark class="mr-3">mdi-login</v-icon> Login
                        </v-card-title>
                        <v-card-text class="py-4">
                            <v-text-field
                                v-model="username"
                                label="Seu usuário"
                                :counter="50"
                                :rules="userRules"
                                required
                                type="text"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Sua senha"
                                :counter="50"
                                :rules="passRules"
                                required
                                type="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions class="my-2 justify-end">
                            <v-btn color="deep-purple mr-2 white--text" :disabled="!valid" @click="login">
                                <v-icon>
                                    mdi-login-variant
                                </v-icon>
                                Entrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
            <v-col cols="12">
                <v-footer fixed color="deep-purple" dark>
                    <v-col class="text-center" cols="12"
                        ><strong>WDA Livraria © - {{ new Date().getFullYear() }}</strong></v-col
                    >
                </v-footer>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
import Auth from '@/services/login';

export default {
    name: 'Login',
    data: () => {
        return {
            token: '',
            erro: '',
            valid: true,
            username: '',
            password: '',
            userRules: [n => !!n || 'Informe o usuario'],
            passRules: [n => !!n || 'Informe a senha']
        };
    },
    methods: {
        login() {
            var dados = {
                username: this.username,
                password: this.password
            };

            Auth.login(dados)
                .then(res => {
                    this.$store.commit('setUsername', res.data.adm.username);
                    this.$store.commit('setNome', res.data.adm.nome);
                    this.$store.commit('setEmail', res.data.adm.email);
                    this.$store.commit('setAtivo', res.data.adm.ativo);
                    this.$store.commit('setCargo', res.data.adm.cargo);
                    this.$store.commit('setAuthenticate', true);
                    this.$router.replace({ name: 'home' });
                })
                .catch(err => {
                    var erro = err.response.data.error;
                    this.$swal('Oops...', erro, 'error');
                    this.username = '';
                    this.password = '';
                });
        }
    }
};
</script>

<style></style>

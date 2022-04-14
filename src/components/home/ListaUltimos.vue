<template>
    <v-card class="mx-5" elevation="12" color="deep-purple" dark>
        <v-card-title>
            <p class="text-h4 mt-2"><v-icon size="30">mdi-calendar-multiselect</v-icon> Ultimos Alugueis</p>
            <v-spacer></v-spacer>
            <v-btn text dark @click="aluguelRoute">
                <v-icon>mdi-arrow-right-circle-outline</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-list color="deep-purple" dark v-if="lista != null">
                <v-list-item-group v-for="item of lista" :key="item.id">
                    <v-list-item flat>
                        <v-list-item-icon class="my-auto">
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="6">
                                    <v-list-item-subtitle>
                                        Nome do Cliente:
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ item.usuario.nome }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="6">
                                    <v-list-item-subtitle>
                                        Livro Alugado:
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ item.livro.nome }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="6">
                                    <v-list-item-subtitle>
                                        Previsão de entrega:
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ item.previsaoEntrega | FormatarData }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="6">
                                    <v-list-item-subtitle>
                                        Status:
                                    </v-list-item-subtitle>
                                    <v-chip v-if="item.devolucao == null">Não devolvido</v-chip>
                                    <v-chip
                                        v-else-if="item.devolucao.valueOf() > item.previsaoEntrega.valueOf()"
                                        color="red"
                                        >Com atraso - {{ item.devolucao | FormatarData }}</v-chip
                                    >
                                    <v-chip v-else color="green"
                                        >Sem atraso - {{ item.devolucao | FormatarData }}</v-chip
                                    >
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-list v-else>
                <v-list-item-group v-for="item of lista" :key="item.id">
                    <v-list-item flat>
                        <v-list-item-icon class="my-auto">
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <h1>Não há dados</h1>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import Aluguel from '@/services/aluguel'
import moment from 'moment';
export default {
    name: 'listaUltimos',
    data: () => {
        return {
            lista: []
        };
    },
    methods: {
        listar() {
            Aluguel.last()
                .then(res => {
                    this.lista = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        aluguelRoute() {
            this.$router.push({ name: 'alugueis' });
        }
    },
    mounted() {
        this.listar();
    },
    filters: {
        FormatarData: date => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
};
</script>

<style></style>

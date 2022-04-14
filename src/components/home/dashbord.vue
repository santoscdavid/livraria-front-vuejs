<template>
    <v-row class="mt-1" justify="center">
        <v-col cols="12">
            <item-total />
        </v-col>
        <v-col cols="6">
            <v-row justify="center" class="mt-1">
                <lista-ultimos />
            </v-row>
        </v-col>
        <v-col cols="6">
            <grafico-line />
            <v-divider class="my-5"></v-divider>
            <grafico-pie />
        </v-col>
    </v-row>
</template>

<script>
import graficoLine from './graficoLine.vue';
import graficoPie from './graficoPie.vue';
import itemTotal from './itemTotal.vue';
import listaUltimos from './ListaUltimos.vue';
export default {
    name: 'Dashbord',
    components: { itemTotal, listaUltimos, graficoLine, graficoPie }
};
</script>

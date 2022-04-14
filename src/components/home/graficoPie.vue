<template>
    <v-row justify="center" class="mt-5">
        <apexchart v-if="!loading" width="450" ref="chart" :options="options" :series="series"></apexchart>
    </v-row>
</template>

<script>
import Aluguel from '@/services/aluguel';
export default {
    name: 'graficoPie',
    data() {
        return {
            loading: true,
            alugueis: [],
            series: [0, 0, 0],
            options: {
                chart: {
                    type: 'pie'
                },
                labels: ['Sem atraso', 'Atrasado', 'Pendente'],

                title: {
                    text: 'Média de alugueis'
                },
                subtitle: {
                    text: 'Média de alugueis sem atraso, atrasados e atrasados',
                    align: 'left'
                },
                noData: {
                    text: 'Carregando...'
                },
                animations: {
                    enabled: true
                },
                colors: ['#5AB55E', '#F55246', '#FEB019'],
                fill: {
                    colors: ['#5AB55E', '#F55246', '#FEB019']
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex];
                        return [name, val.toFixed(1) + '%'];
                    }
                },
                responsive: [
                    {
                        breakpoint: 720,
                        options: {
                            chart: {
                                width: 300
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        initialize() {
            Aluguel.listar().then(res => {
                this.alugueis = res.data;

                this.alugueis.forEach(a => {
                    if (a.devolucao <= a.previsaoEntrega) {
                        this.series[0]++;
                    }
                });
                this.alugueis.forEach(a => {
                    if (a.devolucao == null) {
                        this.series[2]++;
                    }
                });
                this.alugueis.forEach(a => {
                    if (a.devolucao > a.previsaoEntrega) {
                        this.series[1]++;
                    }
                });
                this.loading = false;
            });
        }
    },
    created() {
        this.initialize();
    }
};
</script>

<style></style>

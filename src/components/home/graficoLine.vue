<template>
    <v-row justify="center" class="mt-5">
        <apexchart width="450" type="area" ref="chart" :options="options" :series="series"></apexchart>
    </v-row>
</template>

<script>
import aluguel from '@/services/aluguel';
import moment from 'moment';
export default {
    name: 'graficoLine',
    data() {
        return {
            options: {
                chart: {
                    id: 'alugueisPorDia',
                    defaultLocale: 'pt',
                    locales: [
                        {
                            name: 'pt',
                            options: {
                                months: [
                                    'Janeiro',
                                    'Fevereiro',
                                    'Março',
                                    'Abril',
                                    'Maio',
                                    'Junho',
                                    'Julho',
                                    'Agosto',
                                    'Setembro',
                                    'Outubro',
                                    'Novembro',
                                    'Dezembro'
                                ],
                                shortMonths: [
                                    'Jan',
                                    'Fev',
                                    'Mar',
                                    'Abr',
                                    'Mai',
                                    'Jun',
                                    'Jul',
                                    'Ago',
                                    'Set',
                                    'Out',
                                    'Nov',
                                    'Dez'
                                ],
                                days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                                shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
                            }
                        }
                    ]
                },
                title: {
                    text: 'Alugueis por dia',
                    align: 'left'
                },
                subtitle: {
                    text: 'Mostra os algueis feitos em cada dia',
                    align: 'left'
                },
                legend: {
                    horizontalAlign: 'left'
                },
                markers: {
                    size: 5,
                    style: 'hollow'
                },
                xaxis: {
                    name: 'Dia',
                    type: 'datetime',
                    tickAmount: 6,
                    title: {
                        text: 'Data'
                    }
                },
                yaxis: {
                    name: 'total',
                    title: {
                        text: 'Total'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                noData: {
                    text: 'Carregando...'
                },
                tooltip: {
                    x: {
                        title: 'Dia',
                        format: 'dd/MM/yyyy'
                    },
                    y: {
                        title: 'Total'
                    }
                },
                fill: {
                    type: 'gradient',
                    colors: ['#F44336', '#E91E63', '#9C27B0'],
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#673ab7', '#947dbe', '#470ead'],
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 100],
                        colorStops: []
                    }
                }
            },
            series: [
                {
                    name: 'Total',
                    data: []
                }
            ]
        };
    },
    methods: {
        GetData() {
            aluguel.listar().then(res => {
                const dados = res.data;

                let cont = [];
                let total = 1;
                for (let i = 0; i < dados.length; i++) {
                    if (
                        i < dados.length - 1 &&
                        moment(dados[i].aluguelFeito).format('yyyy-mm-dd') ==
                            moment(dados[i + 1].aluguelFeito).format('yyyy-mm-dd')
                    ) {
                        total++;
                    } else {
                        cont.push({ x: Date.parse(dados[i].aluguelFeito), y: total });
                        total = 1;
                    }
                }
                this.series = [
                    {
                        data: cont
                    }
                ];
            });
        }
    },
    created() {
        this.GetData();
    }
};
</script>

<style></style>

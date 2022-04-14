import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './config/axios';
import store from './store';
import router from './router';

// Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Chart
import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');

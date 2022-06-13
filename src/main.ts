import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import i18n from './i18n/i18n';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';
import { Chart } from 'chart.js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
	.use(VueChartkick.use(Chart))
	.use(i18n)
	.use(router)
	.use(Antd)
	.use(VueToast)
	.mount('#app');

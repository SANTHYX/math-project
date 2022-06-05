import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import i18n from './i18n/i18n';

createApp(App).use(i18n).use(router).use(Antd).mount('#app');

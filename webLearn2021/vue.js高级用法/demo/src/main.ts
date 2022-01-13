import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

Vue.use(VueClipboard);

Vue.filter('globalSuffix', (msg: string, suffix: string) => {
    return msg + suffix || '';
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

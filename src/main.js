// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import App from './App';
import router from './router';
import '../src/assets/style/common.scss';


Vue.config.productionTip = false;
Vue.use(VueYoutube);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import iView from 'iview';
import iviewArea from 'iview-area';
import 'iview/dist/styles/iview.css';
import './common/css/publicCss.css'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(iviewArea);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import Vue2Editor from "vue2-editor";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import katex from 'katex'
import 'katex/dist/katex.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {}
export default new Vuetify(opts)

Vue.use(Vue2Editor);
Vue.config.productionTip = false
window.katex = katex

new Vue({
  render: h => h(App),
}).$mount('#app')

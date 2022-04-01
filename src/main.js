import Vue from 'vue'
import App from './App.vue'
import Vue2Editor from "vue2-editor";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import katex from 'katex'
import 'katex/dist/katex.min.css'

window.katex = katex
Vue.use(Vue2Editor);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

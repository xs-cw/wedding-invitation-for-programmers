import Vue from 'vue'
import Wedding from './Wedding.vue'
import Slider from 'mini-sliders'
Vue.use(Slider) 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Wedding)
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
/*Vue实例可以发送和接收事件，所以用Vue实例来作为事件总线*/
Vue.prototype.$bus = new Vue()

//以插件的方式封装Toast
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
//安装 导入 Vue.use 修改img：src->v-lazy

new Vue({
  render: h => h(App),
  router,
  store,
  toast

}).$mount('#app')

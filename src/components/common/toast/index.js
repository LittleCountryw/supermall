import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  // console.log('执行了obj的install函数');
  //对Vue原型.prototype加上$toast，
  // 之后所有的都可以调用$toast获取传入的对象，并直接调用其中的方法
  //即Vue.prototype.$toast =toast组件，
  // 这样才可以直接调用toast组件中的方法不需要注册

  //注意：不能通过Toast.$el获得组件，因为main.js在最前面，这时Toast还没有挂载
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj

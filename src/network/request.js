import axios from 'axios'

//发送网络请求：最终方法
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

//axios的拦截器
//1.请求拦截

  instance.interceptors.request.use(config=>{
    //console.log(config);

    return config
  },err=>{
    console.log(err);
  })

//2.响应拦截
  //参数为两个函数，第一个函数可以拿到页面响应成功的结果，第二个拿到响应失败的错误消息
instance.interceptors.response.use(res=>{
  //console.log(res);
  //真正有用的是结果中的data，所以只返回data就足够了
  return res.data
},err=>{
  console.log(err);
})


  return instance(config)

}

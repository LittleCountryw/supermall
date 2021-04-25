import{ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {

  //addCart相当于在mutations中做了两个操作1.已有商品count+12.新商品加入数组
  //因为要使mutations中的操作各个独立，所以在action中编写
  [ADD_COUNTER](state,payload){
    payload.count++
  },

  [ADD_TO_CART](state,payload){
    payload.checked = true
    //for...of进行遍历时，其实是用了迭代器，item相当于一个个指向数组中元素的指针
    //所以再执行oldProduct = item时，是令oldProduct也指向数组中元素，
    //在执行 oldProduct.count +=1时，其实是元素的count+1

    /*let oldProduct = null
    for (let item of state.carList) {

      if(item.iid === payload.iid){
        oldProduct = item
      }
    }
    if(oldProduct){
      oldProduct.count +=1
    }else {
      payload.count = 1
      state.carList.push(payload)
    }*/
    /*let index = state.carList.indexOf(payload)

    if(index!==-1){
      let oldProduct = state.carList[index]
      oldProduct.count +=1
    }else {
      payload.count = 1
      state.carList.push(payload)
    }*/
    //当在函数返回值为true时，表示找到符合条件的元素时，将该元素返回,
    // 遍历找到第一个就会将其返回然后停下来

    /* let oldProduct = state.carList.find(item => item.iid === payload.iid)
     if (oldProduct) {

       oldProduct.count += 1
     } else {
       payload.count = 1
       state.carList.push(payload)
     }*/

    state.cartList.push(payload)
  },
  // checkChange(state,payload){
  //   payload.checked = !payload.checked
  // }
}

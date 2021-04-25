<template>
  <div class="bottom-bar">
    <div class="check-content">
    <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算:({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item=>{
          return item.checked
        }).length
      },

      isSelectAll(){
        //方法1：用filter 会所有都遍历
         if(this.cartList.length===0)
           return false
        //   return !(this.cartList.filter(item => !item.checked).length)

        //方法2：用find 找到第一个checked为false就会结束遍历
           return !this.cartList.find(item=>!item.checked)

        //方法3：遍历
        // for (let item of this.cartList){
        //   if(!item.checked){
        //     return item.checked
        //   }
        // }
        // return true


      }



    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item=>item.checked = false)
        }else {
          this.cartList.forEach(item=>item.checked = true)
        }
      },
      calcClick(){
        if(this.checkLength===0){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }

    }

</script>

<style scoped>
.bottom-bar{
  height: 40px;
  position: relative;
  bottom: 134px;
  line-height: 40px;
  background-color: #eee;
  display: flex;
  font-size: 14px;
}
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;

  }
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: gold;
    color: #fff;
    text-align: center;
  }
</style>

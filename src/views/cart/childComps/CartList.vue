<template>
  <div class="cart-list">
    <Scorll class="content" ref="scroll">
    <CartListItem v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </Scorll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from './CartListItem'
  import Scorll from 'components/common/scroll/Scroll'

  export default {
    name: "CartList",
    computed:{
      ...mapGetters(['cartList'])
    },
    components:{
      CartListItem,
      Scorll
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: 100vh
  }
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>

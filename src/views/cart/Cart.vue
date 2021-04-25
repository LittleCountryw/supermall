<template>
  <div id="cart">
  <NavBar class="nav-bar">
    <div slot="center">
      购物车({{length}})
    </div>
  </NavBar>
  <CartList/>
  <CartBottomBar/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //mapGetters可以将getter中的方法自动转成计算属性
      //...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength',
      })
    }
  }
</script>

<style scoped>


  .nav-bar{
   background-color: var(--color-tint);
   color: #fff;
  }

</style>

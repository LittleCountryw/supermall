<template>
  <tab-bar>
  <TabBarItem path="/home" activecolor="blue">
    <div slot="item-icon">
      <img src="~assets/img/tabbar/home.svg">
    </div>
    <div slot="item-icon-active">
      <img src="~/assets/img/tabbar/home_active.svg">
    </div>
    <div slot="item-text">首页</div>
  </TabBarItem>
  <TabBarItem path="/category" activecolor="blue">
    <div slot="item-icon">
      <img src="~/assets/img/tabbar/category.svg">
    </div>
    <div slot="item-icon-active">
      <img src="~/assets/img/tabbar/category_active.svg">
    </div>
    <div slot="item-text">分类</div>
  </TabBarItem>
  <TabBarItem path="/cart">
    <div slot="item-icon">
      <img src="~/assets/img/tabbar/shopcart.svg">
    </div>
    <div slot="item-icon-active">
      <img src="~/assets/img/tabbar/shopcart_active.svg">
    </div>
    <div slot="item-text">购物车</div>
  </TabBarItem>
  <TabBarItem path="/profile">
    <div slot="item-icon">
      <img src="~/assets/img/tabbar/profile.svg">
    </div>
    <div slot="item-icon-active">
      <img src="~/assets/img/tabbar/profile_active.svg">
    </div>
    <div slot="item-text">我的</div>
  </TabBarItem>
    </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/Tabbar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "mainTabbar",
    components:{
      TabBarItem,
      TabBar
    }
  }
</script>

<style scoped>

</style>

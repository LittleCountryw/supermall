<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else ><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!--<div :class={active:isActive}><slot name="item-text"></slot></div>-->
  </div>
</template>

<script>

  export default {
    name: "TabBarItem",
    data(){
      return {
        // isActive: true,
      }
    },
    props:{
      path:String,
      activecolor:{
        type:String,
        default:"red"
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return  this.isActive?{color:this.activecolor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex:1;/*flex-grow=1 代表flex item沿主轴方向扩大（1表示每个占剩余空间的一份）*/
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;/*可以消除div自带的空隙*/
  }
  /*.active{
    color: red;
  }*/
</style>

<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: "Tabbar",

  }
</script>

<style scoped>

  #tab-bar {
    display: flex;
    flex-direction: row;
    background-color:#f6f6f6 ;
    position: fixed;
    bottom:0;
    left: 0;
    right: 0;
    /*x轴正方向 y轴正方向 阴影宽度 颜色rgba*/
    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
    z-index: 9;
  }

</style>

<template>
  <div id="app">
    <mainTabbar/>
    <!--如果详情页被keep-alive了，那么无论点哪个图片进入的都是第一次图片请求的数据-->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import mainTabbar from 'components/content/mainTabbar/mainTabbar'
export default {
  name: 'App',
  components: {
    mainTabbar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>

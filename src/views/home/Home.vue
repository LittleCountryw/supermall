<template>
  <div id="home">
  <!--<nav-bar></nav-bar>-->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="contentScroll"><!--对scroll组件设置高度即定下可滚动的区域  山峰改为连接符+小写-->
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl class="tab-control"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
      ></TabControl>
      <GoodList :goods="showGoods"/>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    <!--加上.native属性可以监听组件内第一个div的点击-->


  </div>
</template>

<script>

  import HomeSwiper from './ChildCompts/HomeSwiper'
  import RecommendView from './ChildCompts/RecommendView'
  import FeatureView from './ChildCompts/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMutidata,getHomeGoods} from 'network/home'



  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){

      this.getHomeMutidata()
        //请求goods数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods:{
      /*
      * 事件监听相关的代码
      * */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
        }
      },
      backClick(){
        // this.$refs.scroll.scroll.scrollTo(0,0,300)
        //太长了对其进行封装
        //第一个scroll是scroll组件，第二个scroll是组件中实例的scroll，
        //scroll实例中的scrollTo方法参数：x-pos，y-pos，完成滚动花费的时间（毫秒）
        this.$refs.scroll.scrollTo(0,0,1000)
        //设置了默认时间最后的时间可以不传

        //Vue中ref的作用：1.本页面获取dom元素
        // 2.获取子组件中的data，methods
      },
      contentScroll(position){
         // console.log(position);
        this.isShowBackTop = -(position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /*
      * 网络请求相关的代码
      * */
      getHomeMutidata(){
        getHomeMutidata().then(res=>{
          //console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        //可以使用.引用属性，也可以使用['属性名']引用，因为type中只能传字符串，所以这里要用['属性名']
        const page=this.goods[type].page+1//这里+1只是传参+1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>

  #home {
    padding-top: 44px;
    height: 100vh;/*视口高度*/
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 8;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  /*.content{
    height: calc(100% - 44px);
    overflow: hidden;
  }*/
</style>

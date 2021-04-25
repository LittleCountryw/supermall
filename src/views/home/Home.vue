<template>
  <div id="home">
  <!--<nav-bar></nav-bar>-->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl class="tab-control"
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1" v-show="isFixed">
      <!--:class="{fixed:isFixed}"-->
    </TabControl>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!--对scroll组件设置高度即定下可滚动的区域  山峰改为连接符+小写-->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2">
                  <!--:class="{fixed:isFixed}"-->
      </TabControl>
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
  // import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMutidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'


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
      // BackTop
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
        // isShowBackTop:false,
        tabOffsetTop:0,
        isFixed:false,
        saveY:0,
        itemImageListener:null
      }
    },
    computed:{
      showGoods(){
        console.log(this.goods[this.currentType].list);
        return this.goods[this.currentType].list
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){

      //不能在created中监听任何组件，因为此时还没进行挂载找不到
      this.getHomeMutidata()
        //请求goods数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      //在home组件中监听事件总线传递的事件
      //注意这里一个放在mounted中
      // 因为在crate时，scroll组件可能还没在挂载，所以无法找到scroll
      //同理，在create中用querySelector也可能找不到DOM元素

      //由于refresh会被频繁的执行，为了减小服务器压力，
      //可以将其包装一层防抖函数
      //即在监听到itemImageLoad事件时，
      // 不立刻执行refresh函数，而是执行经过防抖函数处理后返回的函数

      /*this.$bus.$on('itemImageLoad',()=>{
        this.$refs.scroll.refresh()
        // console.log("----");
      })*/

      // const refresh = debounce(this.$refs.scroll.refresh,300)
      // // 用路由的方法判断
      // this.$bus.$on('homeItemImageLoad',()=>{
      //   refresh()
      // })

     // const refresh = debounce(this.$refs.scroll.refresh,300)
      // 用混入的方法判断，但是首页和详情页都会监听到itemImageLoad事件，所以当离开首页或者详情页时，要取消当前页面的监听
      //对于首页，由于有keep-alive保持不被销毁，所以可以在deactivated中取消itemImageLoad的监听
     // this.itemImageListener =()=>{
     //   refresh()
     // }
      //this.$bus.$on('itemImageLoad',this.itemImageListener)

      // console.log(this.$refs.tabControl.$el.offsetTop);
      //此处获得的是不正确的值，因为此时图片可能还没有加载完成
      //所以要在图片加载完成之后再计算offsetTop的值

    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      //需要再刷新一下因为可能出现不能滚动的问题
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()
      //this.$bus.$off需要传两个参数，一个是监听的事件名称，一个是监听该事件后执行的函数
      //如果只传名称，那么会取消所有监听事件
      this.$bus.$off('itemImageLoad',this.itemImageListener)
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
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
        //1.判断BackTop是否显示
        // this.isShowBackTop = -(position.y) > 1000
        this.listenShowBackTop(position)
        //2.决定tabControl是否吸顶
        this.isFixed = -(position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //HTMLElement.offsetParent:返回一个指向最近的（指包含层级上的最近）
        // 包含该元素的定位元素
        //或者最近的table，td，th，body元素
        //HTMLElement.offsetTop返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
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

  /*.tab-control {*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 8;*/
  /*}*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
/*  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top:44px;
    !*
    发现这种方法并不可行，原因：
    1.tabControl定位设置为fixed后脱离标准流会直接消失
    2.由于better-scroll在滚动时会改变translate的值，translate会对fixed进行改变
    *!
  }*/
  .tab-control{
    position: relative;
    /*z-index只对有定位的元素起效果*/
    z-index: 9;

  }


  /*.content{
    height: calc(100% - 44px);
    overflow: hidden;
  }*/
</style>

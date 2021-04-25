<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <!--当给props中属性传值时，应该使用驼峰标识，但是事件监听可以不使用-->
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
    <DetailSwiper :top-images="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"/>
    <DetailShopInfo :shop="shop"/>
    <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <DetailParamInfo ref="params" :param-info="paramInfo"/>
    <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
    <GoodsList ref="recommend" :goods="recommends"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    <DetailBottomBar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'


  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:0
        //itemImageListener:null
        //getThemeTopY:null 定义经历防抖操作后的函数
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res);
        const data = res.result;
        //console.log(data.itemInfo.topImages);
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        //赋值之后等一会儿才会渲染，所以直接拿拿不到值
        //$nextTick会等到DOM渲染之后再执行回调函数
        //但是这样依然是不对的，因为此时图片没有加载完成
        // this.$nextTick(()=>{
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs)
        // })


      })

      getRecommend().then(res=>{
        console.log(res);
        this.recommends = res.data.list
      })
      //赋值之后等一会儿才会渲染，所以直接拿拿不到值


      // this.getThemeTopY = debounce(()=>{
      //   this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //     console.log(this.themeTopYs)
      // },300)

    },
    mounted(){

      //   const refresh = debounce(this.$refs.scroll.refresh,300)
    //   // 用路由的方法判断
    //   this.$bus.$on('detailItemImageLoad',()=>{
    //   refresh()
    // })
    //   const refresh = debounce(this.$refs.scroll.refresh,300)
    //   this.itemImageListener =()=>{
    //     refresh()
    //   }
      // 用混入的方法判断，但是首页和详情页都会监听到itemImageLoad事件，所以当离开首页或者详情页时，要取消当前页面的监听
     // this.$bus.$on('itemImageLoad', this.itemImageListener)
      //这时发现首页和详情页的mounted有英语的代码，可以将他们抽离出来，但是由于Home和Detail都是导出的Vue对象，所以，不能用类的继承
      //这里可以使用一种新的技术：混入 mixin

      /*发现请求到的数据有undefined，
      原因是在组件中进行了v-if来判断是否有数据有数据才开始渲染组件
      由于数据的请求是异步的，在这一步还没有请求到数据所以导致undefined的出现
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);*/
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
   /*
      在updated中做是一种方法
      updated(){
      this.themeTopYs=[]
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs)
    },*/
    methods:{
      imageLoad(){

        this.$refs.scroll.refresh()
        //由于在之前对imageLoad进行过处理，使其在最后一张图片加载完之后就在发送事件，
        // 所以只会打印一次值
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //为了对选择条件进行优化，即避免因为最后一个越界分情况讨论向数组中push一个最大值
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)

        //此处还可以利用防抖函数
        //this.getThemeTopY()

      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-(this.themeTopYs[index]),200)
        // console.log(index);
      },
      contentScroll(position){
        let length = this.themeTopYs.length
        const positionY = -(position.y)
        // for (let i =0 ;i<length;i++) {
          //判断条件：为了处理最后的数组越界问题分两种情况，1.是前三种时要判断positionY是否处于前后两者之间
          // 2.最后一种时只要判断positionY是否大于最后的themeTopYs即可
          /*if(this.currentIndex!==i && (i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]||i==length-1 && positionY>=this.themeTopYs[i])){
                this.currentIndex=i
                // console.log(i);
                this.$refs.nav.currentIndex = this.currentIndex
          }*/
          //优化过后的判断条件
          for (let i = 0; i < length-1; i++) {
            if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
              this.currentIndex=i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }

          this.listenShowBackTop(position)
        },

      //将actions中方法放在methods中
      ...mapActions(['addCart']),
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid

        //2.将商品添加到购物车
        //dispatch可以返回一个promise
        this.addCart(product).then(res=>{
          // console.log(res);
          this.$toast.show(res,2000)
        })
      }

     },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    }
}
/*
* 问题：在哪里能获取到正确的offsetTop
* 1.crate中不行，因为create中无法获取元素
* 2.mounted不行，因为数据是异步获取的，数据可能会还没获取到
* 3.获取到数据的回调中也不行，因为DOM还没渲染完
* 4.$nextTick也不行，因为图片的高度没有被计算在内
* 5.在图片加载完成后，获取的高度才正确
* */


</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 58px);
  }
</style>

import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data(){
    return{
      itemImageListener:null
    }
  },
  mounted(){
    console.log("混入内容");
    const refresh = debounce(this.$refs.scroll.refresh,300)
    this.itemImageListener =()=>{
      refresh()
    }
    // 用混入的方法判断，但是首页和详情页都会监听到itemImageLoad事件，所以当离开首页或者详情页时，要取消当前页面的监听
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  }
}
export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,1000)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -(position.y) > 1000
    }
  }
}

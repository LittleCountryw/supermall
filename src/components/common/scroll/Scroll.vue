<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>

  //利用scroll组件只是挂载要进行滚动的元素，这里挂载一个是最外层的wrapper
  import BScroll from 'better-scroll'

  // import BScroll from '@better-scroll/core'
  // import Pullup from '@better-scroll/pull-up'
  //
  // BScroll.use(Pullup)

  export default {
    name: "Scroll",
    data(){
      return{
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUPLoad:{
        type: Boolean,
        default:false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUPLoad: this.pullUPLoad,
        mouseWheel: true,
        observeDOM: true,
      })
      //监听滚动位置
      // console.log(this.probeType);
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        })
      }
      //监听上拉事件
      // console.log(this.pullUpLoad);
      this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })

    },
    methods:{
      scrollTo(x,y){
        this.scroll && this.scroll.scrollTo(x,y,300)
        //给完成滚动的默认时间设置为300ms
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh(){
        //在加this.scroll的原因是为了防止在scroll实例还没被加载出来就回调函数造成空指针异常
        this.scroll && this.scroll.refresh()
        //console.log("----");
      },
      getScrollY(){
        return this.scroll ? this.scroll.y:0
      }

    }
  }
</script>

<style scoped>

</style>

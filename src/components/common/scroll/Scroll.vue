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
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
         pullUPLoad:this.pullUPLoad,
         //pullUPLoad:true,
        //
         mouseWheel:true,
         observeDOM:true,
      })

      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position);
      })

      this.scroll.on('pullingUp',()=>{
        console.log("下拉刷新");
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y){
        this.scroll.scrollTo(x,y,300)
        //给完成滚动的默认时间设置为300ms
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>

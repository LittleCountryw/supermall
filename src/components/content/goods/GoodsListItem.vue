<template>
  <div class="goods-item" @click="itemClick">
    <!--<img :src="showImage" alt="" @load="imageLoad">-->
    <!--使用图片懒加载-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imageLoad(){
        // console.log("图片加载完成");
        //现在要做的是让scroll实例在每张图片完成加载后都重新计算scrollerHeight的值
        //所以要实现GoodsListItem与Scroll组件之间的通信
        //直接进行发射事件很麻烦，可以采取两种方法
        // 1.利用事件总线2.在Vuex设置一个状态，由scroll监听状态的改变
        //这里采取事件总线的方法

        // this.$bus.$emit('itemImageLoad')
      //   方法一：用路由的方法判断并发出不同的事件进行不同的监听
      //   if(this.$route.path.indexOf('/home')){
      //     this.$bus.$emit('homeItemImageLoad')
      //   }else if(this.$route.path.indexOf('/detail')){
      //     this.$bus.$emit('detailItemImageLoad')
      //   }
      // },
          this.$bus.$emit('itemImageLoad')

        },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image||this.goodsItem.show.img
        // return this.goodsItem.show.img ? goodsItem.show.img : this.goodsItem.image
        // console.log(this.goodsItem.show.img);
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

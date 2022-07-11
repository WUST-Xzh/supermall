<template>
  <div class="detailSwiper">
    <swiper  class="sw">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'



export default {
  name: 'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem

  }
}
</script>

<style scoped>
.sw{
  height: 300px;
  overflow: hidden;
}
</style>

<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :product="item"> </cart-list-item>
    </scroll>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/BScroll/Scroll'
import CartListItem from './CartListItem.vue'


export default {
  name: 'CartList',
  computed:{
    ...mapGetters(['cartList'])

  },
  components:{
     Scroll,
     CartListItem
  },
  activated(){
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
.cart-list{
  height: 100vh;
  overflow: hidden;
}
.content{
  height: calc(100% - 44px - 49px - 40px);

}
</style>

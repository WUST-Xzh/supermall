<template>
<div class="bottom-bar">
  <div class="allcheck">
    <check-button class="checkbutton" :is-checked="isSelectAll" @click.native="checkClick"/>
    <span>全选</span>
  </div>

  <div class="price">
    合计:{{totalPrice}}
  </div>

  <div class="calculcate" @click="calcClick">
    去计算:{{checkLength}}
  </div>


</div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton';
import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length===0) return false
      return !this.cartList.find(item=> !item.checked)
    },
    
  },
  methods:{
    checkClick(){
      if(this.isSelectAll)
      {
        this.cartList.forEach(item => {
          item.checked=false
        });
      } else {
        this.cartList.forEach(item => {
          item.checked=true
        });
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.isshow('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  line-height: 40px;
  background-color: #eee;
  display: flex;
}
.allcheck{
  display: flex;
  line-height: 40px;
  align-items: center;
  width: 60px;
}
.checkbutton{
  width: 20px;  
  height: 20px;
  line-height: 20px;
}

.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  background-color:red ;
  text-align: center;
}
</style>

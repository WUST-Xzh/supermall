<template>
<div id="home">
  <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="toptabcontrol" class="fixed"  v-show="isTabFixed"></tab-control>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="isLoad" @pullingUp="loadmore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" ></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol" ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top class="back-top" @click.native="backClick" v-show="isShow"></back-top>
</div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/BScroll/Scroll'
import BackTop from 'components/content/backTop/backTop'

import {getHomedata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isLoad:false,
      tabOffsetTop:0,
      saveY:0,
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView ,
    TabControl,
    GoodsList,
    Scroll, 
    },
  created(){
    this.getHomedata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mixins:[itemListenerMixin,backTopMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },
  },
  destroyed(){

  },
  activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
  deactivated(){
      this.saveY=this.$refs.scroll.scroll.y,
      this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    //事件监听相关方法
   
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
      if (this.$refs.toptabcontrol!==undefined)
      {
        this.$refs.toptabcontrol.currentIndex=index
        this.$refs.tabcontrol.currentIndex=index
      }
      
    },
    contentScroll(position){
      // 返回顶部效果
      this.isShow= (-position.y)>1000
      // 吸顶效果
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadmore(){
      this.getHomeGoods(this.currentType),
      this.$refs.scroll.refresh()
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabcontrol.$el.offsetTop
    },

    // 网络请求相关方法
    getHomedata(){
      getHomedata().then(res=>{
        this.banners=res.data.data.banner.list;
        this.recommends=res.data.data.recommend.list;
        })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.data.list);
            this.goods[type].page+=1;
            this.$refs.scroll.finishPullUp()
        })
    },
    
  }

}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  left:0;
  right:0;
  top:0;
  z-index:9;
}

.content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left:0;
  right: 0;
}
.fixed{
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}
</style>

<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
    <detail-param-info ref="param" :param-info="goodsParam"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
  </scroll>
  <back-top class="back-top" @click.native="backClick" v-show="isShow"></back-top>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
</div>
</template>

<script>
import DetailNavBar from './childComps/detailNavBar.vue'
import DetailSwiper from './childComps/detailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/BScroll/Scroll'
import Toast from 'components/common/toast/Toast'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'detail',
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      goodsParam:{},
      commentInfo:{},
      recommends:[],
      themeY:[],
      getThemeY:null,
      currentIndex:0,
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created(){
    this.iid=this.$route.params.id
    getDetail(this.iid).then(res=>{
      const data=res.data.result
      this.topImages=data.itemInfo.topImages
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop=new Shop(data.shopInfo)
      this.detailInfo=data.detailInfo
      this.goodsParam=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      if(data.rate.cRate!==0)
      {
        this.commentInfo=data.rate.list[0]
      }
      //created不能获取DOM元素
      //mounted不能获取数据
      //DOM已经渲染完，但是图片没有加载完，此时图片高度没有计算在内
      this.$nextTick(()=>{
        this.getThemeY=debounce(()=>{
                this.params=[]
                this.themeY.push(0)
                this.themeY.push(-this.$refs.param.$el.offsetTop+44)
                this.themeY.push(-this.$refs.comment.$el.offsetTop+44)
                this.themeY.push(-this.$refs.recommend.$el.offsetTop+44)
                this.themeY.push(-Number.MAX_VALUE)
            },200)
      })
      })
    getRecommend().then(res=>{
      const data=res.data.data
      this.recommends=data.list
    })
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh()
      this.getThemeY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,this.themeY[index],500)
    },
    contentScroll(position){
      const positionY=position.y
      let length=this.themeY.length
      for (let i=0;i<length-1;i++)
      {
        if (this.currentIndex!==i && (i<=length-1 && positionY<this.themeY[i] && positionY>this.themeY[i+1]))
        {
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      this.isShow= (-position.y)>1000
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    addToCart(){
      //获取商品信息
      const product={}
      product.img=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      //将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.isshow(res,1500)
      })
    }

  },
  destory(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  
}
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
.content{
  height: calc(100% - 44px);
}

</style>

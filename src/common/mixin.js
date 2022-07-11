import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/backTop'
export const itemListenerMixin={
  data(){
    return{
      itemImgListener:null,
    }
  },

  mounted(){
    let newrefresh=debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener=()=>{
      newrefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}

export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShow:false,
      isTabFixed:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}
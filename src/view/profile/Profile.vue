<template>
  <div>
    <scroll class="content"></scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/BScroll/Scroll'



export default {
  name: 'Profile',
  components:{
    Scroll

  }

}
</script>

<style scoped>
.content{
  height: 300px;
}
</style>

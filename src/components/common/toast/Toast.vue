<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>



export default {
  name: 'Toast',
  data(){
    return{
      message:'',
      show:false
    }
  },
  methods:{
    isshow(message,duration=2000){
      this.show=true
      this.message=message

      setTimeout(()=>{
        this.show=false
        this.message=''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position:fixed;
  top:50%;
  left: 50%;
  background-color:rgba(0,0,0,0.7);
  color:#fff;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  z-index: 111111;
}
</style>

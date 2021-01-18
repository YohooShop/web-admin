<template>
<div>


  <div class="preview" >
    <div class="miniprogram-wraper">
      <div class="miniprogram-head">
        <div class="head-title ellipsis">{{title}}</div>
      </div>
      <div class="miniprogram-con">
        <iframe :src="`/landPage?id=${id}`" />
      </div>
    </div>

    <div class="erweima-wraper"></div>
  </div>
</div>
</template>

<script>
import './pagepreview.scss'
import {info} from '@/api/shop/landpages'
export default {
  data() {
    return {
      id:null,
      title:'',
      page:{}
    }
  },
  created(){
    this.id=this.$route.query.id
     info(this.id)
    .then(res=>{   
      this.page=res.data
      this.title=res.data.title      
    })
  },
  mounted(){   
   
  },
  methods:{
    
  },
  components:{
  
  }
}
</script>

<template >
  <PageCreate  v-if="show"/>
</template>

<script>
import PageCreate from '../PageCreate'
import {info} from '@/api/shop/landpages'
export default {
  name: 'PageEditor',
  data() {
    return {
      id:0,
      show:false
    }
  },
  created(){
    let load=this.$loading()
      console.log(this.$route.query)
    // //获取落地页信息
    this.id=this.$route.query.id
    info( this.id)
    .then(res=>{     
      this.$store.state.page=res.data    
      setTimeout(()=>{
        this.show=true
        load.close()     
      },500)  
    })
  },
  mounted(){

  },
  methods:{

  },
  components:{
    PageCreate
  }
}
</script>

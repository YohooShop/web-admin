<template>
    <div class="carousel-set">
          <!-- 添加轮播图片 -->
    <div class="border-wraper mb20">
      <div class="setting-carousels">
        <div class="carousels-item" v-for="(item,index) in navData" :key="index">
          <div class="item-img">
            <el-upload class="img-uploader"
              name="file"
              :action="uploadApi"
              :headers="headers"
              v-loading="loading&&currentIndex==index"
              accept="image/*"
              :show-file-list="false"
              :on-success="(res,file)=>{uploadSuccess(res,file,index)}"      
              :on-error="uploadError"
              :before-upload="(file)=>{beforeUpload(file,index)}">
              <img  :src="item.imageUrl&&(item.imageUrl)||'/static/img/blank.png'" class="img-preview"/>         
            </el-upload>  
          </div>
          <div class="item-attrs">
                <div class="attr-wraper">
              <div class="attr-name">导航名称：</div>
              <div class="attr-value">
                  <el-input type="text" placeholder="请输入导航名称" v-model="item.name"></el-input>    
              </div>  
            </div> 
            <div class="attr-wraper">
              <div class="attr-name">链接类型：</div>
              <div class="attr-value">
                <el-radio v-model="item.linkType" label="page">小程序页面</el-radio>    
                <el-radio v-model="item.linkType" label="h5">H5链接</el-radio>       
              </div>  
            </div> 
            <div class="attr-wraper">
              <template v-if="item.linkType=='page'">
                <el-input type="text" placeholder="请输入小程序页面路径" v-model="item.link"></el-input>
              </template> 
              <template v-else>
                <el-input type="text" placeholder="请输入H5链接地址" v-model="item.link"></el-input>
              </template> 
            </div>
            <div class="attr-wraper">
              <div class="attr-name">是否需要登录：</div>
              <el-radio v-model="item.needLogin" :label= true>需要</el-radio>  
                <el-radio v-model="item.needLogin" :label= false>不需要</el-radio>
                  
            </div>  
          </div>
          <div class="item-operate">
            <i class="el-icon-close" title="删除" @click="deleteNav(index)"></i> 
            <i class="el-icon-sort-up" title="上移" @click="moveNav(index,'pre')"></i> 
            <i class="el-icon-sort-down" title="下移" @click="moveNav(index,'next')"></i> 
          </div>
        </div>
        <div class="carousels-add align-center" @click="addNav">
          <div class="addbtn"><i class="el-icon-plus"></i> 添加导航</div>
          <div class="tip-info">图片上传支持jpg/jpeg/png/gif格式，最大不能超过1MB</div>
        </div>
      </div>
    </div>

     </div>
</template>

<script>
import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
    name:'IndexNavSet',
     props:{
        component:{
        type:Object,
        required:true
        }
    },
    data() {
        let data={}
        this.initProps(data)
        return {
             headers: {
              Authorization: getToken()
            },
                //落地页容器宽度
            viewWidth,
               //加载中
            loading:false,
              //当前正在上传的轮播项
            currentIndex:0,
            ...data,
        }
    },
    computed: {
        ...mapGetters([
        'uploadApi'
        ])
    },
    watch:{
        //监听相同组件激活切换
            'component.id':function(newVal, oldVal){
                if(oldVal&&newVal&&oldVal!==newVal){
                    this.initProps(this)
                }
            },
            //深度监听轮播项中元素变化-同步组件数据
            navData:{
                handler:function(newVal,oldVal){
                    this.$store.commit('setComponentProp',{id:this.component.id, prop:'navData', newVal})
                },
                deep:true
            },
    },

   methods:{
    //初始化组件状态
        initProps(data){    
             data.navData=this.component.navData|| [
                  {imageUrl:'',linkType:'page',link:'',name:'名称',needLogin:false},
                 ]
        },

         //删除导航
        deleteNav(index){
            if(this.navData.length==1)return this.$message.error(`至少保留一项轮播图！`); 
            this.navData.splice(index,1)
        },
        //添加导航
        addNav(){
            this.navData.push({imageUrl:'',linkType:'page',link:'',name:'名称',needLogin:false})
        },
         //上移、下移导航
        moveNav(index,type){
            let temp=this.navData[index]
            switch(type){
                case 'pre':
                if(index!=0){
                    this.navData.splice(index,1)
                    this.navData.splice(index-1,0,temp)
                }
                break;
                case 'next':
                if(index!=this.navData.length-1){
                    this.navData.splice(index,1)
                    this.navData.splice(index+1,0,temp)
                }
                break;
            }
        },
         //上传之前的验证
        beforeUpload(file,index){
            const isLt1M = file.size / 1024 / 1024 <= 1;
            if (!isLt1M) {
                    this.$alert('图片最大不能超过1MB，请调整后，重新上传！', '请重新上传', {
                    confirmButtonText: 'OK',
                    showClose:false
                })  
                return false
            }
            
            this.currentIndex=index, this.loading=true
            return true
        },
        //上传成功
        uploadSuccess(res, file, index){
            console.log(arguments)
            this.loading=false
            this.navData[index].imageUrl = res.data.link
            this.$message.success(`上传图片成功！`); 
        },
        //上传失败
        uploadError(err, file){
            this.loading=false
            this.$message.error(`上传图片失败：${err}`);      
        }
    }
}
</script>
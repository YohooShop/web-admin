<template>
    <div class="border-wraper mb20">
        <div class="setting-carousels">
              <div class="setting-indexGrouping">
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 魔方模式：</el-col>
                    <el-col class="item-value">
                    <el-select v-model="cubeData.mode" placeholder="请选择"  @change="modeChange">
                        <el-option  v-for="item in modes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>   
                    </el-col>
                </el-row>
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 排列方式：</el-col>
                    <el-col class="item-value">
                    <el-select v-model="cubeData.showType" placeholder="请选择"  @change="typeChange">
                        <el-option  v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>   
                    </el-col>
                </el-row>
              </div>
              <div class="carousels-item" v-for="(item,index) in cubeData.cubeImages" :key="index">
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
                    </div>
                    <div class="item-operate">
                        <i class="el-icon-sort-up" title="上移" @click="move(index,'pre')"></i> 
                        <i class="el-icon-sort-down" title="下移" @click="move(index,'next')"></i> 
                    </div>
              </div>
        </div>
    </div>
</template>

<script>

const typesOne=[
    {value: '1_1',label: '排列方式一'},
]

const typesTwo=[
    {value: '2_1',label: '排列方式一'},
    {value: '2_2',label: '排列方式二'},
    {value: '2_3',label: '排列方式三'},
]

const typesThree=[
    {value: '3_1',label: '排列方式一'},
    {value: '3_2',label: '排列方式二'},
    {value: '3_3',label: '排列方式三'},
]

const typesFour=[
    {value: '4_1',label: '排列方式一'},
    {value: '4_2',label: '排列方式二'},
]

import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
    name:'IndexCubeSet',
    props:{
        component:{
            type:Object,
            required:true
        }
    },
    computed:{
        ...mapGetters([
            'uploadApi'
        ])
    },
    data(){
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
            modes:[
                {value: 1,label: '一图模式'},
                {value: 2,label: '二图模式'},
                {value: 3,label: '三图模式'},
                {value: 4,label: '四图模式'},
            ],
            ...data,
        }
    },
    watch:{
         //监听相同组件激活切换
        'component.id':function(newVal, oldVal){
            if(oldVal&&newVal&&oldVal!==newVal){
                this.initProps(this)
            }
        },
          //深度监听元素变化-同步组件数据
        cubeData:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'cubeData', newVal})
            },
            deep:true
        },
    },
    methods:{
          //初始化组件状态
        initProps(data){  
             data.cubeData=this.component.cubeData||{
                mode:1,
                showType:'1_1',
                cubeTitle:'',
                cubeImages:[
                    {
                        imageUrl:'',linkType:'page',link:''
                    },
                ]
            }
           switch(data.cubeData.mode){
                case 1:
                    this.types = typesOne
                break;
                case 2:
                    this.types = typesTwo
                break;
                case 3:
                    this.types = typesTwo
                break;
                case 4:
                    this.types = typesTwo
                break;
                default:
                break;
            }
       
        },
        typeChange(val) {
              console.log(val)
             this.cubeData.showType = val
              console.log( this.cubeData)
        },
        //魔方类型改变
        modeChange(val){
         
            this.cubeData.mode = val;
            switch(val){
                case 1:
                    this.cubeData.cubeImages = [
                        { imageUrl:'',linkType:'page',link:''},
                    ]
                    this.cubeData.showType = '1_1'
                    this.types = typesOne
                break;
                case 2:
                    this.cubeData.cubeImages = [
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                    ]
                    this.types = typesTwo
                    this.cubeData.showType = '2_1'
                break;
                case 3:
                    this.cubeData.cubeImages = [
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                    ]
                    this.cubeData.showType = '3_1'
                    this.types = typesThree
                break;
                case 4:
                    this.cubeData.cubeImages = [
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                        { imageUrl:'',linkType:'page',link:''},
                    ]
                    this.cubeData.showType = '4_1'
                    this.types = typesFour
                break;
                default:
                break;
            }
        },
          //移动
        move(index,type){
            let temp=this.cubeData.cubeImages[index]
            switch(type){
                case 'pre':
                if(index!=0){
                    this.cubeData.cubeImages.ssplice(index,1)
                    this.cubeData.cubeImages.splice(index-1,0,temp)
                }
                break;
                case 'next':
                if(index!=this.cubeData.cubeImages.length-1){
                    this.cubeData.cubeImages.splice(index,1)
                    this.cubeData.cubeImages.splice(index+1,0,temp)
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
            this.loading=false
            this.cubeData.cubeImages[index].imageUrl = res.data.link
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
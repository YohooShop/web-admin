<template>
    <div class="indexGroup-set">
        <div class="border-wraper mb20">
            <div class="setting-indexGrouping">
                <el-row class="setting-item" type="flex" align="middle">
                <el-col class="item-name"><span class="required">*</span> 搜索占位符：</el-col>
                <el-col class="item-value">
                <el-input type="text" placeholder="请输入商品组名称" v-model="searchPlace"></el-input>
                </el-col>
            </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'

export default {
    name:"IndexSearchSet",
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
        //落地页容器宽度
            viewWidth,
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
        //深度监听轮播项中元素变化-同步组件数据
        searchPlace:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'searchPlace', newVal})
            },
            deep:true
        },
    },
     methods:{
    //初始化组件状态
        initProps(data){    
             data.searchPlace=this.component.searchPlace||""
        }
    }
}
</script>
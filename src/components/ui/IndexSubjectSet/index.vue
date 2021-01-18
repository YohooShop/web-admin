<template>
       <div class="indexGroup-set">
        <div class="border-wraper mb20">
            <div class="setting-indexGrouping">
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 专题名称：</el-col>
                    <el-col class="item-value">
                    <el-input type="text" placeholder="请输入商品组名称" v-model="subjectData.title"></el-input>
                    </el-col>
                </el-row>

            <div class="goods-add align-center" @click="addSubject">
                <div class="addbtn"><i class="el-icon-plus"></i> 添加专题</div>
            </div>
            <div class="setting-indexGrouping">
                <div v-for="(item,index) in subjectData.subjectList" :key="index" class="goods-item">
                    <div class="item-img">
                        <img :src="item.pic"  class="img-preview">
                    </div>
                    <div class="item-attrs">
                        <div class="attr-wraper">
                            <div class="attr-name">专题名称：</div>
                            <div class="attr-value">
                                {{item.name}}
                            </div>
                        </div>
                         <!-- <div class="attr-wraper">
                            <div class="attr-name">价格：</div>
                            <div class="attr-value">
                                ￥ {{item.price}}
                            </div>
                        </div> -->
                    </div>
                     <div class="item-operate">
                        <i class="el-icon-close" title="删除" @click="deleteSlide(index)"></i> 
                        <i class="el-icon-sort-up" title="上移" @click="moveSlide(index,'pre')"></i> 
                        <i class="el-icon-sort-down" title="下移" @click="moveSlide(index,'next')"></i> 
                    </div>
                </div>
            </div>
            </div>
              <subjectList ref="form" ></subjectList>
        </div>
    </div>
</template>

<script>
import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'
import subjectList from '@/views/components/subjectList'
export default {
    name:'IndexSubjectSet',
    components:{subjectList},
    props:{
        component:{
            type:Object,
            required:true
        }
    },
    data(){
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
        subjectData:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'subjectData', newVal})
            },
            deep:true
        },
    },
    methods:{
         initProps(data){
            data.subjectData =  this.component.subjectData||{
                title:'标题',
                subjectList:[]
            }
        },
        addSubject(){
            this.$refs.form.dialog = true
        },
        getSelectSubjectFormSubjectComp(arr) {
           this.subjectData.subjectList = this.subjectData.subjectList.concat(arr);
        },
        deleteSlid(index){
              this.subjectData.subjectList.splice(index,1)
        },
        moveSlide(index,type){
            let temp=this.subjectData.subjectList[index]
            switch(type){
                case 'pre':
                if(index!=0){
                    this.subjectData.subjectList.splice(index,1)
                    this.subjectData.subjectList.splice(index-1,0,temp)
                }
                break;
                
                case 'next':
                if(index!=this.subjectData.subjectList.length-1){
                    this.subjectData.subjectList.splice(index,1)
                    this.subjectData.subjectList.splice(index+1,0,temp)
                }
                break;
            }
        }
    }
    
}
</script>
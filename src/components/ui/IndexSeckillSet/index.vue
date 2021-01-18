<template>
     <div class="indexGroup-set">
        <div class="border-wraper mb20">
            <div class="setting-indexGrouping">
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 标题：</el-col>
                    <el-col class="item-value">
                    <el-input type="text" placeholder="请输入标题" v-model="seckillData.title"></el-input>
                    </el-col>
                </el-row>
                 <div class="item-attrs">
                        <div class="attr-wraper">
                        <div class="attr-name">链接类型：</div>
                        <div class="attr-value">
                            <el-radio v-model="seckillData.showMore" :label= true >启动</el-radio>    
                            <el-radio v-model="seckillData.showMore" :label= false>禁用</el-radio>       
                        </div>  
                        </div> 
                        <div class="attr-wraper">
                             <el-input type="text" placeholder="请输入页面路径" v-model="seckillData.moreLink"></el-input>
                        </div>  
                    </div>
                <div class="goods-add align-center" @click="addGoods">
                    <div class="addbtn"><i class="el-icon-plus"></i> 添加商品</div>
                </div>
                    <div class="setting-indexGrouping">
                    <div v-for="(item,index) in seckillData.goodsList" :key="index" class="goods-item">
                        <div class="item-img">
                            <img :src="item.pic"  class="img-preview">
                        </div>
                        <div class="item-attrs">
                            <div class="attr-wraper">
                                <div class="attr-name">商品名称：</div>
                                <div class="attr-value">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="attr-wraper">
                                <div class="attr-name">价格：</div>
                                <div class="attr-value">
                                    ￥ {{item.price}}
                                </div>
                            </div>
                        </div>
                        <div class="item-operate">
                            <i class="el-icon-close" title="删除" @click="deleteSlide(index)"></i> 
                            <i class="el-icon-sort-up" title="上移" @click="moveSlide(index,'pre')"></i> 
                            <i class="el-icon-sort-down" title="下移" @click="moveSlide(index,'next')"></i> 
                        </div>
                    </div>
                </div>
            </div>
            <goodsList ref="form" ></goodsList>
        </div>
    </div>
</template>

<script>
import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'
import goodsList from '@/views/components/goodsList'
export default {
    name:"IndexSeckill",
    components:{
        goodsList
    },
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
        seckillData:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'seckillData', newVal})
            },
            deep:true
        },
    },
      methods:{
        initProps(data){
            data.seckillData =  this.component.seckillData||{
                title:'标题',
                type:2,
                showMore:false,
                moreLink:"",
                goodsList:[]
            }
        },
        getGoodsList(){
            this.$refs.form.type = this.seckillData.type;
            this.$refs.form.getResetDialogList();
        },
        addGoods(){
            this.getGoodsList()
            this.$refs.form.dialog = true
        },
        getSelectGoodsFormGoodsComp(goodsArr) {
            console.log(goodsArr)
            this.seckillData.goodsList = this.seckillData.goodsList.concat(goodsArr);
        },
        deleteSlide(index){
              this.seckillData.goodsList.splice(index,1)
        },
        moveSlide(index,type){
            let temp=this.seckillData.goodsList[index]
            switch(type){
                case 'pre':
                if(index!=0){
                this.seckillData.goodsList.splice(index,1)
                this.seckillData.goodsList.splice(index-1,0,temp)
                }
                break;
                
                case 'next':
                if(index!=this.seckillData.goodsList.length-1){
                this.seckillData.goodsList.splice(index,1)
                this.seckillData.goodsList.splice(index+1,0,temp)
                }
                break;
            }
        }
    }
}
</script>
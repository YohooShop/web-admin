<template>
    <div class="indexGroup-set">
        <div class="border-wraper mb20">
            <div class="setting-indexGrouping">
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 商品组名称：</el-col>
                    <el-col class="item-value">
                    <el-input type="text" placeholder="请输入商品组名称" v-model="groupingData.name"></el-input>
                    </el-col>
                </el-row>
                <el-row class="setting-item" type="flex" align="middle">
                    <el-col class="item-name"><span class="required">*</span> 商品类型：</el-col>
                    <el-col class="item-value">
                         <el-select v-model="groupingData.type" placeholder="请选择"  @change="typeChange">
                            <el-option  v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>     
                    </el-col>
                </el-row>
                <div class="goods-add align-center" @click="addGoods">
                    <div class="addbtn"><i class="el-icon-plus"></i> 添加商品</div>
                </div>
                <div class="setting-indexGrouping">
                    <div v-for="(item,index) in groupingData.goodsArr" :key="index" class="goods-item">
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
    
    name:"IndexGroupingSet",
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
            types:[
                {value: 0,label: '普通商品'},
                {value: 1,label: '团购商品'},
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
         //深度监听轮播项中元素变化-同步组件数据
        groupingData:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'groupingData', newVal})
            },
            deep:true
        },
    },
    created(){
        
       
    },
    mounted(){
        
    },
    methods:{
        initProps(data){
            data.groupingData =  this.component.groupingData||{
                name:'标题',
                showMore:false,
                moreLink:"",
                type:0,
                goodsArr:[]
            }
        },
        typeChange(val) {
             this.groupingData.type = val;
             this.groupingData.goodsArr = [];
        },
        getGoodsList(){
            this.$refs.form.type = this.groupingData.type;
            this.$refs.form.getResetDialogList();
        },
        addGoods(){
            this.getGoodsList()
            this.$refs.form.dialog = true
        },
        getSelectGoodsFormGoodsComp(goodsArr) {
            console.log(goodsArr)
            this.groupingData.goodsArr = this.groupingData.goodsArr.concat(goodsArr);
        },
        deleteSlid(index){
              this.groupingData.goodsArr.splice(index,1)
        },
        moveSlide(index,type){
            let temp=this.groupingData.goodsArr[index]
            switch(type){
                case 'pre':
                if(index!=0){
                this.groupingData.goodsArr.splice(index,1)
                this.groupingData.goodsArr.splice(index-1,0,temp)
                }
                break;
                
                case 'next':
                if(index!=this.groupingData.goodsArr.length-1){
                this.groupingData.goodsArr.splice(index,1)
                this.groupingData.goodsArr.splice(index+1,0,temp)
                }
                break;
            }
        }
    }
}
</script>

<style scoped>

</style>
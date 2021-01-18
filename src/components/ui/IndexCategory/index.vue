<template>
    <div class="index-category">
        <div class="best">
            <div class="title">
                {{categoryData.title}}
            </div>
            <div class="SalesGoods-box">
                 <div  v-for="(item,index) in categoryData.goodsList" :key="index" 
				class="SalesGoods-item">
                    <div class="item">
                        <img :src="item.pic" class="slider-image"/> 
                        <div class="goods-name">{{item.name}}</div>
                        <div class="money-box">
                            <div class="money-now">￥{{item.price}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './indexCategory.scss'
export default {
    name:'IndexCategory',
    props:{
            //组件名称
        name:String,
        //组件唯一的ID
        id:{
            type:String,
            required:true
        },
        //组件的类型
        type:{
            type:String,
            required:true
        },
        categoryData:{
            type:Object,
            value:'',
            default:function(){
                return{
                    title:'',
                    goodsList:[]
                } 
            }
        }
    },
    data(){
        return{

        }
    },
    methods:{
        
    }
}
</script>
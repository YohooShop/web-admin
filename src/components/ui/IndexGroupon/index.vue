<template>
    <div class="groupon-item-box">
        <div class="title mx-1px-bottom">
             <span>{{grouponData.title}} </span>
            <span v-if="grouponData.showMore">
                更多
                <span class="iconfont icon-form_icon_more_fuzhi">
                </span>
            </span>
        </div>
        <div v-for="(item,index) in grouponData.goodsList" :key="index" >
            <div class="item">
                <div class="left">
                    <img :src="item.pic" alt="">
                    <div class="num">{{item.people}}人团</div>
                </div>
                <div class="right">
                    <div class="name">{{item.name}}</div>
                    <div class="price-box">
                        <div class="meal-price">
                            <div class="price">
                                 ￥{{item.price}} <span class="old-price">￥{{item.originalPrice}}</span>
                            </div>
                            <div class="btn">
                                 <span>去拼团 <i class="iconfont icon-Chevronrightdouble1-24px"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './indexGroupon.scss'
export default {
    name:'IndexGroupon',
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
        grouponData:{
            type:Object,
            value:'',
            default:function(){
                return{
                    title:'标题',
                    type:1,
                    showMore:false,
                    moreLink:"",
                    goodsList:[
                      
                    ]
                } 
            }
        }
    }
}
</script>
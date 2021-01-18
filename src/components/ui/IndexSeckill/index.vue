<template>
    <div class="seckill-box">
        <div class="title">
            <span>{{seckillData.title}}</span>
            <span v-if="seckillData.showMore">
                更多
                <span class="iconfont icon-form_icon_more_fuzhi">
                 
                </span>
            </span>
        </div>
        <div v-for="(item,index) in seckillData.goodsList" :key="index">
            <div class="seckill-info">
                <div class="left">
                    <img :src="item.pic" alt="">
                </div>
                <div class="right">
                    <div class="goods-name">
                        {{item.name}}
                    </div>
                    <div class="price-box">
                        <div>￥0.1</div>
                        <div class="old">￥100</div>
                    </div>
                    <div class="seckill-time">
                        <seckill :end ="'2019-07-30 16:00:00'" :starts="'2019-07-29 16:00:00'"
                            :server="'2019-07-30 17:59:50'" :mold="'goods'">
                            </seckill>
                            <div class="buy" >
                                去抢购
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./indexSeckill.scss"
import Seckill from '../Seckill'
export default {
    name:"IndexSeckill",
    components:{Seckill},
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
        seckillData:{
            type:Object,
            value:'',
             default:function(){
                return{
                    title:'今日秒杀',
                    type:2,
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
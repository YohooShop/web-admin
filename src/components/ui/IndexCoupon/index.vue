<template>
    <div class="coupon-warp-box">
        <div class="coupon-item-box" v-for="(item, index) in couponData" :key="index">
            <div class="coupon-item">
                <div class="left">
                    <div v-if="item.type == 'cash'">
                        <span class="money">
                            ￥
                        </span>
                        <span class="num">{{item.value}}</span>
                    </div>
                    <div v-if="item.type == 'discount'">
                        <span class="num">{{item.value}}</span>
                        <span class="money">
                          折
                        </span>
                    </div>
                </div>
                <div class="right">
                    <div class="label">{{item.title}}</div>
                        <div class="btn" >
                        点击领取
                    </div>
                    <div class="btn" >
                        去使用
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './indexCoupon.scss'
export default {
    name:'IndexCoupon',
    props: {
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
        couponData:{
            type:Array,
            value:'',
            default:function(){
                return [
                     {type:'cash', value:'',title:'',link:'',id:''},
                ]
            }
        }
    }
}
</script>
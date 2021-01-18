<template>
    <div class="g-main">
        <div class="m-lead">
            <div class="ul-box">
                <div class="li-box">
                    <span>{{groupingData.name}}</span>
                </div>
            </div>
        </div>
        <div :class="['m_content', groupingData.length != 1 ? 'g-bg' : '']">
            <div class="m-main">
                <div class="goods_box" v-for="(item,index) in groupingData.goodsArr" :key="index">
                    <div class="goods_image">
                        <img :src="item.pic"  mode="aspectFill"/>
                    </div>
                    <div class="title">{{item.name}}</div>
                    <div class="price">￥ {{item.price}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './indexGrouping.scss'
export default {
    name:"IndexGrouping",
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
		groupingData:{
			type:Object,
            value:'',
            default:function(){
                return {
                    name:'标题',
                    type:0,
                    goodsArr:[]
                }
            }
	    }
	},
    created(){
      
    },
    data(){
        return {
		
        }
    }

}
</script>


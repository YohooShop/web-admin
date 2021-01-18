<template>
    <div class="quick-nav">
        <div class="nav-content">
            <div class="nav-item" v-for="(item,index) in navData" :key="index" >
                <div class="top-info">
                    <img :src="item.imageUrl||'/static/img/blank.png'" @click="click(item)" />
                </div>
                <div  class="bottom-info">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import "./indexNav.scss"
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
export default {
    name: "IndexNav",
    props :{
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
        navData:{
            type:Array,
            default:function(){
                 return [
                     {imageUrl:'',linkType:'page',link:'',name:'名称',needLogin:false},
                 ]
            }
        }
    },
    data(){
        return {

        }
    }
}
</script>
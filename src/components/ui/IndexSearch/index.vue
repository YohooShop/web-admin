<template>
    <div class="banner">
        <div class="search">
            <div class="search_box">
                <input type="text" value="" disabled :placeholder="searchPlace">
                <img  :src="'/static/img/search_gray.png'"/>
            </div>
        </div>
    </div>
</template>


<script>
import "./indexSearch.scss"
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
export default {
    name: "IndexSearch",
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
        searchPlace:{
            type:String,
            value:'',
            default:function(){
                return ""
            }
        },
    },
   
    data(){
        return {}
    },
    
}
</script>
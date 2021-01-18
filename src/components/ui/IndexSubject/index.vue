<template>
    <div class="g-main">
        <div class="m-lead" style="margin-bottom: 5px">
            <div class="ul-box">
                <div class="li-box"><span>{{subjectData.title}}</span></div>
            </div>
        </div>
        <div class="m-content">
            <div v-for="(item,index) in subjectData.subjectList" :key="index" class="m-content-item">
                <div class="image-wrapper">
                    <img :src="item.pic">
                </div>
                <div class="title clamp">{{item.title}}</div>
                <div class="desc">{{item.description}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import "./indexSubject.scss"
export default {
    name:'IndexSubject',
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
        subjectData:{
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
        return {}
    }
}
</script>
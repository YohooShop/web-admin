<template>
    <div class="picture-cube">
        <!--一图模式-->
        <div class="one-mode" v-if="cubeData.mode == 1">
            <div class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</div>
             <!--第一种表现形式-->
            <div v-for="(item, index) in cubeData.cubeImages" :key="index">
                    <img :src="item.imageUrl||'/static/img/blank.png'"/>
            </div>
        </div>
        <!--二图模式-->
        <div class="two-mode" v-if="cubeData.mode==2">
            <div class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</div>
            <!--第一种表现形式-->
            <div class="first-show" v-if="cubeData.showType == '2_1'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                     <img :src="item.imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>

            <!--第二种表现形式-->
            <div class="common-show" v-if="cubeData.showType == '2_2'">
                <div class="item">
                    <img :src="cubeData.cubeImages[0].imageUrl||'/static/img/blank.png'"/>
                </div>
                <div class="two-item">
                    <img :src="cubeData.cubeImages[1].imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>
            <!--第三种表现形式-->
            <div class="common-show" v-if="cubeData.showType == '2_3'">
                <div class="two-item">
                    <img :src="cubeData.cubeImages[0].imageUrl||'/static/img/blank.png'"/>
                </div>
                <div class="item">
                    <img :src="cubeData.cubeImages[1].imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>
        </div>
        <!--三图模式-->
        <div class="three-mode" v-if="cubeData.mode==3">
            <div class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</div>
             <!--第一种表现形式-->
            <div class="first-show" v-if="cubeData.showType == '3_1'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                     <img :src="item.imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>
            <!--第二种表现形式-->
            <div class="common-show" v-if="cubeData.showType == '3_2'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                    <div v-if="index==0">
                         <img :src="item.imageUrl||'/static/img/blank.png'"/>
                    </div>
                    <div class="info" v-else>
                        <img :src="item.imageUrl||'/static/img/blank.png'"/>
                    </div>
                </div>
            </div>
            <!--第三种表现形式-->
            <div class="common-show" v-if="cubeData.showType == '3_3'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                    <div v-if="index==2">
                         <img :src="item.imageUrl||'/static/img/blank.png'"/>
                    </div>
                    <div class="info" v-else>
                        <img :src="item.imageUrl||'/static/img/blank.png'"/>
                    </div>
                </div>
            </div>
        </div>
        <!--四图模式-->
        <div class="four-mode" v-if="cubeData.mode==4">
            <div class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</div>
            <!--第一种表现形式-->
            <div class="first-show" v-if="cubeData.showType == '4_1'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                     <img :src="item.imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>

            <!--第二种表现形式-->
            <div class="second-show" v-if="cubeData.showType == '4_2'">
                <div class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
                     <img :src="item.imageUrl||'/static/img/blank.png'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './indexCube.scss'
export default {
    name:"IndexCube",
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
        cubeData:{
            type:Object,
            value:'',
            default:function(){
                return {
                    mode:1,
                    showType:'1_1',
                    cubeTitle:'',
                    cubeImages:[
                       {imageUrl:'',linkType:'page',link:''},
                    ]
                }
            }
        }
    }
}
</script>
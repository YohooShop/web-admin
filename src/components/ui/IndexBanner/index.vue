<template>
    <div class="index-banner">
        <swiper class="banner" :options="swiperOption">
            <swiper-slide class="carousel-item"  v-for="(item,index) in bannerData" :key="index">
                <img :src="item.imageUrl||'/static/img/blank.png'" mode="aspectFill"/>
            </swiper-slide>
             <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        
    </div>
</template>

<script>
import './indexBanner.scss'
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 
export default {
    name:'IndexBanner',
    components: { Swiper, SwiperSlide },
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
		bannerData:{
			type:Array,
            value:'',
            default:function(){
                return [
                    {imageUrl:'',linkType:'page',link:'',color:''},
                    {imageUrl:'',linkType:'page',link:'',color:''}
                ]
            }
		}
    },
    data(){
         return {
              swiperOption: {
                autoplay: {
                disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                delay: 3000, // 自动切换的时间间隔（单位ms）
                },
                initialSlide: 0,
                loop: true,
                pagination: { el: '.swiper-pagination' }, // 分页按钮
                paginationClickable: true,
                onSlideChangeEnd: swiper => {
                //console.log('onSlideChangeEnd', swiper.realIndex)
                }
            }
         }
    },
    methods(){

    }
}
</script>

<style scoped>


</style>
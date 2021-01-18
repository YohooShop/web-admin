<template>
    <div class="indexCoupon-set">
        <div class="border-wraper mb20">
            <div class="setting-indexCoupon">
                <div v-for="(item,index) in couponData" :key="index" class="coupon-item">
                    <div class="item-attrs">
                        <div class="attr-wraper">
                            <div class="attr-name">名称：</div>
                            <div class="attr-value">
                                {{item.title}}
                            </div>
                        </div>
                         <div class="attr-wraper">
                            <div class="attr-name">面值：</div>
                            <div class="attr-value">
                                ￥ {{item.value}}
                            </div>
                        
                        </div>
                    </div>
                    <div class="item-add" @click="linkCoupon(index)">
                       设置购物券
                        
                    </div>
                     <div class="item-operate">
                        <i class="el-icon-close" title="删除" @click="deleteCoupon(index)"></i> 
                        <i class="el-icon-sort-up" title="上移" @click="moveCoupon(index,'pre')"></i> 
                        <i class="el-icon-sort-down" title="下移" @click="moveCoupon(index,'next')"></i> 
                    </div>
                </div>
            </div>
            <div class="setting-indexCoupon">
                <div class="coupon-add align-center" @click="addCoupon">
                    <div class="addbtn"><i class="el-icon-plus"></i> 添加优惠券</div>
                </div>
            </div>
        </div>
         <couponList ref="form" ></couponList>
    </div>
</template>
<script>
import {viewWidth} from '@/utility/landpage'
import { mapGetters } from 'vuex'
import couponList from '@/views/components/couponList'
export default {
    name:'IndexCouponSet',
    props:{
        component:{
            type:Object,
            required:true
        }
    },
    data(){
        let data={}
        this.initProps(data)
        return {
                //落地页容器宽度
            viewWidth,
            indexCoup:null,
            ...data,
        }
    },
    watch:{
            //监听相同组件激活切换
        'component.id':function(newVal, oldVal){
            if(oldVal&&newVal&&oldVal!==newVal){
                this.initProps(this)
            }
        },
            //深度监听轮播项中元素变化-同步组件数据
        couponData:{
            handler:function(newVal,oldVal){
                this.$store.commit('setComponentProp',{id:this.component.id, prop:'couponData', newVal})
            },
            deep:true
        },
    },

    methods:{
        initProps(data){
            data.couponData =  this.component.couponData||[
                {type:'cash', value:'',title:'',link:'',id:''},
            ]
        },
        linkCoupon(index){
            this.indexCoup = index;
            this.$refs.form.dialog = true
        },
        addCoupon(){
            let coupon = {type:'cash', value:'',title:'',link:'',id:''}
            this.couponData = this.couponData.concat(coupon);
        },
        getSelectCouponFormouponComp(item){
            console.log(item);
            let coup = this.couponData[this.indexCoup];
            coup.title = item.name;
            coup.value = item.amount;
            coup.id = item.id;
        },

        deleteCoupon(index){
              this.couponData.splice(index,1)
        },
        moveCoupon(index,type){
            let temp=this.couponData[index]
            switch(type){
                case 'pre':
                if(index!=0){
                    this.couponData.splice(index,1)
                    this.couponData.splice(index-1,0,temp)
                }
                break;
                
                case 'next':
                if(index!=this.couponData.length-1){
                    this.couponData.splice(index,1)
                    this.couponData.splice(index+1,0,temp)
                }
                break;
            }
        }
        
    },
    components:{
        couponList
    }
    
}
</script>
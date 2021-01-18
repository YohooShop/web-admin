<template>
    <el-form style="margin-top: 6px;" size="small" label-width="180px">
        <el-form-item label="首页配置" placeholder="请选择">
            <el-select v-model="homelandpageId">
                <el-option v-for="item in homeList" :key="item.id" :label="item.name" :value="item.id">
                  
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否启用首页落地配置">
                <el-radio v-model="startUsing" :label = true >启用</el-radio>
                <el-radio v-model="startUsing" :label = false >禁用</el-radio>
        </el-form-item>
        <el-form-item label="">
            <el-button :loading="loading" size="medium" type="primary" @click="doSubmit">保存配置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {list} from '@/api/shop/landpages'
import {get, save} from '@/api/shop/shopconfig'
export default {
    data(){
        return {
            homeList:[],
            homelandpageId:'',
            startUsing:false,
            loading:false
        }
    },
    created(){
        this.getHomeLandPageData();
        this.getShopConfig();
    },
    methods:{
        getHomeLandPageData(){
            list().then((result) => {
              this.homeList = result.data;
            }).catch((err) => {
                
            });
        },
        getShopConfig(){
            get().then((result)=>{
                this.homelandpageId = result.data.homelandpageId;
                this.startUsing = result.data.startUsing;
            }).catch((err)=>{

            })
        },
        doSubmit(){
            let data = {
                startUsing:this.startUsing,
                homelandpageId:this.homelandpageId
            }
            this.loading = true;
            save(data).then((result)=>{
               this.loading = false;
                this.$notify({
                    title: '修改成功',
                    type: 'success',
                    duration: 2500
                })
            }).catch((err)=>{
                this.loading = false;
            })
        }
    }
}


</script>
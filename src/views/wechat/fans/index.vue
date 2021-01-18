<template>
    <div class="mod-config">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-select v-model="dataForm.tagid" filterable clearable placeholder="用户标签">
                    <el-option v-for="item in wxUserTags" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="dataForm.nickname" placeholder="昵称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="dataForm.city" placeholder="城市" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button  v-permission="['admin','wx:wxuser:save']" type="primary" @click="$refs.wxUserTagging.init('tagging')" :disabled="dataListSelections.length <= 0">绑定标签</el-button>
                <el-button v-permission="['admin','wx:wxuser:save']" type="primary" @click="$refs.wxUserTagging.init('untagging')" :disabled="dataListSelections.length <= 0">解绑标签</el-button>
                <el-button v-permission="['admin','wx:wxuser:delect']" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
            </el-form-item>
            <el-form-item class="fr">
                <el-button  icon="el-icon-price-tag" type="success" @click="$refs.wxUserTagsEditor.show()">标签管理</el-button>
                <el-button  icon="el-icon-sort" type="success" @click="sysnFans()">同步粉丝</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="openid" header-align="center" align="center" label="openid">
            </el-table-column>
            <el-table-column prop="nickname" header-align="center" align="center" label="昵称">
            </el-table-column>
            <el-table-column prop="sex" header-align="center" align="center" label="性别" :formatter="sexFormat">
            </el-table-column>
            <el-table-column prop="city" header-align="center" align="center" label="城市">
            </el-table-column>
            <el-table-column prop="headimgurl" header-align="center" align="center" label="头像">
                <img class="headimg" slot-scope="scope" v-if="scope.row.headimgurl" :src="scope.row.headimgurl" />
            </el-table-column>
            <el-table-column prop="tagidList" header-align="center" align="center" label="标签" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-for="tagid in JSON.parse(scope.row.tagidList)" :key="tagid">{{getTagName(tagid)}} </span>
                </template>
            </el-table-column>
            <el-table-column prop="subscribeTime" header-align="center" align="center" label="订阅时间">
                <template slot-scope="scope">
                        {{ scope.row.subscribeTime | formatDate }}
                </template>
            </el-table-column>
            <el-table-column prop="subscribe" header-align="center" align="center" label="是否关注">
                <span slot-scope="scope">{{scope.row.subscribe?"是":"否"}}</span>
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.openid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <wx-user-tags-manager ref="wxUserTagsEditor" :visible="showWxUserTagsEditor" @close="showWxUserTagsEditor=false"></wx-user-tags-manager>
        <wx-user-tagging ref="wxUserTagging" :wxUsers="dataListSelections"></wx-user-tagging>
    </div>
</template>

<script>
import WxUserTagsManager from './components/manager'
import WxUserTagging from './tagging'
import {sync, list, del} from '@/api/wechat/fans'
import { Form } from 'element-ui'
import {formatDate} from '@/utils/date'
export default {
    data() {
        return {
            dataForm: {
                tagid:'',
                nickname: '',
                city:''
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListLoading: false,
            dataListSelections: [],
        }
    },
    components: {
        WxUserTagsManager,WxUserTagging
    },
     filters: {
        formatDate(time) {
            var date = new Date(time * 1000);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    activated() {
        console.log("进入");
        this.getDataList()
    },
    computed: {
        wxUserTags() {
            return this.$store.state.wxUserTags.tags
        }
    },
    methods: {
        // 获取数据列表
        getDataList() {
            console.log("获取数据列表");
            this.dataListLoading = true
            let params = {
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                    'nickname': this.dataForm.nickname,
                    'tagid': this.dataForm.tagid,
                    'city': this.dataForm.city,
                    'sidx': 'subscribe_time',
                    'order': 'desc'
            }
            list(params).then(res=>{
                this.dataList = res.data.list
                this.totalPage = res.data.total
                this.dataListLoading = false
            }).catch(e=>{
                 this.dataListLoading = false
            })
        },
        // 每页数
        sizeChangeHandle(val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageIndex = val
            this.getDataList()
            
        },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val
        },
        // 删除
        deleteHandle(id) {
            
            this.$confirm(`确定删除操作?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var ids = id ? [id] : this.dataListSelections.map(item => item.openid)
                let params = new URLSearchParams();
                params.append('ids', ids);
                del(params).then(res=>{
                this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                }).catch(e=>{

                })
            })
        },
        sysnFans(){
            console.log("同步")
            sync().then(res=>{
                 this.$message({
                            message: '同步任务已建立，请稍候刷新查看列表',
                            type: 'success',
                            duration: 1500
                        })
            }).catch(e=>{
                   this.$message.error(e);
            })
        },
        
        sexFormat(row, column, cellValue) {
            let sexType = {
                0: '未知',
                1: '男',
                2: '女'
            }
            return sexType[cellValue];
        },
        getTagName(tagid){
            let tag = this.wxUserTags.find(item=>item.id==tagid)
            return tag?tag.name : "?"
        }
    }
}
</script>
<style scoped>
.headimg{
    width: 50px;
    height: 50px;
    border-radius: 8px;
}
</style>
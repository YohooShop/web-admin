<template>
    <div class="mod-config">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="dataForm.matchValue" placeholder="匹配关键词" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                
                <el-button  v-permission="['admin','wx:msgreplyrule:save']" type="primary" @click="addHandle()">新增</el-button>
                <el-button  v-permission="['admin','wx:msgreplyrule:delete']" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" border type="expand" v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="ID">
                            <span>{{ props.row.ruleId }}</span>
                        </el-form-item>
                        <el-form-item label="精确匹配">
                            <span>{{ props.row.exactMatch?'是':'否' }}</span>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <span>{{ props.row.status?'是':'否' }}</span>
                        </el-form-item>
                        <el-form-item label="备注说明">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="生效时间">
                            <span>{{ props.row.effectTimeStart }}</span>
                        </el-form-item>
                        <el-form-item label="失效时间">
                            <span>{{ props.row.effectTimeEnd }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="ruleName" header-align="center" align="center" show-overflow-tooltip label="规则名称">
            </el-table-column>
            <el-table-column prop="matchValue" header-align="center" align="center" show-overflow-tooltip label="匹配关键词">
            </el-table-column>
            <el-table-column prop="replyType" header-align="center" align="center" :formatter="replyTypeFormat" label="消息类型">
            </el-table-column>
            <el-table-column prop="replyContent" header-align="center" align="center" show-overflow-tooltip label="回复内容">
             
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateHandle(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
    </div>
</template>

<script>
// import AddOrUpdate from './edit'
import {getList, del} from '@/api/wechat/reply'
export default {
  
    data() {
        return {
            dataForm: {
                matchValue: ''
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false
        }
    },
    computed: {
        KefuMsgType: {
            get() {
                return this.$store.state.message.KefuMsgType
            }
        }
    },

    created() {
        this.getDataList()
    },
    methods: {
        // 获取数据列表
        getDataList() {
            this.dataListLoading = true
            var this_ = this;

            var params = {
                'page': this.pageIndex,
                'size': this.pageSize,
                'key': this.dataForm.matchValue
            }
            getList().then(function(res) {
                this_.dataListLoading = false
                this_.dataList = res.data.content
                this_.totalCount = res.data.totalElements
            }).catch(function(err) {
                this_.dataListLoading = false
               Message({message: err,type: 'error'})
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
        // 新增 / 修改
        addHandle(id) {
            this.addOrUpdateVisible = true
            this.$router.push({path:'/wechat/addReply'});
        },

        updateHandle(id){
            this.$router.push({path:'/wechat/updateReply',query:{id:id}});
        },
        // 删除
        deleteHandle(id) {
            this.$confirm(`确定进行删除操作?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                var ids = [];
                if(id){
                    ids = [id]
                }else{
                     for(let i=0;i<this.dataListSelections.length;i++){
                         ids.push(this.dataListSelections[i].id);
                     }
                }
                console.log(ids);
                let params = new URLSearchParams();
                params.append('ids', ids);
                del(params).then(res=>{
                    this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => this.getDataList()
                        })
                }).catch(e=>{
                            this.$message.error(e);
                })
                
            })
        },
        replyTypeFormat(row, column, cellValue) {
            return this.KefuMsgType[cellValue];
        }
    }
}
</script>

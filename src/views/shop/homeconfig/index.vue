<template>
    <div class="app-container">
          <!--工具栏-->
        <div class="head-container">
        <!-- 新增 -->
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button
                v-permission="['admin','YXSYSTEMGROUPDATA_ALL','YXSYSTEMGROUPDATA_CREATE']"
                class="filter-item"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="add"
                >新增</el-button>
            </div>
        </div>
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="网页名称" />
            <el-table-column prop="title" label="网页标题" />
            <el-table-column prop="urlKey" label="urlKey" />

             <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                <template slot-scope="scope">
                <span>{{scope.row.createTime | formatTime}}</span>
                </template>
            </el-table-column>

             <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新日期">
                <template slot-scope="scope" v-if="scope.row.updateTime">
                <span>{{scope.row.updateTime | formatTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布状态" align="center" prop="enabled">
                <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.showStatus"
                    
                    active-color="#409EFF"
                    inactive-color="#F56C6C"
                    @change="changeEnabled(scope.row, scope.row.showStatus,)"
                />
                </template>
            </el-table-column>
            <el-table-column v-if="checkPermission(['admin'])" label="操作" width="270px" align="center">
                <template slot-scope="scope">
                    <el-button v-permission="[]" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
                    <el-popover
                        :ref="scope.row.id"
                        v-permission="[]"
                        placement="top"
                        width="180"
                    >
                    <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
                    </el-popover>
                       <el-button slot="reference" type="primary" size="mini" @click="copylink(scope.row)">复制链接</el-button>
                    <el-button slot="reference" type="primary" size="mini" @click="preview(scope.row)">预览</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页组件-->
        <el-pagination
        :total="total"
        :current-page="page + 1"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"
        />
    </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/crud'
import {formatDate} from '@/utils/date';
import {del, updateStatus} from '@/api/shop/landpages'
export default {
    mixins: [initData],
    data(){
        return {
              delLoading: false,
        }
    },
    filters:{
        formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    created() {
        this.$nextTick(() => {
        this.init()
        })
    },
    methods: {

        beforeInit() {
            this.url = 'landpages'
            const sort = 'id,desc'
            this.params = { page: this.page, size: this.size, sort: sort }
            return true
        },
        add(){
            this.$router.push('/shop/pageCreate')
        },
        edit(data){
            this.$router.push('/shop/pageEditor?id=' + data.id)
        },
        subDelete(id){
          this.delLoading = true
          del(id).then((result) => {
               this.delLoading = false
                this.$refs[id].doClose()
                this.dleChangePage()
                this.init()
                this.$notify({
                title: '删除成功',
                type: 'success',
                duration: 2500
                })
          }).catch((err) => {
                this.delLoading = false
                this.$refs[id].doClose()
          });
        },
        preview(data){
            // this.$router.push('/shop/pagePreview?id=' + data.id)
            window.open(`/shop/pagePreview?id=${data.id}`,'_blank')
        },
        changeEnabled(data, val){
              this.$confirm('此操作将  ' + data.name + '更改发布状态, 是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {"showStatus":data.showStatus}
                updateStatus(data.id,params).then(res => {

                }).catch(err => {
                data.showStatus = !data.showStatus
                console.log(err.response.data.message)
                })
            }).catch(() => {
                data.showStatus = !data.showStatus
            })
        },
        copylink(data){
             let url = window.location.origin+"/landpage?id="+data.id;
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$message({
                message: '链接地址已复制成功',
                type: 'success'
            });
            oInput.remove()
        }
    }
}
</script>


<style scoped>

</style>
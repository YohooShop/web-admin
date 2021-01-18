<template>
    <el-dialog  :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" title="选择专题" :visible.sync="dialog" width="50%">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                style="float:right"
                type="primary"
                @click="handleSearchList()"
                size="small">
                查询搜索
                </el-button>
                <el-button
                style="float:right;margin-right: 15px"
                @click="handleResetSearch()"
                size="small">
                重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="dialogData.listQuery" size="small" label-width="140px">
                <el-form-item label="专题名称：">
                    <el-input v-model="dialogData.listQuery.keyword" class="input-width" placeholder="专题名称"></el-input>
                </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table ref="newSubjectTable"
                        :data="dialogData.list"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                         border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="60" align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="图片" width="300" align="center">
                <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
                </el-table-column>

                <el-table-column label="专题名称" width="200" align="center">
                <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="所属类别" width="120" align="center">
                <template slot-scope="scope">{{scope.row.categoryName}}</template>
                </el-table-column>
                <el-table-column label="描述"  align="center">
                <template slot-scope="scope">{{scope.row.description}}</template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="dialogData.listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="dialogData.listQuery.pageNum"
                :total="dialogData.total">
            </el-pagination>
        </div>
        <div style="clear: both;"></div>
        <div slot="footer">
            <el-button  size="small" @click="dialog = false">取 消</el-button>
            <el-button  size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
 import {fetchList} from '@/api/subject';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null
  };
export default {
     props: {
        value: {
            type: Object
        }
    },
    data(){
        return {
             dialog: false,
             dialogData:{
                list: null,
                total: null,
                multipleSelection:[],
                listQuery:{
                        keyword: null,
                        pageNum: 1,
                        pageSize: 5
                    }
            },
        }
    },
    created() {
      this.getList();
    },
    methods: {
      cancel() {
          this.resetForm();
      },
      resetForm() {
        this.dialog = false
      },
      getList() {
        this.listLoading = true;
        console.log(this.dialogData)
        fetchList(this.dialogData.listQuery).then(response => {
            this.dialogData.list=response.data.list;
            this.dialogData.total=response.data.total;
        })
      },
      handleResetSearch() {
        this.dialogData.listQuery = {
                        keyword: null,
                        pageNum: 1,
                        pageSize: 5
                    }
      },
      handleSearchList() {
        this.dialogData.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.dialogData.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.dialogData.listQuery.pageNum = 1;
        this.dialogData.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.dialogData.listQuery.pageNum = val;
        this.getList();
      },

      handleSelectDialogConfirm(){
          if (this.dialogData.multipleSelection < 1) {
            this.$message({
                message: '请选择一条记录',
                type: 'warning',
                duration: 1000
            });
          return;
        }
        this.$confirm('使用要进行添加操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.resetForm();
            this.$parent.getSelectSubjectFormSubjectComp(this.dialogData.multipleSelection)
        });
      }
    }
}
</script>
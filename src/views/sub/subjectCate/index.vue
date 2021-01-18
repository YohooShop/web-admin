<template>
   <div class="app-container">
     <el-card class="operate-container" shadow="never">
       <i class="el-icon-tickets"></i>
       <span>数据列表</span>
       <el-button
         class="btn-add"
         @click="handleAdd()"
         size="mini">
         添加
       </el-button>
     </el-card>
    <div class="table-container">
      <el-table ref="productTable"
               :data="list"
               style="width: 100%"
               v-loading="listLoading"
               border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.icon"></template>
        </el-table-column>
        <el-table-column label="名称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="排序" width="160" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">

            <el-button size="mini"
                       type="text"
                       @click="handleEditSort(scope.$index, scope.row)">设置排序
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
<!--            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="设置排序"
               :visible.sync="sortDialogVisible"
               width="40%">
      <el-form :model="sortDialogData"
               label-width="150px">
        <el-form-item label="排序：">
          <el-input v-model="sortDialogData.sort" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="sortDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleUpdateSort" size="small">确 定</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>
  import {subCateList,updateSubjectCateShowStatus,updateSubjectCateSort} from '@/api/subject';
  export default {
    name: 'subjectCate',
    data() {
      return {
         list: null,
         listLoading: true,
         sortDialogVisible:false,
         sortDialogData:{sort:0,id:null}
      }
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        this.listLoading = true;
        subCateList().then(response=>{
          console.log(response)
          this.listLoading = false;
          this.list = response.data;
        });
      },
      handleAdd(){
        this.$router.push('/sub/addSubjectCate')
      },
      handleUpdate(index,row){
         this.$router.push({path: '/sub/updateSubjectCate', query: {id: row.id}})
      },
      handleEditSort(index,row){
        this.sortDialogVisible=true;
        this.sortDialogData.sort=row.sort;
        this.sortDialogData.id=row.id;
      },
      handleUpdateSort(){
        this.$confirm('是否要修改排序?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateSubjectCateSort(this.sortDialogData).then(response=>{
            this.sortDialogVisible=false;
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        })
      },
      handleShowStatusChange(index,row){
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',row.showStatus);
        updateSubjectCateShowStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      }
    },
  }
</script>

<style>
</style>

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
              @selection-change="handleSelectionChange"
               v-loading="listLoading"
              border>
              <el-table-column label="发件人" width="140" align="center">
                  <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="电话号码" width="140" align="center">
                  <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
              </el-table-column>
              <el-table-column label="发货地址"  align="center">
                  <template slot-scope="scope" >
                  {{scope.row.province}} {{scope.row.city}} {{scope.row.region}} {{scope.row.detailAddress}}
                  </template>
              </el-table-column>
              <el-table-column label="默认地址" width="120" align="center">
                  <template slot-scope="scope" >
                      <el-switch
                          @change="handleSelectionChange(scope.$index, scope.row)"
                          :active-value="1"
                          :inactive-value="0"
                          v-model="scope.row.defaultStatus">
                        </el-switch>
                  </template>
              </el-table-column>
              <el-table-column label="操作"  width="160" align="center">
                  <template slot-scope="scope" >
                    <p>
                      <el-button
                        size="mini"
                        @click="handleUpdate(scope.$index, scope.row)">编辑
                      </el-button>
                    </p>
                    <p>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                      </el-button>
                    </p>
                  </template>
              </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
  import {addressList, delAddres, defaultAddress} from '@/api/address';
  export default {
      name: "addressList",
      data() {
        return {
          listLoading: true,
          list:[],
        }
      },
      created() {
        this.getList();
      },
      watch: {

      },
      filters: {

      },
      methods: {
        getList(){
          this.listLoading = true;
          addressList().then(response=>{
            this.listLoading = false;
            this.list = response.data;
          })
        },
        handleAdd(){
            this.$router.push({path:'/setting/addAddress'});
        },
        handleSelectionChange(index,row) {
          let params = {id:row.id,state: row.defaultStatus}
          defaultAddress(params).then(response=>{
             this.getList();
          })
        },
        handleUpdate(index,row){
          this.$router.push({path:'/setting/updateAddress',query:{id:row.id}});
        },
        handleDelete(index,row){
          this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.delAddress(row.id).then(response=>{
              this.getList();
            })
          });
        },
      }
  }
</script>

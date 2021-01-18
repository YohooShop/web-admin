<template>
    <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" title="选择商品" :visible.sync="dialog" width="50%">
        <el-input v-model="dialogData.listQuery.keyword"
                    style="width: 250px;margin-bottom: 20px"
                    size="small"
                    placeholder="商品名称搜索">
            <el-button slot="append" icon="el-icon-search" @click="handleSelectSearch()"></el-button>
        </el-input>
         <el-table :data="dialogData.list"
                @selection-change="handleDialogSelectionChange" border>
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="货号" width="160" align="center">
            <template slot-scope="scope">NO.{{scope.row.productSn}}</template>
            </el-table-column>
            <el-table-column label="价格" width="120" align="center">
            <template slot-scope="scope">￥{{scope.row.price}}</template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
            background
            @size-change="handleDialogSizeChange"
            @current-change="handleDialogCurrentChange"
            layout="prev, pager, next"
            :current-page.sync="dialogData.listQuery.pageNum"
            :page-size="dialogData.listQuery.pageSize"
            :page-sizes="[5,10,15]"
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
import {fetchManagerList as fetchProductList} from '@/api/product';
export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            dialog: false,
            type:0,//0为普通商品 //1为团购商品
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
        // this.getDialogList();    
    },
    methods:{
        cancel() {
             this.resetForm();
        },
        resetForm() {
            this.dialog = false,
            this.dialogData={
                list: null,
                total: null,
                multipleSelection:[],
                listQuery:{
                        keyword: null,
                        pageNum: 1,
                        pageSize: 5
                    }
            }
        },
        getResetDialogList(){
             this.resetForm();
             this.getDialogList();   
        },
       
        getDialogList(){
            fetchProductList(this.dialogData.listQuery, this.type).then(response=>{
                this.dialogData.list=response.data.list;
                this.dialogData.total=response.data.total;
            })
        },
        handleSelectSearch(){
            this.getDialogList();
        },
        handleDialogSelectionChange(val){
            this.dialogData.multipleSelection = val;
        },
        handleDialogSizeChange(val) {
            this.dialogData.listQuery.pageNum = 1;
            this.dialogData.listQuery.pageSize = val;
            this.getDialogList();
        },
        handleDialogCurrentChange(val) {
            this.dialogData.listQuery.pageNum = val;
            this.getDialogList();
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
            this.$parent.getSelectGoodsFormGoodsComp(this.dialogData.multipleSelection)
             this.resetForm();
        });
      },
    }
}
</script>
<style scoped>

</style>
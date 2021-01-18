<template>
     <!-- 选择购物券 -->
        <el-dialog  :append-to-body="true" :close-on-click-modal="false" :before-close="cancel"  title="选择商品" :visible.sync="dialog" width="50%">
            <el-table :data="dialogData.list"
                 @current-change="clickChange" border>
                <el-table-column label="选择" width="55">
            　　　　<template slot-scope="scope">
            　　　　　　<el-radio v-model="dialogData.tableRadio" :label="scope.row"><i></i></el-radio>
            　　　　</template>
            　　</el-table-column>
                <el-table-column label="优惠券名字" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="面值" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.amount}}元</template>
                </el-table-column>
                <el-table-column label="有效期" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.startTime|formatDate}}至{{scope.row.endTime|formatDate}}</template>
                </el-table-column>
                <el-table-column label="状态" width="100" align="center">
                  <template slot-scope="scope">{{scope.row.endTime | formatStatus}}</template>
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
import {formatDate} from '@/utils/date';
import {fetchList} from '@/api/coupon';
export default {
    props:{
        value: {
            type: Object
        }
    },
    data(){
        return{
            dialog: false,
            dialogData:{
                list: null,
                total: null,
                tableRadio:null,
                listQuery:{
                        name: null,
                        type: null,
                        pageNum: 1,
                        pageSize: 5
                    }
            },
        }
    },
    created() {
        this.getDialogList();    
    },
    filters:{
        formatDate(time){
            if(time==null||time===''){
            return 'N/A';
            }
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd')
        },
        formatStatus(endTime){
            let now = new Date().getTime();
            let endDate = new Date(endTime);
            if(endDate>now){
            return '未过期'
            }else{
            return '已过期';
            }
        }
    },
    methods:{
        getDialogList(){
            fetchList(this.dialogData.listQuery).then(response=>{
                this.dialogData.list=response.data.list;
                this.dialogData.total=response.data.total;
            })
        },
         cancel() {
             this.resetForm();
         },
         resetForm() {
            this.dialog = false
            this.dialogData.tableRadio == null
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
            if(this.dialogData.tableRadio == null) {
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
              
                this.$parent.getSelectCouponFormouponComp(this.dialogData.tableRadio)
                this.resetForm();
            });
        },

        clickChange (item) {
          this.dialogData.tableRadio = item
        },
    }
}
</script>
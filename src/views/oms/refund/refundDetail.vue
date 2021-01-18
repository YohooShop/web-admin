<template>
  <div class="detail-container">
    <el-card shadow="never">
      <span class="font-title-medium">退款商品</span>
      <el-table
        border
        class="standard-margin"
        ref="productTable"
        :data="refundData.products">
          <el-table-column label="商品图片" width="160" align="center">
            <template slot-scope="scope">
              <img style="height:80px" :src="scope.row.productPic">
            </template>
          </el-table-column>
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">
              <span class="font-small">{{scope.row.productName}}</span><br>
            </template>
          </el-table-column>
          <el-table-column label="价格/货号" width="180" align="center">
            <template slot-scope="scope">
              <span class="font-small">价格：￥{{scope.row.realAmount}}</span><br>
              <span class="font-small">货号：NO.{{scope.row.productId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="属性" width="180" align="center">
            <template slot-scope="scope">{{scope.row.productAttr}}</template>
          </el-table-column>
          <el-table-column label="数量" width="100" align="center">
            <template slot-scope="scope">{{scope.row.productQuantity}}</template>
          </el-table-column>
          <el-table-column label="小计" width="100" align="center">
            <template slot-scope="scope">￥{{itemTotalAmount(scope.row)}}</template>
          </el-table-column>
        </el-table>
        <div style="float:right;margin-top:15px;margin-bottom:15px">
          <span class="font-title-medium">合计：</span>
          <span class="font-title-medium color-danger">￥{{totalAmount}}</span>
        </div>
    </el-card>
    <el-card shadow="never" class="standard-margin">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
      <el-row>
        <el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
        <el-col class="form-border font-small" :span="18">{{refundData.id}}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">申请状态</el-col>
        <el-col class="form-border font-small" :span="18">{{refundData.status | formatStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="form-border form-left-bg font-small" style="height:50px;line-height:30px">订单编号
        </el-col>
        <el-col class="form-border font-small" :span="18" style="height:50px">
          {{refundData.orderSn}}
          <el-button type="text" size="small" @click="handleViewOrder">查看</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
        <el-col class="form-border font-small" :span="18">{{refundData.createTime | formatTime}}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">用户账号</el-col>
        <el-col class="form-border font-small" :span="18">{{refundData.memberUsername}}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
       <el-col class="form-border font-small" :span="18">1812</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">退款原因</el-col>
        <el-col class="form-border font-small" :span="18">{{refundData.reason}}</el-col>
      </el-row>
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">订单金额</el-col>
          <el-col class="form-border font-small" :span="18">￥{{totalAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">退款金额</el-col>
          <el-col class="form-border font-small" :span="18">￥{{refundData.returnAmount}}</el-col>
        </el-row>
        </div>
        <div class="form-container-border" v-show="refundData.status!==0">
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
            <el-col class="form-border font-small" :span="18">{{refundData.handleMan}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
            <el-col class="form-border font-small" :span="18">{{refundData.handleTime | formatTime}}</el-col>
          </el-row>
        </div>
        <div style="margin-top:15px;text-align: center" v-show="refundData.status===0">
          <el-button type="primary" size="small" @click="handleUpdateStatus(1)">确认退款</el-button>
          <el-button type="danger" size="small" @click="handleUpdateStatus(3)">拒绝退款</el-button>
        </div>
    </el-card>

  </div>
</template>

<script>
    import {getRefundDetail, updateStatus} from '@/api/refund';
    import {formatDate} from '@/utils/date';
    export default {
      name: 'refundDetail',
      data() {
        return {
          refundData:{},
        }
      },
      created() {
        this.id = this.$route.query.id;
        this.getDetail();
      },
      computed: {
        itemTotalAmount() {
           return function(row) {
             if (row != null) {
               return row.realAmount * row.productQuantity;
             } else {
               return 0;
             }
           }
        },
        totalAmount(){
          if(this.refundData.products != null){
             let total = 0.00;
             for(var i=0;i<this.refundData.products.length;i++){
               total += this.refundData.products[i].realAmount * this.refundData.products[i].productQuantity
             }
             return total;
          }else{
            return 0;
          }
        }
      },
      filters: {
        formatStatus(status) {
          if (status === 0) {
            return "待处理";
          } else if (status === 1) {
            return "退货中";
          } else if (status === 2) {
            return "已完成";
          }else if(status === 3){
            return "已取消";
          } else {
            return "已拒绝";
          }
        },
        formatTime(time) {
          if (time == null || time === '') {
            return 'N/A';
          }
          console.log(time)
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
      },
      methods: {
        getDetail() {
           getRefundDetail(this.id).then(response => {
             this.refundData = response.data
           })
        },
        handleViewOrder(){
          this.$router.push({path:'/oms/orderDetail',query:{id:this.refundData.orderId}});
        },
        handleUpdateStatus(state){
          this.$confirm('是否要进行此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            let params = {status:state}
            updateStatus(this.id,params).then(response => {
              if(response.code === 200){
                this.$message({
                type: 'success',
                message: '操作成功!',
                duration:1000
              });
                this.$router.back();
              }else{
                this.$message({
                  type: 'fail',
                  message: '操作失败!',
                  duration:1000
                });
              }
            })
          })
        }
      },
    }
</script>

<style scoped>
  .detail-container {
    position: absolute;
    left: 0;
    right: 0;
    width: 1080px;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
  }

  .standard-margin {
    margin-top: 15px;
  }
  .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>

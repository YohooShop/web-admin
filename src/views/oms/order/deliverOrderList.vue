<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>发货列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="deliverOrderTable"
                style="width: 100%;"
                :data="list" border>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="收货人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.receiverName}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="100" align="center">
          <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
        </el-table-column>
        <el-table-column label="发货信息"  align="center">
          <template slot-scope="scope">
            <p>{{scope.row.senderInfo}}</p>
            <el-button type="primary" icon="el-icon-edit" @click="handleShowAddressDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="收货地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="配送方式" width="160" align="center">
          <template slot-scope="scope">
            <el-select placeholder="请选择物流公司"
                       v-model="scope.row.deliveryCompany"
                       @change="(val)=>selectDelivery(val,scope.row)"
                       size="small">
              <el-option v-for="item in companyOptions"
                         :key="item.id"
                         :label="item.companyName"
                         :value="item.companyName">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <!-- <el-table-column label="付款方式" width="120" align="center">
          <template slot-scope="scope">
            <el-select placeholder="请选择付款方式"
                       v-model="scope.row.payTypeDes"
                       @change="(val)=>selectPayType(val,scope.row)"
                       size="small">
              <el-option v-for="item in payTypes"
                         :key="item.index"
                         :label="item.des"
                         :value="item.des">
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->

        <!-- <el-table-column label="快件类型" width="120" align="center">
          <template slot-scope="scope">
            <el-select placeholder="请选择快件类型"
                       v-model="scope.row.expTypeDes"
                       @change="(val)=>selectExpType(val,scope.row)"
                       size="small">
              <el-option v-for="item in expTypes"
                         :key="item.index"
                         :label="item.des"
                         :value="item.des">
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->

        <!-- <el-table-column label="快递商品名称" width="160" align="center">
         <template slot-scope="scope">
           <el-input size="small" v-model="scope.row.commodityName"></el-input>
         </template>
        </el-table-column> -->

        <!-- <el-table-column label="是否在线下快递单(在线下单后,物流单号由系统生成)" align="center" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.onLineStatus"
              @change="handleStatusChange(scope.$index,scope.row)"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column> -->

        <el-table-column label="物流单号" width="180" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.deliverySn"></el-input>
          </template>
        </el-table-column>

      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </div>

    <el-dialog
    title="选择发货信息"
    :visible.sync="dialogVisible" width="40%">
      <el-table style="width: 100%;margin-top: 20px"
                :data="addressList"
                @row-click = "showRow"
                border>
             <el-table-column label="选择" width="50" align="center">
                 <template slot-scop="scope">
                   <el-radio class="radio"  v-model="radio" >&nbsp;</el-radio>
                </template>
             </el-table-column>


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
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddressConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {deliveryOrder} from '@/api/order'
  import {allFetchList} from '@/api/logistic'
  import {addressList} from '@/api/address'
  // const defaultLogisticsCompanies=["顺丰快递","圆通快递","中通快递","韵达快递"];

  const defaultPayTypes=[
    {"index":1,"des":"现付"},
    {"index":2,"des":"到付"},
    {"index":3,"des":"月结"},
    ]
  const defaultExpTypes=
  [
    {"index":1,"des":"标准快件"},
    ]
  export default {
    name: 'deliverOrderList',
    data() {
      return {
        list:[],
        companyOptions:[],
        addressList:[],
        senderInfoList:[],
        dialogVisible:false,
        radio: 0,
        row:null,
        payTypes:null,
        expTypes:null
      }
    },
    created(){
      this.payTypes = defaultPayTypes;
      this.expTypes = defaultExpTypes;
      this.list= JSON.parse(this.$route.query.list);
      this.loadLogisticData();
      this.loadLoadAddressData();
    },
    handleStatusChange(){

    },
    methods:{
      showRow(row){
      	//赋值给radio
        console.log(row);
      	this.radio = this.addressList.indexOf(row);

      	// this.selected=row;
         console.log(this.radio);
      },
      handleAddressConfirm(){
        var address =  this.addressList[this.radio];
        var addressStr =  address.name + " " + address.phoneNumber + " "  + address.province + address.city + address.region + address.detailAddress
        this.row.senderInfo = addressStr;
        this.row.senderName = address.name;
        this.row.senderCity = address.city;
        this.row.senderRegion = address.region;
        this.row.senderDetailAddress = address.detailAddress;
        this.row.senderProvince = address.province;
        this.row.senderTel = address.phoneNumber;
        this.dialogVisible = false;
        this.radio = 0;
      },
      handleShowAddressDialog(index,row){
        this.dialogVisible = true;
        this.row = row;
      },
      selectExpType(val,row){
        this.expTypes.find((item)=>{//这里的userRoleList就是上面遍历的数据源
            if(item.des === val) {
              row.expType =item.index;
              return
            }
        });
      },
      selectPayType(val,row){
        this.payTypes.find((item)=>{//这里的userRoleList就是上面遍历的数据源
            if(item.des === val) {
              row.payType =item.index;
              return
            }
        });
      },
      selectDelivery(val,row){
        this.companyOptions.find((item)=>{//这里的userRoleList就是上面遍历的数据源
            if(item.companyName === val) {
              row.deliveryCode =item.companyCode;
              return
            }
        });
      },
      loadLoadAddressData(){
        addressList().then(response=>{
          this.addressList = response.data;
          for(var i = 0; i < this.addressList.length;i++){
            var address = this.addressList[i];
            var addressStr =  address.name + " " + address.phoneNumber + " "  + address.province + address.city + address.region + address.detailAddress
            var addressInfo = {'address':addressStr,'index':i}
            this.senderInfoList.push(addressInfo);
          }
        })
      },
      loadLogisticData(vId){
        allFetchList().then(response=>{
            this.companyOptions = response.data;
        })
      },
      cancel(){
        this.$router.back();
      },
      confirm(){
        this.$confirm('是否要进行发货操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // console.log(this.list);
          // return;
          deliveryOrder(this.list).then(response=>{
            this.$router.back();
            this.$message({
              type: 'success',
              message: '发货成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });
        });
      }
    }
  }
</script>
<style></style>

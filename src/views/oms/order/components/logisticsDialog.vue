<template> 
  <el-dialog title="订单跟踪"
             :visible.sync="visible"
             :before-close="handleClose"
             width="40%">
    <el-steps direction="vertical"
              :active="logisticsList.length"
           
              space="50px">
      <el-step  v-for="item in logisticsList"
                :key="item.AcceptStation"
                :title="item.AcceptStation"
                :description="item.AcceptTime"></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  const defaultLogisticsList=[
  
  ];
  import {expressInfo} from '@/api/logistic'
  export default {
    name:'logisticsDialog',
    props: {
      value: Boolean
    },
    computed:{
      visible: {
        get() {
          return this.value;
        },
        set(visible){
          this.value=visible;
        }
      }
    },
    data() {
      return {
        logisticsList:Object.assign({},defaultLogisticsList)
      }
    },
    created(){
    
    },
    methods:{
      express(orderCode, logisticCode,shipperCode){
        this.logisticsList=Object.assign({},defaultLogisticsList)
        if(orderCode && shipperCode && logisticCode){
           let data = {
          "orderCode": orderCode,
          "shipperCode": shipperCode,
          "logisticCode": logisticCode
          };
          expressInfo(data).then((result)=>{
            console.log(data);
            this.logisticsList = result.data.Traces
          }).catch(()=>{

          })
        }
       
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose(){
        this.emitInput(false);
      }
    }
  }
</script>
<style></style>



<template>
  <el-card class="form-container" shadow="never">
      <el-form :model="address"
               :rules="rules"
               ref="addressFrom"
               label-width="150px"
               size="small">
          <el-form-item label="发件人：" prop="name">
              <el-input v-model="address.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phoneNumber">
              <el-input v-model="address.phoneNumber" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="发货地址：" prop="selectedOptions">
               <el-cascader
                    size="large"
                    :options="options"
                    v-model="address.selectedOptions"
                    @change="handleChange">
               </el-cascader>
          </el-form-item>

          <el-form-item label="详细地址：" prop="detailAddress">
              <el-input v-model="address.detailAddress" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="设为默认地址：">
            <el-switch
              @change="handleDefaultStatusChange()"
              :active-value="1"
              :inactive-value="0"
              v-model="address.defaultStatus">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addressFrom')">提交</el-button>
            <el-button v-if="!isEdit" @click="resetForm('addressFrom')">重置</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
  import { regionData, CodeToText ,TextToCode } from 'element-china-area-data'
  import {addAddress, addressDetail, updateAddress} from '@/api/address';
  const defaultAddress = {
    province: null,
    city:null,
    region:null,
    detailAddress:null,
    name: null,
    phoneNumber:null,
    defaultStatus:0,
    selectedOptions: []
  };

  export default {
    name: 'AddressDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        options: regionData ,
        address: Object.assign({}, defaultAddress),
         rules: {
          name: [
            {required: true, message: '请输入发货人名字', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],

          phoneNumber: [
             {required: true, message: '请输入电话号码', trigger: 'blur'},
             {min: 1, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          selectedOptions: [
             {type :'array', required: true, message:'请选择省份地址', trigger: 'blur'}
          ],
          detailAddress: [
             {required: true, message: '请输入详情地址', trigger: 'blur'},
             {min: 1, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      if(this.isEdit){
        //请求数据
        let params = {addressId:this.$route.query.id}
        addressDetail(params).then(response=>{
          this.address = response.data;
          let provinceCode = TextToCode[this.address.province].code;
          let cityCode = TextToCode[this.address.province][this.address.city].code;
          let regionCode = TextToCode[this.address.province][this.address.city][this.address.region].code;
          this.address.selectedOptions = [provinceCode,cityCode,regionCode];
        })
      }
    },
    methods: {
         handleChange (value) {
           this.address.province = CodeToText[value[0]];
           this.address.city = CodeToText[value[1]];
           this.address.region = CodeToText[value[2]];
         },
         handleDefaultStatusChange(){
           console.log(this.address.defaultStatus);
         },
         onSubmit(formName){
           console.log(this.selectedOptions);
            this.$refs[formName].validate((valid) => {
               if (valid) {
                 this.$confirm('是否提交数据', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                 }).then(() => {
                      //上传数据
                      if(this.isEdit){
                        updateAddress(this.$route.query.id,this.address).then(response=>{
                            this.$refs[formName].resetFields();
                            this.$message({
                              message: '修改成功',
                              type: 'success',
                              duration:1000
                            });
                            this.$router.back();
                        })
                      }else{
                        addAddress(this.address).then(response=>{
                          this.$refs[formName].resetFields();
                          this.$message({
                            message: '提交成功',
                            type: 'success',
                            duration:1000
                          });
                          this.$router.back();
                        })
                       
                      }
                 })
               } else {
                   this.$message({
                   message: '验证失败',
                   type: 'error',
                   duration:1000
                  });
                 return false;
               }
            })
         },
         resetForm(formName){
           this.$refs[formName].resetFields();
           this.address = Object.assign({},defaultAddress);
         }
       }
  }
</script>

<style scoped>
  .input-width {
    width: 60%;
  }
</style>

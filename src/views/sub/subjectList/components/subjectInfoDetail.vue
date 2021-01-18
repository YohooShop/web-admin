<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="subjectInfoForm" label-width="120px" style="width: 600px" size="small">
       <el-form-item label="专题名称：" prop="title">
        <el-input v-model="value.title"></el-input>
      </el-form-item>
      <el-form-item label="专题描述：">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="专题内容：">
        <el-input
          :autoSize="true"
          v-model="value.content"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.categoryId"
          @change="handleCategoryChange()"
          placeholder="请选择分类">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="value.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="专题主图：">
        <el-card shadow="never" class="cardBg">
          <div>
           <single-upload v-model="value.pic"
                           style="width: 300px;display: inline-block;margin-left: 10px"></single-upload>
          </div>
        </el-card>
      </el-form-item>

      <el-form-item label="商品相册：">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('subjectInfoForm')">下一步，选择商品关联</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import {fetchList,fetchListAll,subCateList} from '@/api/subject';
  export default {
    name: "SubjectInfoDetail",
    components: {
      SingleUpload,
      MultiUpload
    },
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        categoryOptions:[],
        rules: {
          title: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    computed: {
      //画册图片
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
            return pics;
          }
          let albumPics = this.value.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          this.value.albumPics = '';
          for (let i = 0; i < newValue.length; i++) {
            this.value.albumPics += newValue[i];
            if (i !== newValue.length - 1) {
              this.value.albumPics += ',';
            }
          }
        }
      }
    },
    created() {
      this.getCategoryList();
    },
    methods:{
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.value.categoryId){
               for (let i = 0; i < this.categoryOptions.length; i++) {
                 if(this.categoryOptions[i].value == this.value.categoryId){
                   this.value.categoryName = this.categoryOptions[i].label;
                 }
               }
            }
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      handleCategoryChange(){

      },
      getCategoryList() {
        subCateList().then(response => {
            this.categoryOptions = [];
            let categoryList = response.data;
            for (let i = 0; i < categoryList.length; i++) {
              this.categoryOptions.push({label: categoryList[i].name, value: categoryList[i].id});
            }
        })
      }
    }
  }
</script>

<style scoped>
 .cardBg {
    background: #F8F9FC;
  }
</style>

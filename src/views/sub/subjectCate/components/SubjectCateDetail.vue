<template>
   <el-card class="form-container" shadow="never">
    <el-form :model="data" :rules="rules" ref="subjectCateFrom" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <single-upload v-model="data.icon"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="data.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="data.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="onSubmit('subjectCateFrom')">提交</el-button>
         <el-button v-if="!isEdit" @click="resetForm('subjectCateFrom')">重置</el-button>
       </el-form-item>
     </el-form>
   </el-card>
</template>

<script>
    const defaultData={
       name: '',
       icon: '',
       showStatus: 0,
       sort:0
    }
    import SingleUpload from '@/components/Upload/singleUpload'
    import {addCate,updateCate,getCateDetail} from '@/api/subject';
    export default {
      name:'SubjectCateDetail',
      components:{SingleUpload},
      props: {
        isEdit: {
          type: Boolean,
          default: false
        }
      },
      data(){
        return{
          data:Object.assign({}, defaultData),
          rules: {
            name: [
              {required: true, message: '请输入类别名称', trigger: 'blur'},
              {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
            ],
          },
        }
      },
      mounted:function(){
      if(this.isEdit) {
        if(this.$route.query.id){
              this.orderid = this.$route.query.id;
              sessionStorage.setItem('updateSubjectCateid',this.$route.query.id);
        }
      }
    },

    watch: {
        $route(){
           if(this.isEdit){
                if(this.$route.path=='/sub/updateSubjectCate' && this.$route.query.id){
                  var newid = this.$route.query.id;//当前页新id
                  var oldid = sessionStorage.getItem('updateSubjectCateid');//旧的id
                 
                  if(oldid!=newid){//id有变化时
                     console.log("变化了" ,newid )
                      sessionStorage.setItem('updateSubjectCateid',this.$route.query.id);
                      this.orderid = this.$route.query.id;
                      //监听到id有变化时 执行你想要的操作
                        this.resetData();
                         let params = {id:this.$route.query.id}
                        getCateDetail(params).then(response => {
                          this.data = response.data;
                        });
                  }
              }
           }
        }
    },
      created() {
        if (this.isEdit) {
          let params = {id:this.$route.query.id}
          getCateDetail(params).then(response => {
            this.data = response.data;
          });
        }else{
          this.data = Object.assign({}, defaultData);
        }
      },
      methods:{
        resetData(){
           this.data = Object.assign({},defaultData);
        },
        onSubmit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm('是否提交数据', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if (this.isEdit) {
                  updateCate(this.data,this.$route.query.id).then(response => {
                    this.$refs[formName].resetFields();
                    this.$message({
                      message: '修改成功',
                      type: 'success',
                      duration:1000
                    });
                    this.resetData();
                     sessionStorage.removeItem('updateSubjectCateid')
                    this.$router.back();
                  })
                }else{
                  addCate(this.data).then(response => {
                    this.$refs[formName].resetFields();
                    this.data = Object.assign({},defaultData);
                    this.$message({
                      message: '提交成功',
                      type: 'success',
                      duration:1000
                    });
                  })
                }
              })
            }else{
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
          this.data = Object.assign({},defaultData);
        }
      },
    }
</script>

<style>
</style>

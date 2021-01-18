<template>
	<el-card class="form-container" shadow="never">
	  <el-steps :active="active" finish-status="success" align-center>
	    <el-step title="填写专题信息"></el-step>
	    <el-step title="选择商品关联"></el-step>
	  </el-steps>
    <subject-info-detail
      v-show="showStatus[0]"
      v-model="subjectParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </subject-info-detail>
    <subject-bind-product-detail
      v-show="showStatus[1]"
      v-model="subjectParam"
      :is-edit="isEdit"
      @finishCommit="finishCommit"
      @prevStep="prevStep">
    </subject-bind-product-detail>
	</el-card>
</template>

<script>
  import SubjectInfoDetail from './subjectInfoDetail';
  import SubjectBindProductDetail from './subjectBindProductDetail'
  import {addSubject, updateSubject, subjectDetail} from '@/api/subject';
  const defaultSubjectParam = {
    title:'',
    pic:'',
    description:'',
    categoryId:null,
    categoryName: '',
    albumPics:'',
    content:'',
	showStatus:0
  }

  export default {
    name: 'subjectDetail',
    components: {SubjectInfoDetail, SubjectBindProductDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        subjectParam: Object.assign({}, defaultSubjectParam),
        showStatus: [true, false]
      }
    },
     mounted:function(){
      if(this.isEdit) {
        if(this.$route.query.id){
              this.orderid = this.$route.query.id;
              sessionStorage.setItem('updateSubjectid',this.$route.query.id);
        }
      }
    },

    watch: {
        $route(){
           if(this.isEdit){
                if(this.$route.path=='/sub/updateSubject' && this.$route.query.id){
                  var newid = this.$route.query.id;//当前页新id
                  var oldid = sessionStorage.getItem('updateSubjectid');//旧的id
                 
                  if(oldid!=newid){//id有变化时
                     console.log("变化了" ,newid )
                      sessionStorage.setItem('updateSubjectid',this.$route.query.id);
                      this.orderid = this.$route.query.id;
                      //监听到id有变化时 执行你想要的操作
                        this.resetData();
                         let params = {id:this.$route.query.id}
                         subjectDetail(this.$route.query.id).then(response=>{
                          this.subjectParam = response.data;
                        });
                  }
              }
           }
        }
    },
    created(){
      if(this.isEdit){
        subjectDetail(this.$route.query.id).then(response=>{
          this.subjectParam = response.data;
        });
      }
    },
    methods: {
      resetData(){
        this.subjectParam = Object.assign({}, defaultSubjectParam)
      },
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该专题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(isEdit){
            updateSubject(this.$route.query.id, this.subjectParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
                this.resetData();
                sessionStorage.removeItem('updateSubjectid')
              this.$router.back();
            })
          }else{
            addSubject(this.subjectParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
            })
          }
        })
      },
      showSuccess(){
        this.$message({
          type: 'success',
          message: '提交成功',
          duration:1000
        });
        this.$router.back();
      },
    },
  }
</script>

<style>
  .form-container {
    width: 800px;
  }
</style>

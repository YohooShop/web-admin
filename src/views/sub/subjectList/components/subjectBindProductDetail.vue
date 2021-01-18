<template>
  <div style="margin-top: 50px">
    <el-form :model="value"
              ref="subjectBindProducForm"
              label-width="120px"
              style="width: 680px"
              size="small">
      <el-form-item style="text-align: center">
              <el-button size="medium" @click="handlePrev()">上一步，填写商品属性</el-button>
              <el-button type="primary" size="medium" @click="handleFinishCommit()">完成，提交专题</el-button>
            </el-form-item>
    </el-form>

  </div>
</template>

<script>

  export default {
    name: "SubjectBindProductDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      handlePrev(){
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.$emit('finishCommit',this.isEdit);
      }
    }
   }

</script>

<style scoped>
</style>

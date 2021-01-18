<template>
 <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title=" 发送短信模板" width="1000px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="300px">
      <el-form-item label="手机号(多个手机号以‘,’链接)">
        <el-input v-model="form.phoneNumbers" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="发送内容">
        <el-input v-model="form.content" style="width: 370px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSend">发送</el-button>
    </div>
  </el-dialog>
</template>


<script>
import { send } from '@/api/tools/smstemplate'
export default {
    data(){
        return {
            dialog: false,
             form: {
                id: '',
                phoneNumbers: '',
                content:'',
            },
        }
    },
     methods: {
         cancel(){
            this.resetForm()
         },
         doSend(){
                send(this.form).then(res => {
                    this.resetForm()
                    this.$notify({
                    title: '发送成功',
                    type: 'success',
                    duration: 2500
                    })
                    this.loading = false
                    this.$parent.init()
                }).catch(err => {
                    this.loading = false
                    console.log(err.response.data.message)
                })
         },
          resetForm() {
            this.dialog = false
            this.$refs['form'].resetFields()
            this.form = {
               id: '',
               phoneNumbers: '',
               content:'',
            }
        }
     }
}

</script>


<style scoped>

</style>
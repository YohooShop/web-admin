<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="1000px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="300px">
      <el-form-item label="key编号(1为短信验证码)">
        <el-input v-model="form.key" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="模板名">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
       <el-form-item label="regionId">
        <el-input v-model="form.regionId" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="endpointName">
        <el-input v-model="form.endpointName" style="width: 370px;" />
      </el-form-item>
       <el-form-item label="accessKeyId">
        <el-input v-model="form.accessKeyId" style="width: 370px;" />
      </el-form-item>
       <el-form-item label="accesSecret">
        <el-input v-model="form.accesSecret" style="width: 370px;" />
      </el-form-item>
       <el-form-item label="signName短信签名(可在短信控制台中找到)">
        <el-input v-model="form.signName" style="width: 370px;" />
      </el-form-item>

  <el-form-item label="templateCode短信模板(可在短信控制台中找到)">
        <el-input v-model="form.templateCode" style="width: 370px;" />
      </el-form-item>

  
      <el-form-item label="描述">
        <el-input v-model="form.desc" style="width: 370px;" rows="5" type="textarea" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.status" :label="1">可用</el-radio>
        <el-radio v-model="form.status" :label="0">禁用</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/tools/smstemplate'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        key: '',
        regionId:'',
        endpointName: '',
        accessKeyId:'',
        accesSecret: '',
        signName: '',
        desc: '',
        createTime: '',
        templateCode:'',
        status:'',
        name:''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
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
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
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
        key: '',
        regionId:'',
        endpointName: '',
        accessKeyId:'',
        accesSecret: '',
        signName: '',
        desc: '',
        createTime: '',
        templateCode:'',
        status:'',
        name:''
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="快递公司编号" prop="code">
        <el-input v-model="form.code" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="快递公司名称">
        <el-input v-model="form.name" style="width: 300px;" />
      </el-form-item>
        <el-form-item label="快递官方电话">
        <el-input v-model="form.tel" style="width: 300px;" />
      </el-form-item>

        <el-form-item label="快递logo">
            <MaterialList v-model="form.imageArr" style="width: 370px" type="image" :num="1" :width="150" :height="150" />
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="form.sort" style="width: 300px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/logistic'
 import MaterialList from '@/components/material'
export default {
  components: { MaterialList },
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
        code: '',
        name: '',
        sort: 0,
        tel:'',
        icon:'',
        imageArr: []
      },
      rules: {
        code: [
          { required: true, message: 'please enter', trigger: 'blur' }
        ]
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
           console.log(this.form)
      this.form.icon = this.form.imageArr.join(',')

      console.log(this.form)
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
         this.form.icon = this.form.imageArr.join(',')
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
        code: '',
        name: '',
        sort: 0,
        icon:'',
        tel:'',
        imageArr:[]
      }
    }
  }
}
</script>

<style scoped>

</style>

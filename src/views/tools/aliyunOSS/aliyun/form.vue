<template>
  <el-dialog :visible.sync="dialog" :close-on-click-modal="false" title="阿里云配置" append-to-body width="580px">
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="110px">
      <el-form-item label="Access Key" prop="accessKeyId">
        <el-input v-model="form.accessKeyId" style="width: 95%" placeholder="accessKey，在安全中心，秘钥管理中查看" />
      </el-form-item>
      <el-form-item label="Secret Key" prop="accessKeySecre">
        <el-input v-model="form.accessKeySecre" type="password" style="width: 95%;" placeholder="secretKey，在安全中心，秘钥管理中查看" />
      </el-form-item>
      <el-form-item label="空间名称" prop="bucketName">
        <el-input v-model="form.bucketName" style="width: 95%;" placeholder="存储空间名称作为唯一的 Bucket 识别符" />
      </el-form-item>
      <el-form-item label="外链域名" prop="host">
        <el-input v-model="form.host" style="width: 95%;" placeholder="外链域名，可自定义，需在阿里云云绑定" />
      </el-form-item>
      <el-form-item label="上传文件夹路径" prop="prefix">
        <el-input v-model="form.prefix" style="width: 95%;" placeholder="上传文件夹路径，需在阿里云查看" />
      </el-form-item>

      <el-form-item label="存储区域" prop="port">
        <el-select v-model="form.zone" value-key="endpoint" placeholder="请选择存储区域" @blur="selectBlur">
          <el-option
            v-for="(item, index) in zones"
            :key="index"
            :label="item.zone"
            :value="item.endpoint"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="空间类型" prop="host">
        <el-radio v-model="form.type" label="公开">公开</el-radio>
        <el-radio v-model="form.type" label="私有">私有</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get, update } from '@/api/tools/aliyunoss'
export default {
  data() {
    return {
      zones: [{zone:'华东 1','endpoint':'oss-cn-hangzhou.aliyuncs.com'}, 
              {zone:'华东 2','endpoint':'oss-cn-shanghai.aliyuncs.com'},
              {zone:'华北 1','endpoint':'oss-cn-qingdao.aliyuncs.com'},
              {zone:'华北 2','endpoint':'oss-cn-beijing.aliyuncs.com'},
              {zone:'华北 3','endpoint':'oss-cn-zhangjiakou.aliyuncs.com'},
              {zone:'华北 5','endpoint':'oss-cn-huhehaote.aliyuncs.com'},
              {zone:'华南1','endpoint':'oss-cn-shenzhen.aliyuncs.com'},
              {zone:'香港','endpoint':'oss-cn-hongkong.aliyuncs.com'},
              {zone:'美国西部 1 （硅谷）','endpoint':'oss-us-west-1.aliyuncs.com'},
              {zone:'美国东部 1 （弗吉尼亚）','endpoint':'oss-us-east-1.aliyuncs.com'},
              {zone:'亚太东南 1 （新加坡）','endpoint':'oss-ap-southeast-1.aliyuncs.com'},
              {zone:'亚太东南 2 （悉尼）','endpoint':'oss-ap-southeast-2.aliyuncs.com'},
              {zone:'亚太东南 3 （吉隆坡）','endpoint':'oss-ap-southeast-3.aliyuncs.com'},
              {zone:'亚太东南 5  (雅加达)','endpoint':'oss-ap-southeast-5.aliyuncs.com'},
              {zone:'亚太东北 1 （日本）','endpoint':'oss-ap-northeast-1.aliyuncs.com'},
              {zone:'亚太南部 1 （孟买）','endpoint':'oss-ap-south-1.aliyuncs.com'},
              {zone:'欧洲中部 1 （法兰克福）','endpoint':'oss-eu-central-1.aliyuncs.com'},
              {zone:'英国（伦敦）','endpoint':'oss-eu-west-1.aliyuncs.com'},
              {zone:'中东东部 1 （迪拜）','endpoint':'oss-me-east-1.aliyuncs.com'}],
      dialog: false,
      loading: false, form: { accessKeyId: '', accessKeySecre: '', bucketName: '', endpoint: '', zone: '',host:'', type: '',"prefix":"" },
      rules: {
        accessKeyId: [
          { required: true, message: '请输入accessKeyId', trigger: 'blur' }
        ],
        accessKeySecre: [
          { required: true, message: '请输入accessKeySecre', trigger: 'blur' }
        ],
        bucketName: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入外链域名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '空间类型不能为空', trigger: 'blur' }
        ],
        prefix: [
          { required: true, message: '上传文件夹路径不能为空', trigger: 'blur'  }
        ]
      }
    }
  },
  methods: {
     selectBlur(e){
     console.log(e.target.value)
     this.form.zone = e.target.value
    },
    init() {
      get().then(res => {
        this.form = res.data
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form).then(res => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.$parent.crud.toQuery()
            this.loading = false
            this.dialog = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

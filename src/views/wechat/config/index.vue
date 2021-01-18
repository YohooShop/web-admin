<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="AppID">
        <el-input v-model="form.appid" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="AppSecret">
        <el-input v-model="form.appsecret" style="width: 370px;" type="password" />
      </el-form-item>
      <el-form-item label="微信验证TOKEN">
        <el-input v-model="form.token" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="EncodingAESKey">
        <el-input v-model="form.encodingaeskey" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="微信服务器地址">
        <el-input v-model="form.api"  style="width: 370px;" />
      </el-form-item>
      <el-form-item label="微信分享图片">
        <MaterialList v-model="form.imageArr" style="width: 370px" type="image" :num="1" :width="150" :height="150" />
      </el-form-item>
      <el-form-item label="微信分享标题">
        <el-input v-model="form.shareTitle" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="微信分享简介">
        <el-input v-model="form.shareSynopsis" style="width: 370px;" rows="5" type="textarea" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/crud'
import { del, addOfficeAccount, getOfficeAccount } from '@/api/wechat/config'
import eForm from './form'
import picUpload from '@/components/pic-upload'
import { Message } from 'element-ui'
import MaterialList from '@/components/material'
export default {
  components: { eForm, picUpload, MaterialList },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      form: {
        appid: '',
        appsecret: '',
        token: '',
        wechat_encode: '',
        encodingaeskey: '',
        shareImg: '',
        imageArr: [],
        shareTitle: '',
        shareSynopsis: '',
        api: 'http://你的H5端域名/api/wechat/serve',
        wechat_avatar: ''
      },
      rules: {
      }
    }
  },
  watch: {
    'form.imageArr': function(val) {
      if (val) {
        this.form.shareImg = val.join(',')
      }
    }
  },
  created() {
    getOfficeAccount().then(rese => {
      console.log(rese);
      this.form = rese.data;
      if(this.form.shareImg){
          this.form.imageArr = this.form.shareImg.split(',')
      }
    })
  },
  methods: {
    checkPermission,
    doSubmit() {
      addOfficeAccount(this.form).then(res => {
        Message({ message: '设置成功', type: 'success' })
      }).catch(err => {
        // this.loading = false
        console.log(err.response.data.message)
      })
    }

  }
}
</script>

<style scoped>

</style>

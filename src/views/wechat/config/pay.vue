<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="微信APP支付AppID">
        <el-input v-model="form.appId" style="width: 370px;" />
        <p style="color: red">微信开放平台审核通过的应用APPID（请登录open.weixin.qq.com查看，注意与公众号的APPID不同）</p>
      </el-form-item>
      <el-form-item label="商户id">
        <el-input v-model="form.mchId" style="width: 370px;" type="password" />
      </el-form-item>
      <el-form-item label="商户密钥">
        <el-input v-model="form.mchKey" style="width: 370px;" type="password" />
      </el-form-item>
      <el-form-item label="微信证书">
        <file-upload v-model="form.keyPath" style="width: 500px;" />
      </el-form-item>

         <el-form-item label="H5通知地址">
        <el-input v-model="form.notifyUrlH5" style="width: 370px;" />
        <p style="color: red">支付异步通知地址</p>
      </el-form-item>

      <el-form-item label="公众号通知地址">
        <el-input v-model="form.notifyUrlJs" style="width: 370px;" />
        <p style="color: red">支付异步通知地址</p>
      </el-form-item>

      <el-form-item label="小程序通知地址">
        <el-input v-model="form.notifyUrlSp" style="width: 370px;" />
        <p style="color: red">支付异步通知地址</p>
      </el-form-item>
      
      <el-form-item label="APP通知地址">
        <el-input v-model="form.notifyUrlApp" style="width: 370px;" />
        <p style="color: red">支付异步通知地址</p>
      </el-form-item>

      <el-form-item label="退款通知地址">
        <el-input v-model="form.refundNotifyUrl" style="width: 370px;" />
        <p style="color: red">退款异步通知地址</p>
      </el-form-item>


      <el-form-item label="白名单地址">
        <el-input v-model="form.spbillCreateIp" style="width: 370px;" />
        <p style="color: red">服务器的ip</p>
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
import { del, addWxPay, getWxPay } from '@/api/wechat/config'
import eForm from './form'
import picUpload from '@/components/pic-upload'
import { Message } from 'element-ui'
import fileUpload from '@/components/file-upload'
export default {
  components: { eForm, picUpload, fileUpload },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      form: {
        appId: '',
        mchId: '',
        mchKey: '',
        keyPath: '',
        notifyUrlSp:'',
        notifyUrlJs:'',
        notifyUrlH5: '',
        notifyUrlApp: '',
        refundNotifyUrl: '',
        spbillCreateIp:''
      },
      rules: {
      }
    }
  },
  created() {
    getWxPay().then(rese => {
      const that = this
      this.form.appId = rese.data.appId;
      this.form.mchId = rese.data.mchId;
      this.form.mchKey = rese.data.mchKey;
      this.form.keyPath = rese.data.keyPath;
      this.form.notifyUrlSp = rese.data.notifyUrlSp;
      this.form.notifyUrlJs = rese.data.notifyUrlJs;
      this.form.notifyUrlH5 = rese.data.notifyUrlH5;
      this.form.notifyUrlApp = rese.data.notifyUrlApp;
      this.form.refundNotifyUrl = rese.data.refundNotifyUrl;
       this.form.spbillCreateIp = rese.data.spbillCreateIp;
    }).catch(e=>{

    })
  },
  methods: {
    checkPermission,
    doSubmit() {
      console.log(this.form)
      addWxPay(this.form).then(res => {
        Message({ message: '设置成功', type: 'success' })
      }).catch(err => {
        // this.loading = false
        // console.log(err.response.data.message)
      })
    }

  }
}
</script>

<style scoped>

</style>

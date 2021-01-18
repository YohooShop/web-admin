<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="开启门店自提">
        <el-radio v-model="form.openStatus" :label=true>开启</el-radio>
        <el-radio v-model="form.openStatus" :label=false>关闭</el-radio>
      </el-form-item>
      <el-form-item label="腾讯地图KEY">
        <el-input v-model="form.mapKey" style="width: 370px;" />
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
import {set, get } from '@/api/store/config'

import { Message } from 'element-ui'

export default {
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      form: {
        store_self_mention: 1,
        tengxun_map_key: ''
      },
      rules: {
      }
    }
  },
  created() {
    get().then(res => {
      this.form = res.data
    })
  },
  methods: {
    checkPermission,
    doSubmit() {
      set(this.form).then(res => {
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

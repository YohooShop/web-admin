<template>
 <el-card class="form-container" shadow="never">
   <div style="margin-top: 50px">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="秒杀名称">
        <el-input v-model="form.name" style="width: 500px;" />
      </el-form-item>
      <el-form-item label="秒杀简介">
        <el-input v-model="form.description" style="width: 500px;" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.unitName" style="width: 500px;" />
      </el-form-item>
      <el-form-item label="秒杀开始时间">
        <template>
          <el-date-picker
            v-model="form.startTimeDate"
            type="date"
            placeholder="选择日期时间"
          />
        </template>
      </el-form-item>
      <el-form-item label="秒杀结束时间">
        <template>
          <el-date-picker
            v-model="form.endTimeDate"
            type="date"
            placeholder="选择日期时间"
          />
        </template>
      </el-form-item>
      <el-form-item label="开始时间" prop="storeId">
        <el-select v-model="form.timeId" style="width: 178px" placeholder="请先选择开始时间">
          <el-option
            v-for="(item, index) in myTimes"
            :key="index"
            :label="item.name + '(' + formatDate(item.startTime) + '-' + formatDate(item.endTime)+ ')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品主图片">
        <MaterialList v-model="form.imageArr" style="width: 500px" type="image" :num="1" :width="150" :height="150" />
      </el-form-item>
      <el-form-item label="产品轮播图">
        <MaterialList v-model="form.sliderImageArr" style="width: 500px" type="image" :num="4" :width="150" :height="150" />
      </el-form-item>
      <el-form-item label="秒杀价">
        <el-input-number v-model="form.price" />
      </el-form-item>
      <!-- <el-form-item label="成本">
        <el-input-number v-model="form.cost" />
      </el-form-item> -->
      <el-form-item label="原价">
        <el-input-number v-model="form.originalPrice" />
      </el-form-item>
      <el-form-item label="库存">
        <el-input-number v-model="form.stock" />
      </el-form-item>
      <el-form-item label="虚拟销量">
        <el-input-number v-model="form.sale" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.sort" />
      </el-form-item>
      <el-form-item label="限购">
        <el-input-number v-model="form.num" />
      </el-form-item>
      <el-form-item label="邮费">
        <el-input-number v-model="form.postage" />
      </el-form-item>
      <el-form-item label="是否包邮">
        <el-radio v-model="form.postageStatus" :label=1>是</el-radio>
        <el-radio v-model="form.postageStatus" :label=0 style="width: 110px;">否</el-radio>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-radio v-model="form.status" :label=1>开启</el-radio>
        <el-radio v-model="form.status" :label=0 style="width: 200px;">关闭</el-radio>
      </el-form-item>

      <el-form-item label="热门状态">
        <el-radio v-model="form.hotStatus" :label=1>开启</el-radio>
        <el-radio v-model="form.hotStatus" :label=0 style="width: 200px;">关闭</el-radio>
      </el-form-item>

      <el-form-item label="详情">
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="电脑端详情" name="pc">
            <tinymce :width="595" :height="300" v-model="form.detailHtml"></tinymce>
          </el-tab-pane>
          <el-tab-pane label="移动端详情" name="mobile">
            <tinymce :width="595" :height="300" v-model="form.detailMobileHtml"></tinymce>
          </el-tab-pane>
        </el-tabs>
        <!-- <editor v-model="form.detailHtml" /> -->
      </el-form-item>

       <el-form-item style="text-align: center">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </el-form-item>
    </el-form>
   
</div>
</el-card>

  
</template>

<script>
import { add, update, getinfo } from '@/api/shop/killProduct'
import { fetchSelectAbleList } from '@/api/flashSession'
import Tinymce from '@/components/Tinymce'
import editor from '../../../components/Editor'
import MaterialList from '@/components/material'
import {formatDate} from '@/utils/date'
import {getProductInfo} from '@/api/product' 
export default {
  components: {  Tinymce, MaterialList },
  props: {
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, myTimes: [],
      activeHtmlName:'pc',
      form: {
        id: '',
        productId: '',
        pic: '',
        albumPics: '',
        imageArr: [],
        sliderImageArr: [],
        name: '',
        description: '',
        detailMobileHtml:'',
        detailHtml:'',
        price: '',
        cost: '',
        originalPrice: '',
        giftPoint: '',
        sort: '',
        stock: '',
        sale: '',
        unitName: '',
        postage: '',
        description: '',
        startTime: '',
        stopTime: '',
        addTime: '',
        status: 1,
        postageStatus: 1,
        hotStatus: '',
        deleteStatus: 0,
        num: '',
        isShow: '',
        startTimeDate: '',
        endTimeDate: '',
        timeId: null
      },
      rules: {
      }
    }
  },
   filters: {
     
   },
  watch: {
    'form.imageArr': function(val) {
      if (val) {
        this.form.pic = val.join(',')
      }
    },
    'form.sliderImageArr': function(val) {
      if (val) {
        this.form.albumPics = val.join(',')
      }
    }
  },
  created() {
   
  },
  activated(){
     if(this.isEdit){
        console.log(this.$route.query.id)
      getinfo(this.$route.query.id).then(res=>{
        let product = res.data;
        this.form = product;
        if(product.albumPics != '') {
          this.form.sliderImageArr = product.albumPics.split(',');
        }
        if(product.pic != ''){
           this.form.imageArr = product.pic.split(',')
        }
       
      }).catch(e=>{

      })
    }else{
      console.log(this.$route.query.productId)
      getProductInfo(this.$route.query.productId).then(res=>{
        let product = res.data;
        this.form.productId = product.id; 
        this.form.name = product.name;
        this.form.description = product.subTitle;
        this.form.unitName = product.unit;
        this.form.pic = product.pic;
        this.form.albumPics = product.albumPics;
        this.form.originalPrice = product.originalPrice;
         if(product.albumPics != '') {
          this.form.sliderImageArr = product.albumPics.split(',');
        }
        if(product.pic != ''){
           this.form.imageArr = product.pic.split(',')
        }
        this.form.detailHtml = product.detailHtml;
        this.form.giftPoint = product.giftPoint;
        console.log(res);
      }).catch(e=>{
        
      })
    
    }
  },
  mounted() {
    fetchSelectAbleList().then(res => {
      console.log(res)
      this.myTimes = res.data
    })
  },
  methods: {
    formatDate(s){
      if (s == null ) {
          return 'N/A';
        }
        let date = new Date(s);
        return formatDate(date, 'hh:mm:ss')
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (!this.isEdit) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        // this.resetForm()         
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$router.back();
      }).catch(err => {
        this.loading = false
        // console.log(err.response.data.message)
      })
    },
    doEdit() {
      update(this.form).then(res => {
        // this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$router.back();
      }).catch(err => {
        this.loading = false
        // console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        productId: '',
        image: '',
        images: '',
        imageArr: [],
        sliderImageArr: [],
        title: '',
        info: '',
        price: '',
        cost: '',
        otPrice: '',
        giveIntegral: '',
        sort: '',
        stock: '',
        sale: '',
        unitName: '',
        postage: '',
        description: '',
        startTime: '',
        stopTime: '',
        addTime: '',
        status: '',
        isPostage: '',
        isHot: '',
        isDel: '',
        num: '',
        isShow: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

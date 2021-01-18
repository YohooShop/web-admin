<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->

       <el-button
        type="primary"
        class="filter-item"
        size="mini"
        icon="el-icon-plus"
        @click="toAdd"
      >新增</el-button>

      <el-button
        type="danger"
        class="filter-item"
        size="mini"
        icon="el-icon-refresh"
        @click="toQuery"
      >刷新</el-button>
    </div>
    表单组件

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="productId" label="商品id" />
      <el-table-column prop="pic" label="产品主图">
        <template slot-scope="scope">
          <a :href="scope.row.image" style="color: #42b983" target="_blank"><img :src="scope.row.pic" alt="点击打开" class="el-avatar"></a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="拼团名称" />
      <el-table-column prop="people" label="参团人数" />
      <el-table-column prop="price" label="拼团价" />
      <el-table-column prop="originalPrice" label="原价" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="browse" label="浏览量" />
      <el-table-column prop="countPeopleAll" label="参与人数" />
      <el-table-column prop="countPeoplePink" label="成团数量" />
      <el-table-column prop="countPeopleBrowse" label="访客人数" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div @click="onSale(scope.row.id,scope.row.isShow)">
            <el-tag v-if="scope.row.isShow" style="cursor: pointer" :type="''">已开启</el-tag>
            <el-tag v-else style="cursor: pointer" :type=" 'info' ">已关闭</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template slot-scope="scope">
          <span>{{ formatTimeTwo(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin','YXSTORECOMBINATION_ALL','YXSTORECOMBINATION_EDIT','YXSTORECOMBINATION_DELETE'])" label="操作" width="150px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-permission="['admin','YXSTORECOMBINATION_ALL','YXSTORECOMBINATION_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
          <el-popover
            :ref="scope.row.id"
            v-permission="['admin','YXSTORECOMBINATION_ALL','YXSTORECOMBINATION_DELETE']"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />


        <!--选择商品-->
      <el-dialog title="选择商品" :visible.sync="selectDialogVisible" width="50%">
      <el-input v-model="dialogData.listQuery.keyword"
                style="width: 250px;margin-bottom: 20px"
                size="small"
                placeholder="商品名称搜索">
        <el-button slot="append" icon="el-icon-search" @click="handleSelectSearch()"></el-button>
      </el-input>
      <el-table :data="dialogData.list"
                highlight-current-row 
                @current-change="handleDialogSelectionChange" border>
       <el-table-column
          label="操作"
          width="55">
          <template slot-scope="scope">
            <!-- <el-checkbox v-model="scope.row.checked"></el-checkbox> // 添加一个多选框,控制选中与否 -->
　　　　　　　　<el-radio v-model = productIdSelect :label= scope.row.id>&nbsp;</el-radio> 
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="货号" width="160" align="center">
          <template slot-scope="scope">NO.{{scope.row.productSn}}</template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleDialogSizeChange"
          @current-change="handleDialogCurrentChange"
          layout="prev, pager, next"
          :current-page.sync="dialogData.listQuery.pageNum"
          :page-size="dialogData.listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="dialogData.total">
        </el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button  size="small" @click="selectDialogVisible = false">取 消</el-button>
        <el-button  size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/crud'
import {fetchList as fetchProductList} from '@/api/product';
import { del, onsale } from '@/api/shop/combProduct'
import { formatTimeTwo, parseTime } from '@/utils/index'
export default {
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      selectDialogVisible:false,
      productIdSelect:null,
      dialogData:{
          list: null,
          total: null,
          multipleSelection:null,
          listQuery:{
            keyword: null,
            pageNum: 1,
            pageSize: 5
          }
      },
      queryTypeOptions: [
        { key: 'title', display_name: '活动标题' }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    formatTimeTwo,
    checkPermission,
    beforeInit() {
      this.url = '/product/comb/list'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    onSale(id, status) {
        console.log(status)
      this.$confirm(`确定进行[${status ? '下架' : '上架'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {'isShow': !status}
          onsale(id, params).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.init()
              }
            })
          })
        })
        .catch(() => { })
    },
    toAdd(){
        this.selectDialogVisible=true;
        this.getDialogList();
    },
    handleSelectSearch(){
        this.getDialogList();
    },
    handleDialogSizeChange(val) {
        this.dialogData.listQuery.pageNum = 1;
        this.dialogData.listQuery.pageSize = val;
        this.getDialogList();
    },
    handleDialogCurrentChange(val) {
        this.dialogData.listQuery.pageNum = val;
        this.getDialogList();
    },
    handleDialogSelectionChange(val){
        console.log(val)
        // this.productIdSelect = val.id;
        this.dialogData.multipleSelection = val;
    },
      handleSelectDialogConfirm(){
         if (this.dialogData.multipleSelection == null) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectDialogVisible=false;
        this.$router.push({path: '/sms/addcomb',query:{
           productId:this.dialogData.multipleSelection.id}})
    },
    getDialogList(){
        fetchProductList(this.dialogData.listQuery).then(response=>{
          this.dialogData.list=response.data.list;
          this.dialogData.total=response.data.total;
        })
    },

    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
        
         this.$router.push({path: '/sms/updatecomb',query:{
           id:data.id}})
    }
  }
}
</script>

<style scoped>

</style>

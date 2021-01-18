<template>
  <div class="app-container">
    <div class="wechat-reply-wrapper">
      <div class="ibox-title"><p>{{ msg }}</p></div>
      <div class="ibox-content clearfix">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="view-wrapper col-sm-4">
              <div class="mobile-header">公众号</div>
              <section class="view-body" style="overflow:scroll;">
                <div class="time-wrapper"><span class="time">9:36</span></div>
                <div class="view-item text-box clearfix" :class="{show:type=='text'}">
                  <div class="avatar fl"><img src="../../../../assets/wechat/head.gif"></div>
                  <div class="view-item text-box clearfix" :class="{show:type=='text'}">
          
                    {{ dataForm.text }}
                  </div>

                   <!-- <div class="box-content fl" v-if="'text'!=dataForm.replyType">
                    {{ dataForm.replyType }}
                  </div> -->
                </div>

                <div v-if="dataForm.replyType == 'mpnews' && dataForm.mpnews" class="view-item news-box" :class="{show:type=='mpnews'}">
                  <div class="vn-content">
                   
                    <div  class="vn-picture" :style="{backgroundImage: 'url('+dataForm.mpnews.imageInput+')'}" />
                     <div class="vn-title">{{ dataForm.mpnews.title }}</div>
                    <div class="vn-picture-info">{{ dataForm.mpnews.synopsis }}</div>
                    <div class="vn-more">
                      <a :href="dataForm.mpnews.url" target="_blank">阅读原文</a>
                    </div>
                  </div>

                  
                  
                </div>
                <div v-if="dataForm.replyType == 'news' && dataForm.mpnews" class="view-item news-box" :class="{show:type=='news'}">
                   <div class="vn-content">
                    <!-- <div class="con-item-box">
                      <div class="vn-picture" :style="{backgroundImage: 'url('+dataForm.news.image+')'}" />
                      <div class="first-title">{{ dataForm.news.title }}</div>
                    </div> -->
                    <div  class="con-item-list clearfix">
                      <div class="list-pic fr" :style="{backgroundImage: 'url('+dataForm.news.image+')'}" />
                      <div class="list-tit-info fl">{{ dataForm.news.title }}</div>
                      <div class="list-tit-info fl">{{ dataForm.news.desc}}</div>
                    </div>
                  </div>
                </div>
                

                <div class="view-item text-box clearfix" :class="{show:type=='image'}">
                  <div class="avatar fl"><img src="../../../../assets/wechat/head.gif"></div>
                  <div class="box-content fl">
                    <img class="picbox" :src="dataForm.image" alt="">
                  </div>
                </div>

              </section>
            </div>
          </el-col>
            <el-col :span="12">
              <div class="control-wrapper col-sm-8">
                  <el-form label-width="80px" :model="dataForm" :rules="dataRule" ref="dataForm">
                      <el-row>
                          <el-col :span="12">
                              <el-form-item label="规则名称" prop="ruleName">
                                  <el-input  v-model="dataForm.ruleName"  placeholder="规则名称"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="12">
                              <el-form-item label="精确匹配" prop="exactMatch">
                                  <el-switch v-model="dataForm.exactMatch" :active-value="true" :inactive-value="false"></el-switch>
                              </el-form-item>
                          </el-col>
                        
                      </el-row>
                      <el-form-item label="匹配词" prop="matchValue">
                          <tags-editor v-model="dataForm.matchValue"></tags-editor>
                      </el-form-item>
                      <el-row>
                      <el-col :span="12">
                        <el-form-item label="回复类型" prop="replyType">
                            <el-select v-model="dataForm.replyType" @change="onReplyTypeChange">
                                <el-option v-for="(name,key) in KefuMsgType" :key="key" :value="key" :label="name"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="是否启用" prop="status">
                            <el-switch v-model="dataForm.status" :active-value="true" :inactive-value="false"></el-switch>
                        </el-form-item>
                      </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                            <el-form-item label="生效时间" prop="effectTimeStart">
                                <el-time-picker v-model="dataForm.effectTimeStart" value-format="HH:mm:ss"></el-time-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="失效时间" prop="effectTimeEnd">
                                <el-time-picker v-model="dataForm.effectTimeEnd" value-format="HH:mm:ss"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="回复内容">
                        <el-input v-if="'text'==dataForm.replyType" v-model="dataForm.text" type="textarea" :rows="5" placeholder="文本"></el-input>
                        <el-button  type="text" v-show="'text'==dataForm.replyType" @click="addLink">插入链接</el-button>


                        <el-button v-if="'mpnews'==dataForm.replyType" @click="chooseNews">选择图文</el-button>
                        <el-card v-if="'mpnews'==dataForm.replyType && dataForm.mpnews" >
                          <el-row label>标题：{{dataForm.mpnews.title}}</el-row>
                          <el-row label>作者：{{dataForm.mpnews.author}}</el-row>
                          <img :src="dataForm.mpnews.imageInput" class="el-avatar">
                        </el-card>

                        <el-card v-if="'news'==dataForm.replyType" >
                            <el-input  v-model="dataForm.news.link" placeholder="文章链接地址"></el-input>
                            <el-input  v-model="dataForm.news.title"   placeholder="文章标题"></el-input>
                            <el-input  v-model="dataForm.news.desc"  type="textarea" :rows="5" placeholder="文简简介"></el-input>
                            <MaterialList  v-model="dataForm.images" style="width: 370px" type="image" :num="1" :width="150" :height="150" />
                        </el-card>
                    
                     <el-card v-if="'video'==dataForm.replyType" >
                            <el-input  v-model="dataForm.video.link" placeholder="视频链接地址"></el-input>
                            <el-input  v-model="dataForm.video.title" placeholder="视频标题"></el-input>
                            <el-input  v-model="dataForm.video.desc" placeholder="视频简介"></el-input>
                        </el-card>

                         <MaterialList v-if="'image'==dataForm.replyType" v-model="dataForm.images" style="width: 370px" type="image" :num="1" :width="150" :height="150" />
                        <!-- <el-button type="text" v-show="assetsType" @click="assetsSelectorVisible=true">
                            从素材库中选择<span v-if="'miniprogrampage'==dataForm.replyType || 'music'==dataForm.replyType">缩略图</span>
                        </el-button> -->
                    </el-form-item>
                    <el-form-item label="备注说明" prop="desc">
                        <el-input v-model="dataForm.desc" placeholder="备注说明"></el-input>
                    </el-form-item>
                  </el-form>
                    <div style="text-align: center;"><button type="button" class="el-button el-button--primary" @click="submit">提交</button></div>
                </div>
            </el-col>
        </el-row>
      </div>

       <el-dialog title="选择文章" :visible.sync="selectDialogVisible" width="50%">
         <el-input v-model="dialogData.listQuery.keyword"
                style="width: 250px;margin-bottom: 20px"
                size="small"
                placeholder="搜索文章标题">
              <el-button slot="append" icon="el-icon-search" @click="handleSelectNewsSearch()"></el-button>
          </el-input>
          <el-table :data="dialogData.list"
              border @row-click="handleDialogSelectionChange">
                <el-table-column label width="35">
                  <template slot-scope="scope">
                      <el-radio :label="scope.row.id" v-model="dataForm.mpnewsId">&nbsp;</el-radio>
                    </template>
                </el-table-column>

                <el-table-column label="标题" align="center">
                  <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="作者" width="160" align="center">
                  <template slot-scope="scope">
                    {{scope.row.author}}</template>
                </el-table-column>
                <el-table-column label="封面" width="120" align="center">
                  <template slot-scope="scope">
                     <img :src="scope.row.imageInput" class="el-avatar">
                  </template>
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
                <el-button  size="small" @click="handleSelectDialogCanncel()">取 消</el-button>
                <el-button  size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
              </div>
       </el-dialog>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import tagsEditor from '@/components/tags-editor'
import initData from '@/mixins/crud'
import { del, add, get } from '@/api/wechat/reply'
import eForm from './form'
import { Message } from 'element-ui'
import { getList } from '@/api/wechat/article'
import MaterialList from '@/components/material'

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    title: null,
  };
export default {
  components: { eForm,  tagsEditor, MaterialList },
  mixins: [initData],
   props: {
      isEdit: {
        type: Boolean,
        default: false
      }
  },
  watch:{
    "dataForm.images"(val, oldVal){
      this.dataForm.image = '';
       this.dataForm.news.image = '';
      if(this.dataForm.replyType == 'image'){
        this.dataForm.image = this.dataForm.images[0];
      }
      if(this.dataForm.replyType == 'news'){
        this.dataForm.news.image = this.dataForm.images[0];
      }
    },
    "dataForm.replyType"(val, oldVal){
       this.type = this.dataForm.replyType;
    }
  },
  data() {
    return {
      mpnewsSel:null,
      mpnewsIdSel:null,
      listQuery: Object.assign({}, defaultListQuery),
      selectDialogVisible:false,
      delLoading: false,
      status: 1,
      msg: '',
      type: 'text',
      textBox: '',
      pic: '',
      key: '',
      replyImage:null,
      uploadColl: function() {
      },
       dataForm: {
                id: 0,
                ruleName: "",
                exactMatch: false,
                matchValue: "",
                replyType: 'text',
                replyContent: "",
                status: true,
                desc: "",
                effectTimeStart: "00:00:00",
                effectTimeEnd: "23:59:59",
                mpnews:{
                
                },
                mpnewsId:null,
                images:[],
                image:null,
                video:{

                },
                news:{
                  
                },
                voice:null,
                music:null,
                miniprogrampage:null,
                msgmenu:null,
                contentStr:""
            },
      uploadLink: '',
      result: null,
      dataRule: {
                ruleName: [
                    { required: true, message: "规则名称不能为空", trigger: "blur" }
                ],
                matchValue: [
                    { required: true, message: "匹配的关键词、事件等不能为空", trigger: "blur" }
                ],
                replyType: [
                    { required: true, message: "回复类型（1:文本2:图文3媒体）不能为空", trigger: "blur" }
                ],
                replyContent: [
                    { required: true, message: "回复内容不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "是否有效不能为空", trigger: "blur" }
                ],
                effectTimeStart: [
                    { required: true, message: "生效起始时间不能为空", trigger: "blur" }
                ],
                effectTimeEnd: [
                    { required: true, message: "生效结束时间不能为空", trigger: "blur" }
                ]
        },
         dialogData:{
          list: null,
          total: null,
          multipleSelection:[],
          listQuery:{
            keyword: null,
            page: 1,
            size: 5
          }
        }
    }
    
  },
   computed: {
        KefuMsgType: {
            get() {
                return this.$store.state.message.KefuMsgType
            }
        },
        assetsType(){
            const config={//消息类型与选择素材类型对应关系
                'image':'image',
                'voice':'voice',
                'video':'video',
                'mpnews':'news',
                'miniprogrampage':'image',//小程序需选择卡片图
                'music':'image'
            }
            return config[this.dataForm.replyType] || ''
        }
    },
  created() {
    if(this.isEdit){
      get(this.$route.query.id).then(res=>{
         let dataForm = res.data.data;
          if(dataForm.exactMatch == 1) {
            dataForm.exactMatch = true
          }else{
            dataForm.exactMatch = false;
          }

          if(dataForm.status == 1) {
            dataForm.status = true;
          }else{
            dataForm.status = false;
          }
        this.dataForm.id = dataForm.id;
        this.dataForm.ruleName=dataForm.ruleName;
        this.dataForm.exactMatch=dataForm.exactMatch;
        this.dataForm.matchValue=dataForm.matchValue;
        this.dataForm.replyType=dataForm.replyType;
        this.dataForm.replyContent=dataForm.replyContent;
        this.dataForm.status=dataForm.status;
        this.dataForm.desc=dataForm.desc;
        this.dataForm.effectTimeStart=dataForm.effectTimeStart;
        this.dataForm.effectTimeEnd=dataForm.effectTimeEnd;
       
        this.type =this.dataForm.replyType;
        const newData = JSON.parse(res.data.contentJson);
        console.log("++++++++"+newData);
        if(this.dataForm.replyType == 'image'){
            this.dataForm.images = [newData];
            this.dataForm.image = newData;
        }
        if(this.dataForm.replyType == 'video'){
          this.dataForm.video.link = newData.link;
          this.dataForm.video.desc = newData.desc;
          this.dataForm.video.title = newData.title;
        }
        if(this.dataForm.replyType == 'news'){
          this.dataForm.news.link = newData.link;
          this.dataForm.news.desc = newData.desc;
          this.dataForm.news.title = newData.title;
          this.dataForm.news.images = newData.image;
          this.dataForm.images = [newData.image];
        }
        if(this.dataForm.replyType == 'text') {
          this.dataForm.text = this.dataForm.replyContent; 
        }

        if(this.dataForm.replyType == 'mpnews'){
          this.dataForm.mpnews = newData;
        }
      
      
      }).catch(e=>{

      })
    }
    
    // this.$nextTick(() => {
    //   this.init()
    // })
  },
  mounted: function() {

    return
    this.key = 'subscribe'
    this.msg = '编辑关注回复'
    get().then(rese => {
     
      //  console.log(rese);
      // this.result = rese.data.data;
     
      // this.type = rese.data.data.type
      // this.status = rese.data.data.status
      // const newData = JSON.parse(rese.data.contentJson)
      // if (rese.data.type == 'image') {
      //   this.dataForm.image = newData
      // } else if (rese.data.type == 'text') {
      //   this.dataGroup.text.content = newData
      //    console.log(rese)
      // }
      // if (this.used_key) {
      //   this.keyword = this.result.key
      // }
    })
  },
  methods: {
    checkPermission,
    handleSelectNewsSearch(){
      this.getDialogList();
    },
    chooseNews(){
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    addLink() {
      this.dataForm.text += '<a href="链接地址">链接文字</a>'
    },
    beforeInit() {
      this.url = 'api/wechat/reply'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
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
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = {
        id: data.id,
        key: data.key,
        type: data.type,
        data: data.data,
        status: data.status,
        hide: data.hide
      }
      _this.dialog = true
    },
    submit: function(isEdit) {
      // if (!this.check()) return false
     
       this.$confirm('是否要提交该', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let dataForm = this.dataForm;
          if(dataForm.exactMatch) {
            dataForm.exactMatch = 1
          }else{
            dataForm.exactMatch = 0;
          }

          if(dataForm.status) {
            dataForm.status = 1;
          }else{
            dataForm.status = 0;
          }

          if(dataForm.replyType == 'mpnews'){
            dataForm.replyContent = this.dataForm.mpnewsId;
             dataForm.contentStr = JSON.stringify(dataForm.mpnews)
          }
          if(dataForm.replyType == 'text'){
            dataForm.replyContent = this.dataForm.text;
            dataForm.contentStr = this.dataForm.text;
          }
          if(dataForm.replyType == 'image'){
             dataForm.replyContent = this.dataForm.images[0];
             dataForm.contentStr = JSON.stringify(this.dataForm.images[0]);
          }

          if(dataForm.replyType == "news"){
            dataForm.replyContent = "";
            this.dataForm.news.image = this.dataForm.images[0];
            dataForm.contentStr = JSON.stringify(this.dataForm.news);
          }
          if(dataForm.replyType == "video"){
            dataForm.replyContent = "";
            dataForm.contentStr = JSON.stringify(this.dataForm.video);
          }
          console.log(dataForm)
          let this_  = this;
            add(dataForm).then(function(res) {
              Message({ message: '设置成功', type: 'success' })
              this_.$router.back();
            }).catch(function(err) {
              Message({message: err,type: 'error'})
            })
        })
    },
    handleSelectDialogConfirm(){
      if(this.mpnewsIdSel == null) {
        this.$message({
            message: '请选择文章',
            type: 'warning',
            duration: 1000
          });
          return;
      }
      console.log("确认")
      this.dataForm.mpnewsId = this.mpnewsIdSel ;
      this.dataForm.mpnews = this.mpnewsSel;
      this.selectDialogVisible=false;
    },
    handleDialogSelectionChange(val){
      this.mpnewsIdSel = val.id;
      this.mpnewsSel = val;
    //   this.dialogData.multipleSelection = val;
    },
    handleSelectDialogCanncel(){
        this.selectDialogVisible = false
        this.mpnewsIdSel = this.dataForm.mpnewsId;
        this.mpnewsSel = this.dataForm.mpnews;
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
    getDialogList(){
       let params = this.dialogData.listQuery;
       params.page = params.page-1;
       params.title = params.keyword;
       console.log(params)
       getList(this.dialogData.listQuery).then(res=>{
          console.log(res);
          this.dialogData.list = res.data.content;
       }).catch(e=>{
       })
    },
    check: function() {
      var dataForm = this.dataForm
      switch (this.type) {
        case 'text':
          if (dataForm.text == '') { return this.returnError('请输入文字消息内容') }
          break
        case 'image':
          if (dataForm.image == '') { return this.returnError('请上传图片') }
          break
      }
      return true
    },
     onReplyTypeChange(value) {
       
     },
  }
}
</script>

<style scoped>
  .form-control{
    background-color: #FFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    -webkit-transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
    transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;}

  #app .layout-ceiling-main a{ color:#9ba7b5}
  #table-list .mp-header-wrapper h1{ padding-left:15px; float: left; font-size: 18px; line-height: 24px; padding-bottom: 20px; font-weight: 400; color: #464c5b; }
  .mp-form .ivu-tree li{ margin: 0; }
  .mp-form .demo-upload-list img{ width: 100%; height: 100%; }
  .mp-form .demo-upload-list-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }
  .wechat-reply-wrapper .fl{ float: left;margin-left: 10px; }
  .wechat-reply-wrapper .fr{ float: right; }
  .wechat-reply-wrapper .clearfix:after{ content:"."; display:block; height:10px; visibility:hidden; clear:both; }
  .wechat-reply-wrapper .ibox-title{ padding:0px; font-size: 16px; border-bottom: 1px solid #e7eaec; }
  .wechat-reply-wrapper .ibox-title p{ border-left: 2px solid #2494f2; text-indent: 8px; }
  .wechat-reply-wrapper .ibox-content{ padding: 15px; font-size: 12px}
  .wechat-reply-wrapper .ibox-content .view-wrapper{ position: relative; width: 317px; background-image:url(../../../../assets/wechat/mobile_head.png); background-repeat: no-repeat; background-position: left top; background-color: #f5f5f5; }
  .wechat-reply-wrapper .ibox-content .view-wrapper .mobile-header{ position: relative; left: 0; top: 36px; width: 100%; text-align: center; color: #fff; font-size: 16px; }
  .wechat-reply-wrapper .ibox-content .view-wrapper .view-body{ margin-top: 65px; background-color: #f5f5f5; height: 500px; }
  .wechat-reply-wrapper .view-wrapper .view-body .time-wrapper{ margin-bottom: 10px; text-align: center; }
  .wechat-reply-wrapper .view-wrapper .view-body .time-wrapper .time{ display: inline-block; color: #f5f5f5; display: inline-block; color: #f5f5f5; background: rgba(0,0,0,.3); padding: 3px 8px; border-radius: 3px; font-size: 12px; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item{ display: none; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item.show{ display: block; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .avatar{ width: 40px; height: 40px; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .avatar img{ max-width: 100%; height: auto; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .box-content{ position: relative; max-width: 60%; min-height: 40px; margin-left: 15px; padding: 10px; border: 1px solid #ccc; word-break: break-all; word-wrap: break-word; line-height: 1.5; border-radius: 5px; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .box-content .picbox{ max-width: 100%; }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .box-content:before{ content: ''; position: absolute; left: -13px; top: 11px; display: block; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #ccc; -webkit-transform: rotate(90deg); transform: rotate(90deg); }
  .wechat-reply-wrapper .view-wrapper .view-body .view-item .box-content:after{ content: ''; content: ''; position: absolute; left: -12px; top: 11px; display: block; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #f5f5f5; -webkit-transform: rotate(90deg); transform: rotate(90deg); }
  .wechat-reply-wrapper .submit{text-align: center;}
  /* 图文 */
  .view-wrapper .view-body .view-item.news-box{ width: 100%; background-color: #fff; border-radius: 5px; }
  .view-wrapper .view-body .view-item .vn-content{ padding:0;}
  .view-wrapper .view-body .view-item .vn-content .vn-title{ line-height: 1.5; font-size: 16px; }
  .view-wrapper .view-body .view-item .vn-content .vn-time{ padding: 5px 0; font-size: 12px; color: #999; }
  .view-wrapper .view-body .view-item .vn-content .vn-picture{ width: 100%; height: 150px; background-size: cover; background-position: center center;  border-radius: 5px 5px 0 0;}
  .view-wrapper .view-body .view-item .vn-content .vn-picture-info{ line-height: 22px; color: #7b7b7b; padding: 0; display: block; overflow: hidden; word-break: break-all; text-overflow: ellipsis; font-size: 12px; white-space: nowrap; }
  .view-wrapper .view-body .view-item .vn-more{ display: block; padding: 10px 0 0; border-top: 1px solid #dddddd; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .view-wrapper .view-body .view-item .vn-content .con-item-box{ position: relative; }
  .view-wrapper .view-body .view-item .vn-content .con-item-box .first-title{ width: 100%; height: 44px; line-height: 44px; font-size: 14px; position: absolute; left: 0; bottom: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; /*background: rgba(0,0,0,.8);*/ color: #fff; text-indent: 1em; }
  .view-wrapper .view-body .view-item .vn-content .con-item-list{  margin-top: 10px; margin:6px 10px 0 10px; border-top: 1px solid #FBFBFB; }
  .view-wrapper .view-body .view-item .vn-content .con-item-list .list-pic{ width: 20%; min-height: 50px; background-size: cover; background-position: center center; }

  .view-wrapper .view-body .view-item .vn-content .con-item-list .list-tit-info{ width: 70%; line-height: 1.5; word-wrap:break-word; }

  /* 音乐 */
  .view-wrapper .view-body .view-item.music-box .box-content{ position: relative; width: 100%; background: #080; color: #fff; border-color: #080; }
  .view-wrapper .view-body .view-item.music-box .box-content p{ width: 75%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .view-wrapper .view-body .view-item.music-box .box-content .music-icon{ position: absolute; right: 11px; top: 50%; width: 30px; height: 30px; background: #0a0; text-align: center; line-height: 30px; margin-top: -15px; font-size: 16px; }

  .view-wrapper .view-body .view-item.music-box .box-content:after{ display: none; }
  .view-wrapper .view-body .view-item.music-box .box-content:before{ border-top: 10px solid #080; }
  /* 视频 */
  .view-wrapper .view-body .view-item.video-box{ width: 100%; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; }
  .view-wrapper .view-body .view-item.video-box .vn-title{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

  /* 右侧控制器 */
  .wechat-reply-wrapper .ibox-content .control-wrapper{ position: relative; width: 700px; height: 565px; padding: 0; margin-left: 20px;  }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-title{ position: absolute; left: 71px; top: -12px; width: auto; padding: 0 10px; font-size: 20px; background-color: #fff; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body{ margin-top: 40px; padding: 0 10px; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .form-group label{ font-weight: normal; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .form-group .tips:after{ content: '*'; color: red; position: absolute; margin-left: 4px; font-weight: bold; line-height: 1.8em; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .form-group .group-item{ position: relative; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .form-group .group-item .file-btn{ position: absolute; right: 15px; top: 0; display: block; width: 66px; border-radius: 6px; cursor: pointer; padding: .5rem; background-color: #18a689; color: #fff; text-align: center; height: 100%; line-height: 23px; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .form-group .group-item textarea{ resize: none; width: 100%; height: 100px; padding: 10px; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .tips-info{ padding-left: 100px; font-size: 12px; color: #737373; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .control-main .control-item{ display: none; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body .control-main .control-item.show{ display: block; }

  /* 微信菜单定制 */
  .wechat-menu ul{ padding: 0; }
  .wechat-menu .menu-footer span{display: block;}
  .wechat-menu .menu-footer li{ position: relative; -webkit-flex: 1; -moz-flex:1; -ms-flex: 1; flex: 1; height: 50px; line-height: 50px; text-align: center; cursor: pointer; list-style: none; border: 1px solid transparent; border-right: 1px solid #e7e7eb; }
  .wechat-menu .menu-footer .icon-sub{ background: url(../../../../assets/wechat/index.png) 0 -48px no-repeat; width: 7px; height: 7px; vertical-align: middle; display: inline-block; margin-right: 2px; margin-top: -2px; }
  .wechat-menu .menu-footer .sub-menu{ position: absolute; border-radius: 3px; border: 1px solid #d0d0d0; display: block; bottom: 60px; width: 100%; background-color: #fafafa; }
  .wechat-menu .menu-footer .sub-menu:after{ content: ''; position: absolute; width: 10px; height: 10px; background: #fafafa;-webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg); bottom: -5px; border-bottom: 1px solid #d0d0d0; border-right: 1px solid #d0d0d0; left: 50%; margin-left: -5px; }

  .wechat-menu .menu-footer .sub-menu li{border-right: 0; border-bottom: 1px solid #d0d0d0;}
  .wechat-menu .menu-footer .sub-menu li:last-child{border-bottom: 0;}
  .wechat-menu .menu-footer .active{border:1px solid #44b549;}
  .wechat-menu .menu-footer .sub-menu li.active{border:1px solid #44b549 !important;}
  /* 右侧 */
  .wechat-menu .menu-control .popover-title{ padding: 8px 14px; margin: 0; font-size: 14px; background-color: #f7f7f7; border-bottom: 1px solid #ebebeb; border-radius: 5px 5px 0 0; font-weight: 400; }
  .wechat-menu .menu-control .popover-title a{ color: #06C; font-size: 12px; }
  .wechat-menu .menu-control .tips-txt{line-height: 40px; padding: 0 20px;}
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body.menu-content{ padding: 0 20px; margin-top: 0; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body.menu-content .radio{ display: inline-block !important; width: 45%; }
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body.menu-content .menu-control-box {padding: 0 20px;}
  .wechat-reply-wrapper .ibox-content .control-wrapper .control-body.menu-content .menu-control-box .radio{ display: block!important; width: 100%; }
  .menu-control-box .item{ display: none; }
  .menu-control-box .show{ display: block; }

</style>

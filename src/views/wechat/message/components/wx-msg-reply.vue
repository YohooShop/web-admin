<template>
    <el-dialog title="消息回复" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm">
            <el-form-item prop="replyContent">
                <el-input v-model="dataForm.replyContent" type="textarea" :rows="5" placeholder="回复内容" maxlength="600" show-word-limit :autosize="{ minRows: 5, maxRows: 30 }" autocomplete></el-input>
                <el-button type="text" v-show="'text'==dataForm.replyType" @click="addLink">插入链接</el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="success" @click="dataFormSubmit()" :disabled="uploading">{{uploading?'发送中...':'发送'}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { reply } from '@/api/wechat/message'
export default {
    data() {
        return {
            visible: false,
            uploading: false,
            dataForm: {
                openid:'',
                replyType:'text',
                replyContent:''
            },
            dataRule: {
                replyContent: [
                    { required: true, message: "回复内容不能为空", trigger: "blur" }
                ]
            }
        }
    },
    components:{
        WxMsgPreview:()=>import('./wx-msg-preview')
    },
    methods: {
        init(openid) {
            if(!openid)throw '参数异常'
            this.dataForm.openid=openid
            this.visible = true
        },
        // 表单提交
        dataFormSubmit() {
            if(this.uploading)return
            this.uploading=true

            reply(this.dataForm).then(res=>{
                this.$message({
                                message: '回复成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false
                                    
                                }
                            })
                this.$emit("success",{...this.dataForm});
                this.dataForm.replyContent=''
                this.uploading=false
            }).catch(e=>{
                this.uploading=false
            })
        },
        addLink() {
            this.dataForm.replyContent += '<a href="链接地址">链接文字</a>'
        }
    }
}
</script>
<style scoped>
.msg-container{
    background: #eee;
}
</style>
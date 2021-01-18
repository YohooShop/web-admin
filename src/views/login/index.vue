<template>
    <div class="site-wrapper site-page--login">
        <div class="site-content__wrapper">
            <div class="site-content">
                <div class="brand-info">
                    <h2 class="brand-info__text">yoooho臻选后台管理系统</h2>
                    <p class="brand-info__intro">yoooho臻选后台管理系统。</p>
                </div>
                <div class="login-main">
                    <h3 class="login-title">管理员登录</h3>
                    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
                        <el-form-item prop="username">
                            <el-input v-model="dataForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input 
                            name="password"
                            :type="pwdType"
                            v-model="dataForm.password"
                           
                             placeholder="请输入密码" 
                             autoComplete="on">
                                <span slot="prefix">
                                <svg-icon icon-class="password" class="color-main"></svg-icon>
                                </span>
                                  <span slot="suffix" @click="showPwd">
                                  <svg-icon icon-class="eye" class="color-main"></svg-icon>
                                </span>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-row :gutter="20">
                                <el-col :span="14">
                                    <el-input v-model="dataForm.captcha" placeholder="验证码">
                                    </el-input>
                                </el-col>
                                <el-col :span="10" class="login-captcha">
                                    <img :src="captchaPath" @click="getCaptcha()" alt="">
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-btn-submit" type="primary" :loading="loading" @click="dataFormSubmit()">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { getUUID } from '@/utils'
  import {getCode} from '@/api/login'
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import { encrypt } from '@/utils/rsaEncrypt'
export default {
    data() {
        return {
            dataForm: {
                username: '',
                password: '',
                uuid:'',
                captcha: ''
            },
            dataRule: {
                username: [
                    { required: true, message: '帐号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            },
            pwdType: 'password',
            captchaPath: '',
            loading: false,
        }
    },
    created() {
        this.getCaptcha()
    },
    methods: {
       showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
        // 提交表单
        dataFormSubmit() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                      this.loading = true;
                      let user = {
                        "username":this.dataForm.username,
                        "password":this.dataForm.password,
                        "code": this.dataForm.captcha,
                        "uuid": this.dataForm.uuid
                      }
                      if (user.password !== this.cookiePass) {
                          user.password = encrypt(user.password)
                      }
                    
                      this.$store.dispatch('Login', user).then(() => {
                      this.loading = false;
                      setCookie("username",user.username,15);
                      setCookie("password",user.password,15);
                      this.$router.push({path: '/'})
                      }).catch((error) => {
                        this.loading = false
                        this.getCaptcha();
                      })
                }else {
                  console.log('参数验证不合法！');
                  return false
               }
            })
        },
        // 获取验证码
        getCaptcha() {
            this.dataForm.uuid = getUUID()
            getCode(this.dataForm.uuid).then((res)=>{
              console.log(res)
              this.captchaPath = res.data.img
            }).catch(()=>{

            })
            // this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
        }
    }
}
</script>

<style lang="scss">
.site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, 0.5);
    overflow: hidden;
    &:before {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: "";
        background-color: #fa8bff;
        background-image: linear-gradient(
            45deg,
            #fa8bff 0%,
            #2bd2ff 52%,
            #2bff88 90%
        );
        background-size: cover;
    }
    .site-content__wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: transparent;
    }
    .site-content {
        min-height: 100%;
        padding: 30px 500px 30px 30px;
    }
    .brand-info {
        margin: 220px 100px 0 90px;
        color: #fff;
    }
    .brand-info__text {
        margin: 0 0 22px 0;
        font-size: 48px;
        font-weight: 400;
        text-transform: uppercase;
    }
    .brand-info__intro {
        margin: 10px 0;
        font-size: 16px;
        line-height: 1.58;
        opacity: 0.6;
    }
    .login-main {
        position: absolute;
        top: 0;
        right: 0;
        padding: 150px 60px 180px;
        width: 470px;
        min-height: 100%;
        background-color: #fff;
    }
    .login-title {
        font-size: 16px;
    }
    .login-captcha {
        overflow: hidden;
        > img {
            width: 100%;
            cursor: pointer;
        }
    }
    .login-btn-submit {
        width: 100%;
        margin-top: 38px;
    }
}
</style>

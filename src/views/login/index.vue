<template>
  <div class="login-container">
    <!--
      1、el-form的model绑定表单数据对象
      2、el-form的rules绑定验证规则对象
      3、item的prop等于表单具体数据
      4、input绑定具体验证数据
     -->
    <el-form class="login-form" :model="user" :rules="loginRules" ref="userForm">
      <div class="login-logo"></div>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请选择验证码"></el-input>
      </el-form-item>
      <el-form-item class="read-file">
        <el-checkbox name="type" v-model="user.checked"></el-checkbox>
        <span laot="lable">我已阅读<a href="#">《用户条款》</a>以及<a href="#">《隐私协议》</a></span>
      </el-form-item>
      <el-form-item class="login-btn" prop="checked">
        <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
        <el-button disabled>注册(暂未开放)</el-button>
      </el-form-item>
      <div class="tips">
        <span>默认账号: 1391111111</span>
        <span>万能验证码: 246810</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginCom',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        checked: false
      },
      loading: false,
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        sms: [
          { type: 'number', required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请同意用户条款和隐私政策',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        // 调用接口，得到数据
        const user = this.user
        const { data: { data } } = await login(user)
        // 加载效果动画
        this.loading = true
        // 将拿取到的数据存储给vuex
        this.$store.commit('setUser', data)
        this.$message.success('登录成功')
        // 跳转页面
        this.$router.push('/layout')
      } catch (error) {
      // 提示成功/失败
        // if (error.response.status === 400) {
        //   this.$message.error('请求参数错误400')
        // } else if (error.response.status === 403) {
        //   this.$message.error('refresh_token未携带或已过期403')
        // } else if (error.response.status === 507) {
        //   this.$message.error('服务器数据库异常507')
        // }
        console.log(error)
      }
    },
    onSubmit () {
      // 点击登录后进行表单校验
      this.$refs.userForm.validate(valid => {
        // 如果表单校验没有通过
        if (!valid) {
          this.$message.error('手机号或验证码不正确')
          return
        }
        this.login()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/imgs/login_bg.jpg');
  background-size: cover;
  .login-form {
    width: 500px;
    height: 400px;
    padding: 40px 80px;
    background-color: #fff;
    opacity: 0.76;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .login-logo {
      height: 60px;
      // background: url('@/assets/imgs/logo_index.png') no-repeat center;
    }
    .read-file {
      display: flex;
      justify-content: center;
    }
    .login-btn {
      display: flex;
      justify-content: center;
    }
    .tips {
      display: flex;
      justify-content: space-evenly;
      font-size: 15px;
      color: gray;
    }
  }
}
</style>

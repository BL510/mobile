<template>
  <div>
      <!-- 导航栏 -->
     <van-nav-bar
     title="登录"
     />
     <!-- 输入框 -->
     <van-cell-group>
        <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        clearable
        v-model="user.mobile"
        left-icon="phone"
        placeholder="请输入手机号码" />
        <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        clearable
        v-model="user.code"
        left-icon="lock"
        placeholder="请输入验证码">
        <van-button slot="button" type="default" size="small">获取验证码</van-button>
        </van-field>
     </van-cell-group>
     <!-- 登录按钮 -->
     <div class="login-btn">
     <van-button class="btn" type="info" @click="handleLogin">登录</van-button>
     </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  created () {
    // 配置VeeValidate自定义验证信息
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          digits: '手机号码必须是11位的数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    this.$validator.localize('custom', dict)
  },
  methods: {
    ...mapMutations(['setUser']),
    //   点击按钮，处理登录
    async handleLogin () {
      try {
        // 表单验证
        this.$validator.validate().then(async valid => {
          // 验证失败
          if (!valid) {
            return
          }
          // 验证成功
          const data = await login(this.user)
          // 存储登录的状态
          this.setUser(data)
          // 跳转到首页
          this.$router.push('/')
          this.$toast.success('登录成功')
        })
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  }
}

</script>

<style lang="less" scoped>
 .login-btn{
   padding:20px;
   .btn{
       width:100%;
   }
 }
</style>

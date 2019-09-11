<template>
  <div>
      <!-- 导航栏 -->
     <van-nav-bar
     title="登录"
     />
     <!-- 输入框 -->
     <van-cell-group>
        <van-field
        v-validate="'required | digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        clearable
        v-model="user.mobile"
        left-icon="phone"
        placeholder="请输入手机号码" />
        <van-field
        v-validate="'required | digits:6'"
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
  methods: {
    ...mapMutations(['setUser']),
    //   点击按钮，处理登录
    async handleLogin () {
      try {
        const data = await login(this.user)
        // 存储登录的状态(1.vuex 2.本地存储)，跳转到首页
        // this.$store.commit('setUser', data)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
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

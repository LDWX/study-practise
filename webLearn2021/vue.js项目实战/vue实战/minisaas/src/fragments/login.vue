<template>
  <div class="login">
    <div class="header">
        登录人： {{ user.name }}
        登录id: {{ user.uid }}
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'login',
  data () {
    return {
      user: {
        uid: '',
        name: '请登录'
      }
    }
  },
  mounted () {
    // 通用模块的初始化流程：埋点、上报、用户操作
    this.autoLogin()
  },
  methods: {
    autoLogin () {
      // 自动登录
      this.$ajax.post('/api/users/login')
        .then(res => {
          if (res.code === 200) {
            this.user = res.data
            // 获取登录态
            store.dispatch('main/updateUser', this.user)
            console.log('user', this.user)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  text-align: right;
}
</style>

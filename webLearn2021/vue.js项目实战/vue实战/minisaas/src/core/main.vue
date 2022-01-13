<template>
  <div class="hello">
    <div class="header">
      我是顶栏
      <login></login>
    </div>
    <div class="main-content">
      <el-row>
        <el-col :span="4">
          <!-- 侧栏 -->
          <div class="component-stack block">
            <div class="component-title">
              侧边栏
            </div>
            <ul>
              <li class="component-item">
                菜单
              </li>
              <li class="component-item">
                菜单
              </li>
              <li class="component-item">
                菜单
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="stage block">
            主要业务
          </div>
        </el-col>
        <el-col :span="4">
          <div class="config-panel block">
            <div class="component-title">
              右侧面板
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import login from '../fragments/login.vue'
export default {
  name: 'HelloWorld',
  components: {
    login
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // 通用模块的初始化流程：埋点、上报、用户操作
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  border: 1px solid #eee;
  height: 100vh;
}
.header, .component-title {
  padding: 10px;
  color: blue;
}
</style>

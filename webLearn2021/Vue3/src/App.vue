<template>
  <div id="">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
    <async-comp></async-comp>
    <teleport to="#root">
      <input />
    </teleport>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      show: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 2000)
    
  },
  components: {
    HelloWorld
  }
}
</script>

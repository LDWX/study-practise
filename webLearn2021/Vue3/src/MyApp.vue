<template>
  <MultiNode style="color: red" />
  <async-comp></async-comp>
  <Functional msg="Functional"></Functional>
  <composition></composition>
  <compositionVue></compositionVue>
  <customHook></customHook>
</template>

<script>
import MultiNode from './components/MultiNode.vue'
import Functional from './components/Functional.js'
import composition from './components/composition.js'
import compositionVue from './components/compositionVue.vue'
import { readonly } from 'vue'
import customHook from './components/customHook.vue'


export default {
  name: 'MyApp',
  // props: [''],
  data() {
    return {
      state: {
        value: 0
      }
    }
  },
  provide() {
    return {
      state: readonly(this.state),
      onChange: () => {
        this.state.value = Math.random()
      }
    }
  },
  components: {
    MultiNode, Functional, composition, compositionVue, customHook
  }
}
</script>

<style>
</style>

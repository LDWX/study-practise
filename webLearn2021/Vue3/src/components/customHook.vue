<template>
  customHook： {{loading ? '下载中' : '下载完成'}}<button @click="refresh">重试</button>
  <ul>
    <li v-for="{name, id} in info.value" :key="name">{{name}}</li>
  </ul>
</template>

<script>
  import useUserInfo from './hooks'
  import { ref, useSlots } from 'vue'
  export default {
    setup(props, { slots }) {
      const id = ref(0);
      const { info, loading } = useUserInfo(id);
      const refresh = () => {
        id.value++;
      }
      
      return { info, loading, refresh }
    }
  }
</script>

<style>
</style>

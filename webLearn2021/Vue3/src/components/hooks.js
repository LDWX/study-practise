import { ref, onMounted, watch, reactive } from 'vue'

const fetch = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      { name: 'user-' + Math.random(), id: 1 },
      { name: 'user-' + Math.random(), id: 2 },
      { name: 'user-' + Math.random(), id: 3 },
      { name: 'user-' + Math.random(), id: 4 },
      { name: 'user-' + Math.random(), id: 5 },
    ]);
  }, 200)
})

export default function useUserInfo(id) { // id 为响应式数据源
  const info = reactive({value: []})
  const loading = ref(false)

  const getUserInfo = () => {
    loading.value = true
    fetch(id.value).then(user => {
      info.value = user
      loading.value = false
    })
  }
  onMounted(getUserInfo)
  watch(() => id.value, getUserInfo);
  
  return { info, loading }
}

import { h, reactive, inject, onMounted } from 'vue'


export default {
  setup(props, context) {
    const data = reactive({ count: 0 })
    
    const increment = () => {
      data.count++
    }
    
    const state = inject('state')
    const onChange = inject('onChange')
    /* const onChange = () => {
      state.value++
    } */
    
    onMounted(() => {
      console.log('task1')
    })
    
    onMounted(() => {
      console.log('task2')
    })
    
    return () => h('div', {
      onClick: onChange
    }, 'composition: ', data.count, 'state.value', state.value)
  }
}

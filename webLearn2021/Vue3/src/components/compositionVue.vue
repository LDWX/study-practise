<template>
  <div @click="increment">
    compositionVue: {{data.count}}<br />
  </div>
  <span @click="pintCountRef">count: {{count}}</span>
  <p>f: {{f}}</p>
  <p>computedVal: {{computedVal}}</p>
</template>

<script>
import { reactive, toRaw, ref, effect, toRefs, watch, computed } from 'vue'
export default {
  setup(props, context) {
    const data = reactive({ count: 0, obj: {f: 2} })
    
    const count = ref(0)
    
    const pintCountRef = () => {
      
      console.log(++count.value)
    }
    
    const origin = toRaw(data)
    
    effect(() => {// pagination, search query
      console.log(data.count);
    });
    
    
   /* watch([count, data.count], (value) => { 
      // 第一个参数可以是函数，返回值变了就回调
      // 第一个参数可以是 ref / reactive，ref/reactive 值变了就回调
      // 第一个参数可以是 数组，数组每一项变了就回调
      alert(value)
    }); */
    
    watch(() => count.value > 5, (value) => {
      // 第一个参数可以是函数，返回值变了就回调
      // 第一个参数可以是 ref / reactive，ref/reactive 值变了就回调
      // 第一个参数可以是 数组，数组每一项变了就回调
      alert(value)
    });
    
    function increment () {
      data.count++
      data.obj.f++
    }
    
    const { f } = toRefs(data.obj);
    // const f = ref(data.obj.f)
    
    const computedVal = computed(() => count.value + data.count);
    const computedVal2 = computed(() => count.value * data.count);
    

    return { data, increment, count, pintCountRef, f, computedVal }
  }
}
</script>


data() {
  value: 1,
  value2: 2
}

beforeCreate() {
  this.value = ...
  this.value2 = ...
}

beforeUpdate() {
  this.value = ...
  this.value2 = ...
}

mounted() {
  this.value = ...
  this.value2 = ...
}

beforeUnmount() {
  ...
  this.value2 = ...
}



setup() {
  
  const value = ref(1)
  useHook (value, '/api1')
  onMounted() {
    this.value = ...
  }
  
  const value2 = ref(1)
  useHook (value2, '/api1')
  onMounted() {
    this.value2 = ...
  }

}



 useHook (value, api) {
   effect(() => {
    value.value...
  })
 }
 
 store  inject reactive
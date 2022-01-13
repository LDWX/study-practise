<template>
  <div id="app">
    <vue-tree :options="options" :value="[8]"/>
  </div>
</template>

<script>
import vueTree from './components/VueTree/tree.vue'

export default {
  name: 'App',
  data() {
    return {
      options: [{
        value: 1,
        text: 'no.1'
      }, {
        value: 2,
        text: 'no.2'
      }, {
        value: 3,
        text: 'no.3',
        children: [{
          value: 4,
          text: 'no.4'
        }]
      }, {
        value: 5,
        text: 'no.5',
        children: [{
          value: 6,
          text: 'no.6'
        }]
      }, {
        value: 7,
        text: 'no.7',
        children: [{
          value: 8,
          text: 'no.8'
        }]
      }, {
        value: 999,
        text: 'no.999',
        children: [{
          value: 4321,
          text: 'no.4321'
        }]
      }]
    }
  },
  components: {
    vueTree
  }
}
</script>

<style>
@import "./assets/reset.css"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

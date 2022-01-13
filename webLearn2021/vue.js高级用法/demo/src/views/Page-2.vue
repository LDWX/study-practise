<template>
  <slot-container class="page-2">
      <template v-slot:head>
          <router-link to="/">Home</router-link>
          <br/>
          <router-link to="/page1">Page1</router-link>
      </template>
      <template v-slot:left-content>
        <div>这里是左侧</div>
      </template>
      <template v-slot:right-content="slotProps">
        <div>这里是右侧</div>
        <div> count = {{ slotProps.count }}</div>
      </template>
    </slot-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import SlotContainer from '../components/Slot-Container.vue';
import { CommonMixin } from '../mixins';


@Component({
  components: {
    SlotContainer
  },
})
export default class Page1 extends Mixins(CommonMixin) {
    mounted() {
        console.log(`Page2 - Mounted - ${this.mixinName}`);
    }
}
</script>
<style lang="less" scoped>
.home {
    width: 100%;
}

</style>
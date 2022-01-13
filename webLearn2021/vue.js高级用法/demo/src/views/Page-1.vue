<template>
  <slot-container class="page-1">
      <template v-slot:head>
          <router-link to="/">Home</router-link>
          <br/>
          <router-link to="/page2">Page2</router-link>
      </template>
      <template v-slot:left-content>
          路白          
      </template>
      <template v-slot:right-content>
          年芳十八
          <br />
          {{ phone | phoneFormat | appendPrefix('手机号：') | globalSuffix('(中间四位加密)') }}
      </template>
      <template v-slot:bottom>
          我是页面1的底部文字
          <button @click="copyText('我是页面1的底部文字')">点击复制文字</button>
      </template>
    </slot-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import SlotContainer from '../components/Slot-Container.vue';
import { CommonMixin } from '../mixins';
import { phoneFormat, appendPrefix } from '../filters';

@Component({
  components: {
    SlotContainer
  },
  filters: { phoneFormat, appendPrefix }
})
export default class Page1 extends Mixins(CommonMixin) {
    readonly phone: string = '13388886666';

    mounted() {
        console.log(`Page1 - Mounted - ${this.mixinName}`);
    }

}
</script>
<style lang="less" scoped>

</style>
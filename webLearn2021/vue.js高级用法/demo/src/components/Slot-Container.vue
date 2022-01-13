<template>
  <div class="slot-container">
      <div class="top-section">
        <slot name="head" :count="count"></slot>
      </div>
      <div class="content-section">
          <div class="left-section">
            <slot name="left-content" :count="count"></slot>
          </div>
          <div class="right-section">
            <slot name="right-content" :count="count"></slot>
          </div>
      </div>
      <div class="bottom-section">
        <slot name="bottom" :count="count">这里是默认底部文字</slot>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SlotContainer extends Vue {
    count: number = 10000;
}
</script>

<style scoped lang="less">
.slot-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.top-section,
.content-section,
.bottom-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top-section, .bottom-section {
    height: 100px;
    background-color:honeydew;
}

.top-section {
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.bottom-section {
    border-top: 1px solid black;
}

.content-section {
    flex: 1;
    overflow: scroll;
    .left-section {
        width: 100%;
        height: 100%;
        flex: 1;
        background-color: lavenderblush;
        border-right: 1px solid black;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right-section {
        width: 100%;
        height: 100%;
        flex: 2;
        background-color: lemonchiffon;

        display: flex;
        justify-content: center;
        align-items: center
    }
}
</style>

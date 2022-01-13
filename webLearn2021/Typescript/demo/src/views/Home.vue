<template>
  <div class="home" @click="toAboutPage">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div>
        倒计时：{{timeDisplay}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import { RouterHelper } from '../lib/routerHelper';
import { Countdown, CountdownEventName, fillZero } from '../lib/countdown';
import { RoutePath } from '../router';
import { measure } from '../decorator';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
    public timeDisplay: string = '';

    @measure
    public toAboutPage() {
        RouterHelper.push(RoutePath.About, {  testName: '1111' });
    }

    public created() {
        const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 10);
        countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
            const { hours, minutes, seconds, count} = remainTimeData;
            this.timeDisplay = [hours, minutes, seconds, count].map(fillZero).join(':');
        });

    }
}
</script>

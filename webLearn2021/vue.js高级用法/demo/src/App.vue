<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view />
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({
})
export default class App extends Vue {
    public transitionName = '';

    @Watch("$route")
    onRouteChange(to: Route, from: Route) {
        this.transitionName =
            to!.meta!.depth > from!.meta!.depth ? "slide-left" : "slide-right";
    }
}
</script>
<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

html,
body {
    margin: 0;
    padding: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: transform 350ms;
    position: absolute;
    overflow: hidden;
}

.slide-right-enter,
.slide-left-leave-active {
    transform: translate(-100%, 0);
}

.slide-left-enter,
.slide-right-leave-active {
    transform: translate(100%, 0);
}
</style>

<template>
    <div class="detail">
        <h1>{{ id }}</h1>
        <router-link to="/list">返回列表</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {}
})
export default class Detail extends Vue {
    get id() {
        return this.$route.params.id;
    }
}
</script>

<style lang="less" scoped>
.detail {
    width: 100%;
    overflow: hidden;
}
</style>

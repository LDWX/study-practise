<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouterHelper, AboutPageParam } from '../lib/routerHelper';
import { RoutePath } from '../router';
import { Route } from 'vue-router';

@Component({
  components: {
  },
})
export default class About extends Vue {
    public $route!: Route;
    get query() {
        return this.$route.query as AboutPageParam;
    }

    public toAboutPage() {
        RouterHelper.push(RoutePath.User, { userId: '11111' });
    }
}
</script>

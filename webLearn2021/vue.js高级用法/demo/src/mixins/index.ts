import { Vue, Component } from 'vue-property-decorator';

@Component
export class CommonMixin extends Vue {
    mixinName: string = 'lubai';
    enterTime: number = 0;

    copyText(msg: string) {
        this.$copyText(msg).then(() => {
            alert('复制成功');
        });
    }

    mounted() {
        console.log(`Mixin - Mounted - ${this.mixinName}`);
        this.enterTime = Date.now();
    }

    beforeDestroy() {
        console.log(`页面浏览 ${Date.now() - this.enterTime}ms`);
    }
}

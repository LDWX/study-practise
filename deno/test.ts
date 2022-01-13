import { print } from "https://deno.land/x/walle_store@alpha-2/index.ts";
import momment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import "https://gw.alipayobjects.com/os/lib/dayjs/1.10.7/dayjs.min.js";
import name from "https://deno.land/x/walle_store@0.0.7/hello.js";

// import throttle from "https://raw.githubusercontent.com/lodash/lodash/master/throttle.js";

print();
console.log(name);
declare global {
  var dayjs: any;
}

const obj = {
  name: "sehxin",
};

// setTimeout(() => {
console.log('dayjs date: ', globalThis.dayjs("2018-08-08").toString());
console.log('moment date:', momment().toString());
// }, 1000);
import moment from 'moment';

let expireDay = moment([2021, 7, 1]);
let nowDate = moment();
const diffDays = expireDay.diff(nowDate, 'days');
console.log(diffDays);
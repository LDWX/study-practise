import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { pipe, of } from 'rxjs'


const apiData = pipe(
  map(res => {
    if (!res.response) {
      throw new Error('Value expected!');
    }
    return res.response;
  }),
  catchError(err => of([]))   // 内部错误如果这里不捕获的话，则会抛到外部 error 函数
);

const nums = of(1,2,3,4,5)
const result = apiData(nums)
result.subscribe({
  next(x) { console.log('data: ', x); },
  error(err) { console.log('errors already caught... will not run'); }
});
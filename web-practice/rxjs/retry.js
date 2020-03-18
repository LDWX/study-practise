import { ajax } from 'rxjs/ajax';
import { map, catchError, retry } from 'rxjs/operators';
import { pipe, of } from 'rxjs'


const apiData = ajax('/api/data').pipe(  
  retry(3),   // retry 的具体用法还得在实际发送http请求的时候来探索
  map(res => {
    console.log("222222222")
    if (!res.response) {
      throw new Error('Value expected!');
    }
    return res.response;
  }),  
  catchError(err => {
    console.log('trigger catchError')
    return of([])
  })   // 内部错误如果这里不捕获的话，则会抛到外部 error 函数
);

apiData.subscribe({
  next(x) { console.log('data: ', x); },
  error(err) { console.log('errors already caught... will not run'); }
});
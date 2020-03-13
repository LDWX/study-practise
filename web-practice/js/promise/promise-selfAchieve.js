// 所有功能全都测试通过

const isFunction = variable => typeof variable === 'function';

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'


class Promise {
  constructor(handle) {
    this._status = PENDING
    this._value = undefined
    this._fulfilledQueues = []
    this._rejectedQueues = []

    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return

      // 依次执行成功队列中的函数，并清空队列
      const runFullfilled = value => {
        let cb
        // _fulfilledQueues/_rejectedQueues 中的回调是获取的后面的 then 函数的回调。
        // 如果后面没有 then 函数了，则也没有回调被放入这个 _fulfilledQueues/_rejectedQueues 队列了
        while ( cb = this._fulfilledQueues.shift() ) {
          cb(value)
        }
      }

      // 依次执行失败队列中的函数，并清空队列
      const runRejected = error => {
        let cb
        while ( cb = this._rejectedQueues.shift() ) {
          cb(error)
        }
      }

      // 如果resolve 的参数是 Promise 对象， 则必须等待该Promise 对象状态改变后，
      // 当前Promise 的状态才会改变， 且状态取决于参数 Promise 对象的状态。
      if (val instanceof Promise) {
        val.then( value => {
          this._value = value
          this._status = FULFILLED
          runFullfilled(value)
        }, err => {
          this._value = val
          this._status = FULFILLED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFullfilled(val)
      }
    }
    setTimeout(run, 0)
  }

  _reject(err) {
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while ( cb = this._rejectedQueues.shift() ) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }

  then(onFulfilled, onRejected) {
    const {
      _value,
      _status
    } = this

    // console.log("_value ::: ", _value)
    // console.log("_status ::: ", _status)

    return new Promise( (onFullfilledNext, onRejectedNext) => {
      // 封装一个成功执行时的函数
      let fulfilled = value => { 
        try {
          if (!isFunction(onFulfilled)) {
            onFullfilledNext(value)
          } else {
            console.log("/////////////////////::: ", value)
            // 获取then函数的回调函数的return值，并通过类型判断传递给下一个then函数
            let res = onFulfilled(value)
            if (res instanceof Promise) {
              // 如果当前回调函数返回Promise对象，则必须等待期状态改变后再执行下一个回调
              res.then(onFullfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFullfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }

      // 封装一个失败时执行的函数 
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            // 获取then函数的回调函数的return值，并通过类型判断传递给下一个then函数
            let res = onRejected(error)
            if (res instanceof Promise) {
              // 如果当前回调函数返回Promise对象，则必须等待期状态改变后再执行下一个回调
              res.then(onFullfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFullfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }

      switch (_status) {
        
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break;
        case FULFILLED:
          console.log("FULFILLED::: ", _value)
          fulfilled(_value)
          break;
        case REJECTED:
          console.log("REJECTED::: ", _value)
          rejected(_value)
          break;
      }
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(value) {
    // 如果参数是 Promise 实例，直接返回这个实例
    if (value instanceof Promise) return value
    return new Promise( resolve => resolve(value))
  }

  static reject(value) {
    return new Promise( (resolve, reject) => reject(value))
  }

  static all(list) {
    return new Promise( (resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entries() ) {
        //  不管数组参数是不是Promise实例， 都直接调用Promise.resolve
        this.resolve(p)
        .then(res => {
          values[i] = res
          count++

          // 所有状态都变成fulfilled时，返回 Promise 状态就变成fulfilled
          if (count === list.length) resolve(values) 
        }, err => {
          // 有一个被 rejected 时，返回的Promise状态就变成rejected
          reject(err)
        })
      }
    })
  }

  static race(list) {
    return new Promise( (resolve, reject) => {
      for (let p of list) {
        // 
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
}


/** 例一 */
// let pThen = new Promise( (resolve, reject) => {
//   resolve('test')
// })

// pThen.then( res => {
//   console.log(res)
//   return 11111
// })
// .then( res => {
//   console.log(res)
// })


/** 例二 */
// let p1 = new Promise( (resovle, reject) => {
//   setTimeout(() => {
//     resovle(111)
//   }, 1000)
  
// })

// let p2 = new Promise( (resovle, reject) => {
//   // setTimeout(() => {
//   //   // resovle(222)
//   //   reject(222)
//   // }, 2000)  
//   return 222
// })


// Promise.all([p1, p2, 333])  
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log('$$$$$$$$$$$$err: ', err)
//   })



// Promise.race([p1, p2])
//   .then(res => {
//     console.log('race then:::', res)
//   })
//   .catch(err => {
//     console.log('race catch:::', err)
//   })
  


let p1 = new Promise( (resolve, reject) => {
  resolve(1)
  // reject(1)
})


setTimeout( () => {
  p1.then(res => {
    console.log(res)
  })
})
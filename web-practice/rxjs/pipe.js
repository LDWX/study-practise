import { filter, map } from 'rxjs/operators'
import { pipe, of } from 'rxjs'

/**  方法一  */
const nums = of(1,2,3,4,5,6)
const squareValues = pipe(
  filter( n => n % 2 !== 0),
  map(n => n*n)
)

const squareOdd = squareValues(nums)

squareOdd.subscribe(
  x => console.log(x)
)


/**  方法二  */
// const squareOdd = of(1,2,3,4,5,6)
//   .pipe(
//     filter( n => n%2 !== 0),
//     map( n => n*n )
//   )

// squareOdd.subscribe(
//   x => console.log(x)
// )
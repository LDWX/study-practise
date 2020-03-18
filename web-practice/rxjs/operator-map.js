import { map } from 'rxjs/operators';
import { of } from 'rxjs'

const nums = of(1,2,4)

const squareValues = map( val => val * val)

const squareNums = squareValues(nums)

squareNums.subscribe(
  x => console.log(x)
)

var sass = require('sass');

sass.render({file: 'first.scss'}, function(err, result) {
  console.log(`result is : ${JSON.stringify(result)}`)
  console.log(`err is： ${err}`)
})

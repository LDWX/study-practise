let str2 = '3 and 5'
str2.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})

console.log('str2: ', str2)
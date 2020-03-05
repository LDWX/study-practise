// get/set 的一般用法
// function Archiver() {
//   var temperature = null;
//   var archive = [];

//   Object.defineProperty(this, 'temperature', {
//     get: function() {
//       console.log('get!');
//       return temperature;
//     },
//     set: function(value) {
//       temperature = value;
//       archive.push({ "val": temperature });
//     }
//   });

//   this.getArchive = function() { return archive; };
// }

// var arc = new Archiver();
// arc.temperature = 10

// console.log( arc.getArchive() )
// console.log( arc.temperature )



var pattern = {
  get: function () {
      return 'I alway return this string,whatever you have assigned';
  },
  set: function () {
      this.myname = 'this is my name string';
  }
};


function TestDefineSetAndGet() {
  Object.defineProperty(this, 'myproperty', pattern);
}


var instance = new TestDefineSetAndGet();
instance.myproperty = 'test';

// 'I alway return this string,whatever you have assigned'
console.log(instance)
// console.log(instance.myproperty);
// // 'this is my name string'
// console.log(instance.myname); //继承属性
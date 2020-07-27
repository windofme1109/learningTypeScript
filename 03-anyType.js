/**
 * 任意数据类型
 * 任意值（Any）用来表示允许赋值为任意类型
 */
// 如果是 any 类型，则允许被赋值为任意类型
var myFavouriteNumber = 7;
myFavouriteNumber = 'seven';
console.log(myFavouriteNumber);
// 在任意值上访问任何属性都是允许的
// 就是说，访问任何属性和调用任何方法，都不会报错，而不管任意值是否具有这个属性和方法
var anything = 'hello';
// undefined
// console.log(anything.myName) ;
// 编译没有问题，但是执行过程会报错，因为anything并没有setName()这个方法
// anything.setName('Jerry').sayHello();
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
var something;
something = 'seven';
something = 7;
console.log(something);

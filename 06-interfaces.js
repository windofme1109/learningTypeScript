/**
 *
 * TypeScript中的接口：Interfaces
 * 使用接口来定义对象的类型
 * 接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
 * 再TypeScript中，接口常常用来对对象的形状（shape）进行约束
 */
// 定义一个对象，其类型为Person，tom这个对象的形状必须和Person一样
var tom = {
    name: 'Tom',
    age: 25
};
console.log('name', tom.name);
// 定义的变量比接口少了一些属性是不允许的：
var jack = {
    name: 'Jack',
    age: 25,
    gender: 'male'
};

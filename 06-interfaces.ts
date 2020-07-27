/**
 *
 * TypeScript中的接口：Interfaces
 * 使用接口来定义对象的类型
 * 接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
 * 再TypeScript中，接口常常用来对对象的形状（shape）进行约束
 */

interface Person {
    name: string,
    age: number
}

// 定义一个对象，其类型为Person，tom这个对象的形状必须和Person一样
let tom: Person = {
    name: 'Tom',
    age: 25
} ;

console.log('name', tom.name) ;

// 定义的变量比接口少了一些属性是不允许的
// 对应的变量少于接口定义的属性，会报错：
//  error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
// let jack: Person = {
//     name: 'Jack',
//     age: 25,
//     gender: 'male'
// }
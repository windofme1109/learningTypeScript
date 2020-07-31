/**
 * 联合类型（Unoin Types）：指的是表示取值可以为多种类型中的一种
 *
 */

// 联合类型使用|分隔
// 允许myLuckyNumber只能是string和number两种类型之一，不能为其他类型
let myLuckyNumber: string | number ;
myLuckyNumber = 'six' ;
myLuckyNumber = 6 ;
console.log(myLuckyNumber) ;

// 赋值为其他类型会报错
// error TS2322: Type 'true' is not assignable to type 'string | number'.
// myLuckyNumber = true ;

/**
 *
 * 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
 *
 */


// function getLength(something: string|number): number {
//     // 报错;error TS2339: Property 'length' does not exist on type 'string | number'.
//     // length属性并不是string和number共有的属性
//     return something.length ;
// }

function getString(something: string | number): string {
    // toString()是string和number类型共有的方法，所以不会报错
    return something.toString() ;
}

console.log(getString('abcdefg')) ;
console.log(getString(135789)) ;

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let mln: string | number ;
mln = 'seven' ;
console.log(mln.length) ;
mln = 7 ;
// mln被赋值为7，TypeScript推断其类型为number，但是number并没有length这个属性，所以会报错
// error TS2339: Property 'length' does not exist on type 'number'.
// console.log(mln.length) ;
// 7
console.log(mln.toString()) ;
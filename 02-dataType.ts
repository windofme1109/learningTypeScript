/**
 *
 * TypeScript中的数据类型
 *
 */

// 1. 基本数据类型
/**
 * 布尔值
 */

let isDone: boolean = false ;

/**
 * 数值
 */
let decLiteral: number = 10 ;
// 十六进制
let hexLiteral: number = 0xff0d ;
// ES6中的二进制表示方法（会被编译为十进制数字）
let binaryLiteral: number = 0b0011 ;
// ES6中的八进制表示方法（会被编译为十进制数字）
// ES6中的八进制表示方法（会被编译为十进制数字）
let octalLiteral: number = 0o3456 ;
let notANumber: number = NaN ;
let infinityNumber: number = Infinity ;

/**
 * 字符串
 */

let myName: string = 'Tom' ;
let myAge: number = 25 ;
let sentence: string = `my name is ${myName} and i am ${myAge} years old` ;

console.log(sentence) ;

/**
 * 空值
 * 在 TypeScript 中，可以用 void 表示没有任何返回值的函数
 */
function printName(name: string): void {
    console.log('name', name) ;
}
printName('qinney') ;

/**
 * Null 和 Undefined§
 *
 * 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
 */

let u: undefined = undefined ;
let n: null = null ;

// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
let num: number = undefined ;
let str: string = null ;
console.log('num', num, 'str', str) ;


// 而 void 类型的变量不能赋值给 number 类型的变量
// error TS2322: Type 'void' is not assignable to type 'string'.
// let v: void ;
// let s:string = v ;

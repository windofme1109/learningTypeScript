/**
 *
 * TypeScript中的数据类型
 *
 */
// 1. 基本数据类型
/**
 * 布尔值
 */
var isDone = false;
/**
 * 数值
 */
var decLiteral = 10;
// 十六进制
var hexLiteral = 0xff0d;
// ES6中的二进制表示方法（会被编译为十进制数字）
var binaryLiteral = 3;
// ES6中的八进制表示方法（会被编译为十进制数字）
// ES6中的八进制表示方法（会被编译为十进制数字）
var octalLiteral = 1838;
var notANumber = NaN;
var infinityNumber = Infinity;
/**
 * 字符串
 */
var myName = 'Tom';
var myAge = 25;
var sentence = "my name is " + myName + " and i am " + myAge + " years old";
console.log(sentence);
/**
 * 空值
 * 在 TypeScript 中，可以用 void 表示没有任何返回值的函数
 */
function printName(name) {
    console.log('name', name);
}
printName('qinney');
/**
 * Null 和 Undefined§
 *
 * 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
 */
var u = undefined;
var n = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
var num = undefined;
var str = null;
console.log('num', num, 'str', str);
// 而 void 类型的变量不能赋值给 number 类型的变量
// error TS2322: Type 'void' is not assignable to type 'string'.
// let v: void ;
// let s:string = v ;

/**
 *
 * 字符串字面量类型
 * 字符串字面量类型用来约束取值只能是某几个字符串中的一个
 *
 */

// 使用type定义一个字符串字面量类型，取值只能是red、green、blue这三个字符串之一
type colors = 'red' | 'green' | 'blue' ;

function chooseColor(color: colors): string {
    return `The color I choose is ${color}` ;
}

console.log(chooseColor('red')) ;
console.log(chooseColor('green')) ;
console.log(chooseColor('blue')) ;

// yellow不在取值colors约定的取值范围内，所以传入yellow会报错
// error TS2345: Argument of type '"yellow"' is not assignable to parameter of type 'colors'.
// console.log(chooseColor('yellow')) ;
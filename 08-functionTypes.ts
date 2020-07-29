/**
 *
 * 函数类型
 *
 * 函数有两种定义方式：函数声明（Function Declaration）和函数表达式（Function Expression）
 *
 */

// 函数有输入，有输出，都要进行约束，如果是函数声明的方式，约束起来比较简单
function add(x: number, y: number): number {
    return x + y ;
}

console.log(add(4, 5)) ;

// 注意，输入多余的（或者少于要求的）参数，是不被允许的：
// error TS2554: Expected 2 arguments, but got 3.
// add(1, 2, 3) ;

/**
 *
 * 函数表达式
 *
 */

// 在对函数表达式进行约束的时候，左右两侧都要进行约束
// 即变量这块进行约束，匿名函数那块也要进行约束
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// 与ES6中的箭头函数（=>）不一样
let myAdd: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y ;
}

/**
 *
 * 用接口定义函数的形状
 * 使用接口的形式，定义一个函数需要的形状（输入类型，返回值类型）
 */
interface getLength {
    (str: string): number
}

//采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，
// 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
let myFunc: getLength;
myFunc = function (str: string) {
    return str.length ;
}

console.log(myFunc('hello world')) ;


/**
 * 可选参数
 *
 * 与接口中的可选属性类似，我们用 ? 表示可选的参数
 */

function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}` ;
    } else {
        return firstName ;
    }
}

let tomcat = buildName('tom', 'Cat') ;
console.log(tomcat) ;
let jack = buildName('jack') ;
console.log(jack) ;

// 函数中的可选参数，只能放在参数列表的最后，换句话说，可选参数后面不允许再出现必需参数了
// 下面这种定义方式会报错：error TS1016: A required parameter cannot follow an optional parameter.
// function buildName2(firstName?: string, lastName: string): string {
//     if (lastName) {
//         return `${firstName} ${lastName}` ;
//     } else {
//         return lastName ;
//     }
// }
//
// let smith = buildName2('Tom', 'Smith') ;
// console.log(smith) ;

/**
 *
 * 参数
 * ES6中，可以为参数设置默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
 *
 */
function buildName3(firstName: string, lastName: string = 'Cat'): string {
    return firstName + ' ' + lastName ;
}

console.log(buildName3('tom', 'csgo')) ;
console.log(buildName3('jack')) ;

// 设置了默认参数，此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName4(firstName: string = 'Tom', lastName: string): string {
    return firstName + ' ' + lastName ;
}

/**
 * 剩余参数
 *
 */

// ES6中的剩余参数
//
function allNumSum(first, ...rest) {
    // rest是一个数组
    if (rest.length !== 0) {
        var ret = rest.reduce((pre, cur) => {
            return pre + cur ;
        })

        return ret + first ;
    }

    return first ;
}

console.log(allNumSum(1, 2, 3, 4)) ;
console.log(allNumSum(1, 2)) ;
console.log(allNumSum(1)) ;

// ...rest是一个数组，所以我们可以用数组的类型来定义
// rest 参数只能是最后一个参数
function allNumSum2(first: number, ...rest: number[]): number {
    // rest是一个数组
    if (rest.length !== 0) {
        var ret = rest.reduce((pre, cur) => {
            return pre + cur ;
        })

        return ret + first ;
    }

    return first ;
}

console.log(allNumSum2(1, 2, 3, 4, 5)) ;
console.log(allNumSum2(1, 3)) ;
console.log(allNumSum2(1)) ;


/**
 *
 * 重载
 * JavaScript是没有重载概念的，定义了多个同名但是参数不同的函数，执行时，只会以最后定义的为主
 * 在TypeScript中，引入了重载
 */

/**
 *
 * 需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'
 *
 */

// 使用JavaScript定义
function reverseJSVersion(content) {
    if (typeof content === 'number') {
        return Number(content.toString().split('').reverse().join('')) ;
    } else if (typeof content === 'string') {
        return content.split('').reverse().join('') ;
    } else {
        return undefined ;
    }

}

console.log(reverseJSVersion(1234)) ;
console.log(reverseJSVersion('jack')) ;
console.log(reverseJSVersion(7654321)) ;

// 使用TypeScript联合类型定义
function reverseTSVersion(content: number|string):number|string {
    if (typeof content === 'number') {
        return Number(content.toString().split('').reverse().join('')) ;
    } else if (typeof content === 'string') {
        return content.split('').reverse().join('') ;
    } else {
        return undefined ;
    }
}

console.log(reverseTSVersion(345)) ;
console.log(reverseTSVersion('apple')) ;

/**
 *
 * 注意：typescript 的函数重载仅仅是类型重载，不是真正意义上的函数重载。
 * 并且真正 implementation 的那个函数需要覆盖你所有类型重载的函数的签名。
 *也就是说，下面这种方式时不行的：
 *  error TS2393: Duplicate function implementation.
 * function reverse(content: number): number {
 *    return Number(content.toString().split('').reverse().join('')) ;
 *  }
 * function reverse(content: string): string {
 *   return content.split('').reverse().join('') ;
 *
 * }
 */

// 使用联合类型定义不够精确，理想情况是，输入数字返回的就是数字，输入字符串，返回的就是字符串
// 可以使用重载定义多个 reverse 的函数类型
function reverse(content: number): number ;
function reverse(content: string): string ;
function reverse(content: number|string):number|string {
    if (typeof content === 'number') {
        return Number(content.toString().split('').reverse().join('')) ;
    } else if (typeof content === 'string') {
        return content.split('').reverse().join('') ;
    } else {
        return undefined ;
    }
}
// 我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现
// TypeScript会从最前面的函数定义开始匹配，如果有多个函数具有包含关系，这里的包含指的是重载，应该把精确的定义写在前面
// 也就是说，TypeScript中，主要是函数同名，但是参数和返回值的类型不同，需要精确定义输入类型和输出类型，最后实现
console.log(reverse('number')) ;
console.log(reverse(1234)) ;
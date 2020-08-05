/**
 *
 * 泛型（Generics）
 * 泛型指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 *
 */


/**
 *
 * 泛型的基本使用
 *
 */
/**
 * 创建一个指定长度并填充了指定值的数组
 * @param length
 * @param value
 */
function createArray(length: number, value: any): Array<any> {
    let ret = [];
    for (let i = 0; i < length; i++) {
        ret.push(value);
    }

    return ret;
}

let ret = createArray(4, 'x');
console.log(ret);
// createArray()的返回值类型是之前提到过的数组泛型
// 数组项被约束为any类型，同时value也是any类型，显然，数组项应该是和value同一个类型但是使用any是做不到的
// 因此这里引入了泛型

/**
 * 使用泛型来约束返回值数组项的类型
 * @param length
 * @param value
 */
function createArrayWithValue<T>(length: number, value: T): Array<T> {
    let ret: T[] = [];
    for (let i = 0; i < length; i++) {
        ret.push(value);
    }

    return ret;
}
// 我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用,表示都是同一种数据类型
// 在使用的时候，我们在函数名的后面指定具体的数据类型：<string>，如下所示：
let ret2 = createArrayWithValue<string>(4, 'a');
console.log(ret2);
// 也可以不用指定具体的数据类型，TypeScript会自己进行推断：
let ret3 = createArrayWithValue(10, 0);
console.log(ret3);

/**
 *
 * 多个类型参数
 * 定义泛型时，可以一次指定多个参数
 *
 */

/**
 * 交换一个元组的两个元素
 * @param tuple
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

console.log(swap(['name', 100]));

/**
 *
 * 泛型约束
 * 
 */


// 函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，如下所示：
// 由于不确定T中是不是存在length属性，所以编译阶段会报错
// error TS2339: Property 'length' does not exist on type 'T'.
// function loggingIndentity<T>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }

// 此时我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束：
interface LengthWise {
    length: number
}
// 让泛型T继承LengthWise，对T进行了约束，T中必须有length属性
function loggingIndentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

let id = loggingIndentity<Array<number>>([1, 2, 3]);
console.log(id);

let sss = loggingIndentity<string>('hello world');
console.log(sss);

// 对象没有length属性，所以会报错
// error TS2345: Argument of type '{ name: number; }' is not assignable to parameter of type 'LengthWise'.
//   Object literal may only specify known properties, and 'name' does not exist in type 'LengthWise'.
// let ooo = loggingIndentity({name: 123});

// 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        // U类型是父类，T类型是子类
        // (<T>source)是向下转型，保证和target的兼容
        target[id] = (<T>source)[id];
    }
    return target;
}
// 泛型T继承了U，U中具有的属性，T中一定具有，这样保证了U中不会出现T中不存在的字段
let x = {a: 1, b: 2, c: 3, d: 4};
let tar = copyFields(x, {b: 100, d: 250});
console.log(tar);

/**
 *
 * 泛型接口
 * 在接口上定义泛型，来约束函数的参数和返回值类型以及对象的形状
 *
 */
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>

}
// 此时在使用泛型接口的时候，需要定义泛型的类型
let createArr: CreateArrayFunc<string>;
createArr = function<T>(length: number, value: T): Array<T> {
    let ret: Array<T> = [];
    for (let i = 0; i < length; i++) {
        ret.push(value);
    }

    return ret;
}

let car = createArr(5, 'r');
console.log(car);

/**
 *
 * 泛型类
 * 在类上定义泛型
 *
 */

class GenericsNumber<T> {
    zeroValue: T;
    // 对类的函数进行约束
    // 这里要注意，=>不是箭头函数的意思，而用来表示函数的定义，=>左边是输入类型，需要用括号括起来，右边是输出类型
    add: (x: T, y: T) => T;
}

let myGenerics = new GenericsNumber<number>();
myGenerics.zeroValue = 0;
myGenerics.add = (x, y) => x+ y;
let addRet = myGenerics.add(10, 20);
console.log(addRet);

// 设置其他类型
let mg = new GenericsNumber<string>();
mg.zeroValue = 'zeros';
mg.add = function (str1, str2) {
    return str1 + str2;
}

let addRet2 = mg.add('hello ', 'world');
console.log(addRet2);

/**
 *
 * 泛型的默认参数
 * 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
 * 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
 *
 */

// 给泛型指定默认类型，这里我们设置其默认类型为string
function createArrWithVal<T = string>(length: number, value: T): Array<T> {
    let ret: T[] = [];
    for (let i = 0; i < length; i++) {
        ret.push(value);
    }

    return ret;
}

/**
 *
 * 常见泛型变量的含义：
 * T（Type）：表示一个 TypeScript 类型
 * K（Key）：表示对象中的键类型
 * V（Value）：表示对象中的值类型
 * E（Element）：表示元素类型
 */
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
function createArray(length, value) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret.push(value);
    }
    return ret;
}
var ret = createArray(4, 'x');
console.log(ret);
// createArray()的返回值类型是之前提到过的数组泛型
// 数组项被约束为any类型，同时value也是any类型，显然，数组项应该是和value同一个类型但是使用any是做不到的
// 因此这里引入了泛型
/**
 * 使用泛型来约束返回值数组项的类型
 * @param length
 * @param value
 */
function createArrayWithValue(length, value) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret.push(value);
    }
    return ret;
}
// 我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用,表示都是同一种数据类型
// 在使用的时候，我们在函数名的后面指定具体的数据类型：<string>，如下所示：
var ret2 = createArrayWithValue(4, 'a');
console.log(ret2);
// 也可以不用指定具体的数据类型，TypeScript会自己进行推断：
var ret3 = createArrayWithValue(10, 0);
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
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
console.log(swap(['name', 100]));
// 让泛型T继承LengthWise，对T进行了约束，T中必须有length属性
function loggingIndentity(arg) {
    console.log(arg.length);
    return arg;
}
var id = loggingIndentity([1, 2, 3]);
console.log(id);
var sss = loggingIndentity('hello world');
console.log(sss);
// 对象没有length属性，所以会报错
// error TS2345: Argument of type '{ name: number; }' is not assignable to parameter of type 'LengthWise'.
//   Object literal may only specify known properties, and 'name' does not exist in type 'LengthWise'.
// let ooo = loggingIndentity({name: 123});
// 多个类型参数之间也可以互相约束
function copyFields(target, source) {
    for (var id_1 in source) {
        // U类型是父类，T类型是子类
        // (<T>source)是向下转型，保证和target的兼容
        target[id_1] = source[id_1];
    }
    return target;
}
// 泛型T继承了U，U中具有的属性，T中一定具有，这样保证了U中不会出现T中不存在的字段
var x = { a: 1, b: 2, c: 3, d: 4 };
var tar = copyFields(x, { b: 100, d: 250 });
console.log(tar);
// 此时在使用泛型接口的时候，需要定义泛型的类型
var createArr;
createArr = function (length, value) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret.push(value);
    }
    return ret;
};
var car = createArr(5, 'r');
console.log(car);
/**
 *
 * 泛型类
 * 在类上定义泛型
 *
 */
var GenericsNumber = /** @class */ (function () {
    function GenericsNumber() {
    }
    return GenericsNumber;
}());
var myGenerics = new GenericsNumber();
myGenerics.zeroValue = 0;
myGenerics.add = function (x, y) { return x + y; };
var addRet = myGenerics.add(10, 20);
console.log(addRet);
// 设置其他类型
var mg = new GenericsNumber();
mg.zeroValue = 'zeros';
mg.add = function (str1, str2) {
    return str1 + str2;
};
var addRet2 = mg.add('hello ', 'world');
console.log(addRet2);

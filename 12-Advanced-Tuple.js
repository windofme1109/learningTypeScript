/**
 *
 * TypeScript中的元组（Tuple）的概念：合并了不同类型的对象
 * 而数组则是用来合并同种类型的对象
 * 注意与python中的元组的概念进行区分，在python中，元组与列表类似，都是线性表，主要区别是元内容不可变
 *
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// 定义一对值分别为 string 和 number 的元组
var tom = ['tom', 25];
console.log(tom[0]);
console.log(tom[1]);
// 在TypeScript中，元组的内容可以修改
tom[0] = 'jack';
console.log(tom[0]);
// 先定义，后赋值
var smith;
// 赋值的时候，必须按照指定的类型进行赋值，否则就会报错
smith = ['Smith', 30];
// error TS2322: Type 'string' is not assignable to type 'number'.
// smith = [30, 'Smith'];
// 通过索引的方式进行赋值，编译过程不会出错，但是在执行js文件就会出错
// 我觉得原因可能是元组在js中表现为数组
// 下面的ts代码编译为js代码后，是这样：
// var rose;
// rose[0] = 'rose';
// rose[1] = 20;
// 我们并没有给rose定义为数组，所以运行会报错
// let rose: [string, number];
// rose[0] = 'rose';
// rose[1] = 20;
// 元组可以进行解构操作
var a = smith[0], b = smith[1];
console.log('a', a);
console.log('b', b);
// 元组也可以设置可选元素，用?表示
var phone;
phone = ['apple', 5500];
console.log("the name is " + phone[0] + ", and the price is " + phone[1]);
// 因为元组的第二个元素是可选的，所以，可以不用定义第二个元素
phone = ['vivo'];
console.log("the name is " + phone[0]);
var one = [1];
var two = [1, 2];
var three = [1, 2, 3];
console.log('length is', one.length);
console.log('length is', two.length);
console.log('length is', three.length);
var zeroColor = [0];
var oneColor = [1, 'red'];
var twoColors = [2, 'red', 'blue'];
console.log(zeroColor);
console.log(oneColor);
console.log(twoColors);
// 在定义函数时我们也可以使用剩余参数语法
// 函数传入的参数是一个元组，我们限制其元素的类型为[string, string, number]
// 同时使用了剩余参数语法
function useTupleAsRest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var arg1 = args[0], arg2 = args[1], arg3 = args[2];
    console.log('first', arg1);
    console.log('second', arg2);
    console.log('third', arg3);
}
useTupleAsRest('aa', 'bb', 25);
var p1 = [2, 5, 8];
var p2 = __spreadArrays(p1);
console.log(p1);
console.log(p2);
/**
 * 使用剩余参数，接收离散参数序列
 * @param args
 */
var drawPoints = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log('Points', args);
};
drawPoints(10, 20, 30);
// 使用索引的方式访问元组中的元素
drawPoints(p1[0], p1[1], p1[2]);
// 这里使用元组的展开表达式，将其展开为离散形式的参数列表
// 在drawPoints()使用剩余参数，进行接收
drawPoints.apply(void 0, p1);
var apple = ['apple', 'red'];
console.log(apple[0], apple[1]);
// 设置了只读属性后，修改某个元素就会报错
// error TS2540: Cannot assign to '0' because it is a read-only property.
// apple[0] = 'banana';

/**
 *
 * 数组类型
 * 用来约束数组的成员的类型
 *
 */
// 定义方式1：类型+方括号
var arr1 = [1, 1, 2, 3, 5];
// 定义后，数组不允许出现其他类型
// error TS2322: Type 'string' is not assignable to type 'number'.
// let arr2: number[] = [1, 2, '3', 5] ;
// 数组的方法也会对传入的数据进行检查，不符合类型约束的，就会报错
// error TS2345: Argument of type '"6"' is not assignable to parameter of type 'number'.
// arr1.push('6') ;
// 定义方式2：数组泛型（Array Generic）
var arr2 = [1, 1, 2, 3, 5];
// 通常我们不使用接口的方式定义数组，因为比较复杂
var arr3 = [1, 1, 2, 3, 5];
/**
 * 类数组
 * 类数组指的是具有数组的length属性，以及索引特性（索引是数字），但是不具备数组的操作方法，如pop，push等
 * 通常使用接口来定义一个类数组对象
 */
function sum() {
    // arguments是类数组对象，我们这里使用数组类型进行约束，会报错
    // error TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 15 more.
    // let args: number[] = arguments ;
}
// 对于类数组对象，我们必须使用接口进行定义
function add() {
    // 在这个接口中，我们规定索引为数字时，属性值也必须为数字，同时还规定了length和callee属性，
    // 同arguments这个类数组对象所具有的属性是一致的
    var args = arguments;
}
// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function sub() {
    // IArguments就是TypeScript定义好的类型
    var args = arguments;
}
// 我们也可以将数组中元素的类型定义为any，表示允许出现任何类型
var arr4 = [1, '2', 3, { name: "apple" }];
console.log(arr4[3]);

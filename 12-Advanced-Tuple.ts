/**
 *
 * TypeScript中的元组（Tuple）的概念：合并了不同类型的对象
 * 而数组则是用来合并同种类型的对象
 * 注意与python中的元组的概念进行区分，在python中，元组与列表类似，都是线性表，主要区别是元内容不可变
 *
 */

// 定义一对值分别为 string 和 number 的元组
let tom: [string, number] = ['tom', 25];
console.log(tom[0]);
console.log(tom[1]);

// 在TypeScript中，元组的内容可以修改
tom[0] = 'jack';
console.log(tom[0]);

// 先定义，后赋值
let smith: [string, number];
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
// 我们并没有将rose定义为数组，所以运行会报错
// let rose: [string, number];
// rose[0] = 'rose';
// rose[1] = 20;

// 元组可以进行解构操作
let [a, b] = smith;
console.log('a', a);
console.log('b', b);

// 元组也可以设置可选元素，用?表示
let phone: [string, number?];
phone = ['apple', 5500];
console.log(`the name is ${phone[0]}, and the price is ${phone[1]}`);
// 因为元组的第二个元素是可选的，所以，可以不用定义第二个元素
phone = ['vivo'];
console.log(`the name is ${phone[0]}`);

/**
 * 元组设置可选元素的目的是：有一些场景我们需要的元素数量不确定，比如说坐标，可以是一维坐标，二维坐标，还可以是三维坐标
 * 我们不需要定义三个元组，使用可选元素，定义一个即可
 *
 */

type point = [number, number?, number?];
const one: point = [1];
const two: point = [1, 2];
const three: point = [1, 2, 3];
console.log('length is', one.length);
console.log('length is', two.length);
console.log('length is', three.length);

/**
 * 元组类型的剩余元素
 * 元组的最后一个元素，可以是剩余参数
 * 这样可以不用限制剩余元素的个数
 *
 */

type multiColors = [number, ...string[]];

let zeroColor: multiColors = [0];
let oneColor: multiColors = [1, 'red'];
let twoColors: multiColors = [2, 'red', 'blue'];
console.log(zeroColor);
console.log(oneColor);
console.log(twoColors);

// 在定义函数时我们也可以使用剩余参数语法
// 函数传入的参数是一个元组，我们限制其元素的类型为[string, string, number]
// 同时使用了剩余参数语法
function useTupleAsRest(...args: [string, string, number]): void {
    let [arg1, arg2, arg3] = args;

    console.log('first', arg1);
    console.log('second', arg2);
    console.log('third', arg3);
}

useTupleAsRest('aa', 'bb', 25);

/**
 *
 * 元组类型的展开表达式
 * 若最后一个参数是元组类型的展开表达式，那么这个展开表达式相当于元组元素类型的离散参数序列
 * 因此可以使用展开表达式语法（...）
 */
type Point3D = [number, number, number];
let p1: Point3D = [2, 5, 8];
let p2: Point3D = [...p1];
console.log(p1);
console.log(p2);

/**
 * 使用剩余参数，接收离散参数序列
 * @param args
 */
const drawPoints = (...args: Point3D) => {
    console.log('Points', args);

}

drawPoints(10, 20, 30);
// 使用索引的方式访问元组中的元素
drawPoints(p1[0], p1[1], p1[2]);

// 这里使用元组的展开表达式，将其展开为离散形式的参数列表
// 在drawPoints()使用剩余参数，进行接收
drawPoints(...p1);


/**
 *
 * 只读的元组类型
 * 可以为任何元组类型加上 readonly 关键字前缀，以使其成为只读元组。
 */

// 使用readonly关键字设置Fruits这个元组为只读属性
type Fruits= readonly [string, string];

const apple: Fruits = ['apple', 'red'];
console.log(apple[0], apple[1]);

// 设置了只读属性后，修改某个元素就会报错
// error TS2540: Cannot assign to '0' because it is a read-only property.
// apple[0] = 'banana';

/**
 * 越界元素
 * 越界元素指的是，超出了元组定义时的数量的元素，比如说，定义元素有两个元素，现在要添加第三个元素，这第三个元素就是越界元素
 * 添加越界元素时，元素类型会被限制为元组中每个类型的联合类型
 */
let student: [string, number];
student = ['tom', 114];
// 可以使用push()方法添加越界元素
student.push('pku');
// [ 'tom', 114, 'pku' ]
console.log(student);

// 可以使用pop()方法，移除元组的最后一个元素
student.pop();
console.log(student);

student.pop();
console.log(student);
// 当添加越界元素时，元素类型会被限制为元组中每个类型的联合类型，在这个例子中，必须是：'string | number'
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
// student.push(true);


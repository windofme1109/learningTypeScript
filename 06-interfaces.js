/**
 *
 * TypeScript中的接口：Interfaces
 * 使用接口来定义对象的类型
 * 接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
 * 在TypeScript中，接口常常用来对对象的形状（shape）进行约束
 *
 */
// 定义一个对象，其类型为Person，tom这个对象的形状必须和Person一样
// 赋值时，对象的变量的形状必须和接口一致
var tom = {
    name: 'Tom',
    age: 25
};
console.log('name', tom.name);
// 可选属性的含义是该属性可以不存在
var s1 = {
    name: '张三',
    age: 20
};
// console.log(s1.phone) ;
var s2 = {
    name: '李四',
    age: 25,
    phone: 12345678
};
console.log(s2.phone);
var t1 = {
    name: 'smith',
    gender: 'male'
};
var t2 = {
    name: 'rose',
    school: 'bupt',
    age: 25
};
var apple = {
    name: 'apple',
    price: 25,
    size: 'large',
    color: 'red'
};
var orange = {
    name: 'orange',
    price: 10,
    size: 'small',
    series: 188
};
console.log(orange.series);
// 在定义时，给只读属性赋值
var w1 = {
    id: 10578,
    name: '张三',
    gender: 'male'
};
// 只读属性只能在创建变量时赋值时，当试图修改时，就会报错
// error TS2540: Cannot assign to 'id' because it is a read-only property.
// w1.id = 18942 ;
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
// 创建变量时，如果没有给只读属性id赋值，那么会报错：
// error TS2741: Property 'id' is missing in type '{ name: string; gender: string; }' but required in type 'Workers'.
// let w2: Workers = {
//     name: '李四',
//     gender: 'female'
// }
// error TS2540: Cannot assign to 'id' because it is a read-only property.
// w2.id = 147852 ;

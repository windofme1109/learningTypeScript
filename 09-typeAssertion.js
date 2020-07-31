/**
 *
 * 类型断言
 * 语法1：值 as 类型
 * 语法2：<类型> 值
 * 不推荐第二种写法，因为会与React以及ts中的泛型混淆，所以，我们统一使用第一种语法
 */
// 声明animal为联合类型，则我们只能使用这两个类型中的共有属性或者方法
function getName(animal) {
    return animal.name;
}
// 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法
// 获取animal.swim就会报错
// 这样访问会报错：error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
// function isFish(animal: Cat|Fish) {
//     if (typeof animal.swim === 'function') {
//         return true ;
//     }
//
//     return false ;
// }
// 此时可以使用类型断言，将 animal 断言成 Fish：
function isFish(animal) {
    // 将animal断言为Fish，编译过程就不会报错
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
// 虽然编译过程不会报错，但是运行过程有可能出错
var cat = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
function fishSwim(animal) {
    animal.swim();
}
//  error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
// function isApiError(error: Error) {
//     if (error instanceof ApiError) {
//         return true ;
//     }
//
//     return false ;
// }
// 在这种情况下，我们只能使用类型断言，判断这个实例是否具有code属性
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
var tom = {
    name: 'tom',
    run: function () {
        console.log('run');
    }
};
// 类型声明
// 可以将tom赋值给animal，因为Animal兼容Cat
var animal = tom;
var anl = {
    name: 'Jack'
};
// anl可以被断言成Cat类型，也是因为Animal兼容Cat
var jack = anl;
var animal2 = tom;
// 断言可以，但是类型声明就报错，想要将animal类型的anl赋值给类型为Cat的jack，Cat必须兼容Animal，也就是说，Cat有的，Animal都得有
// 但是，Animal不具备这样的特性，所以无法赋值给jack
// 换一种说法，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。
// // error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
// let jack: Cat = anl ;

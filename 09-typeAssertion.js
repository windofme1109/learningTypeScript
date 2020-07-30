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

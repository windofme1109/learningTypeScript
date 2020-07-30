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
// 总结：在使用接口的情况下，使用类型断言将某个实例或者对象指定为具体类型，从而判断这个实例或者对象是否具有这个接口的某些属性，然后进行操作
// 如果是类的话，直接使用instanceof进行判断
/**
 * 将一个类型断言为any
 * 有一些对象，我们需要给它添加属性，如window.foo = 1 ;
 * 正常情况下，ts会提示报错，因为window对象并没有这个属性，而实际上我们确实需要将foo属性添加到window上，
 * 所以我们可以将window临时断言为any，即：(window as any).foo = 1
 * 因为在 any 类型的变量上，访问任何属性都是允许的
 * 注意：将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。
 * 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。
 *
 * 使用原则：一方面不能滥用 as any，另一方面也不要完全否定它的作用，
 * 我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一）
 */
// error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
// window.foo = 1 ;
// (window as any).foo = 1 ;
// console.log((window as any).foo) ;
/**
 *
 * 将any类型断言为一个具体类型
 *
 */ 

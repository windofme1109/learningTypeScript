/**
 *
 * 类型断言
 * 语法1：值 as 类型
 * 语法2：<类型> 值
 * 不推荐第二种写法，因为会与React以及ts中的泛型混淆，所以，我们统一使用第一种语法
 */

/**
 *
 * 断言作用1：将一个联合类型断言为其中一个类型
 *
 */

interface Cat {
    name: string,
    run(): void
}

interface Fish {
    name: string,
    swim(): void
}

// 声明animal为联合类型，则我们只能使用这两个类型中的共有属性或者方法
function getName(animal: Cat|Fish) {
    return animal.name ;
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
function isFish(animal: Cat|Fish) {
    // 将animal断言为Fish，编译过程就不会报错
    if (typeof (animal as Fish).swim === 'function') {
        return true ;
    }

    return false ;
}

// 虽然编译过程不会报错，但是运行过程有可能出错
let cat: Cat = {
    name: 'Tom',
    run() {console.log('run')}
}

function fishSwim(animal: Cat|Fish) {
    (animal as Fish).swim() ;
}
//编译没有问题，运行时会报错：animal.swim is not a function
// fishSwim(cat) ;

/**
 * 原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 直接断言为 Fish 了，
 * 而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误。
 *
 * 可是 fishSwim 函数接受的参数是 Cat | Fish，一旦传入的参数是 Cat 类型的变量，由于 Cat 上没有 swim 方法，就会导致运行时错误了。
 *
 * 注意：使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
 *
 */

/**
 *
 * 将一个父类断言为更加具体的子类
 *
 */

// class ApiError extends Error {
//     code: number = 0
// }
//
// class HttpError extends Error {
//     statusCode: number = 200
// }

/**
 * 这个函数的目的是判断错误类型是否是ApiError
 * 所以参数error的类型肯定是父类Error，但是父类没有code这个属性，故直接获取 error.code 会报错，
 * 所以我们需要将error断言为ApiError，然后获取code属性进行判断
 *
 */
// function isApiError(error: Error) {
//     if ((error as ApiError).code === 0) {
//         return true ;
//     }
//
//     return false ;
// }

// 如果这里是类的话，使用instanceof更加合适，直接判断error是不是ApiError的实例
// function isApiError(error: Error) {
//     if (error instanceof ApiError) {
//         return true ;
//     }
//
//     return false ;
// }

// 有的情况下 ApiError 和 HttpError 不是一个真正的类，
// 而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，
// 它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了
// 如下所示，定义了两个接口，在isApiError()中，使用instanceof进行判断
// 在编译过程中，就报错了
interface ApiError extends Error {
    code: number
}

interface HttpError extends Error {
    statusCode: number
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
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true ;
    }

    return false ;
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
 * 有一些代码中，会返回any类型，如果我们将any类型断言为一个精确的类型，有助于我们后续的操作
 *
 */

/**
 *
 * 断言类型的限制
 * 笼统的说，就是A能兼容B，那么 A 能够被断言为 B，B 也能被断言为 A。
 * 如果B能兼容A，那么 B 能够被断言为 A，A 也能被断言为 B。
 * 所谓的兼容，我的理解是，谁包含谁
 */

// interface Animal {
//     name: string
// }
//
// interface Cat {
//     name: string
//     run(): void
//
// }
//
// let tom: Cat = {
//     name: 'Tom',
//     run: () => {
//         console.log('run') ;
//     }
// }
// let animal: Animal = tom ;
/**
 * TypeScript时结构类型系统，类型之间的比较只会比较它们最终的结构，而忽略定义时的关系
 * Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。
 * TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，
 * 而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的
 * 在继承的情况下，子类的实例可以赋值给类型为父类的变量
 * 所以上面的tom可以赋值给类型为Animal的变量
 */
// interface Animal {
//     name: string
// }
//
// interface Cat extends Animal{
//     run(): void
// }


//当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了
// interface Animal {
//     name: string
// }
//
// interface Cat {
//     name: string
//     run(): void
//
// }
//
// function testAnimal(animal: Animal) {
//
//     return (animal as Cat) ;
// }
//
// function testCat(cat: Cat) {
//
//     return (cat as Animal) ;
// }

/**
 *
 * 类型声明与类型断言的区别
 * Animal兼容Cat（相当于Animal是父类，Cat是子类）
 */
interface Animal {
    name: string
}

interface Cat {
    name: string
    run(): void
}

let tom: Cat = {
    name: 'tom',
    run: () => {
        console.log('run') ;
    }
}
// 类型声明
// 可以将tom赋值给animal，因为Animal兼容Cat
let animal: Animal = tom ;

let anl: Animal = {
    name: 'Jack'
}

// anl可以被断言成Cat类型，也是因为Animal兼容Cat
let jack = anl as Cat ;
let animal2 = tom as Animal ;

// 断言可以，但是类型声明就报错，想要将animal类型的anl赋值给类型为Cat的jack，Cat必须兼容Animal，也就是说，Cat有的，Animal都得有
// 但是，Animal不具备这样的特性，所以无法赋值给jack
// 换一种说法，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。
// // error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
// let jack: Cat = anl ;
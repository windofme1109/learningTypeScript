/**
 *
 * TypeScript中的接口：Interfaces
 * 使用接口来定义对象的类型
 * 接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
 * 在TypeScript中，接口常常用来对对象的形状（shape）进行约束
 *
 */

interface Person {
    name: string,
    age: number
}

// 定义一个对象，其类型为Person，tom这个对象的形状必须和Person一样
// 赋值时，对象的变量的形状必须和接口一致
let tom: Person = {
    name: 'Tom',
    age: 25
} ;

console.log('name', tom.name) ;

// 定义的变量比接口多了一些属性是不允许的
// 对应的变量多于接口定义的属性，会报错：
//  error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
// let jack: Person = {
//     name: 'Jack',
//     age: 25,
//     gender: 'male'
// }

// 定义的变量比接口少了一些属性是不允许的
// 对应的变量多余接口定义的属性，同样会报错：
// error TS2741: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
// let jack: Person = {
//     name: 'Jack'
// }

/**
 * 可选属性
 */

interface Student {
    name: string,
    age: number,
    // 使用一个?表示，这是一个可选的属性，表示这个属性可以存在，也可以不存在
    phone?: number
}

// 可选属性的含义是该属性可以不存在
let s1: Student = {
    name: '张三',
    age: 20,
}

// console.log(s1.phone) ;

let s2: Student = {
    name: '李四',
    age: 25,
    phone: 12345678
}

console.log(s2.phone) ;

/**
 * 任意属性
 * 希望接口拥有任意属性
 */

interface Teacher {
    name: string,
    age?: number,
    // 定义属性名取string类型的值
    // 属性值则是any类型
    [propName: string]: any
}

let t1: Teacher = {
    name: 'smith',
    gender: 'male'
}

let t2: Teacher = {
    name: 'rose',
    school: 'bupt',
    age: 25
}

// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

/**
 *
 *
 *
 * 任意属性定义为string类型，那么name和price也必须时string类型的子集（在我看来，就都得是string）
 * 而price的类型时number，并不是string的子集
 * 所以，在编译过程中，会报错：Property 'price' of type 'number' is not assignable to string index type 'string'.
 */
// interface Fruits {
//     name: string,
//     price?: number,
//     [propName: string]: string
// }
//
// let apple: Fruits = {
//     name: 'apple',
//     price: 10,
//     size: 'large'
//
// }


/**
 *
 * 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
 *
 * 问题：接口中有多个类型的属性，为什么不适用any定义呢？？
 */

interface Fruits {
    name: string,
    price?: number,
    // 接口中只能定义一个任意属性，如果接口中有多个类型的属性（如name为string，price为number），则可以使用联合类型，定义为：string|number
    [propName: string]: string | number
}

let apple: Fruits = {
    name: 'apple',
    price: 25,
    size: 'large',
    color: 'red'
}

let orange: Fruits = {
    name: 'orange',
    price: 10,
    size: 'small',
    series: 188
}
console.log(orange.series) ;


/**
 *
 * 只读属性
 * 希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
 */

interface Workers {
    // 使用readonly定义一个只读属性，该属性在变量创建时赋值，然后就只读，不能修改
    readonly id: number,
    name: string,
    age?: number,
    [propName: string]: any
}

// 在定义时，给只读属性赋值
let w1: Workers = {
    id: 10578,
    name: '张三',
    gender: 'male'
}

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
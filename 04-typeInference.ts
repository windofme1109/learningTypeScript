/**
 * 类型推断：Type Inference
 * 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
 * 进行类型推断的前提是，必须给变量赋值，如果不进行赋值，则会被识别为any
 */

// 如果在定义变量的时候没有指定数据类型，但是还进行了赋值，那么TypeScript会根据值的类型，推断出这个变量属于什么类型
// 后面如果再进行修改，则会报错
let myFavouriteNumber = 7 ;
//  error TS2322: Type '"seven"' is not assignable to type 'number'.
// myFavouriteNumber = 'seven' ;

// 上述过程等价于：
// let myFavouriteNumber: number = 7 ;
// error TS2322: Type '"seven"' is not assignable to type 'number'.
// myFavouriteNumber = 'seven' ;

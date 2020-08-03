/**
 *
 * 枚举（Enum）
 * 枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
 * 枚举使用enum关键字定义
 *
 */

// 定义一个枚举类
// 限定了取值范围
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
// 枚举名到枚举值的映射
console.log(Days['Sun'] === 0);    // true
console.log(Days['Mon'] === 1);    // true
console.log(Days['Tue'] === 2);    // true
console.log(Days['Wed'] === 3);    // true
console.log(Days['Sat'] === 6);    // true

// 枚举值到枚举名的映射
console.log(Days[1] === 'Mon');    // true
console.log(Days[2] === 'Tue');    // true
console.log(Days[5] === 'Fri');    // true
console.log(Days[0] === 'Sun');    // true

/**
 *
 * 手动赋值
 * 可以给枚举类里面的值，手动赋值
 * 未手动赋值的枚举项会接着上一个枚举项递增
 *
 */
// 手动给Sun赋值为7，Mon赋值为1，那么Mon之后的变量会在Mon的基础上，自动递增，步长为1
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days2['Wed'] === 3);    // true
console.log(Days2['Sat'] === 6);    // true

// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 在编译过程中是不会察觉到这一点的
// 递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，
// 导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了
// 也就是说，枚举名到枚举值的映射没有问题，但是枚举值到枚举名的映射，后的的就会将前面的覆盖
// 所有这里的3只能映射到Wed
// 所以使用的时候需要注意，最好不要出现这种覆盖的情况
enum Days3 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days3['Sun'] === 3) ;    // true
console.log(Days3['Wed'] === 3) ;    // true
console.log(Days3[3] === 'Sun') ;    // false
console.log(Days3[3] === 'Wed') ;    // true

/**
 *
 * 手动赋值的枚举项可以是负数，也可以是小数，但是后续未赋值的枚举项的递增赋值仍然是1
 *
 */
enum Days4 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
console.log(Days4['Mon'] === 1.5) ;    // true
console.log(Days4['Tue'] === 2.5) ;    // true
console.log(Days4['Sat'] === 6.5) ;    // true

/**
 *
 * 常数项和计算所得项
 *
 * 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）
 * 常数项就是我们在定义是就给枚举项赋值或者是未赋值而由系统分配的
 * 前面的枚举类都是常数项
 * 而计算所得项时需要动态计算，比如一个字符串的长度
 *
 */

// 定义一个计算所得项的枚举类
// 'Blue'.length就是一个计算所得项
enum Colors {Red, Green, Blue = 'Blue'.length};
console.log(Colors[4] === 'Blue') ;    // true


// 计算所得项如果是在枚举类的最后一位，编译过程不会有问题
// 但是紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
// error TS1061: Enum member must have initializer.
// enum Colors2 {Red = 'Red'.length, Green};


/**
 *
 * 常数枚举
 * 指的是const enum 定义的枚举类型
 *
 */

// 使用const关键字定义一个常数枚举类
const enum Directions {Up, Down, Left, Right};
let d = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
// 上面语句的编译结果如下所示：
// var d = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// 常数枚举只能通过字符串的方式进行访问
console.log(Directions['Up']) ;

// 假如包含了计算成员，则会在编译阶段报错
//  error TS2474: const enum member initializers can only contain literal values and other computed enum values.
// const enum Directions2 {Up, Down, Left, Right = 'Right'.length};

/**
 *
 * 外部枚举
 * 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
 */
declare enum Directions2 {Up, Down, Left, Right};
// let dir = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
//declare 定义的类型只会用于编译时的检查，编译结果中会被删除
// 上面的编译结果是：
// var dir = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
// 外部枚举与声明语句一样，常出现在声明文件中

// const和declare可以放在一起使用
declare const enum Directions3 {
    Up,
    Down,
    Left,
    Right
};
let dir3 = [Directions3.Up, Directions3.Down, Directions3.Left, Directions3.Right];
// 上面的编译结果是：
// var dir3 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

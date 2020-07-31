/**
 *
 * 进阶：类型别名
 * 类型别名用来给一个类型起个新名字
 * 使用 type 创建类型别名
 * 类型别名常用于联合类型
 *
 * 我的理解：类型别名的作用主要是增加语义性，实际上，新的名字是对类型的一个引用
 * 约束还是原来的类型起作用
 *
 */

// 将string类型取另外一个名字——name，接下来我们就可以使用Name代替string，语义性更强
type Name = string ;
// 将一个函数取一个别名——NameResolve，等号右侧是TypeScript中的函数的定义，=>左侧表示输入类型，右侧表示输出类型
type NameResolve = () => string ;

type NameOrResolve = Name | NameResolve ;

function getName(n: NameOrResolve): Name {
    if (typeof n === 'string') {
        return n ;
    } else {
        return n() ;
    }
}

console.log(getName('tom')) ;
console.log(getName(() => 'jack')) ;

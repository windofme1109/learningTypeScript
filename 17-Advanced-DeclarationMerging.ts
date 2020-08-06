/**
 *
 * 声明合并
 * 如果定义了两个相同名字的函数、接口，那么它们会合并成一个类型
 *
 */

// 1. 函数重载
function reverse(input: number): number;
function reverse(input: string): string;
function reverse(input: number | string): string | number {
    if (typeof input === 'number') {
        return Number(input.toString().split('').reverse().join(''));
    } else if (typeof input === 'string') {
        return input.split('').reverse().join('');
    }
}

console.log(reverse(321));
console.log(reverse('1234'));

// 2. 接口合并
// 接口中的属性在合并时会简单的合并到一个接口中
interface Alarm {
    weight: number;
}

interface Alarm {
    price: number;

}

// 这两个接口会合并，等价于
// interface Alarm {
//     weight: number;
//     price: number;
// }

let alarm: Alarm = {
    weight: 100,
    price: 5000
}
console.log(alarm);

// 合并的属性的类型必须是唯一的
// 这里的price声明为string类型，在合并时就会报错，因为前面的price时number类型
// error TS2717: Subsequent property declarations must have the same type.  Property 'price' must be of type 'number', but here has type 'string
// interface Alarm {
//     price: string;
//     weight: number
// }

// 接口中，函数的合并与函数重载相同
interface Light {
    size: number;
    // 定义一个函数需要的形状（输入类型，返回值类型），形式如下所示
    alert(x: string): string;

}
interface Light {
    price: number;
    alert(x: number): number;
}

// 合并后，等价于
// interface Light {
//     size: number;
//     price: number;
//     alert(x: number): number;
//     alert(x: string): string;
// }

let ll: Light = {
    size: 55,
    price: 100,
    alert: function<T>(x: T): T {
        return x;
    }
}

console.log(ll.alert('apple'));
console.log(ll.alert(1235));

class Company<T> {
    name: string;
    location: string;
    incomes: T;

    constructor(name: string, location: string, incomes: T) {
        this.name = name;
        this.location = location;
        this.incomes = incomes;
    }
    getCompanyName(): string {
        return this.name
    }
    getIncomes(): T {
        return this.incomes;
    }
}

let com = new Company<number>('Baidu', '北京', 1000000);
console.log(com.getCompanyName());
console.log(com.getIncomes());
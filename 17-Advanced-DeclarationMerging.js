/**
 *
 * 声明合并
 * 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
 *
 */
function reverse(input) {
    if (typeof input === 'number') {
        return Number(input.toString().split('').reverse().join(''));
    }
    else if (typeof input === 'string') {
        return input.split('').reverse().join('');
    }
}
console.log(reverse(321));
console.log(reverse('1234'));
// 这两个接口会合并，等价于
// interface Alarm {
//     weight: number;
//     price: number;
// }
var alarm = {
    weight: 100,
    price: 5000
};
console.log(alarm);
// 合并后，等价于
// interface Light {
//     size: number;
//     price: number;
//     alert(x: number): number;
//     alert(x: string): string;
// }
var ll = {
    size: 55,
    price: 100,
    alert: function (x) {
        return x;
    }
};
console.log(ll.alert('apple'));
console.log(ll.alert(1235));
var Company = /** @class */ (function () {
    function Company(name, location, incomes) {
        this.name = name;
        this.location = location;
        this.incomes = incomes;
    }
    Company.prototype.getCompanyName = function () {
        return this.name;
    };
    Company.prototype.getIncomes = function () {
        return this.incomes;
    };
    return Company;
}());
var com = new Company('Baidu', '北京', 1000000);
console.log(com.getCompanyName());
console.log(com.getIncomes());

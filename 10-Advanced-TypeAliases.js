/**
 *
 * 进阶：类型别名
 * 类型别名用来给一个类型起个新名字
 * 使用 type 创建类型别名
 */
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
console.log(getName('tom'));
console.log(getName(function () { return 'jack'; }));

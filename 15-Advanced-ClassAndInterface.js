/**
 *
 * 类与接口
 * 接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述
 * 接口还有另外一个作用，就是对类的一部分行为进行抽象
 *
 * 接口是对不同的类的一些共同特性进行抽象和封装，使用implements关键字来实现这个接口
 *
 * 一个类只能有一个父类，但是可以实现多个接口，即单继承，多实现
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('防盗门发出警报！！！！！！！！！');
    };
    return SecurityDoor;
}(Door));
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('汽车发出警报！！！！！！！！！！！');
    };
    return Car;
}());
var sd = new SecurityDoor();
var audi = new Car();
sd.alert();
audi.alert();
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.alert = function () {
        console.log('卡车发出警报！！！！！！！！！！！');
    };
    Truck.prototype.lightOff = function () {
        console.log('灯关闭了');
    };
    Truck.prototype.lightOn = function () {
        console.log('灯打开了');
    };
    return Truck;
}());
var trs = new Truck();
trs.alert();
trs.lightOff();
trs.lightOn();
/**
 *
 * 接口继承类
 * 在常见的面向对象的编程语言中，接口时不能继承类的，但是在TypeScript中，接口是可以继承类的
 *
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
// 使用接口Point3D来约束对象的形状
var point3d = { x: 1, y: 2, z: 3 };
console.log(point3d);

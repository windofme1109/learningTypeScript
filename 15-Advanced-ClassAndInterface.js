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
// 为什么接口可以继承类呢？
// 我们创建的类，既可以当作一个类来使用（使用new关键字），也可以作为一个类型来使用（约束某个变量的类型）
function getPoint(p) {
    console.log('x = ', p.x, 'y = ', p.y);
}
getPoint({ x: 10, y: 55 });
function printPoint(p) {
    console.log('x = ', p.x, 'y = ', p.y);
}
printPoint({ x: 47, y: 99 });
/**
 *
 * 声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法
 * 也就是说，PointInstanceType没有构造方法，静态属性，静态方法
 * 其实也很好理解，因为PointInstanceType时用来约束变量的，也就是实例，实例时没有静态属性和静态方法的
 * 所以PointInstanceType没有构造方法，静态属性，静态方法，只有实例属性和实例方法
 * 同理，接口在继承类的时候，也是只能继承实例属性和实例方法
 *
 */
var NewPoint = /** @class */ (function () {
    // 构造方法
    function NewPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 定义一个静态方法，用来计算任意一点到坐标原点的距离
     * @param p
     */
    NewPoint.getDistance = function (p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    };
    /**
     * 定义一个实例方法，用来打印x和y
     */
    NewPoint.prototype.printPoint = function () {
        console.log('x = ', this.x, 'y = ', this.y);
    };
    // 静态属性，坐标原点
    NewPoint.origin = new NewPoint(0, 0);
    return NewPoint;
}());
// 类型NewPoint和类型NewPointInstanceType时等价的
var ps1;
var ps2;
ps1 = {
    x: 10,
    y: 101,
    printPoint: function () {
        console.log("ps1 x = " + this.x + ", ps1 y = " + this.y);
    }
};
ps2 = {
    x: 101,
    y: 202,
    printPoint: function () {
        console.log("ps2 x = " + this.x + ", ps2 y = " + this.y);
    }
};
console.log(ps1.x);
console.log(ps1.y);
ps1.printPoint();
console.log(ps2.x);
console.log(ps2.y);
ps2.printPoint();

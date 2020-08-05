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

// 定义一个接口
interface Alarm {
    // 接口中的方法也必须在实现这个接口的类中去定义方法体
    alert(): void;
}

class Door {

}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('防盗门发出警报！！！！！！！！！');
    }
}

class Car implements Alarm {
    alert() {
        console.log('汽车发出警报！！！！！！！！！！！');
    }
}

let sd = new SecurityDoor() ;
let audi = new Car();
sd.alert();
audi.alert();

/**
 *
 * 一个类可以实现多个接口
 *
 */

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Truck implements Alarm, Light {
    alert() {
        console.log('卡车发出警报！！！！！！！！！！！');
    }

    lightOff() {
        console.log('灯关闭了');
    }

    lightOn() {
        console.log('灯打开了');
    }
}

let trs = new Truck();
trs.alert();
trs.lightOff();
trs.lightOn();

/**
 * 
 * 接口继承接口
 * 接口与接口之间可以是继承的关系
 * 
 */

interface AlarmLight extends Alarm {
    alarmLightOn(): void;
    alramLightOff(): void;

}

/**
 *
 * 接口继承类
 * 在常见的面向对象的编程语言中，接口时不能继承类的，但是在TypeScript中，接口是可以继承类的
 *
 */
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// 接口继承了Point类
interface Point3D extends Point{
    z: number;

}

// 使用接口Point3D来约束对象的形状
let point3d: Point3D = {x: 1, y: 2, z: 3};
console.log(point3d);

// 为什么接口可以继承类呢？
// 我们创建的类，既可以当作一个类来使用（使用new关键字），也可以作为一个类型来使用（约束某个变量的类型）
function getPoint(p: Point) {
    console.log('x = ', p.x, 'y = ', p.y);
}

getPoint({x: 10, y: 55});

// 我们在创建Point类时，同时也创建了一个名为 Point 的类型（实例的类型），用来约束实例的类型的
// 等价于下面的代码：新声明的 PointInstanceType 类型，与声明 class Point 时创建的 Point 类型是等价的。
interface PointInstanceType {
    x: number,
    y: number,
}

function printPoint(p: PointInstanceType) {
    console.log('x = ', p.x, 'y = ', p.y);
}

printPoint({x: 47, y: 99});

// 当我们声明interface NewPoint3D extends Point3D时，实际上，NewPoint3D继承的时Point的实例类型
// 等价于interface NewPoint3D extends PointInstanceType
// NewPoint3D继承的是接口PointInstanceType
// 所以「接口继承类」和「接口继承接口」没有什么本质的区别
interface NewPoint3D extends Point {
    z: number,
}

/**
 *
 * 声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法
 * 也就是说，PointInstanceType没有构造方法，静态属性，静态方法
 * 其实也很好理解，因为PointInstanceType时用来约束变量的，也就是实例，实例时没有静态属性和静态方法的
 * 所以PointInstanceType没有构造方法，静态属性，静态方法，只有实例属性和实例方法
 * 同理，接口在继承类的时候，也是只能继承实例属性和实例方法
 *
 */
class NewPoint {
    // 静态属性，坐标原点
    static origin = new NewPoint(0, 0);
    // 实例属性
    x: number;
    y: number;

    /**
     * 定义一个静态方法，用来计算任意一点到坐标原点的距离
     * @param p
     */
    static getDistance(p: NewPoint): number {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }
    // 构造方法
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * 定义一个实例方法，用来打印x和y
     */
    printPoint() {
        console.log('x = ', this.x, 'y = ', this.y);
    }

}

interface NewPointInstanceType {
    x: number;
    y: number;
    printPoint(): void;
}

// 类型NewPoint和类型NewPointInstanceType时等价的
let ps1: NewPoint;
let ps2: NewPointInstanceType;
ps1 = {
    x: 10,
    y: 101,
    printPoint() {
        console.log(`ps1 x = ${this.x}, ps1 y = ${this.y}`);
    }
}

ps2 = {
    x: 101,
    y: 202,
    printPoint() {
        console.log(`ps2 x = ${this.x}, ps2 y = ${this.y}`);
    }
}

console.log(ps1.x);
console.log(ps1.y);
ps1.printPoint();

console.log(ps2.x);
console.log(ps2.y);
ps2.printPoint();
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
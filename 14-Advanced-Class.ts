/**
 *
 * 类（Class）
 * 传统的JavaScript存在类的概念，我们通过构造函数来模拟一个类，并使用原型继承的方式实现继承
 * 在ES6中，引入和class关键字和extends关键字
 * class用于定义类，extends实现继承
 *
 */

/**
 *
 * ES6中，类的用法
 *
 */

// 1. 属性与方法
class Animal {
    public name;
    constructor(name) {
        this.name = name;
    }
    // 类中定义方法不用function关键字
    sayHi() {
        return `hello, ${this.name}`;
    }
}

let tiger: Animal = new Animal('tiger');
console.log(tiger.sayHi());

// 2. 继承 extends
class Cats extends Animal {
    constructor(name) {
        // 必须调用super()方法，相当于调用父类constructor()方法，而且必须放在第一位
        super(name);
        this.name = name;
    }

    // 子类自定义自己的方法
    greeting() {
        return `Meow, ${this.name}`;
    }
}

let kitty: Cats = new Cats('kitty');
// 子类继承了父类的方法和属性，因此可以使用父类的方法
console.log(kitty.sayHi());
console.log(kitty.greeting());

// 3. getter和setter。使用 getter 和 setter 可以改变属性的赋值和读取行为
// 如果定义了setter和getter方法，编译时，必须在最后加上 -t es5，即 tsc 14-Advanced-Class.ts -t
// 表明将ts代码编译为es5即更高版本的js代码


class School {

    public _name: string;
    constructor(name) {
        this.name = name;
    }

    // 通过实例直接访问name属性的时候，会调用与name属性同名的get方法
    get name() {
        console.log('getter');
        return this._name;
    }
    // 给name属性赋值的时候，会调用与name属性同名的set方法
    set name(newName) {
        console.log('setter');
        this._name = newName;
    }

    sayHello() {
        return this._name;
    }

}
//
// setter和getter的用法
let sch = new School('SSF');
console.log(sch.name);

sch.name = 'BUPT';
// console.log(sch.sayHello());
console.log(sch.name);
sch.name = 'csuft';
// console.log(sch.sayHello());
console.log(sch.name);

// 4. 静态方法，使用static关键字定义，通过类调用，不能通过实例调用
class Students {
    static isStudent(s) {
        return s instanceof Students;
    }

}

let s1 = new Students();
// true
console.log(Students.isStudent(s1));


/**
 *
 * ES7中，类的用法
 *
 */

// 1. 实例属性
// ES7之前，实例属性通过this.xxx定义，ES7 提案中可以直接在类里面定义：
class Person {
    // 直接定义实例属性
    name = 'jack';

    constructor() {
    }


}

let ps = new Person();
// jack
console.log(ps.name);

// 2. 静态属性
//ES7 提案中可以使用 static 定义一个静态属性
// 静态属性同静态方法类似，都是通过类访问，而不是通过实例访问
class Numbers {
    static id = 115;
}
// 115
console.log(Numbers.id);

/**
 *
 * TypeScript 中，新增了一些内容，可以使用修饰符public、private和protected限制属性和方法的访问权限
 * 设置只读属性readonly
 * 抽象类
 */

// public、private、protected
/**
 *
 *
 * public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
 * private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 * protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
 *
 */

class Fruits {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }

    public favourite() {
        return `I like ${this.name}`;
    }

}

let orange = new Fruits('orange');
console.log(orange.name);
console.log(orange.favourite());

class Fruits2 {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    public favourite() {
        return `I like ${this.name}`;
    }

}
let orange2 = new Fruits2('orange');
// Property 'name' is private and only accessible within class 'Fruits2'.
// console.log(orange2.name);
console.log(orange2.favourite());
// Property 'name' is private and only accessible within class 'Fruits2'.
// orange2.name = 'apple';

// 使用 private 修饰的属性或方法，在子类中也是不允许访问的
class Apple extends Fruits2 {
    constructor(name) {
        super(name);
        // error TS2341: Property 'name' is private and only accessible within class 'Fruits2'.
        // console.log(this.name);
    }
}

// 使用protected修饰，不能再类的外部访问，但是可以再子类中访问
class Fruits3 {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }

    public favourite() {
        return `I like ${this.name}`;
    }

}

class Banana extends Fruits3 {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

let ff = new Fruits3('apple');
//  error TS2445: Property 'name' is protected and only accessible within class 'Fruits3' and its subclasses.
// console.log(ff.name);
let fff = new Banana('BANANA');
// protected修饰的属性和方法，只能被子类继承，但是子类实例还是无法访问这些属性和方法
// console.log(fff.name);

// 当构造函数修饰为 private 时，该类不允许被继承或者实例化
class Fruits4 {
    protected name: string;
    private constructor(name: string) {
        this.name = name;
    }

    public favourite() {
        return `I like ${this.name}`;
    }

}

//error TS2675: Cannot extend a class 'Fruits4'. Class constructor is marked as private.
// class Mellon extends Fruits4 {
//     constructor(name) {
//         super(name);
//     }
// }
// error TS2673: Constructor of class 'Fruits4' is private and only accessible within the class declaration.
// let fr = new Fruits4('mellon');

// 当构造函数修饰为 protected 时，该类只允许继承
class Fruits5 {
    protected name: string;
    protected constructor(name: string) {
        this.name = name;
    }

    public favourite() {
        return `I like ${this.name}`;
    }

}

class Mellon extends Fruits5 {
    constructor(name) {
        super(name);
    }
}
//  error TS2674: Constructor of class 'Fruits5' is protected and only accessible within the class declaration.
// let fr = new Fruits5('mellon');

// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使得代码更加简洁
class Fruits6 {
    // public name: string;
    // 直接在参数中使用修饰符修饰name，省去在外定义
    constructor(public name) {
        this.name = name;
    }
}
let ff6 = new Fruits6('jacks');
// jacks
console.log(ff6.name);

// readonly
// 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
class Fruits7 {
   readonly name: string;
   private readonly price: number;
   constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public favourite() {
        return `I like ${this.name}`;
    }
}

let ff7 = new Fruits7('apple', 55);

console.log(ff7.name);
// error TS2540: Cannot assign to 'name' because it is a read-only property.
// ff7.name = 'banana';

/**
 *
 * 抽象类
 * 抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
 * 在TypeScript中，使用abstract进行定义
 */

// 定义一个抽象类
abstract class Phone {
    public name: string;
    constructor(name) {
        this.name = name;
    }

    // 方法也要用abstract定义
    // 只定义方法名，不定义方法体，这个方法必须在子类中实现
    public abstract brand();
}

// 抽象类不能被实例化
// error TS2511: Cannot create an instance of an abstract class.
// let pp = new Phone('Phone');

class Vivo extends Phone {
    constructor(name) {
        super(name);
        this.name = name;
    }

    // 在子类中必须实现抽象类中的brand()方法
    brand() {
        return `the brand is ${this.name}`;
    }

    price() {
        return 3000;
    }
}

let x9 = new Vivo('Vivo');
// the brand is Vivo
console.log(x9.brand());

/**
 *
 * 总结：在TypeScript中，类的特性和使用方法如下：
 * 1. 使用class关键字定义
 * 2. 使用extends关键字实现继承
 * 3. 类中定义方法不使用function关键字
 * 4. 可以定义getter和setter方法，限制存取某个属性的行为
 * 5. 使用static定义静态方法和属性
 * 6. 直接在类中定义实例属性，而不使用this.xxx的方式
 * 7. 修饰符：public、protected和private，用来修饰属性和方法
 * 8. 只读属性readonly，只能读，不能修改，与修饰符一起使用，放在修饰符后面
 * 9. 抽象类：abstract，是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现，抽象类中的方法也必须使用abstract定义
 *
 */

class Country {
    public _name: string;
    private _id: number;
    protected area: number;
    // 静态属性
    static common: string = 'Earth';
    // 定义实例属性
    capital: string = '';

    constructor(name: string, id: number, area: number) {
        this.name = name;
        this.id = id;
        this.area = area;
    }

    get name() {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get id() {
        return this._id;
    }

    set id(newId: number) {
        this._id = newId;
    }

    // 定义成员方法
    getInfo() {
        return `The country is ${this._name}, id is ${this._id}, area is ${this.area}`;
    }

    // 定义静态方法
    static commonInfo() {
        return 'Every country is a part of Earth';
    }

}
let china = new Country('China', 1, 960);
console.log('静态属性', Country.common) ;
console.log('静态方法', Country.commonInfo()) ;

// getter和setter方法的使用
console.log(china.id);
china.id = 0;
console.log(china.id);

// 继承
class China extends Country {
    public ranking: number;
    constructor(name: string, id: number, area: number, ranking: number) {
        super(name, id, area);
        this.ranking = ranking;
    }

    getChinaArea() {
        return this.area;
    }
}

let cc = new China('China', 0, 960, 1);
console.log('China\'s area is ', cc.getChinaArea());
console.log(cc.getInfo());

// 抽象类
abstract class SuperClass {
    public name: string;
    constructor(name) {
        this.name = name;
    }

    abstract sayHello();
    abstract getInfo();
}

class SubClass extends SuperClass {
    age: number;
    constructor(name: string, age: number) {
        super(name);
        this.age = age;
    }
    // 抽象类中定义的方法，必须在子类中实现
    sayHello() {
        console.log(`hello, ${this.name}`);
    }

    getInfo() {
        console.log(`the name is ${this.name}, age is ${this.age}`)
    }
}

const ss = new SubClass('jack', 25);
ss.getInfo();
ss.sayHello();
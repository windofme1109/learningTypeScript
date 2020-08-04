/**
 *
 * 类（Class）
 * 传统的JavaScript存在类的概念，我们通过构造函数来模拟一个类，并使用原型继承的方式实现继承
 * 在ES6中，引入和class关键字和extends关键字
 * class用于定义类，extends实现继承
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
/**
 *
 * ES6中，类的用法
 *
 */
// 1. 属性与方法
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    // 类中定义方法不用function关键字
    Animal.prototype.sayHi = function () {
        return "hello, " + this.name;
    };
    return Animal;
}());
var tiger = new Animal('tiger');
console.log(tiger.sayHi());
// 2. 继承 extends
var Cats = /** @class */ (function (_super) {
    __extends(Cats, _super);
    function Cats(name) {
        var _this = 
        // 必须调用super()方法，相当于调用父类constructor()方法，而且必须放在第一位
        _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    // 子类自定义自己的方法
    Cats.prototype.greeting = function () {
        return "Meow, " + this.name;
    };
    return Cats;
}(Animal));
var kitty = new Cats('kitty');
// 子类继承了父类的方法和属性，因此可以使用父类的方法
console.log(kitty.sayHi());
console.log(kitty.greeting());
// 3. getter和setter。使用 getter 和 setter 可以改变属性的赋值和读取行为
// 如果定义了setter和getter方法，编译时，必须在最后加上 -t es5，即 tsc 14-Advanced-Class.ts -t
// 表明将ts代码编译为es5即更高版本的js代码
var School = /** @class */ (function () {
    function School(name) {
        this.name = name;
    }
    Object.defineProperty(School.prototype, "name", {
        // 通过实例直接访问name属性的时候，会调用与name属性同名的get方法
        get: function () {
            console.log('getter');
            return this._name;
        },
        // 给name属性赋值的时候，会调用与name属性同名的set方法
        set: function (newName) {
            console.log('setter');
            this._name = newName;
        },
        enumerable: false,
        configurable: true
    });
    School.prototype.sayHello = function () {
        return this._name;
    };
    return School;
}());
//
// // setter和getter的用法
var sch = new School('SSF');
console.log(sch.name);
sch.name = 'BUPT';
// console.log(sch.sayHello());
console.log(sch.name);
sch.name = 'csuft';
// console.log(sch.sayHello());
console.log(sch.name);
// 4. 静态方法，使用static关键字定义，通过类调用，不能通过实例调用
var Students = /** @class */ (function () {
    function Students() {
    }
    Students.isStudent = function (s) {
        return s instanceof Students;
    };
    return Students;
}());
var s1 = new Students();
// true
console.log(Students.isStudent(s1));
/**
 *
 * ES7中，类的用法
 *
 */
// 1. 实例属性
// ES7之前，实例属性通过this.xxx定义，ES7 提案中可以直接在类里面定义：
var Person = /** @class */ (function () {
    function Person() {
        // 直接定义实例属性
        this.name = 'jack';
    }
    return Person;
}());
var ps = new Person();
// jack
console.log(ps.name);
// 2. 静态属性
//ES7 提案中可以使用 static 定义一个静态属性
// 静态属性同静态方法类似，都是通过类访问，而不是通过实例访问
var Numbers = /** @class */ (function () {
    function Numbers() {
    }
    Numbers.id = 115;
    return Numbers;
}());
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
var Fruits = /** @class */ (function () {
    function Fruits(name) {
        this.name = name;
    }
    Fruits.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits;
}());
var orange = new Fruits('orange');
console.log(orange.name);
console.log(orange.favourite());
var Fruits2 = /** @class */ (function () {
    function Fruits2(name) {
        this.name = name;
    }
    Fruits2.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits2;
}());
var orange2 = new Fruits2('orange');
// Property 'name' is private and only accessible within class 'Fruits2'.
// console.log(orange2.name);
console.log(orange2.favourite());
// Property 'name' is private and only accessible within class 'Fruits2'.
// orange2.name = 'apple';
// 使用 private 修饰的属性或方法，在子类中也是不允许访问的
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(name) {
        return _super.call(this, name) || this;
        // error TS2341: Property 'name' is private and only accessible within class 'Fruits2'.
        // console.log(this.name);
    }
    return Apple;
}(Fruits2));
// 使用protected修饰，不能再类的外部访问，但是可以再子类中访问
var Fruits3 = /** @class */ (function () {
    function Fruits3(name) {
        this.name = name;
    }
    Fruits3.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits3;
}());
var Banana = /** @class */ (function (_super) {
    __extends(Banana, _super);
    function Banana(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    return Banana;
}(Fruits3));
var ff = new Fruits3('apple');
//  error TS2445: Property 'name' is protected and only accessible within class 'Fruits3' and its subclasses.
// console.log(ff.name);
var fff = new Banana('BANANA');
// protected修饰的属性和方法，只能被子类继承，但是子类实例还是无法访问这些属性和方法
// console.log(fff.name);
// 当构造函数修饰为 private 时，该类不允许被继承或者实例化
var Fruits4 = /** @class */ (function () {
    function Fruits4(name) {
        this.name = name;
    }
    Fruits4.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits4;
}());
//error TS2675: Cannot extend a class 'Fruits4'. Class constructor is marked as private.
// class Mellon extends Fruits4 {
//     constructor(name) {
//         super(name);
//     }
// }
// error TS2673: Constructor of class 'Fruits4' is private and only accessible within the class declaration.
// let fr = new Fruits4('mellon');
// 当构造函数修饰为 protected 时，该类只允许继承
var Fruits5 = /** @class */ (function () {
    function Fruits5(name) {
        this.name = name;
    }
    Fruits5.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits5;
}());
var Mellon = /** @class */ (function (_super) {
    __extends(Mellon, _super);
    function Mellon(name) {
        return _super.call(this, name) || this;
    }
    return Mellon;
}(Fruits5));
//  error TS2674: Constructor of class 'Fruits5' is protected and only accessible within the class declaration.
// let fr = new Fruits5('mellon');
// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使得代码更加简洁
var Fruits6 = /** @class */ (function () {
    // public name: string;
    // 直接在参数中使用修饰符修饰name，省去在外定义
    function Fruits6(name) {
        this.name = name;
        this.name = name;
    }
    return Fruits6;
}());
var ff6 = new Fruits6('jacks');
// jacks
console.log(ff6.name);
// readonly
// 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
var Fruits7 = /** @class */ (function () {
    function Fruits7(name, price) {
        this.name = name;
        this.price = price;
    }
    Fruits7.prototype.favourite = function () {
        return "I like " + this.name;
    };
    return Fruits7;
}());
var ff7 = new Fruits7('apple', 55);
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
var Phone = /** @class */ (function () {
    function Phone(name) {
        this.name = name;
    }
    return Phone;
}());
// 抽象类不能被实例化
// error TS2511: Cannot create an instance of an abstract class.
// let pp = new Phone('Phone');
var Vivo = /** @class */ (function (_super) {
    __extends(Vivo, _super);
    function Vivo(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    // 在子类中必须实现抽象类中的brand()方法
    Vivo.prototype.brand = function () {
        return "the brand is " + this.name;
    };
    Vivo.prototype.price = function () {
        return 3000;
    };
    return Vivo;
}(Phone));
var x9 = new Vivo('Vivo');
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
var Country = /** @class */ (function () {
    function Country(name, id, area) {
        // 定义实例属性
        this.capital = '';
        this.name = name;
        this.id = id;
        this.area = area;
    }
    Object.defineProperty(Country.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Country.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            this._id = newId;
        },
        enumerable: false,
        configurable: true
    });
    // 定义成员方法
    Country.prototype.getInfo = function () {
        return "The country is " + this._name + ", id is " + this._id + ", area is " + this.area;
    };
    // 定义静态方法
    Country.commonInfo = function () {
        return 'Every country is a part of Earth';
    };
    // 静态属性
    Country.common = 'Earth';
    return Country;
}());
var china = new Country('China', 1, 960);
console.log('静态属性', Country.common);
console.log('静态方法', Country.commonInfo());
// getter和setter方法的使用
console.log(china.id);
china.id = 0;
console.log(china.id);
// 继承
var China = /** @class */ (function (_super) {
    __extends(China, _super);
    function China(name, id, area, ranking) {
        var _this = _super.call(this, name, id, area) || this;
        _this.ranking = ranking;
        return _this;
    }
    China.prototype.getChinaArea = function () {
        return this.area;
    };
    return China;
}(Country));
var cc = new China('China', 0, 960, 1);
console.log('China\'s area is ', cc.getChinaArea());
console.log(cc.getInfo());
// 抽象类
var SuperClass = /** @class */ (function () {
    function SuperClass(name) {
        this.name = name;
    }
    return SuperClass;
}());
var SubClass = /** @class */ (function (_super) {
    __extends(SubClass, _super);
    function SubClass(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    // 抽象类中定义的方法，必须在子类中实现
    SubClass.prototype.sayHello = function () {
        console.log("hello, " + this.name);
    };
    SubClass.prototype.getInfo = function () {
        console.log("the name is " + this.name + ", age is " + this.age);
    };
    return SubClass;
}(SuperClass));
var ss = new SubClass('jack', 25);
ss.getInfo();
ss.sayHello();

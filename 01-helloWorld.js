function sayHello(person) {
    return "hello, " + person;
}
var user = 'Tom';
//user为数组类型，编译时会报错：error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'String'.
// let user = [1, 2, 3] ;
console.log(sayHello(user));

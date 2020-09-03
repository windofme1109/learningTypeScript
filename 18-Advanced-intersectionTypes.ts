/**
 *
 * 交叉类型
 * 将多个类型合并为一个类型
 */

interface Person {
  name: string;
  age: number;
}

interface Career {
  location: string;
  dept: string;
  eID: number;
}

// 使用&连接两个不同的类型
// p10就同时拥有Person和Career的属性
let p10: Person & Career = {
  name: "jack",
  age: 25,
  location: "Beijing",
  dept: "销售部",
  eID: 145789,
};

// {
//   name: 'jack',
//   age: 25,
//   location: 'Beijing',
//   dept: '销售部',
//   eID: 145789
// }
console.log(p10);

/**
 *
 * 类型转换 —— Partial
 * 将一个接口中的所有属性变为可选的
 */

interface Apple {
  name: string;
  weight: number;
  color: string;
}

type OptionalApple = Partial<Apple>;

// 经过Partial的转化，Apple中的属性现在都是可选的
const a1: OptionalApple = {
  name: "红富士",
};

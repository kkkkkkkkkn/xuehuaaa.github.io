# JavaScript 基础入门

## 简介

JavaScript 是一种轻量级的解释型编程语言，主要用于网页开发。它是现代 Web 开发的三大核心技术之一，与 HTML、CSS 并列。

## 基本语法

### 变量声明

在 JavaScript 中，有三种声明变量的方式：

```javascript
// var - 旧式变量声明（函数作用域）
var name = "张三";

// let - ES6 引入，块级作用域，推荐使用的变量声明方式
let age = 25;

// const - 声明常量，值不能被重新赋值
const PI = 3.14159;
```

### 数据类型

JavaScript 有 8 种基本数据类型：

1. **Number** - 数字类型
2. **String** - 字符串类型
3. **Boolean** - 布尔类型
4. **Null** - 空值
5. **Undefined** - 未定义
6. **Object** - 对象类型
7. **Symbol** - 符号类型（ES6）
8. **BigInt** - 大整数类型（ES2020）

### 函数

函数是 JavaScript 的一等公民：

```javascript
// 函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 箭头函数（ES6）
const add = (a, b) => a + b;

// 函数调用
console.log(greet("世界"));  // 输出: Hello, 世界!
console.log(add(2, 3));     // 输出: 5
```

## 异步编程

JavaScript 是单线程语言，通过事件循环实现异步操作。

### Promise

```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("数据加载成功！");
        }, 1000);
    });
};

fetchData().then(data => {
    console.log(data);
});
```

### Async/Await

```javascript
async function loadData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error("加载失败:", error);
    }
}
```

## 总结

JavaScript 是一门非常灵活的语言，掌握基础语法后，可以进一步学习：

- DOM 操作
- ES6+ 新特性
- 模块化开发
- 前端框架（React、Vue、Angular）
- Node.js 后端开发

> "任何可以用 JavaScript 编写的应用，最终都会用 JavaScript 编写。" — Atwood 定律

---

*最后更新: 2026年6月*

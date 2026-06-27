# 《设计模式》核心思想总结

## 书籍信息

- **书名**: Design Patterns: Elements of Reusable Object-Oriented Software
- **作者**: Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides（GoF，四人帮）
- **阅读时间**: 2026年3月 - 2026年4月

---

## 设计模式的分类

设计模式分为三大类，共 23 种：

### 1. 创建型模式（5 种）

关注对象创建的机制，增加灵活性。

| 模式 | 说明 |
|------|------|
| **单例模式** (Singleton) | 确保一个类只有一个实例 |
| **工厂方法模式** (Factory Method) | 定义创建对象的接口，让子类决定实例化哪个类 |
| **抽象工厂模式** (Abstract Factory) | 提供创建一系列相关对象的接口 |
| **建造者模式** (Builder) | 将复杂对象的构建与表示分离 |
| **原型模式** (Prototype) | 通过复制原型创建新对象 |

### 2. 结构型模式（7 种）

关注类和对象的组合。

| 模式 | 说明 |
|------|------|
| **适配器模式** (Adapter) | 将一个类的接口转换成客户端期望的另一个接口 |
| **桥接模式** (Bridge) | 将抽象与实现分离，使它们可以独立变化 |
| **组合模式** (Composite) | 将对象组合成树形结构以表示"部分-整体"的层次结构 |
| **装饰器模式** (Decorator) | 动态地给对象添加职责 |
| **外观模式** (Facade) | 为子系统提供一个统一的接口 |
| **享元模式** (Flyweight) | 运用共享技术有效地支持大量细粒度对象 |
| **代理模式** (Proxy) | 为其他对象提供一种代理以控制对这个对象的访问 |

### 3. 行为型模式（11 种）

关注对象之间的通信。

| 模式 | 说明 |
|------|------|
| **责任链模式** (Chain of Responsibility) | 将请求的处理者组成一条链 |
| **命令模式** (Command) | 将请求封装成对象 |
| **解释器模式** (Interpreter) | 给定语言，定义其文法的一种表示 |
| **迭代器模式** (Iterator) | 提供一种方法顺序访问聚合对象中的元素 |
| **中介者模式** (Mediator) | 用一个中介对象来封装一组对象的交互 |
| **备忘录模式** (Memento) | 在不破坏封装性的前提下，捕获对象的内部状态 |
| **观察者模式** (Observer) | 定义对象间的一对多依赖关系 |
| **状态模式** (State) | 允许对象在其内部状态改变时改变它的行为 |
| **策略模式** (Strategy) | 定义一系列算法，封装每个算法 |
| **模板方法模式** (Template Method) | 定义算法的骨架，将一些步骤延迟到子类 |
| **访问者模式** (Visitor) | 表示一个作用于某对象结构中的各元素的操作 |

---

## 常用模式详解

### 单例模式 (Singleton)

**场景**: 全局配置、数据库连接池、日志对象

```javascript
// JavaScript 实现（ES6+）
class Singleton {
    static instance = null;

    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.config = {};
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// 使用
const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b);  // true
```

### 观察者模式 (Observer)

**场景**: 事件监听、消息通知、React 的 useEffect

```javascript
// JavaScript 实现
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}

// 使用
const emitter = new EventEmitter();
emitter.on('data', (msg) => console.log('收到:', msg));
emitter.emit('data', 'Hello World');
```

### 策略模式 (Strategy)

**场景**: 支付方式选择、排序算法选择、表单验证

```javascript
// JavaScript 实现
class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    pay(amount) {
        return this.strategy.pay(amount);
    }
}

// 策略实现
const alipay = {
    pay(amount) {
        return `使用支付宝支付 ${amount} 元`;
    }
};

const wechatPay = {
    pay(amount) {
        return `使用微信支付 ${amount} 元`;
    }
};

// 使用
const context = new PaymentContext(alipay);
console.log(context.pay(100));  // 使用支付宝支付 100 元

context.setStrategy(wechatPay);
console.log(context.pay(200));  // 使用微信支付 200 元
```

---

## 设计原则（SOLID）

1. **S - 单一职责原则**: 一个类只负责一件事
2. **O - 开闭原则**: 对扩展开放，对修改关闭
3. **L - 里氏替换原则**: 子类必须能够替换其基类
4. **I - 接口隔离原则**: 客户端不应该依赖它不需要的接口
5. **D - 依赖倒置原则**: 依赖抽象而不是具体实现

---

## 学习心得

### 什么时候用设计模式？

- ✅ 代码出现重复时
- ✅ 需要扩展性或灵活性时
- ✅ 团队沟通需要共同语言时

### 什么时候不用？

- ❌ 为了用而用（过度设计）
- ❌ 简单问题复杂化
- ❌ 项目初期就引入大量模式

> "知道何时使用设计模式比知道如何实现设计模式更重要。"

---

*笔记整理: 2026年4月*

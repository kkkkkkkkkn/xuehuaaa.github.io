# CSS Flexbox 布局详解

## 什么是 Flexbox？

Flexbox（弹性盒子布局）是 CSS3 引入的一种新的布局模式，旨在提供更有效的方式来布置、对齐和分配容器内项目的空间，即使它们的大小是未知或动态的。

## 基本概念

```
+-----------------------------+
|         flex container      |
|  +-------+  +-------+      |
|  |  item |  |  item |      |
|  +-------+  +-------+      |
|  +-------+  +-------+      |
|  |  item |  |  item |      |
|  +-------+  +-------+      |
+-----------------------------+
```

## 启用 Flexbox

只需在容器元素上设置 `display: flex` 即可：

```css
.container {
    display: flex;
}
```

## 容器属性

### 1. flex-direction - 主轴方向

```css
.container {
    flex-direction: row;            /* 默认值，水平从左到右 */
    flex-direction: row-reverse;    /* 水平从右到左 */
    flex-direction: column;         /* 垂直从上到下 */
    flex-direction: column-reverse; /* 垂直从下到上 */
}
```

### 2. justify-content - 主轴对齐

```css
.container {
    justify-content: flex-start;    /* 默认值，起始对齐 */
    justify-content: flex-end;      /* 末尾对齐 */
    justify-content: center;        /* 居中对齐 */
    justify-content: space-between; /* 两端对齐，项目间隔相等 */
    justify-content: space-around;  /* 每个项目两侧间隔相等 */
    justify-content: space-evenly;  /* 所有间隔完全相等 */
}
```

### 3. align-items - 交叉轴对齐

```css
.container {
    align-items: flex-start;  /* 交叉轴起始对齐 */
    align-items: flex-end;    /* 交叉轴末尾对齐 */
    align-items: center;      /* 交叉轴居中对齐 */
    align-items: baseline;    /* 基线对齐 */
    align-items: stretch;     /* 默认值，拉伸填满 */
}
```

## 项目属性

### 1. flex-grow - 放大比例

```css
.item {
    flex-grow: 1;  /* 如果有剩余空间，项目会放大 */
}
```

### 2. flex-shrink - 缩小比例

```css
.item {
    flex-shrink: 1;  /* 默认值为 1，空间不足时项目会缩小 */
}
```

### 3. flex-basis - 初始大小

```css
.item {
    flex-basis: 200px;  /* 项目在分配多余空间之前占据的主轴空间 */
}
```

### 4. flex - 简写属性

```css
.item {
    flex: 1 1 200px;  /* flex-grow flex-shrink flex-basis */
    
    /* 常用简写 */
    flex: 1;           /* 等价于 flex: 1 1 0% */
    flex: auto;        /* 等价于 flex: 1 1 auto */
    flex: none;        /* 等价于 flex: 0 0 auto */
}
```

## 实战示例

### 居中布局

```css
/* 完美居中 */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 响应式导航栏

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.nav-links {
    display: flex;
    gap: 20px;
}
```

### 等高卡片布局

```css
.card-container {
    display: flex;
    gap: 20px;
}

.card {
    flex: 1;  /* 所有卡片等宽 */
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
```

## 浏览器支持

Flexbox 在现代浏览器中得到了很好的支持：

- Chrome 29+
- Firefox 28+
- Safari 9+
- Edge 12+
- IE 11（部分支持，需要前缀）

## 总结

Flexbox 非常适合：

- ✅ 一维布局（行或列）
- ✅ 居中对齐
- ✅ 等高等宽布局
- ✅ 响应式设计

> 提示：对于二维布局（同时处理行和列），可以考虑使用 CSS Grid 布局。

---

*参考文档: [MDN Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)*

# 个人博客使用指南

## 📁 项目文件结构

```
test/
├── index.html                  # 主页面（入口文件）
├── style.css                   # 样式文件
├── script.js                   # JavaScript 逻辑
├── notes-index.json            # 笔记索引文件（重要！）
├── images/                     # 图片文件夹
│   └── background.jpg          # ← 全屏背景图（你需要放入这张图片）
└── notes/                      # 笔记文件夹
    ├── tech/                   # 分类：技术
    │   ├── js-basics.md
    │   ├── css-flexbox.md
    │   └── git-commands.md
    ├── life/                   # 分类：生活
    │   ├── reading-list-2026.md
    │   └── cooking-diary.md
    └── reading/                # 分类：读书笔记
        ├── csapp-notes.md
        └── design-patterns.md
```

---

## 🚀 快速开始

### 第一步：放入背景图片

1. 准备一张风景图片（建议分辨率 ≥ 1920x1080）
2. 将图片命名为 `background.jpg`
3. 放入 `images/` 文件夹
4. 支持格式：`.jpg` `.png` `.webp` `.avif`

> **提示**: 如果使用其他文件名或格式，需要修改 `index.html` 第 24 行的 `background-image: url('images/background.jpg')`

### 第二步：预览网站

由于需要加载 `notes-index.json`，不能直接双击打开 `index.html`，需要启动本地服务器：

#### 方法 1：使用 VS Code Live Server 插件
1. 安装 Live Server 插件
2. 右键 `index.html` → "Open with Live Server"

#### 方法 2：使用 Python
```bash
# Python 3
python -m http.server 8000

# 然后访问 http://localhost:8000
```

#### 方法 3：使用 Node.js
```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server

# 然后访问 http://localhost:8080
```

---

## ✏️ 添加新笔记

### 方式 1：通过编辑 notes-index.json（推荐）

1. 在对应分类文件夹下创建新的 `.md` 文件
2. 编辑 `notes-index.json`，在对应分类的 `notes` 数组中添加新笔记：

```json
{
  "title": "你的笔记标题",
  "file": "notes/tech/your-file.md"
}
```

### 方式 2：创建新分类

在 `notes-index.json` 中添加新的分类对象：

```json
{
  "name": "新分类名称",
  "folder": "notes/new-folder",
  "notes": []
}
```

然后在 `notes/` 下创建对应的文件夹，并放入 `.md` 文件。

---

## 📝 Markdown 笔记格式说明

你的 `.md` 文件支持标准 Markdown 语法：

### 支持的语法

| 语法 | 效果 |
|------|------|
| `# 标题` | 一级标题 |
| `## 标题` | 二级标题 |
| `**粗体**` | **粗体** |
| `*斜体*` | *斜体* |
| `` `代码` `` | `行内代码` |
| ```` ``` ```` | 代码块 |
| `- 列表项` | 无序列表 |
| `1. 列表项` | 有序列表 |
| `> 引用` | 引用块 |
| `[文本](链接)` | 链接 |
| `![文本](图片)` | 图片 |

### 注意事项

1. **代码块**: 使用三个反引号包裹，可指定语言
   ````markdown
   ```javascript
   console.log("Hello World");
   ```
   ````

2. **图片路径**: 如果笔记中有图片，建议放在 `images/` 文件夹，使用相对路径引用：
   ```markdown
   ![示例图](images/example.png)
   ```

3. **链接到其他笔记**: 可以使用相对路径
   ```markdown
   [查看相关笔记](notes/tech/js-basics.md)
   ```

---

## 🌐 部署到 GitHub Pages

### 步骤

1. **创建 GitHub 仓库**
   - 登录 GitHub，点击 "New repository"
   - 仓库名建议：`username.github.io`（这是个人网站专用仓库）
   - 或者任意名称，然后开启 GitHub Pages

2. **上传文件**
   ```bash
   git init
   git add .
   git commit -m "初始化博客"
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

3. **开启 GitHub Pages**
   - 进入仓库设置（Settings）
   - 找到 "Pages" 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 和 "/ (root)"
   - 点击 Save

4. **访问网站**
   - 等待 1-2 分钟
   - 访问 `https://username.github.io`（或 `https://username.github.io/repo-name`）

---

## 🎨 自定义样式

### 修改主题颜色

编辑 `style.css` 文件开头的 `:root` 部分：

```css
:root {
    --primary-color: #3498db;    /* 主题色 */
    --primary-hover: #2980b9;    /* 悬停色 */
    --text-color: #333;          /* 文字颜色 */
    --text-light: #666;          /* 浅色文字 */
    /* ... */
}
```

### 修改个人介绍文字

编辑 `index.html` 第 24-34 行的 `.intro-card` 部分：

```html
<h1 class="intro-title">你的标题</h1>
<p class="intro-text">
    你的介绍文字...
</p>
```

---

## 🔧 常见问题

### Q1: 页面显示"加载笔记索引失败"

**原因**: `notes-index.json` 文件路径错误或格式不正确

**解决**:
1. 确保使用本地服务器预览（不要直接双击打开 html）
2. 检查 `notes-index.json` 格式是否正确（可以用 JSON 校验工具）
3. 打开浏览器开发者工具（F12）查看具体错误

### Q2: Markdown 内容显示不正确

**原因**: marked.js CDN 加载失败或 Markdown 语法错误

**解决**:
1. 检查网络连接，确保能访问 `cdn.jsdelivr.net`
2. 检查 `.md` 文件中的 Markdown 语法

### Q3: 背景图不显示

**原因**: 图片路径错误或图片不存在

**解决**:
1. 确认 `images/background.jpg` 文件存在
2. 检查文件名大小写（Linux 系统区分大小写）
3. 尝试使用浏览器开发者工具检查背景图 URL

### Q4: 新增的分类/笔记不显示

**原因**: 没有更新 `notes-index.json`

**解决**: 每次添加新分类或笔记，都必须手动更新 `notes-index.json` 文件

---

## 📚 扩展建议

### 可以添加的功能

1. **搜索功能**: 在笔记列表中添加搜索框
2. **标签系统**: 为笔记添加标签，支持按标签筛选
3. **深色模式**: 添加主题切换按钮
4. **评论系统**: 集成 Giscus 或 Disqus
5. **访问统计**: 添加不蒜子或 Google Analytics

### 性能优化

1. **图片优化**: 压缩背景图，使用 WebP 格式
2. **懒加载**: 笔记内容较多时考虑懒加载
3. **CDN 加速**: 将图片等资源放到 CDN

---

## 📄 许可

本项目由 AI 辅助生成，你可以自由修改和使用。

---

*最后更新: 2026年6月*

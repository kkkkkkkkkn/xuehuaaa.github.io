/**
 * ============================================
 * 个人博客核心 JavaScript 逻辑
 * ============================================
 * 
 * 主要功能：
 * 1. 从 notes-index.json 加载笔记索引数据
 * 2. 动态生成右上角分类导航按钮
 * 3. 点击分类显示对应笔记列表
 * 4. 点击笔记标题，使用 marked.js 加载并渲染 Markdown 内容
 * 5. 处理页面导航（首页 <-> 列表 <-> 笔记内容）
 */

// ============================================
// 全局变量
// ============================================
let notesData = null;  // 存储从 notes-index.json 加载的数据

// ============================================
// DOM 元素引用
// ============================================
const categoryNav = document.getElementById('categoryNav');
const introSection = document.getElementById('introSection');
const notesListSection = document.getElementById('notesListSection');
const noteContentSection = document.getElementById('noteContentSection');
const categoryTitle = document.getElementById('categoryTitle');
const notesList = document.getElementById('notesList');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const backBtn = document.getElementById('backBtn');
const backToListBtn = document.getElementById('backToListBtn');

// ============================================
// 初始化函数 - 页面加载时执行
// ============================================
async function init() {
    console.log('正在初始化博客...');
    
    try {
        // 加载笔记索引文件（notes-index.json）
        // 这个文件包含了所有分类和笔记的映射关系
        const response = await fetch('notes-index.json');
        
        if (!response.ok) {
            throw new Error(`无法加载 notes-index.json (状态码: ${response.status})`);
        }
        
        notesData = await response.json();
        console.log('笔记索引加载成功:', notesData);
        
        // 动态生成分类导航按钮
        generateCategoryNav();
        
    } catch (error) {
        console.error('初始化失败:', error);
        alert('加载笔记索引失败，请确保 notes-index.json 文件存在且格式正确。\n\n错误详情: ' + error.message);
    }
}

// ============================================
// 生成分类导航按钮
// ============================================
function generateCategoryNav() {
    /**
     * 从 notesData.categories 读取所有分类
     * 为每个分类创建一个导航按钮
     * 追加到 #categoryNav 元素中
     */
    
    if (!notesData || !notesData.categories) {
        console.warn('没有找到分类数据');
        return;
    }

    // 遍历所有分类，生成导航按钮
    notesData.categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = category.name;
        btn.dataset.category = category.folder;  // 存储分类文件夹路径
        
        // 点击分类按钮时，显示该分类下的笔记列表
        btn.addEventListener('click', () => {
            showNotesList(category);
            
            // 更新按钮激活状态
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        
        categoryNav.appendChild(btn);
    });

    console.log(`已生成 ${notesData.categories.length} 个分类导航按钮`);
}

// ============================================
// 显示指定分类的笔记列表
// ============================================
function showNotesList(category) {
    /**
     * @param {Object} category - 分类对象，包含 name, folder, notes 属性
     */
    
    // 隐藏首页介绍，显示笔记列表区域
    introSection.style.display = 'none';
    notesListSection.style.display = 'block';
    noteContentSection.style.display = 'none';
    
    // 设置分类标题
    categoryTitle.textContent = category.name;
    
    // 清空现有列表
    notesList.innerHTML = '';
    
    // 遍历该分类下的所有笔记，生成列表项
    if (category.notes && category.notes.length > 0) {
        category.notes.forEach(note => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'note-link';
            link.textContent = note.title;
            
            // 点击笔记标题时，加载并显示该笔记内容
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadNoteContent(note);
            });
            
            li.appendChild(link);
            notesList.appendChild(li);
        });
    } else {
        // 如果分类下没有笔记
        const li = document.createElement('li');
        li.textContent = '该分类下暂无笔记';
        li.style.color = '#999';
        li.style.textAlign = 'center';
        li.style.padding = '30px';
        notesList.appendChild(li);
    }

    console.log(`显示分类 "${category.name}" 的笔记列表，共 ${category.notes.length} 篇笔记`);
}

// ============================================
// 加载并渲染 Markdown 笔记内容
// ============================================
async function loadNoteContent(note) {
    /**
     * @param {Object} note - 笔记对象，包含 title 和 file 属性
     * 
     * 功能流程：
     * 1. 使用 fetch 加载 .md 文件
     * 2. 使用 marked.js 将 Markdown 转换为 HTML
     * 3. 将转换后的 HTML 插入到页面中显示
     */
    
    console.log(`正在加载笔记: ${note.title} (${note.file})`);
    
    // 隐藏其他区域，显示笔记内容区域
    introSection.style.display = 'none';
    notesListSection.style.display = 'none';
    noteContentSection.style.display = 'block';
    
    // 设置笔记标题
    noteTitle.textContent = note.title;
    
    // 显示加载提示
    noteBody.innerHTML = '<p style="text-align: center; color: #999;">正在加载内容...</p>';
    
    try {
        // 使用 fetch 加载 Markdown 文件
        // note.file 是相对于网站根目录的路径，例如 "notes/tech/js-basics.md"
        const response = await fetch(note.file);
        
        if (!response.ok) {
            throw new Error(`无法加载文件 (状态码: ${response.status})`);
        }
        
        const markdownText = await response.text();
        console.log('Markdown 文件加载成功，内容长度:', markdownText.length);
        
        // ============================================
        // 使用 marked.js 将 Markdown 转换为 HTML
        // ============================================
        // marked.parse() 方法会将 Markdown 文本转换为 HTML 字符串
        // 转换后的 HTML 会保留所有 Markdown 格式（标题、列表、代码块等）
        const htmlContent = marked.parse(markdownText);
        
        // 将转换后的 HTML 插入到页面中
        noteBody.innerHTML = htmlContent;
        
        console.log('Markdown 渲染完成');
        
    } catch (error) {
        console.error('加载笔记内容失败:', error);
        noteBody.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c;">
                <h3>加载失败</h3>
                <p>无法加载笔记文件: ${note.file}</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #999;">
                    请确保该文件存在于项目中，且 notes-index.json 中的路径正确。
                </p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #999;">
                    错误详情: ${error.message}
                </p>
            </div>
        `;
    }
}

// ============================================
// 页面加载完成后初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // ============================================
    // "首页" 按钮点击事件 - 显示首页介绍
    // ============================================
    const homeBtn = document.querySelector('.nav-btn[data-category="all"]');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            showHomePage();
        });
    }
    
    // ============================================
    // 返回首页
    // ============================================
    backBtn.addEventListener('click', () => {
        showHomePage();
    });

    // ============================================
    // 从笔记内容返回笔记列表
    // ============================================
    backToListBtn.addEventListener('click', () => {
        // 找到当前激活的分类按钮，模拟点击以返回该分类的列表
        const activeBtn = document.querySelector('.nav-btn.active');
        if (activeBtn && activeBtn.dataset.category !== 'all') {
            // 找到对应的分类数据
            const category = notesData.categories.find(c => c.folder === activeBtn.dataset.category);
            if (category) {
                showNotesList(category);
            }
        } else {
            // 如果无法确定当前分类，返回首页
            showHomePage();
        }
    });
});

// ============================================
// 显示首页的函数（复用）
// ============================================
function showHomePage() {
    introSection.style.display = 'flex';
    notesListSection.style.display = 'none';
    noteContentSection.style.display = 'none';
    
    // 重置导航按钮状态
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.nav-btn[data-category="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
    }
}

// ============================================
// 额外功能：配置 marked.js（可选）
// ============================================
// 如果需要自定义 marked 的渲染行为，可以在这里配置
marked.setOptions({
    breaks: true,      // 将换行符转换为 <br>
    gfm: true,         // 启用 GitHub 风格的 Markdown
    headerIds: true,   // 为标题生成 ID（用于锚点链接）
    mangle: false      // 不对标题 ID 进行转义
});

// ============================================
// 点击冒星星特效
// ============================================
document.addEventListener('click', function(e) {
    // 不处理导航按钮上的点击
    if (e.target.closest('.nav-btn') || e.target.closest('.back-btn')) return;
    
    const x = e.clientX;
    const y = e.clientY;
    const count = 10 + Math.floor(Math.random() * 8); // 10~17 颗星星
    
    // 星星颜色池
    const colors = ['#FFD700', '#FF6B6B', '#51CF66', '#339AF0', '#FCC419', '#CC5DE8', '#FF922B', '#20C997'];
    
    for (let i = 0; i < count; i++) {
        createStar(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }
});

function createStar(x, y, color) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: ${color};
        font-size: ${14 + Math.random() * 18}px;
        pointer-events: none;
        z-index: 9999;
        user-select: none;
    `;
    document.body.appendChild(star);

    // 随机运动参数
    const angle = Math.random() * Math.PI * 2;         // 随机方向
    const distance = 40 + Math.random() * 80;           // 飞行距离
    const duration = 600 + Math.random() * 400;         // 动画时长 600~1000ms
    const startTime = performance.now();
    const startX = x;
    const startY = y;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance - 30; // 稍微向上偏移
    
    // 初始旋转角度
    let rotation = 0;
    const spinSpeed = (Math.random() - 0.5) * 720; // -360° 到 +360°/秒

    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic 缓动
        const ease = 1 - Math.pow(1 - progress, 3);
        
        // 位置插值
        const cx = startX + (endX - startX) * ease;
        const cy = startY + (endY - startY) * ease;
        
        // 缩放：从小到大再缩小
        const scale = progress < 0.2 
            ? progress / 0.2                              // 0~0.2s 放大
            : 1 - (progress - 0.2) / 0.8;                 // 0.2~1s 缩小
        
        // 透明度：渐隐
        const opacity = progress < 0.7 
            ? 1 
            : 1 - (progress - 0.7) / 0.3;
        
        // 旋转
        rotation += spinSpeed * (16 / 1000);
        
        star.style.transform = `translate(${cx - x}px, ${cy - y}px) rotate(${rotation}deg) scale(${scale})`;
        star.style.opacity = opacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            star.remove();
        }
    }

    requestAnimationFrame(animate);
}

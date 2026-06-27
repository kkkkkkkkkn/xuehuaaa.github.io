# Git 常用命令速查表

## 配置相关

```bash
# 查看配置信息
git config --list

# 设置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 设置默认编辑器
git config --global core.editor "code --wait"
```

## 仓库初始化

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone https://github.com/username/repo.git

# 克隆到指定目录
git clone <url> <directory>
```

## 基本操作

```bash
# 查看仓库状态
git status

# 添加文件到暂存区
git add <file>          # 添加指定文件
git add .               # 添加所有文件
git add *.js            # 添加所有 js 文件

# 提交变更
git commit -m "提交信息"
git commit -am "提交信息"  # 自动暂存已跟踪的文件并提交

# 查看提交历史
git log
git log --oneline       # 简洁模式
git log --graph         # 图形化显示
```

## 分支管理

```bash
# 查看分支
git branch              # 列出本地分支
git branch -a           # 列出所有分支（包括远程）

# 创建分支
git branch <branch-name>

# 切换分支
git checkout <branch-name>
git switch <branch-name>  # Git 2.23+

# 创建并切换分支
git checkout -b <branch-name>
git switch -c <branch-name>

# 合并分支
git merge <branch-name>

# 删除分支
git branch -d <branch-name>   # 删除已合并的分支
git branch -D <branch-name>   # 强制删除分支
```

## 远程仓库

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <url>

# 推送到远程仓库
git push origin <branch-name>
git push -u origin <branch-name>  # 设置上游分支

# 拉取远程更新
git pull origin <branch-name>

# 获取远程更新（不自动合并）
git fetch origin
```

## 撤销操作

```bash
# 撤销工作区的修改
git restore <file>
git checkout -- <file>

# 撤销暂存区的文件
git restore --staged <file>
git reset HEAD <file>

# 修改最后一次提交
git commit --amend

# 回退到指定提交
git reset --soft <commit>   # 保留工作区和暂存区
git reset --mixed <commit>  # 保留工作区，清空暂存区（默认）
git reset --hard <commit>   # 清空工作区和暂存区
```

## 暂存操作

```bash
# 暂存当前修改
git stash

# 查看暂存列表
git stash list

# 恢复暂存的修改
git stash apply         # 恢复但不删除暂存
git stash pop           # 恢复并删除暂存

# 删除暂存
git stash drop
```

## 标签管理

```bash
# 查看标签
git tag

# 创建标签
git tag v1.0.0                      # 轻量标签
git tag -a v1.0.0 -m "版本 1.0.0"   # 注解标签

# 推送标签
git push origin <tag-name>
git push origin --tags               # 推送所有标签
```

## .gitignore 示例

```
# 依赖
node_modules/
vendor/

# 编译输出
dist/
build/
*.o
*.exe

# 日志
*.log
logs/

# 环境变量
.env
.<env>

# IDE
.vscode/
.idea/
*.swp

# 系统文件
.DS_Store
Thumbs.db
```

## 常用别名配置

```bash
# 配置别名（输入更简洁的命令）
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# 使用
git co <branch>    # 代替 git checkout
git br             # 代替 git branch
```

## 最佳实践

1. **提交信息规范**：使用约定式提交（Conventional Commits）
   - `feat`: 新功能
   - `fix`: 修复 bug
   - `docs`: 文档更新
   - `style`: 代码格式（不影响功能）
   - `refactor`: 重构
   - `test`: 测试相关

2. **分支策略**：
   - `main/master`: 生产环境分支
   - `develop`: 开发分支
   - `feature/*`: 功能分支
   - `hotfix/*`: 紧急修复分支

3. **提交频率**：小步快跑，频繁提交

---

*Tip: 使用 `git help <command>` 查看命令详细帮助*

# Claude Site Panel

基于 Claude 主题风格构建的单页站点管理面板原型。

当前项目是纯前端实现，主要用于站点基础信息维护、本地缓存管理、JSON 导入导出，以及中英文界面切换。不依赖后端数据库，也不包含真实鉴权服务。

## 项目特性

- 本地登录演示
- 单页 `Settings` 管理面板
- 网站基础信息编辑
- `localStorage` 持久化
- JSON 导入 / 导出
- 中文 / English 切换
- Claude 风格的编辑式视觉主题

## 功能说明

### 登录

- 支持用户名和密码校验
- 登录成功后进入管理面板
- 登录状态持久化，刷新页面后保持登录
- 支持退出登录

演示账号：

- Username: `admin`
- Password: `admin123`

### 网站信息管理

登录后进入单页 `Settings` 页面，可维护以下字段：

- 网站名称
- 备案号
- 网站简介
- 网站地址
- 联系邮箱
- Logo 地址
- 关键词
- 版权信息

### 本地缓存

项目使用浏览器 `localStorage` 保存以下内容：

- 登录状态
- 当前语言
- 网站信息配置

### JSON 导入导出

- 支持导出当前配置为本地 JSON 文件
- 支持从本地 JSON 文件导入配置
- 导入后会覆盖当前表单内容，并同步写入本地缓存

### 语言切换

- 支持中文 / English 切换
- 登录页和管理面板共用同一套语言状态
- 当前语言会持久化保存

## 设计文档

设计来源与视觉约束已整理在以下位置：

- Stitch 项目：<https://stitch.withgoogle.com/projects/9796813459823625225>
- Claude 设计指令：[docs/design.md](docs/design.md)

建议在继续调整 UI 前，先阅读 `docs/design.md`，确保颜色、字体、层级和组件气质保持在当前主题体系内。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- lucide-react

## 目录结构

```text
src/
  App.tsx                         应用入口与状态编排
  main.tsx                        挂载入口
  index.css                       全局主题样式
  login.tsx                       登录页
  login.css                       登录页样式
  global.d.ts                     全局声明
  components/
    Sidebar.tsx                   单页侧边栏
    TopBar.tsx                    顶部栏
    BottomBar.tsx                 底部操作栏
    SettingsForm.tsx              网站信息表单
    LanguageSwitcher.tsx          语言切换组件
docs/
  design.md                       Claude 设计指令与视觉规范
```

## 启动方式

安装依赖：

```bash
npm install
```

或：

```bash
pnpm install
```

启动开发环境：

```bash
npm run dev
```

或：

```bash
pnpm dev
```

默认访问地址：

```text
http://localhost:3000
```

## 构建

```bash
npm run build
```

## 项目说明

- 当前项目为前端原型，登录逻辑仅用于本地演示
- 所有数据仅保存在当前浏览器本地
- 清除浏览器缓存后，登录状态和站点配置会一并丢失
- 当前不包含云端备份功能

## 后续可扩展方向

- 接入真实登录接口
- 接入云端 JSON 备份
- 增加表单校验与错误提示
- 增加多用户配置隔离
- 增加站点预览页或公开展示页

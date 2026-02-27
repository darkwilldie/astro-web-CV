# My Resume Astro

基于 Astro 构建的个人简历网站，包含项目经历、技能与奖项、多语言切换、深色模式和联系方式页面。

## 项目内容

- 首页（`/`）
  - 个人简介（Summary）
  - 教育背景
  - 项目经历（含项目截图）
  - 技能与奖项
  - 兴趣爱好与联系方式入口
- 联系页（`/contact`）
  - 电话和邮箱信息
- 交互能力
  - 三语言切换（EN / CN / JP）
  - 深色模式切换
  - 项目图片点击放大

## 技术栈

- `Astro 5`
- `Bootstrap 5`
- `@fontsource`（本地字体）
- `astro:assets` + `sharp`（图片优化）
- `@vercel/analytics`、`@vercel/speed-insights`

## 已做性能优化

- 去除 `jQuery` 依赖，改为原生 DOM 实现交互逻辑（减少第三方 JS 依赖）。
- 移除未使用的 `bootstrap-icons` 外链。
- 将 Bootstrap CSS/JS 与字体从外部 CDN 改为本地依赖打包：
  - 不再依赖 `jsdelivr` / `fonts.googleapis` / `fonts.gstatic` / `ajax.googleapis`。
- 字体按实际使用收敛到必要权重（减少字体传输量）。
- 仅在需要头部导航的页面加载 `bootstrap.js` 与 `index.js`（避免联系页加载无用脚本）。
- 页面图片通过 `astro:assets` 构建为优化资源（如 WebP），并带懒加载属性。

## 目录说明

```text
.
├── public/
│   ├── assets/translation/translation.json
│   ├── index.js
│   └── style.css
├── src/
│   ├── assets/images/
│   ├── layouts/Layout.astro
│   ├── pages/index.astro
│   ├── pages/contact.astro
│   ├── scripts/bootstrap.js
│   └── styles/vendor.css
└── package.json
```

## 本地运行

```bash
npm install
npm run dev
```

常用命令：

- `npm run dev`：启动开发服务器
- `npm run build`：构建到 `dist/`
- `npm run preview`：本地预览构建产物

## 部署（简要）

### 方案一：Vercel（推荐）

1. 将仓库推送到 GitHub / GitLab / Bitbucket。
2. 在 Vercel 导入项目。
3. 构建配置使用：
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 Deploy 完成发布。

### 方案二：任意静态托管

1. 本地执行 `npm run build`。
2. 将 `dist/` 目录上传到静态托管平台（如 Netlify、Cloudflare Pages、GitHub Pages 等）。

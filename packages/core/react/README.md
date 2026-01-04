# HeroUiMobile

基于 [HeroUI](https://github.com/heroui-inc/heroui) V2 扩展的适用于手机端的组件库，Monorepo 架构（pnpm workspace + Turbo）。
使用 [Storybook](https://storybook.js.org/) 管理扩展组件，使用 [Shadcn CLI](https://github.com/shadcn/cli) 注册、安装组件示例。

## 使用 Plop 生成器创建新组件、Hook、工具包，组件名称小写，使用连字符，如 `my-component`

```bash
pnpm create:cmp
pnpm create:hook
pnpm create:pkg
```

## 安装依赖、启动开发环境、启动文档站点

```bash
pnpm install
pnpm dev
pnpm dev:docs
```

## 启动特定组件的开发模式（监听文件变化）

```bash
cd packages/components/your-component
pnpm dev
```

## 其他开发命令: 类型检查、代码检查、代码修复、运行测试、格式化代码

```bash
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm test
pnpm format:write
```

## 构建打包: 完整构建（包含类型定义）、快速构建（不包含类型定义，开发时使用）

```bash
pnpm build
pnpm build:fast
```

## 构建特定包

```bash
# 使用 turbo 过滤
pnpm --filter @heroui-mobile/button build

# 或进入组件目录
cd packages/components/your-component
pnpm build
```

## 构建文档

```bash
pnpm build:docs
```

## 构建注册表

```bash
pnpm build:registry
```

## 构建 Storybook

```bash
pnpm build:sb
```

## 发布到 npm: 登录 npm、创建变更集、提交变更、更新版本号、构建项目、发布到 npm、推送代码和标签

```bash
npm login
pnpm changeset
git add .
git commit -m "feat: 添加新组件"
pnpm version
pnpm build
pnpm release
git push
git push --tags
```

## 手动发布单个包

```bash
cd packages/components/your-component
pnpm build
npm publish
```

## 相关资源

- [HeroUI 文档](https://heroui.com/docs)
- [Changesets 文档](https://github.com/changesets/changesets)
- [Turbo 文档](https://turbo.build/repo/docs)
- [pnpm 文档](https://pnpm.io/)

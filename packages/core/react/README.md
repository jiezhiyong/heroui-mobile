# HeroUI Mobile

基于 [HeroUI](https://github.com/heroui-inc/heroui) V2 扩展的适用于手机端的组件库

## 使用 Plop 生成器创建新组件、Hook、工具包，组件名称小写，使用连字符，如 `my-component`

```bash
pnpm create:cmp
pnpm create:hook
pnpm create:pkg
```

## 将新组件添加到主包

编辑 `packages/core/react/package.json`，在 `dependencies` 中添加：

```json
{
  "dependencies": {
    "@heroui-mobile/your-component": "workspace:*"
  }
}
```

编辑 `packages/core/react/src/index.ts`，添加导出：

```typescript
export * from "@heroui-mobile/your-component";
```

## 开发环境启动

### 前置要求

- Node.js >= 22.x
- pnpm >= 10.x

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev

# 启动文档站点
pnpm dev:docs

# 启动特定组件的开发模式（监听文件变化）
cd packages/components/your-component
pnpm dev
```

### 其他开发命令

```bash
# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
pnpm lint:fix

# 运行测试
pnpm test

# 格式化代码
pnpm format:write
```

## 构建打包

### 构建所有包

```bash
# 完整构建（包含类型定义）
pnpm build

# 快速构建（不包含类型定义，开发时使用）
pnpm build:fast
```

### 构建特定包

```bash
# 使用 turbo 过滤
pnpm --filter @heroui-mobile/button build

# 或进入组件目录
cd packages/components/your-component
pnpm build
```

### 构建文档

```bash
# 构建文档站点
pnpm build:docs
```

### 构建 Storybook

```bash
pnpm build:sb
```

## 发布到 npm

### 1. 配置 npm 发布

确保你的组件包 `package.json` 中有正确的发布配置：

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

### 2. 登录 npm

```bash
npm login
```

### 3. 使用 Changesets 管理版本

项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本和发布。

```bash
# 创建变更集（描述你的更改）
pnpm changeset

# 提交变更
git add .
git commit -m "feat: 添加新组件"

# 更新版本号（基于变更集）
pnpm version

# 构建项目
pnpm build

# 发布到 npm
pnpm release

# 推送代码和标签
git push
git push --tags
```

### 4. 手动发布单个包

如果需要单独发布某个组件：

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

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
# 启动 Storybook（组件开发预览）
pnpm sb
# 或
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

#### 创建变更集

```bash
# 创建变更集（描述你的更改）
pnpm changeset:canary
```
在heroui的基础上，扩展自己的包
#### 版本管理

```bash
# 更新版本号（基于变更集）
pnpm version:canary
```

#### 发布

```bash
# 发布到 npm
pnpm release:canary
```

### 4. 发布流程示例

```bash
# 1. 创建变更集
pnpm changeset:canary

# 2. 提交变更
git add .
git commit -m "feat: 添加新组件"

# 3. 更新版本号
pnpm version:canary

# 4. 构建项目
pnpm build

# 5. 发布到 npm
pnpm release:canary

# 6. 推送代码和标签
git push
git push --tags
```

### 5. 手动发布单个包

如果需要单独发布某个组件：

```bash
cd packages/components/your-component
pnpm build
npm publish
```

## 常见问题

### Q: 构建失败怎么办？

A:
1. 清理缓存：`pnpm clean`
2. 重新安装依赖：`pnpm install`
3. 检查 TypeScript 错误：`pnpm typecheck`

### Q: 如何保持与上游同步？

A:
```bash
# 添加上游仓库
git remote add upstream https://github.com/heroui-inc/heroui.git

# 拉取上游更新
git fetch upstream

# 合并上游变更
git merge upstream/canary
```

## 相关资源

- [HeroUI 文档](https://heroui.com/docs)
- [Changesets 文档](https://github.com/changesets/changesets)
- [Turbo 文档](https://turbo.build/repo/docs)
- [pnpm 文档](https://pnpm.io/)

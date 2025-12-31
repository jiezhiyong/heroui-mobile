# Storybook & Shadcn CLI Registry

use the `shadcn` CLI to run your own component registry. allows you to distribute your custom components, hooks, pages, and
other files to any React project.

## Usage

```json
{
  "registries": {
    "@heroui-mobile": "https://main--69549dc20eb3fc63d6bc3d0e.chromatic.com/r/{name}.json"
  }
}
```

```sh
pnpm dlx shadcn@latest search @heroui-mobile
pnpm dlx shadcn@latest add @heroui-mobile/example-fruits
```

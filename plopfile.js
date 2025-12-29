/**
 * Part of this code is taken from @chakra-ui/react package ❤️
 */

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

/**
 * 幂等追加一行（自动补齐末尾换行）
 * @param {string} content
 * @param {string} line
 */
const ensureLine = (content, line) => {
  const normalized = content.endsWith("\n") ? content : `${content}\n`;

  // 兼容不同换行风格/末尾空行
  if (normalized.includes(`${line}\n`) || normalized.trimEnd().endsWith(line)) {
    return normalized;
  }

  return `${normalized}${line}\n`;
};

const workspaces = ["components", "core", "hooks", "utilities"];
const generators = ["component", "package", "hook"];

const defaultOutDirs = {
  component: "components",
  hook: "hooks",
  package: "utilities",
};

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
  plop.setHelper("capitalize", (text) => {
    return capitalize(camelCase(text));
  });
  plop.setHelper("camelCase", (text) => {
    return camelCase(text);
  });

  // 用于在 hbs 模板中输出 JSX 花括号，避免与 Handlebars 语法冲突
  plop.setHelper("lbrace", () => "{");
  plop.setHelper("rbrace", () => "}");

  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: "input",
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,

          validate: (value) => {
            if (!value) {
              return `${gen} name is required`;
            }

            // check is has a valid hook name "use-something"
            if (gen === "hook" && !value.startsWith("use-")) {
              return "Hook name must start with 'use-'";
            }

            // check is case is correct
            if (value !== value.toLowerCase()) {
              return `${gen} name must be in lowercase`;
            }

            // cannot have spaces
            if (value.includes(" ")) {
              return `${gen} name cannot have spaces`;
            }

            return true;
          },
        },
        {
          type: "input",
          name: "description",
          message: `The description of this ${gen}:`,
        },
        {
          type: "list",
          name: "outDir",
          message: `where should this ${gen} live?`,
          default: defaultOutDirs[gen],
          choices: workspaces,
          validate: (value) => {
            if (!value) {
              return `outDir is required`;
            }

            return true;
          },
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        const { description, outDir } = answers;
        const generatorName = answers[`${gen}Name`] ?? "";

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir,
        };

        actions.push({
          type: "addMany",
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        // 如果是组件，额外创建 theme 文件并更新导出
        // 注意：仅对 packages/components 下的组件做 core 聚合导出/依赖更新，避免误改其它 workspace
        if (gen === "component" && outDir === "components") {
          // 创建 theme 文件
          actions.push({
            type: "add",
            path: "packages/core/theme/src/components/{{componentName}}.ts",
            templateFile: "plop/theme/index.ts.hbs",
            data,
            abortOnFail: true,
            skipIfExists: true,
          });

          // 在 theme/src/components/index.ts 中幂等追加导出
          actions.push({
            type: "modify",
            path: "packages/core/theme/src/components/index.ts",
            transform: (fileContent, actionData) => {
              const name = actionData?.componentName;
              const exportLine = `export * from "./${name}";`;

              return ensureLine(fileContent, exportLine);
            },
          });

          // 在 react/src/index.ts 中幂等追加导出
          actions.push({
            type: "modify",
            path: "packages/core/react/src/index.ts",
            transform: (fileContent, actionData) => {
              const name = actionData?.componentName;
              const exportLine = `export * from "@heroui-mobile/${name}";`;

              return ensureLine(fileContent, exportLine);
            },
          });

          // 在 react/package.json 的 dependencies 中幂等追加依赖
          actions.push({
            type: "modify",
            path: "packages/core/react/package.json",
            transform: (fileContent, actionData) => {
              const name = actionData?.componentName;
              const depName = `@heroui-mobile/${name}`;

              /** @type {any} */
              const json = JSON.parse(fileContent);

              json.dependencies ??= {};
              json.dependencies[depName] ??= "workspace:*";

              return `${JSON.stringify(json, null, 2)}\n`;
            },
          });
        }

        return actions;
      },
    });
  });
};

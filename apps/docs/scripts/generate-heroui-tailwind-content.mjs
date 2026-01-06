import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

function parseArgs(argv) {
  const scan = [
    "./content",
    "./components",
    "./app",
  ];
  let out = ".heroui.tailwind-components.json";

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--scan") {
      const v = argv[i + 1];
      if (!v) throw new Error("缺少 --scan 参数值");
      scan.push(v);
      i++;
      continue;
    }
    if (a === "--out") {
      const v = argv[i + 1];
      if (!v) throw new Error("缺少 --out 参数值");
      out = v;
      i++;
      continue;
    }
  }

  return { scan: scan.length ? scan : ["src"], out };
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "dist") continue;
      results.push(...(await walkFiles(p)));
      continue;
    }
    results.push(p);
  }
  return results;
}

function extractHerouiImports(sourceText) {
  // 支持多行：import { A, B as C } from "@heroui/react"
  return extractPackageImports(sourceText, "@heroui/react");
}

function extractHerouiMobileImports(sourceText) {
  // 支持多行：import { A, B as C } from "@heroui-mobile/react"
  return extractPackageImports(sourceText, "@heroui-mobile/react");
}

function extractPackageImports(sourceText, pkgName) {
  const results = new Set();
  // 注意：这里不能用 [\\s\\S]*?（会允许跨越其他 import 的 '}'，导致把别的包的命名导入误判成目标包导入）
  // 用 [^}]* 可以保证只匹配到“当前 import 语句”的第一个 '}' 为止（支持换行），避免跨语句误匹配。
  const re =
    new RegExp(
      `import\\s*\\{([^}]*)\\}\\s*from\\s*["']${pkgName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
      'gm'
    );
  let m;
  while ((m = re.exec(sourceText))) {
    const inside = m[1] ?? "";
    for (const rawPart of inside.split(",")) {
      const part = rawPart.trim();
      if (!part) continue;
      // 处理：Foo as Bar
      const name = part.split(/\s+as\s+/)[0]?.trim();
      if (!name) continue;
      // 过滤类型/工具导出（简单规则，避免把 SwitchProps 这类误判成组件）
      if (/Props$/.test(name)) continue;
      if (/Variants$/.test(name)) continue;
      if (/Classes$/.test(name)) continue;
      if (/ClassNames$/.test(name)) continue;
      if (/^use[A-Z]/.test(name)) continue;
      results.add(name);
    }
  }
  return results;
}

function pascalFromLowerCamel(name) {
  // e.g. dateRangePicker -> DateRangePicker, scrollShadow -> ScrollShadow
  const spaced = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function stemToPascal(stem) {
  // e.g. date-picker -> DatePicker, input-otp -> InputOtp
  return stem
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function parseExportedNamesFromThemeFile(text) {
  // 匹配：export { a, b as c };
  const m = text.match(/export\s*\{([\s\S]*?)\};/m);
  if (!m) return [];

  const inside = m[1] ?? "";
  const parts = inside
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const exported = [];
  for (const p of parts) {
    const seg = p.replace(/\s+/g, " ").trim();
    const as = seg.split(/\s+as\s+/);
    const name = (as[1] ?? as[0])?.trim();
    if (name) exported.push(name);
  }
  return exported;
}

async function buildThemeExportToStemMap(themeComponentsDir) {
  // 产出：React 组件名（PascalCase） -> theme 组件 stem（kebab-case）
  const mapping = new Map();
  const stems = new Set();

  const entries = await fs.readdir(themeComponentsDir, { withFileTypes: true });
  const mjsFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".mjs"))
    .map((e) => e.name)
    .filter((name) => name !== "index.mjs");

  for (const filename of mjsFiles) {
    const stem = filename.replace(/\.mjs$/, "");
    stems.add(stem);

    const full = path.join(themeComponentsDir, filename);
    const text = await fs.readFile(full, "utf-8");
    const exportedLowerCamel = parseExportedNamesFromThemeFile(text);

    // 以导出名作为最可靠映射来源：dateRangePicker -> date-picker
    for (const exp of exportedLowerCamel) {
      const pascal = pascalFromLowerCamel(exp);
      mapping.set(pascal, stem);
    }
  }

  // 兜底：stem 本身也作为家族前缀（NavbarBrand -> navbar）
  const familyTriggers = Array.from(stems)
    .map((s) => ({ trigger: stemToPascal(s), stem: s }))
    .sort((a, b) => b.trigger.length - a.trigger.length);

  // 少数 HeroUI v2 组件名与 theme stem 不一致：Switch -> toggle
  mapping.set("Switch", "toggle");

  return { mapping, familyTriggers, availableStems: stems };
}

function resolveUsedStems(importedNames, mapping, familyTriggers) {
  const used = new Set();

  for (const name of importedNames) {
    const direct = mapping.get(name);
    if (direct) {
      used.add(direct);

      // 特殊处理：DatePicker, DateRangePicker 都使用 calendar
      if (['DatePicker', 'DateRangePicker'].includes(name)) {
        used.add('calendar');
      }

      continue;
    }

    // 前缀匹配（取最长）：NavbarBrand -> Navbar -> navbar
    const hit = familyTriggers.find((f) => name.startsWith(f.trigger));
    if (hit) used.add(hit.stem);
  }

  return Array.from(used).sort();
}

async function main() {
  const { scan, out } = parseArgs(process.argv.slice(2));

  const importedNamesHeroui = new Set();
  const importedNamesHerouiMobile = new Set();
  for (const p of scan) {
    const abs = path.isAbsolute(p) ? p : path.join(projectRoot, p);
    if (!(await fileExists(abs))) continue;

    const files = (await walkFiles(abs)).filter((f) =>
      /\.(ts|tsx|js|jsx|mdx)$/.test(f),
    );

    for (const f of files) {
      const text = await fs.readFile(f, "utf-8");
      for (const n of extractHerouiImports(text)) importedNamesHeroui.add(n);
      for (const n of extractHerouiMobileImports(text))
        importedNamesHerouiMobile.add(n);
    }
  }

  const patterns = [];

  async function pushThemePatternIfUsed({
    reactPkg,
    importedNames,
    themePkg,
  }) {
    if (importedNames.size === 0) return;

    const themeComponentsDir = path.join(
      projectRoot,
      "node_modules",
      themePkg,
      "dist/components",
    );

    if (!(await fileExists(themeComponentsDir))) {
      console.warn(
        `[heroui] 检测到使用了 ${reactPkg}，但未安装 ${themePkg}（缺少 node_modules/${themePkg}/dist/components），将不生成对应 content`,
      );
      return;
    }

    const { mapping, familyTriggers } =
      await buildThemeExportToStemMap(themeComponentsDir);

    const stems = resolveUsedStems(importedNames, mapping, familyTriggers);
    const pattern =
      stems.length > 0
        ? `./node_modules/${themePkg}/dist/components/(${stems.join(
          "|",
        )}).{js,ts,jsx,tsx}`
        : `./node_modules/${themePkg}/dist/components/**/*.{js,ts,jsx,tsx}`;

    patterns.push(pattern);
  }

  await pushThemePatternIfUsed({
    reactPkg: "@heroui/react",
    importedNames: importedNamesHeroui,
    themePkg: "@heroui/theme",
  });
  await pushThemePatternIfUsed({
    reactPkg: "@heroui-mobile/react",
    importedNames: importedNamesHerouiMobile,
    themePkg: "@heroui-mobile/theme",
  });

  const outAbs = path.isAbsolute(out) ? out : path.join(projectRoot, out);
  const payload = {
    patterns,
    generatedAt: new Date().toISOString(),
    scan,
    note:
      "该文件由 scripts/generate-heroui-tailwind-content.mjs 自动生成，用于 HeroUI v2 + Tailwind content 精确收集（按导入生成 patterns）。",
  };

  await fs.writeFile(outAbs, JSON.stringify(payload, null, 2) + "\n", "utf-8");

  console.log(`[heroui] 已生成 ${patterns.length > 0 ? patterns.length : 0} patterns: ${outAbs}`);
}

main().catch((err) => {
  console.error("[heroui] 生成失败：", err?.message ?? err);
  process.exit(1);
});

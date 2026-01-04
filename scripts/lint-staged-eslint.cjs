/* eslint-disable no-console */
/**
 * Lint-staged ESLint runner that avoids glob expansion issues.
 *
 * ESLint v9 treats CLI file arguments as glob patterns. Next.js App Router routes
 * like `[[...slug]]` include `[`/`]`, which breaks glob matching and causes ESLint
 * to report "No files matching the pattern ... were found."
 *
 * This script lints files by reading their contents and using ESLint#lintText
 * with an explicit filePath, so the exact path is respected (no globbing).
 */
const fs = require("fs/promises");
const path = require("path");
const { ESLint } = require("eslint");

async function main() {
  const files = process.argv.slice(2).filter(Boolean);

  if (files.length === 0) {
    process.exitCode = 0;
    return;
  }

  const eslint = new ESLint({ fix: true });

  // Ensure deterministic output paths.
  const cwd = process.cwd();

  const results = [];

  for (const filePath of files) {
    // lint-staged may escape brackets as `\[` / `\]` when string-parsing commands.
    // Convert them back to real paths so we can read the file.
    const normalizedPath = filePath.replaceAll("\\[", "[").replaceAll("\\]", "]");

    // Skip ignored files to mirror CLI behavior.
    const rel = path.relative(cwd, normalizedPath);
    // eslint-disable-next-line no-await-in-loop
    const ignored = await eslint.isPathIgnored(rel);
    if (ignored) continue;

    // eslint-disable-next-line no-await-in-loop
    const text = await fs.readFile(normalizedPath, "utf8");
    // eslint-disable-next-line no-await-in-loop
    const fileResults = await eslint.lintText(text, { filePath: normalizedPath });
    results.push(...fileResults);
  }

  await ESLint.outputFixes(results);

  const errorCount = results.reduce((sum, r) => sum + (r.errorCount || 0), 0);
  const warningCount = results.reduce((sum, r) => sum + (r.warningCount || 0), 0);

  if (errorCount > 0 || warningCount > 0) {
    const formatter = await eslint.loadFormatter("stylish");
    const output = formatter.format(results);
    if (output) console.log(output);

    // Match `eslint --max-warnings=0` behavior: warnings fail.
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});



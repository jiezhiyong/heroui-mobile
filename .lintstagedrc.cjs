const { relative } = require("path");
const escape = require("shell-quote").quote;
const isWin = process.platform === "win32";

const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const cwd = process.cwd();
  const eslint = new ESLint();
  const relativePaths = files.map((file) => relative(cwd, file));
  const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);

  return filteredFiles;
};

module.exports = {
  "**/*.{js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    // Use an API-based runner to avoid ESLint CLI globbing issues with paths that
    // contain `[`/`]` (e.g. Next.js `[[...slug]]` routes).
    const quoted = filesToLint.map((filename) => (isWin ? `"${filename}"` : escape([filename])));

    return [`node ./scripts/lint-staged-eslint.cjs ${quoted.join(" ")}`];
  },
  "**/*.css": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    return filesToLint
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .map((file) => `prettier --config .prettierrc.json --ignore-path --write ${file}`);
  },
};

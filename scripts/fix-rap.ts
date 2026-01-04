/**
 * 批量“规范化”仓库里所有 package.json 中 React Aria 相关依赖的版本写法：把这些包的版本前缀 ^ 去掉，变成精确版本锁定（例如 ^3.10.0 → 3.10.0）
 */
import glob from 'glob';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const fixVersions = (packageData: any) => {
  ['dependencies', 'devDependencies'].forEach(depType => {
    if (packageData[depType]) {
      Object.keys(packageData[depType]).forEach(key => {
        if (key.match(/^@react-(aria|stately|types)/)) {
          packageData[depType][key] = packageData[depType][key].replace('^', '');
        }
      });
    }
  });
};

const processPackageFiles = (path: string) => {
  const filePaths = glob.sync(resolve(path, '**/package.json'), {
    ignore: '**/node_modules/**',
  });

  for (const filePath of filePaths) {
    try {
      const packageData = JSON.parse(readFileSync(filePath, 'utf8'));
      fixVersions(packageData);
      writeFileSync(filePath, JSON.stringify(packageData, null, 2));
      console.log(`✅ Fixed versions in ${filePath}`);
    } catch (error) {
      console.error(`Error occurred while processing ${filePath}:`, error.message);
    }
  }
};

const main = async () => {
  const dirs = [resolve('app/docs'), resolve('packages')];
  for (const dir of dirs) {
    processPackageFiles(dir);
  }
};


main().catch(console.error);

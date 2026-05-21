import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const srcDecoratorsDir = path.join(rootDir, 'src', 'decorators');
const entriesManifestPath = path.join(rootDir, 'scripts', 'decorator-entries.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const stableExportKeys = ['.', './package.json', './*'];

const baseExports = Object.fromEntries(
  stableExportKeys.filter((key) => packageJson.exports?.[key]).map((key) => [key, packageJson.exports[key]]),
);

const decoratorEntries = [];

const walk = (dirPath) => {
  for (const dirent of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, dirent.name);

    if (dirent.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!dirent.isFile() || dirent.name !== 'index.ts') {
      continue;
    }

    const relFromSrc = path.relative(path.join(rootDir, 'src'), fullPath).replace(/\\/g, '/');

    if (!relFromSrc.startsWith('decorators/')) {
      continue;
    }

    const relFromDecorators = path.relative(srcDecoratorsDir, fullPath).replace(/\\/g, '/');
    const segments = relFromDecorators.split('/');
    const decoratorName = segments[segments.length - 2];

    decoratorEntries.push({
      name: decoratorName,
      srcEntry: `src/${relFromSrc}`,
      distPathBase: relFromSrc.replace(/\.ts$/, ''),
    });
  }
};

walk(srcDecoratorsDir);

decoratorEntries.sort((a, b) => a.name.localeCompare(b.name));

const duplicateNames = decoratorEntries
  .map((entry) => entry.name)
  .filter((name, index, arr) => arr.indexOf(name) !== index);

if (duplicateNames.length > 0) {
  throw new Error(`Duplicate decorator export names found: ${[...new Set(duplicateNames)].join(', ')}`);
}

const generatedExports = {};

for (const entry of decoratorEntries) {
  generatedExports[`./${entry.name}`] = {
    types: `./dist/${entry.distPathBase}.d.ts`,
    default: `./dist/${entry.distPathBase}.js`,
  };
}

packageJson.exports = {
  ...baseExports,
  ...generatedExports,
};

fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
fs.writeFileSync(
  entriesManifestPath,
  `${JSON.stringify({ entries: ['src/index.ts', ...decoratorEntries.map((entry) => entry.srcEntry)] }, null, 2)}\n`,
);

console.log(`Synced ${decoratorEntries.length} decorators into exports and build entries.`);

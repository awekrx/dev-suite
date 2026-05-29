import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const repoRoot = path.resolve(rootDir, '..', '..');
const entriesManifestPath = path.join(rootDir, 'scripts', 'decorator-entries.json');

const run = (command, args, env = process.env) => {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: rootDir, env });
  const { status, error } = result;

  if (error) {
    console.error(`Failed to run "${command} ${args.join(' ')}":`, error.message);
    process.exit(1);
  }

  if (status !== 0) {
    process.exit(status ?? 1);
  }
};

run('node', ['scripts/sync-decorators.mjs']);
fs.rmSync(path.join(rootDir, 'dist'), { recursive: true, force: true });

const manifest = JSON.parse(fs.readFileSync(entriesManifestPath, 'utf8'));
const { entries } = manifest;

if (!Array.isArray(entries) || entries.length === 0) {
  throw new Error('No build entries found in scripts/decorator-entries.json');
}

run(
  path.join(repoRoot, 'node_modules', '.bin', 'tsup'),
  [...entries, '--format', 'cjs', '--minify', '--out-dir', 'dist', '--tsconfig', 'tsconfig.tsup.json'],
  {
    ...process.env,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --max-old-space-size=4096`.trim(),
  },
);

run(path.join(repoRoot, 'node_modules', '.bin', 'tsc'), ['--project', 'tsconfig.declarations.json']);

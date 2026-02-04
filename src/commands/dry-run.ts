import path from 'path';

import fg from 'fast-glob';

import { loadConfig } from '../core';

async function dryRunOne(cwd: string): Promise<void> {
    const config = await loadConfig(cwd);
    const files = await fg(config.copy, { cwd, dot: true, onlyFiles: true, unique: true });

    if (!files.length) {
        console.warn('⚠ All files excluded by glob patterns');
    }

    console.log('📂 tmp dir:', path.join(cwd, config.tmpDir));
    console.log('📦 Matched files:');

    files.forEach(f => console.log('  -', f));

    console.log('\n🧼 package.json rules:');
    console.dir(config.packageJson, { depth: null });
}

export async function dryRun(paths: string[] = ['.']): Promise<void> {
    for (const p of paths) {
        if (paths.length > 1) {
            console.log(`\n[${path.basename(path.resolve(p))}]`);
        }
        await dryRunOne(p);
    }
}

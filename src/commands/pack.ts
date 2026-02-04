import path from 'path';

import { execa } from 'execa';

import { loadConfig } from '../core';

async function packOne(cwd: string): Promise<void> {
    const { tmpDir } = await loadConfig(cwd);
    const resolvedTmpDir = path.join(cwd, tmpDir);
    await execa('npm', ['pack'], { cwd: resolvedTmpDir, stdio: 'inherit' });
}

export async function pack(paths: string[] = ['.']): Promise<void> {
    for (const p of paths) {
        if (paths.length > 1) {
            console.log(`\n[${path.basename(path.resolve(p))}]`);
        }
        await packOne(p);
    }
}

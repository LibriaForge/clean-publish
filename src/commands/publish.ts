import path from 'path';

import { execa } from 'execa';
import fs from 'fs-extra';

import { loadConfig } from '../core';

const LAST_HASH_FILE = '.clean-publish.last-hash';

async function publishOne(cwd: string): Promise<void> {
    const { tmpDir } = await loadConfig(cwd);
    const resolvedTmpDir = path.join(cwd, tmpDir);
    const lastHashFile = path.join(cwd, LAST_HASH_FILE);

    const currentHashFile = `${resolvedTmpDir}/.clean-publish.hash`;
    if (!(await fs.pathExists(currentHashFile))) {
        throw new Error(`No staged build found in ${cwd}. Run \`lb-clean-publish build\` first.`);
    }

    const currentHash = (await fs.readFile(currentHashFile, 'utf-8')).trim();
    const previousHash = (await fs.pathExists(lastHashFile))
        ? (await fs.readFile(lastHashFile, 'utf-8')).trim()
        : null;

    if (previousHash === currentHash) {
        console.log('⏭ No changes detected, skipping publish');
        return;
    }

    const pkg = await fs.readJson(`${resolvedTmpDir}/package.json`);
    const isScoped = pkg.name?.startsWith('@');

    const args = isScoped ? ['publish', '--access', 'public'] : ['publish'];
    await execa('npm', args, { cwd: resolvedTmpDir, stdio: 'inherit' });

    await fs.writeFile(lastHashFile, currentHash);
    console.log('✅ Published successfully');
}

export async function publish(paths: string[] = ['.']): Promise<void> {
    for (const p of paths) {
        if (paths.length > 1) {
            console.log(`\n[${path.basename(path.resolve(p))}]`);
        }
        await publishOne(p);
    }
}

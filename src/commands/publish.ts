// src/commands/publish.ts
import { execa } from 'execa';
import fs from 'fs-extra';
import { loadConfig } from "../core";

const LAST_HASH_FILE = '.clean-publish.last-hash';

export async function publish() {
    const { tmpDir } = await loadConfig();

    const currentHashFile = `${tmpDir}/.clean-publish.hash`;
    if (!(await fs.pathExists(currentHashFile))) {
        throw new Error('No staged build found. Run `clnpb build` first.');
    }

    const currentHash = (await fs.readFile(currentHashFile, 'utf-8')).trim();
    const previousHash = await fs.pathExists(LAST_HASH_FILE)
        ? (await fs.readFile(LAST_HASH_FILE, 'utf-8')).trim()
        : null;

    if (previousHash === currentHash) {
        console.log('⏭ No changes detected, skipping publish');
        return;
    }

    await execa('npm', ['publish'], { cwd: tmpDir, stdio: 'inherit' });

    await fs.writeFile(LAST_HASH_FILE, currentHash);
    console.log('✅ Published successfully');
}

// src/commands/publish.ts
import { execa } from 'execa';
import {loadConfig} from "../core";

export async function publish() {
    const { tmpDir } = await loadConfig();

    // if (previousHash === currentHash) {
    //     console.log('⏭ No changes detected, skipping publish');
    //     return;
    // }

    await execa('npm', ['publish'], { cwd: tmpDir, stdio: 'inherit' });
}

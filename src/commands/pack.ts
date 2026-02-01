// src/commands/pack.ts
import { execa } from 'execa';
import {loadConfig} from "../core";

export async function pack() {
    const { tmpDir } = await loadConfig();
    await execa('npm', ['pack'], { cwd: tmpDir, stdio: 'inherit' });
}

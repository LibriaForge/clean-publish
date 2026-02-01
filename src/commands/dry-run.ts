// src/commands/dryRun.ts
import fg from 'fast-glob';
import {loadConfig} from "../core";

export async function dryRun() {
    const config = await loadConfig();
    const files = await fg(config.copy, { dot: true, onlyFiles: true, unique: true });

    if (!files.length) {
        console.warn('⚠ All files excluded by glob patterns');
    }

    console.log('📂 tmp dir:', config.tmpDir);
    console.log('📦 Matched files:');

    files.forEach(f => console.log('  -', f));

    console.log('\n🧼 package.json rules:');
    console.dir(config.packageJson, { depth: null });
}

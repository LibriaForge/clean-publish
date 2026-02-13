import path from 'path';

import fs from 'fs-extra';

import { computeHash, loadConfig, resetTmpDir, sanitizePackageJson, stageFiles } from '../core';

async function buildOne(cwd: string): Promise<void> {
    const config = await loadConfig(cwd);
    const tmpDir = config.tmpDir;
    const resolvedTmpDir = path.join(cwd, tmpDir);

    await resetTmpDir(tmpDir, cwd);

    const { files } = await stageFiles(config.copy, tmpDir, cwd);

    if (!files.length) {
        console.warn('⚠ All files excluded by glob patterns');
    }

    const pkg = await fs.readJson(path.join(cwd, 'package.json'));
    const cleanPkg = sanitizePackageJson(pkg, config.packageJson);

    const cleanPkgPath = `${resolvedTmpDir}/package.json`;
    await fs.writeJson(cleanPkgPath, cleanPkg, { spaces: 2 });

    const hash = await computeHash([...files, 'package.json'], resolvedTmpDir);
    await fs.writeFile(`${resolvedTmpDir}/.clean-publish.hash`, hash);

    console.log(`✅ Staged ${files.length} files into ${resolvedTmpDir}`);
}

export async function build(paths: string[] = ['.']): Promise<void> {
    for (const p of paths) {
        if (paths.length > 1) {
            console.log(`\n[${path.basename(path.resolve(p))}]`);
        }
        await buildOne(p);
    }
}

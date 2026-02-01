// src/commands/build.ts
import fs from 'fs-extra';
import {computeHash, loadConfig, resetTmpDir, sanitizePackageJson, stageFiles} from "../core";

export async function build() {
    const config = await loadConfig();
    const tmpDir = config.tmpDir;

    await resetTmpDir(tmpDir);

    const { files } = await stageFiles(config.copy, tmpDir);

    if (!files.length) {
        console.warn('⚠ All files excluded by glob patterns');
    }

    const pkg = await fs.readJson('package.json');
    const cleanPkg = sanitizePackageJson(pkg, config.packageJson);

    await fs.writeJson(`${tmpDir}/package.json`, cleanPkg, { spaces: 2 });

    const hash = await computeHash(files, tmpDir);
    await fs.writeFile(`${tmpDir}/.clean-publish.hash`, hash);

    console.log(`✅ Staged ${files.length} files into ${tmpDir}`);
}

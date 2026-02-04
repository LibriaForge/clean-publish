import path from 'path';

import fg from 'fast-glob';
import fs from 'fs-extra';

export interface StageResult {
    files: string[];
    patterns: string[];
}

export async function stageFiles(
    patterns: string[],
    tmpDir: string,
    cwd: string = '.'
): Promise<StageResult> {
    if (patterns.some(p => p.endsWith('/'))) {
        console.warn('⚠ Trailing slashes in glob patterns are ignored');
    }

    const files = await fg(patterns, {
        cwd,
        dot: true,
        onlyFiles: true,
        unique: true,
    });

    const resolvedTmpDir = path.join(cwd, tmpDir);

    for (const file of files) {
        const src = path.join(cwd, file);
        const dest = path.join(resolvedTmpDir, file);
        await fs.ensureDir(path.dirname(dest));
        await fs.copyFile(src, dest);
    }

    return { files, patterns };
}

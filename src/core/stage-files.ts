import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';

export interface StageResult {
    files: string[];
    patterns: string[];
}

export async function stageFiles(
    patterns: string[],
    tmpDir: string
): Promise<StageResult> {
    if (patterns.some(p => p.endsWith('/'))) {
        console.warn('⚠ Trailing slashes in glob patterns are ignored');
    }

    const files = await fg(patterns, {
        dot: true,
        onlyFiles: true,
        unique: true
    });

    for (const file of files) {
        const dest = path.join(tmpDir, file);
        await fs.ensureDir(path.dirname(dest));
        await fs.copyFile(file, dest);
    }

    return { files, patterns };
}

import fs from 'fs-extra';

export async function resetTmpDir(dir: string): Promise<void> {
    await fs.remove(dir);
    await fs.ensureDir(dir);
}

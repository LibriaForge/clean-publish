import path from 'path';

import fs from 'fs-extra';

export async function resetTmpDir(dir: string, cwd: string = '.'): Promise<void> {
    const resolved = path.join(cwd, dir);
    await fs.remove(resolved);
    await fs.ensureDir(resolved);
}

import fs from "fs-extra";

export async function resetTmpDir(dir: string) {
    await fs.remove(dir);
    await fs.ensureDir(dir);
}


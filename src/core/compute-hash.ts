import crypto from "node:crypto";
import fs from "fs-extra";

export async function computeHash(files: string[], baseDir: string) {
    const hash = crypto.createHash('sha256');

    for (const file of files.sort()) {
        hash.update(file);
        hash.update(await fs.readFile(`${baseDir}/${file}`));
    }

    return hash.digest('hex');
}
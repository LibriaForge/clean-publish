import path from 'path';

import fs from 'fs-extra';

import type { ClnpbConfig } from '../types';

export async function loadConfig(cwd: string = '.'): Promise<ClnpbConfig> {
    const file = path.join(cwd, '.clnpb.json');
    if (!(await fs.pathExists(file))) {
        throw new Error(`Missing .clnpb.json in ${cwd}`);
    }
    return fs.readJson(file) as Promise<ClnpbConfig>;
}

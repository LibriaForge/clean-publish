import fs from 'fs-extra';

import type { ClnpbConfig } from '../types';

export async function loadConfig(): Promise<ClnpbConfig> {
    const file = '.clnpb.json';
    if (!(await fs.pathExists(file))) {
        throw new Error('Missing .clnpb.json');
    }
    return fs.readJson(file) as Promise<ClnpbConfig>;
}

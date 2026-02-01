import fs from 'fs-extra';

export async function loadConfig() {
    const file = '.clnpb.json';
    if (!(await fs.pathExists(file))) {
        throw new Error('Missing .clnpb.json');
    }
    return fs.readJson(file);
}


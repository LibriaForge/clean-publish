import fs from 'fs-extra';
import os from 'os';
import path from 'path';

export async function useTempProject(fixture: string) {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'clnpb-'));
    await fs.copy(`tests/fixtures/${fixture}`, tmp);
    process.chdir(tmp);
    return tmp;
}

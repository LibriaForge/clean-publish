import fs from 'fs-extra';
import path from 'path';

const PROJECT_ROOT = path.resolve(import.meta.dirname, '../..');
const TMP_DIR = path.join(PROJECT_ROOT, '.tmp');

export async function useTempProject(fixture: string) {
    await fs.ensureDir(TMP_DIR);
    const tmp = await fs.mkdtemp(path.join(TMP_DIR, 'clnpb-'));
    await fs.copy(path.join(PROJECT_ROOT, 'tests/fixtures', fixture), tmp);
    process.chdir(tmp);
    return tmp;
}

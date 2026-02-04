import path from 'path';

import fs from 'fs-extra';

import type { ClnpbConfig } from '../types';

const DEFAULT_CONFIG: ClnpbConfig = {
    tmpDir: '.tmp-clean-publish',
    copy: ['dist/**', 'README.md', 'LICENSE'],
    packageJson: {
        remove: {
            scripts: true,
            devDependencies: true,
        },
    },
};

async function initOne(cwd: string): Promise<void> {
    const target = path.join(cwd, '.clnpb.json');

    if (await fs.pathExists(target)) {
        console.error(`❌ .clnpb.json already exists in ${cwd}`);
        process.exit(1);
    }

    await fs.writeJson(target, DEFAULT_CONFIG, { spaces: 2 });

    console.log(`✅ Created ${target}`);
}

export async function init(paths: string[] = ['.']): Promise<void> {
    for (const p of paths) {
        if (paths.length > 1) {
            console.log(`\n[${path.basename(path.resolve(p))}]`);
        }
        await initOne(p);
    }
}

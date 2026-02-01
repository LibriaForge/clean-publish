// src/commands/init.ts
import fs from 'fs-extra';
import path from 'path';
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

export async function init() {
    const target = path.resolve('.clnpb.json');

    if (await fs.pathExists(target)) {
        console.error('❌ .clnpb.json already exists');
        process.exit(1);
    }

    await fs.writeJson(target, DEFAULT_CONFIG, { spaces: 2 });

    console.log('✅ Created .clnpb.json');
}

// src/commands/init.ts
import fs from 'fs-extra';
import path from 'path';

export async function init() {
    const target = path.resolve('.clnpb.json');

    if (await fs.pathExists(target)) {
        console.error('❌ .clnpb.json already exists');
        process.exit(1);
    }

    await fs.copy(
        path.resolve('templates/clnpb.json'),
        target
    );

    console.log('✅ Created .clnpb.json');
}

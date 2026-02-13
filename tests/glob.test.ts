// tests/glob.test.ts
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import fs from 'fs-extra';
import {useTempProject} from './helpers';
import {build} from '../src';

describe('glob support', () => {
    let cleanup: () => Promise<void>;

    beforeEach(async () => {
        // useTempProject already handles cwd change and cleanup
        const temp = await useTempProject('basic-project');
        cleanup = temp.cleanup;
    });

    afterEach(async () => {
        await cleanup();
    });

    it('copies only matching files', async () => {
        await fs.writeJson('.clnpb.json', {
            tmpDir: '.tmp',
            copy: ['dist/**', '!dist/**/*.map'],
            packageJson: {}
        });

        await build();

        expect(await fs.pathExists('.tmp/dist/index.js')).toBe(true);
        expect(await fs.pathExists('.tmp/dist/index.d.ts')).toBe(true);
        expect(await fs.pathExists('.tmp/dist/index.js.map')).toBe(false);
    });
});

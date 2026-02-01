// tests/package-json.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import { build } from '../src/commands';
import {useTempProject} from "./helpers";

describe('package.json sanitization', () => {
    it('removes devDependencies and scripts', async () => {
        await useTempProject('basic-project');

        await fs.writeJson('.clnpb.json', {
            tmpDir: '.tmp',
            copy: ['dist/**'],
            packageJson: {
                remove: {
                    scripts: true,
                    devDependencies: true
                }
            }
        });

        await build();

        const pkg = await fs.readJson('.tmp/package.json');

        expect(pkg.devDependencies).toBeUndefined();
        expect(pkg.scripts).toBeUndefined();
        expect(pkg.name).toBe('test-pkg');
    });

    it('keeps allowed scripts only', async () => {
        await useTempProject('basic-project');

        await fs.writeJson('.clnpb.json', {
            tmpDir: '.tmp',
            copy: ['dist/**'],
            packageJson: {
                remove: { scripts: true },
                keepScripts: ['preinstall']
            }
        });

        await build();

        const pkg = await fs.readJson('.tmp/package.json');
        expect(pkg.scripts).toEqual({ preinstall: 'echo hi' });
    });

});

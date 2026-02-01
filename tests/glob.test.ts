// tests/glob.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import {useTempProject} from "./helpers";
import {build} from "../src/commands";

describe('glob support', () => {
    it('copies only matching files', async () => {
        await useTempProject('basic-project');

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

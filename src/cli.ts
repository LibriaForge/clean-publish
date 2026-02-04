#!/usr/bin/env node
import { Command } from 'commander';

import { build, dryRun, init, pack, publish } from './commands';

const program = new Command();

program
    .name('clean-publish')
    .description('Publish clean npm packages from a staged directory')
    .version('1.0.0');

program
    .command('init [paths...]')
    .description('Create config file')
    .action((paths: string[]) => init(paths.length ? paths : undefined));

program
    .command('build [paths...]')
    .description('Stage files and sanitize package.json')
    .action((paths: string[]) => build(paths.length ? paths : undefined));

program
    .command('pack [paths...]')
    .description('Generate npm tarball')
    .action((paths: string[]) => pack(paths.length ? paths : undefined));

program
    .command('publish [paths...]')
    .description('Publish to registry')
    .action((paths: string[]) => publish(paths.length ? paths : undefined));

program
    .command('dry-run [paths...]')
    .description('Preview staged output')
    .action((paths: string[]) => dryRun(paths.length ? paths : undefined));

program.parse();

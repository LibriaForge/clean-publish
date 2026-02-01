#!/usr/bin/env node
import { Command } from 'commander';
import {build, dryRun, init, pack, publish} from "./commands";

const program = new Command();

program
    .name('clean-publish')
    .description('Publish clean npm packages from a staged directory')
    .version('0.0.1');

program.command('init').description('Create config file').action(init);
program.command('build').description('Stage files and sanitize package.json').action(build);
program.command('pack').description('Generate npm tarball').action(pack);
program.command('publish').description('Publish to registry').action(publish);
program.command('dry-run').description('Preview staged output').action(dryRun);

program.parse();

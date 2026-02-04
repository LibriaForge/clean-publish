# @libria/clean-publish

A CLI tool for publishing clean npm packages. Stage only the files you need, sanitize your `package.json`, and publish a minimal, production-ready package.

## Why?

When you publish a package to npm, you often include unnecessary files like tests, source code, configs, and development scripts. This tool lets you:

- Copy only the files you want to publish (using glob patterns)
- Remove `devDependencies`, `scripts`, and other fields from `package.json`
- Preview what will be published before actually publishing
- Skip publishing when nothing has changed (hash-based detection)

## Installation

```bash
npm install -D @libria/clean-publish
```

Or use it directly with npx:

```bash
npx @libria/clean-publish <command>
```

## Quick Start

```bash
# Initialize config file
lb-clean-publish init

# Preview what will be staged
lb-clean-publish dry-run

# Stage files for publishing
lb-clean-publish build

# Publish to npm
lb-clean-publish publish
```

## Commands

| Command   | Description                                    |
| --------- | ---------------------------------------------- |
| `init`    | Create a `.clnpb.json` config file             |
| `build`   | Stage files to temp directory and sanitize pkg |
| `dry-run` | Preview matched files and package.json rules   |
| `pack`    | Generate an npm tarball from staged files      |
| `publish` | Publish staged files to npm registry           |

All commands accept optional paths to operate on multiple directories:

```bash
lb-clean-publish build projects/libA projects/libB
lb-clean-publish publish projects/libA projects/libB
```

## Configuration

Create a `.clnpb.json` file in your project root (or run `lb-clean-publish init`):

```json
{
  "tmpDir": ".tmp-clean-publish",
  "copy": [
    "dist/**",
    "README.md",
    "LICENSE"
  ],
  "packageJson": {
    "remove": {
      "scripts": true,
      "devDependencies": true
    }
  }
}
```

### Config Options

#### `tmpDir`

**Type:** `string`

Directory where files are staged before publishing.

#### `copy`

**Type:** `string[]`

Glob patterns for files to include in the published package. Uses [fast-glob](https://github.com/mrmlnc/fast-glob) syntax.

#### `packageJson`

Rules for sanitizing `package.json`:

| Option                        | Type       | Description                                   |
| ----------------------------- | ---------- | --------------------------------------------- |
| `remove.scripts`              | `boolean`  | Remove all scripts                            |
| `remove.devDependencies`      | `boolean`  | Remove devDependencies                        |
| `remove.optionalDependencies` | `boolean`  | Remove optionalDependencies                   |
| `keepScripts`                 | `string[]` | Scripts to keep when `remove.scripts` is true |
| `removeFields`                | `string[]` | Additional top-level fields to remove         |

### Example: Keep specific scripts

```json
{
  "tmpDir": ".tmp-clean-publish",
  "copy": ["dist/**", "README.md"],
  "packageJson": {
    "remove": {
      "scripts": true,
      "devDependencies": true
    },
    "keepScripts": ["postinstall"]
  }
}
```

### Example: Remove custom fields

```json
{
  "tmpDir": ".tmp-clean-publish",
  "copy": ["dist/**", "README.md"],
  "packageJson": {
    "remove": {
      "scripts": true,
      "devDependencies": true,
      "optionalDependencies": true
    },
    "removeFields": ["prettier", "eslintConfig", "jest"]
  }
}
```

## Workflow

1. **Build your project** - Compile TypeScript, bundle, etc.
2. **Run `lb-clean-publish build`** - Stages files to temp directory
3. **Run `lb-clean-publish pack`** (optional) - Creates a tarball to inspect
4. **Run `lb-clean-publish publish`** - Publishes to npm

The publish command automatically skips if nothing has changed since the last publish (using content hashing).

## Multi-Project Support

You can run commands on multiple directories from a single location. Each directory should have its own `.clnpb.json` and `package.json`.

```bash
# Build multiple projects
lb-clean-publish build projects/libA projects/libB projects/libC

# Publish multiple projects
lb-clean-publish publish projects/libA projects/libB

# Preview a specific project
lb-clean-publish dry-run projects/libA
```

This works with any project structure (monorepos, Angular libraries, etc.) without requiring workspace configuration.

## License

MIT

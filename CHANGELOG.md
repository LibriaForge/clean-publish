# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-04

### Added

- Multi-project support: all commands now accept optional paths to operate on multiple directories
- Useful for monorepos and multi-library projects (Angular, etc.)

## [1.0.0] - 2026-01-15

### Added

- Initial stable release
- `init` command to create config file
- `build` command to stage files and sanitize package.json
- `dry-run` command to preview matched files
- `pack` command to generate npm tarball
- `publish` command with hash-based change detection
- Glob pattern support for file selection
- Package.json sanitization (remove scripts, devDependencies, custom fields)

### Fixed

- Cross-platform compatibility for build scripts

## [0.1.1] - 2026-01-10

### Fixed

- Build configuration issues

## [0.1.0] - 2026-01-05

### Added

- Initial release
- Core functionality for clean publishing

export interface PackageJsonRules {
    remove?: {
        scripts?: boolean;
        devDependencies?: boolean;
        optionalDependencies?: boolean;
    };
    keepScripts?: string[];
    removeFields?: string[];
}

export interface ClnpbConfig {
    tmpDir: string;
    copy: string[];
    packageJson: PackageJsonRules;
}

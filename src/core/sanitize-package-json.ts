import type { PackageJsonRules } from '../types';

export function sanitizePackageJson(pkg: Record<string, unknown>, rules: PackageJsonRules) {
    const copy = structuredClone(pkg);

    if (rules.remove?.devDependencies) delete copy.devDependencies;
    if (rules.remove?.optionalDependencies) delete copy.optionalDependencies;

    if (rules.remove?.scripts) {
        if (rules.keepScripts?.length) {
            const scripts = (pkg.scripts || {}) as Record<string, string>;
            copy.scripts = Object.fromEntries(
                Object.entries(scripts).filter(([k]) =>
                    rules.keepScripts!.includes(k)
                )
            );
        } else {
            delete copy.scripts;
        }
    }

    for (const field of rules.removeFields || []) {
        delete copy[field];
    }

    return copy;
}
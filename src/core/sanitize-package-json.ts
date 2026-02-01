export function sanitizePackageJson(pkg: any, rules: any) {
    const copy = structuredClone(pkg);

    if (rules.remove?.devDependencies) delete copy.devDependencies;
    if (rules.remove?.optionalDependencies) delete copy.optionalDependencies;

    if (rules.remove?.scripts) {
        if (rules.keepScripts?.length) {
            copy.scripts = Object.fromEntries(
                Object.entries(pkg.scripts || {}).filter(([k]) =>
                    rules.keepScripts.includes(k)
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
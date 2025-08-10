// Load all .hbs templates under templates/
const templates = import.meta.glob("../templates/**/*.sh.hbs", { as: "raw" });

export async function loadTemplate(path: string): Promise<string> {
    const loader = templates[`../templates/${path}`];
    if (!loader) throw new Error(`Template not found: ${path}`);
    return loader();
}

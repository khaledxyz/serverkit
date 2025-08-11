import type { FormSchemaType } from "@/components/main-form/constants";
import Handlebars from "handlebars";

// Register Handlebars helpers
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

// Pre-load all templates at build time for optimal performance
const TEMPLATE_REGISTRY = import.meta.glob("../templates/**/*.sh.hbs", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Pre-compile templates for better performance
const COMPILED_TEMPLATES: Record<string, HandlebarsTemplateDelegate> = {};

// Initialize compiled templates
Object.entries(TEMPLATE_REGISTRY).forEach(([path, content]) => {
  COMPILED_TEMPLATES[path] = Handlebars.compile(content);
});

// Define component execution order and template mapping
const COMPONENT_ORDER = [
  { field: null, template: "common/base", priority: 0 },
  //   { field: "createUser", template: "user-management", priority: 5 },
  //   { field: "configureSSH", template: "ssh", priority: 7 },
  //   { field: "installUFW", template: "ufw", priority: 10 },
  { field: "installFail2ban", template: "fail2ban", priority: 15 },
  { field: "enableUFW", template: "ufw", priority: 20 },
  //   { field: "installDocker", template: "docker", priority: 20 },
  // Future components should be added here with appropriate priorities
  // { field: 'installNginx', template: 'nginx', priority: 30 },
  // { field: 'installNode', template: 'nodejs', priority: 40 },
] as const;

export function generateSetupScript(data: FormSchemaType): string {
  // Add performance timing in dev mode
  const start = import.meta.env.DEV ? performance.now() : 0;

  const scripts: string[] = [];

  // Process components in explicit priority order
  for (const { field, template } of COMPONENT_ORDER) {
    // Skip if field is false/empty (except base which has no field)
    if (field && !data[field as keyof FormSchemaType]) continue;

    // Try distro-specific template first, then fall back to common
    const templatePaths = field
      ? [
          `../templates/${data.distro}/${template}.sh.hbs`,
          `../templates/common/${template}.sh.hbs`,
        ]
      : [`../templates/${template}.sh.hbs`];

    let templateLoaded = false;
    for (const templatePath of templatePaths) {
      const compiledTemplate = COMPILED_TEMPLATES[templatePath];
      if (compiledTemplate) {
        // Template is pre-compiled - instant execution
        scripts.push(compiledTemplate(data));
        templateLoaded = true;
        break;
      }
    }

    if (!templateLoaded && import.meta.env.DEV) {
      console.warn(
        `No template found for component: ${template} (field: ${
          field || "base"
        })`
      );
    }
  }

  const result = normalizeScriptSpacing(scripts.join("\n\n"));

  // Log performance in dev mode
  if (import.meta.env.DEV) {
    const end = performance.now();
    console.log(`Script generation took: ${(end - start).toFixed(2)}ms`);
  }

  return result;
}

function normalizeScriptSpacing(script: string): string {
  return script
    .split("\n")
    .filter((line, i, arr) => {
      const isEmpty = line.trim() === "";
      const prevEmpty = i > 0 && arr[i - 1].trim() === "";
      return !(isEmpty && prevEmpty);
    })
    .join("\n")
    .trim();
}

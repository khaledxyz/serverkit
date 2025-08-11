import { z } from "zod";

export const FormSchema = z.object({
  distro: z.string(),

  // GENERAL
  hostname: z
    .string()
    .max(253)
    .regex(
      /^(?=.{1,253}$)(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*$/
    )
    .optional()
    .or(z.literal("")),
  timezone: z.string(),
  // GENERAL END

  // FAIL2BAN
  installFail2ban: z.boolean(),
  fail2banSSHBanTime: z.coerce.number().optional(),
  fail2banSSHMaxRetry: z.coerce.number().optional(),
  // FAIL2BAN END

  // UFW
  enableUFW: z.boolean(),
  defaultIncoming: z.boolean(), // allow, deny
  defaultOutgoing: z.boolean(), // allow, deny
  allowHTTP: z.boolean(),
  allowHTTPS: z.boolean(),
  ufwCustomPorts: z
    .array(
      z.object({
        port: z.coerce
          .number()
          .int("Port must be an integer")
          .min(1, "Port must be at least 1")
          .max(65535, "Port must be at most 65535"),
        protocol: z.enum(["tcp", "udp"]),
      })
    )
    .optional(),
  // UFW END
});

export const defaultFormValues: FormSchemaType = {
  distro: "",

  // GENERAL
  hostname: "",
  timezone: "",
  // GENERAL END

  // FAIL2BAN
  installFail2ban: false,
  fail2banSSHBanTime: "",
  fail2banSSHMaxRetry: "",
  // FAIL2BAN END

  // UFW
  enableUFW: false,
  defaultIncoming: false,
  defaultOutgoing: false,
  allowHTTP: false,
  allowHTTPS: false,
  ufwCustomPorts: [],
  // UFW END
};

export type FormSchemaType = z.input<typeof FormSchema>;

import { z } from "zod";

export const FormSchema = z.object({
  distro: z.string(),

  // GENERAL
  hostname: z
    .string()
    .max(253)
    .regex(
      /^(?=.{1,253}$)(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*$/,
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
};

export type FormSchemaType = z.input<typeof FormSchema>;

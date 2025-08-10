import z from "zod";

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
});

export const defaultFormValues: FormSchemaType = {
  distro: "",
  hostname: "",
  timezone: "",
};

export type FormSchemaType = z.input<typeof FormSchema>;

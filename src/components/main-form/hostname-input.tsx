import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function HostnameInput({ name = "hostname" }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>Hostname</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            id={name}
            placeholder="my-server"
            type="text"
          />
          <FieldError match={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FieldError>
        </Field>
      )}
    />
  );
}

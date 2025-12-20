import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function TimezoneInput({ name = "timezone" }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>Timezone</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            id={name}
            placeholder="Africa/Algiers"
            type="text"
          />
          <FieldDescription>e.g. Africa/Algiers</FieldDescription>
          <FieldError match={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FieldError>
        </Field>
      )}
    />
  );
}

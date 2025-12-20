import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select a distro", value: "" },
  { label: "Ubuntu", value: "ubuntu" },
  { label: "Debian", value: "debian" },
  { label: "CentOS", value: "centos" },
];

export function DistroSelector({ name = "distro" }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>Distro</FieldLabel>
          <Select
            items={items}
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger aria-invalid={fieldState.invalid} id={name}>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
          <FieldDescription>
            Choose your preferred Linux distribution.
          </FieldDescription>
          <FieldError match={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FieldError>
        </Field>
      )}
    />
  );
}

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function HostnameInput() {
  return (
    <Field>
      <FieldLabel>Hostname</FieldLabel>
      <Input type="text" />
    </Field>
  );
}

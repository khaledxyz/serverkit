import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function TimezoneInput() {
  return (
    <Field>
      <FieldLabel>Timezone</FieldLabel>
      <Input type="text" />
      <FieldDescription>e.g. Africa/Algiers</FieldDescription>
    </Field>
  );
}

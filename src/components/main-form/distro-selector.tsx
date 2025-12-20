import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select a distro", value: null },
  { label: "Ubuntu", value: "ubuntu" },
  { label: "Debian", value: "debian" },
  { label: "CentOS", value: "centos" },
];

export function DistroSelector() {
  return (
    <Field>
      <FieldLabel>Distro</FieldLabel>
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </Field>
  );
}

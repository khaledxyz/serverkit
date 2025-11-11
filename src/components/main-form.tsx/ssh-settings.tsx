import { BoltIcon, ShieldIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const loginOptions = [
  { label: "Permit root login", value: "yes" },
  { label: "Deny root login", value: "no" },
  { label: "Permit without password", value: "without-password" },
  { label: "Forced commands only", value: "forced-commands-only" },
];

export function SshSettings() {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>SSH Settings</ItemTitle>
        <ItemDescription>
          Configure SSH access and security options
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <SshDialog />
      </ItemActions>
    </Item>
  );
}

function SshDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button size="icon" variant="outline" />}>
        <BoltIcon />
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>SSH Configuration</DialogTitle>
          <DialogDescription>
            Set up SSH access, authentication, and network options
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <div className="flex gap-4">
            <NumberField defaultValue={22}>
              <NumberFieldScrubArea label="SSH Port" />
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>

            <Field className="w-full">
              <FieldLabel>Root Login</FieldLabel>
              <Select items={loginOptions}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {loginOptions.map((item) => (
                    <SelectItem key={item.value} value={item}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </Field>
          </div>

          <Label className="mt-5">Authentication</Label>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>PasswordAuthentication</ItemTitle>
              <ItemDescription>
                Allow login with passwords (disable for SSH key only)
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch />
            </ItemActions>
          </Item>

          <Item variant="outline">
            <ItemContent>
              <ItemTitle>PermitEmptyPasswords</ItemTitle>
              <ItemDescription>
                Allow accounts to login without passwords (not recommended)
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch />
            </ItemActions>
          </Item>

          <Label className="mt-5">Network</Label>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Disable IPv6</ItemTitle>
              <ItemDescription>Disable IPv6 support for SSH</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch />
            </ItemActions>
          </Item>

          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Firewall</ItemTitle>
              <ItemDescription>
                Open SSH port automatically in firewall
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch />
            </ItemActions>
          </Item>

          <Alert variant="info">
            <ShieldIcon />
            <AlertTitle>Security Tip</AlertTitle>
            <AlertDescription>
              For production servers, disable password authentication and root
              login, use SSH keys, and consider changing the default port.
            </AlertDescription>
          </Alert>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

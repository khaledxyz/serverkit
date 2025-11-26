import { useState } from "react";

import {
  BoltIcon,
  EyeIcon,
  EyeOffIcon,
  ShuffleIcon,
  Trash2Icon,
} from "lucide-react";
import { nanoid } from "nanoid";

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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export function UsersSettings() {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Manage Users</ItemTitle>
        <ItemDescription>Manage users and their stuff</ItemDescription>
      </ItemContent>
      <ItemActions>
        <SettingDialog />
      </ItemActions>
    </Item>
  );
}

function SettingDialog() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    setPassword(nanoid(16));
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button size="icon" variant="outline" />}>
        <BoltIcon />
      </DialogTrigger>
      <DialogPopup className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Users</DialogTitle>
          <DialogDescription>Manage users and their stuff</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          <form className="flex flex-1 flex-col gap-4">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <InputGroupAddon align="inline-end">
                  <Button
                    className="text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    className="text-muted-foreground"
                    onClick={generatePassword}
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                  >
                    <ShuffleIcon />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>
                <Checkbox />
                Force password change on first login
              </FieldLabel>
            </Field>
            <Field>
              <FieldLabel>SSH Public Key</FieldLabel>
              <Textarea
                placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC..."
                rows={3}
              />
              <FieldDescription>
                Optional. User will be able to login via SSH key authentication
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Default Shell</FieldLabel>
              <Select defaultValue="bash">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bash">Bash</SelectItem>
                  <SelectItem value="zsh">Zsh</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                  <SelectItem value="sh">Sh</SelectItem>
                  <SelectItem value="nologin">/sbin/nologin</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Additional Groups</FieldLabel>
              <Input placeholder="docker,www,audio" type="text" />
              <FieldDescription>Comma-separated</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>
                <Checkbox />
                Grant sudo privileges
              </FieldLabel>
            </Field>
            <Field>
              <FieldLabel>
                <Checkbox />
                System user (no login)
              </FieldLabel>
            </Field>
            <Button variant="outline">Create User</Button>
          </form>
          <Separator orientation="vertical" />
          <div className="-mt-1 flex-1 space-y-1">
            <Label>Users: </Label>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Valkyrie</ItemTitle>
                <ItemDescription>bash • sudo • docker</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon" variant="destructive-outline">
                  <Trash2Icon />
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Valkyrie</ItemTitle>
                <ItemDescription>bash • sudo • docker</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon" variant="destructive-outline">
                  <Trash2Icon />
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

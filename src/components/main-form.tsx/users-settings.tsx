import { BoltIcon, Trash2Icon } from "lucide-react";

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
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

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
              <Input type="password" />
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

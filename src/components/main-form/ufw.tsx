import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ToggleCard,
  ToggleCardAction,
  ToggleCardDescription,
  ToggleCardTitle,
} from "@/components/ui/toggle-card";
import { BoltIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import type { FormSchemaType } from "./constants";

export function UFW() {
  const { control } = useFormContext<FormSchemaType>();

  return (
    <FormField
      control={control}
      name="enableUFW"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <ToggleCard
              checked={field.value || false}
              onCheckedChange={field.onChange}
            >
              <ToggleCardTitle>Enable UFW</ToggleCardTitle>
              <ToggleCardDescription>
                Enable and configure Uncomplicated Firewall
              </ToggleCardDescription>
              <ToggleCardAction>
                <OptionsDialog />
              </ToggleCardAction>
            </ToggleCard>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function OptionsDialog() {
  const { control } = useFormContext<FormSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "ufwCustomPorts",
  });

  const addPort = () => {
    append({ port: "", protocol: "tcp" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BoltIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uncomplicated Firewall Options</DialogTitle>
        </DialogHeader>
        <FormField
          control={control}
          name="defaultIncoming"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <ToggleCard
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                >
                  <ToggleCardTitle>Default incoming policy</ToggleCardTitle>
                  <ToggleCardDescription>
                    Enable and configure Uncomplicated Firewall
                  </ToggleCardDescription>
                </ToggleCard>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="defaultOutgoing"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <ToggleCard
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                >
                  <ToggleCardTitle>Default outgoing policy</ToggleCardTitle>
                  <ToggleCardDescription>
                    Enable and configure Uncomplicated Firewall
                  </ToggleCardDescription>
                </ToggleCard>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Custom Ports</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPort}
              className="flex items-center gap-2"
            >
              <PlusIcon />
              Add Port
            </Button>
          </div>
        </div>

        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-2">
              <FormField
                control={control}
                name={`ufwCustomPorts.${index}.port`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter port number"
                        value={String(field.value)}
                        type="number"
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`ufwCustomPorts.${index}.protocol`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select protocol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tcp">TCP</SelectItem>
                        <SelectItem value="udp">UDP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                className="flex items-center gap-2"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

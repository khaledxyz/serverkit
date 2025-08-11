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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ToggleCard,
  ToggleCardAction,
  ToggleCardDescription,
  ToggleCardTitle,
} from "@/components/ui/toggle-card";
import { BoltIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import type { FormSchemaType } from "./constants";

export function FailToBan() {
  const { control } = useFormContext<FormSchemaType>();

  return (
    <FormField
      control={control}
      name="installFail2ban"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <ToggleCard
              checked={field.value || false}
              onCheckedChange={field.onChange}
            >
              <ToggleCardTitle>Install Fail2Ban</ToggleCardTitle>
              <ToggleCardDescription>
                For intrusion prevention
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BoltIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fail2Ban Options</DialogTitle>
        </DialogHeader>
        <FormField
          control={control}
          name="fail2banSSHBanTime"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Time To Ban (in seconds)</FormLabel>
              <FormControl>
                <Input {...field} value={String(field.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="fail2banSSHMaxRetry"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Max Retries</FormLabel>
              <FormControl>
                <Input {...field} value={String(field.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

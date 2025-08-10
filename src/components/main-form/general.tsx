import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { FormSchemaType } from "./constants";

export function General() {
  const { control } = useFormContext<FormSchemaType>();

  return (
    <>
      <FormField
        control={control}
        name="hostname"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Hostname</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="timezone"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Timezone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

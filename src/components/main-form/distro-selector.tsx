import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DistroSelector() {
  return (
    <FormField
      name="distro"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Distro</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your distro to continue" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="ubuntu">Ubuntu</SelectItem>
              <SelectItem value="debian">Debian</SelectItem>
              <SelectItem value="null" disabled>
                More distros will be added
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

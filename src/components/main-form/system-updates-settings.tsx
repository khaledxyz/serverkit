import { Controller, useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

export function SystemUpdatesSettings() {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="initialSystemUpdate"
        render={({ field, fieldState }) => (
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>
                Initial System Update{" "}
                <Badge size="sm" variant="info">
                  Recommended
                </Badge>
              </ItemTitle>
              <ItemDescription>
                Update all packages during setup before configuration.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch
                aria-invalid={fieldState.invalid}
                checked={field.value}
                id="initialSystemUpdate"
                name={field.name}
                onCheckedChange={field.onChange}
              />
            </ItemActions>
          </Item>
        )}
      />

      <Controller
        control={control}
        name="automaticSecurityUpdates"
        render={({ field, fieldState }) => (
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Automatic Security Updates</ItemTitle>
              <ItemDescription>
                Automatically apply security patches in the background.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch
                aria-invalid={fieldState.invalid}
                checked={field.value}
                id="automaticSecurityUpdates"
                name={field.name}
                onCheckedChange={field.onChange}
              />
            </ItemActions>
          </Item>
        )}
      />
    </>
  );
}

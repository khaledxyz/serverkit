import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

import { Badge } from "../ui/badge";

export function SystemUpdatesSettings() {
  return (
    <>
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
          <Switch defaultChecked />
        </ItemActions>
      </Item>

      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Automatic Security Updates</ItemTitle>
          <ItemDescription>
            Automatically apply security patches in the background.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch />
        </ItemActions>
      </Item>
    </>
  );
}

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

export function SystemUpdatesItem() {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>System & Security Updates</ItemTitle>
        <ItemDescription>
          Automatically enable system and security updates.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch />
      </ItemActions>
    </Item>
  );
}

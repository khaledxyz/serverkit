import { Switch } from "@/components/ui/switch";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const toggleCardVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex items-center gap-3 cursor-pointer transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground hover:bg-accent/50",
        outline: "border-2 hover:bg-accent/50",
        filled: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      checked: {
        true: "bg-primary/10 border-primary hover:bg-primary/15",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      checked: false,
    },
  },
);

interface ToggleCardProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof toggleCardVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
}

function ToggleCard({
  className,
  variant,
  checked = false,
  onCheckedChange,
  children,
  name,
  value,
  disabled = false,
  onClick,
  ...props
}: ToggleCardProps) {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (
      target.closest('[data-slot="toggle-card-action"]') ||
      target.closest('[data-slot="switch"]') ||
      target.closest("button") ||
      disabled
    ) {
      return;
    }

    onCheckedChange?.(!checked);
    onClick?.(e);
  };

  const handleSwitchChange = (newChecked: boolean) => {
    if (!disabled) {
      onCheckedChange?.(newChecked);
    }
  };

  const contentChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type !== ToggleCardAction,
  );

  const actionChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ToggleCardAction,
  );

  return (
    <div
      data-slot="toggle-card"
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        toggleCardVariants({ variant, checked }),
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
        "justify-between",
        className,
      )}
      onClick={handleCardClick}
      {...props}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        name={name}
        value={value}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
      />

      <div className="flex items-center gap-3 flex-1">
        <div data-slot="switch">
          <Switch
            checked={checked}
            onCheckedChange={handleSwitchChange}
            disabled={disabled}
          />
        </div>

        <div className="grid gap-1 min-w-0 flex-1">{contentChildren}</div>
      </div>

      {actionChild}
    </div>
  );
}

function ToggleCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toggle-card-title"
      className={cn(
        "line-clamp-1 font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ToggleCardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toggle-card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

function ToggleCardAction({
  className,
  onClick,
  ...props
}: React.ComponentProps<"div">) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div
      data-slot="toggle-card-action"
      className={cn("flex items-center justify-center", className)}
      onClick={handleClick}
      {...props}
    />
  );
}

export { ToggleCard, ToggleCardAction, ToggleCardDescription, ToggleCardTitle };

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const logoVariants = cva("", {
  variants: {
    color: {
      default: "fill-primary",
      muted: "fill-muted-foreground",
      secondary: "fill-secondary",
    },
    size: {
      default: "size-4",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export function Logo({ color, size, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 49 55"
      className={cn(logoVariants({ color, size }), className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.9 1.536a4 4 0 0 1 4 0l19.902 11.49c1.237.715 2 2.035 2 3.464v22.98l-.01.266a4 4 0 0 1-1.99 3.197L26.9 54.423a4 4 0 0 1-4 0L3 42.932a4 4 0 0 1-1.991-3.197L1 39.469V16.49a4 4 0 0 1 2-3.463l19.9-11.49Zm1.902 16.793c-4.97 0-9 4.253-9 9.5 0 5.246 4.03 9.5 9 9.5s9-4.254 9-9.5c0-5.247-4.03-9.5-9-9.5Z"
      />
    </svg>
  );
}

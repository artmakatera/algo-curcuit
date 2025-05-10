import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva("ml-0.5 rounded-full p-0.5 cursor-pointer", {
  variants: {
    variant: {
      default: "hover:bg-gray-200 dark:hover:bg-gray-700 ",
      destructive: "hover:bg-red-100 dark:hover:bg-red-900 text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface RemoveIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export const RemoveIconButton = ({
  className,
  variant,
  ...props
}: RemoveIconButtonProps) => {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      <X className="h-3 w-3" />
    </button>
  );
};

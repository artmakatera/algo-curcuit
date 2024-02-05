import { cn } from "@/shared/lib/utils";
import { TypographyProps } from "./type";

export function TypographyH1({ className, ...props }: TypographyProps) {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    />
  );
}

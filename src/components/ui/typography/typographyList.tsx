import { cn } from "@/shared/lib/utils";

export function TypographyList({
  children,
  isOrdered,
  className,
}: {
  children: React.ReactNode;
  isOrdered?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "ml-6 list-disc my-2",
        isOrdered && "list-decimal",
        className
      )}
    >
      {children}
    </ul>
  );
}

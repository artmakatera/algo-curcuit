import { cn } from "@/shared/lib/utils";

export function TypographyList({ children, isOrdered }: { children: React.ReactNode, isOrdered?: boolean }) {
  return (
    <ul className={cn("ml-6 list-disc my-2", isOrdered&& "list-decimal")}>
      {children}
    </ul>
  )
}
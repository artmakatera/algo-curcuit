import { cn } from "@/shared/lib/utils";

interface TypographyPProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function TypographyP({ children, className, ...props }: TypographyPProps) {
  return (
    <p className={cn("leading-6 not-first:mt-6 text-left", className)} {...props}>
      {children}
    </p>
  )
}
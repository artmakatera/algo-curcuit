export function TypographyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-6 [&:not(:first-child)]:mt-6 text-left">
      {children}
    </p>
  )
}
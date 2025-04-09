import { cn } from "@/shared/lib/utils";

interface StackWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const StackWrapper = ({ children, ...props }: StackWrapperProps) => {
  return <div {...props} className={cn("p-2 mt-24 min-w-16 w-fit mx-auto flex flex-col-reverse", props.className)}>{children}</div>;
};

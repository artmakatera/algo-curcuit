import { cn } from "@/shared/lib/utils";
import { TypographyProps } from "./type";



const TypographyH3: React.FC<TypographyProps> = ({
  className,
  ...props
}) => {
  return (
    <h3
      {...props}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
   />
  );
};

export default TypographyH3;

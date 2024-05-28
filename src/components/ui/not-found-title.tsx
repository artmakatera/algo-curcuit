import { cn } from "@/shared/lib/utils";
import TypographyH3 from "./typography/typographyH3";

type NotFoundTitleProps = {
  show: boolean;
  title?: string;
};

export const NotFoundTitle = ({
  show,
  title = "Not Found :(",
}: NotFoundTitleProps) => {
  return (
    <TypographyH3
      className={cn(
        "text-center font-bold text-disabled",
        !show && "invisible"
      )}
    >
      {title}
    </TypographyH3>
  );
};

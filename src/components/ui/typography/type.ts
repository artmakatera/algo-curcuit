import { HTMLAttributes } from "react";

export type TypographyProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { TypographyH2 } from "@/components/ui/typography";

test("It should render children", () => {
  const children = "Hello World";
  render(<TypographyH2>{children}</TypographyH2>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

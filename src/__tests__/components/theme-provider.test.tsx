import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { ThemeProvider } from "@/components/theme-provider";



test("It should render children", () => {
  const children = "Hello World";
  render(<ThemeProvider>{children}</ThemeProvider>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

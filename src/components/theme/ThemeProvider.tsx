import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark"]}
      value={{ light: "light", dark: "dark" }}
      storageKey="velcore-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

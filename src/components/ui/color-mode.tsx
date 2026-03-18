"use client";

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

// Re-export hooks from dedicated file so existing imports still work
import { useColorMode } from "./color-mode-hooks";

// Re-export ThemeProvider as ColorModeProvider
export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

// Ready-made toggle button component
export function ColorModeButton(props: Omit<IconButtonProps, "aria-label">) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <LuSun className="dark-hidden" />
        <LuMoon className="light-hidden" />
      </IconButton>
    </ClientOnly>
  );
}

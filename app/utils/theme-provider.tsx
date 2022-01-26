import * as React from "react";
import { useFetcher } from "remix";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
const themes: Array<Theme> = Object.values(Theme);

type ThemeContextType = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>
];

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);
ThemeContext.displayName = "ThemeContext";

const prefersLightMQ = "(prefers-color-scheme: light)";
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode;
  specifiedTheme: Theme | null;
}) {
  const [theme, setTheme] = React.useState<Theme | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the clientThemeCode will set the theme for us
    // before hydration. Then (during hydration), this code will get the same
    // value that clientThemeCode got so hydration is happy.
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) return specifiedTheme;
      else return null;
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== "object") return null;

    return getPreferredTheme();
  });

  // ***store theme in session***
  const persistTheme = useFetcher();
  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = React.useRef(persistTheme);
  React.useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = React.useRef(false);

  React.useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) return;
    persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" } // call action to set theme in session
    );
  }, [theme]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { ThemeProvider, useTheme, themes, Theme, isTheme };
